'use server'

import { createClient } from '@supabase/supabase-js'
import { sendAdmissionEmail } from '@/core/utils/email';

export interface AdmissionFormData {
  schoolkey: string;
  studentinfo: {
    studentname: string;
    dateofbirth: string;
    bloodgroup: string;
    aadharno: string;
    religion: string;
    seekingclass: string;
    emisno?: string;
  };
  previousschool: {
    lastschoolname: string;
    lastschooldistrict: string;
    lastschoolblock: string;
  };
  documents: {
    tcsubmitted: boolean;
    attendancecertificate: boolean;
    marksheetsubmitted: boolean;
  };
  reference?: {
    name: string;
    designation: string;
    address: string;
    mobileno: string;
  };
  history: {
    breakofstudy: boolean;
  };
  fatherinfo: {
    name: string;
    occupation: string;
    qualification: string;
    annualincome: string;
    mobileno: string;
  };
  motherinfo: {
    name: string;
    occupation: string;
    qualification: string;
    annualincome: string;
    mobileno: string;
  };
  general: {
    residentialaddress: string;
    distancefromschool: string;
    conveyancerequired: boolean;
  };
}

export interface AdmissionActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Server Action to submit an admission form via Supabase.
 * Uses SUPABASE_SERVICE_ROLE_KEY to bypass RLS and ensure secure submission.
 */
export async function submitAdmissionAction(data: AdmissionFormData): Promise<AdmissionActionResult> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
      console.error('[admission.action] Error: NEXT_PUBLIC_SUPABASE_URL is missing');
      return { success: false, error: 'Database configuration error' };
    }

    const supabaseKey = supabaseServiceKey || supabaseAnonKey;

    if (!supabaseKey) {
      console.error('[admission.action] Error: No Supabase keys found in environment');
      return { success: false, error: 'Database configuration error' };
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // 1. Basic Validation (Name, Phone, Class)
    if (!data.studentinfo.studentname?.trim()) {
      return { success: false, error: 'Student name is required' };
    }
    if (!data.studentinfo.seekingclass?.trim()) {
      return { success: false, error: 'Seeking class is required' };
    }
    if (!data.fatherinfo.mobileno?.trim() && !data.motherinfo.mobileno?.trim()) {
      return { success: false, error: 'At least one parent mobile number is required' };
    }

    console.log('[admission.action] submit →', { schoolkey: data.schoolkey, studentname: data.studentinfo.studentname });

    // Insert into 'formsubmissions' table
    const { error: insertError } = await supabase
      .from('formsubmissions')
      .insert({
        schoolkey: data.schoolkey,
        formtype: 'admissionenquiry',
        payload: data,
        status: 'pending',
        isactive: true
      });
    
    if (insertError) {
      console.error('[admission.action] Insert Error:', insertError);
      return { success: false, error: 'Failed to submit admission form. Please try again later.' };
    }

    // 2. Fetch school email and send notification
    try {
      const { data: schoolData } = await supabase
        .from('schools')
        .select('name, email')
        .eq('key', data.schoolkey)
        .maybeSingle();

      if (schoolData?.email) {
        await sendAdmissionEmail(schoolData.email, {
          schoolname: schoolData.name,
          studentname: data.studentinfo.studentname,
          seekingclass: data.studentinfo.seekingclass,
          mobileno: data.fatherinfo.mobileno || data.motherinfo.mobileno,
          date: new Date().toLocaleString('en-IN')
        });
      }
    } catch (e) {
      console.error('[admission.action] notification email failed:', e);
    }

    return { success: true, message: 'Admission form submitted successfully' };

  } catch (error) {
    console.error('[admission.action] Unexpected Error:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}
