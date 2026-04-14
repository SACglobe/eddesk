'use server'

import { createClient } from '@supabase/supabase-js'
import { sendContactEmail, sendCallbackEmail } from '@/core/utils/email';

export interface ContactFormData {
  schoolkey: string;
  name: string;
  phone: string;
  message: string;
  email?: string;
  subject?: string;
}

export interface CallbackFormData {
  schoolkey: string;
  name: string;
  phone: string;
  callbackdate: string;
}

export interface ContactActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Server Action to submit a contact enquiry via Supabase RPC.
 */
export async function submitContactAction(data: ContactFormData): Promise<ContactActionResult> {
  const { schoolkey, name, phone, message, email, subject } = data;

  if (!name?.trim()) return { success: false, error: 'Name is required' };
  if (!phone || !/^[0-9]{10}$/.test(phone)) return { success: false, error: 'Enter a valid 10-digit mobile number' };
  if (!message || message.trim().length < 10) return { success: false, error: 'Message must be at least 10 characters' };

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
      console.error('[contact.action] Error: NEXT_PUBLIC_SUPABASE_URL is missing');
      return { success: false, error: 'Database configuration error' };
    }

    const supabaseKey = supabaseServiceKey || supabaseAnonKey;
    if (!supabaseKey) {
      console.error('[contact.action] Error: No Supabase keys found in environment');
      return { success: false, error: 'Database configuration error' };
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // 1. Insert into 'formsubmissions'
    const { error: insertError } = await supabase
      .from('formsubmissions')
      .insert({
        schoolkey: schoolkey,
        formtype: 'generalmessage',
        payload: {
          name,
          mobileno: phone, // Standardized key
          message,
          email: email || null,
          subject: subject || null
        },
        status: 'pending',
        isactive: true
      });
    
    if (insertError) throw insertError;

    // 2. Fetch school email and send notification
    try {
      const { data: schoolData } = await supabase
        .from('schools')
        .select('name, email')
        .eq('key', schoolkey)
        .maybeSingle();

      if (schoolData?.email) {
        await sendContactEmail(schoolData.email, {
          schoolname: schoolData.name,
          name,
          mobileno: phone,
          email,
          subject,
          message,
          date: new Date().toLocaleString('en-IN')
        });
      }
    } catch (e) {
      console.error('[contact.action] email failed:', e);
    }

    return { success: true, message: 'Message sent successfully' };
  } catch (error) {
    console.error('[contact.action] Error:', error);
    return { success: false, error: 'Failed to send message' };
  }
}

/**
 * Server Action to submit a callback request.
 */
export async function submitCallbackAction(data: CallbackFormData): Promise<ContactActionResult> {
  const { schoolkey, name, phone, callbackdate } = data;

  if (!name?.trim()) return { success: false, error: 'Name is required' };
  if (!phone || !/^[0-9]{10}$/.test(phone)) return { success: false, error: 'Enter a valid 10-digit mobile number' };
  if (!callbackdate) return { success: false, error: 'Preferred date is required' };

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
      console.error('[callback.action] Error: NEXT_PUBLIC_SUPABASE_URL is missing');
      return { success: false, error: 'Database configuration error' };
    }

    const supabaseKey = supabaseServiceKey || supabaseAnonKey;
    if (!supabaseKey) {
      console.error('[callback.action] Error: No Supabase keys found in environment');
      return { success: false, error: 'Database configuration error' };
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // 1. Insert into 'formsubmissions'
    const { error: insertError } = await supabase
      .from('formsubmissions')
      .insert({
        schoolkey: schoolkey,
        formtype: 'callbackrequired',
        payload: {
          name,
          mobileno: phone,
          callbackdate
        },
        status: 'pending',
        isactive: true
      });
    
    if (insertError) throw insertError;

    // 2. Fetch school email and send notification
    try {
      const { data: schoolData } = await supabase
        .from('schools')
        .select('name, email')
        .eq('key', schoolkey)
        .maybeSingle();

      if (schoolData?.email) {
        await sendCallbackEmail(schoolData.email, {
          schoolname: schoolData.name,
          name,
          mobileno: phone,
          preferreddate: callbackdate,
          date: new Date().toLocaleString('en-IN')
        });
      }
    } catch (e) {
      console.error('[callback.action] email failed:', e);
    }

    return { success: true, message: 'Callback request submitted' };
  } catch (error) {
    console.error('[callback.action] Error:', error);
    return { success: false, error: 'Failed to request callback' };
  }
}
