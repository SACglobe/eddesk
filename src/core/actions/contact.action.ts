'use server'

import { createClient } from '@supabase/supabase-js'

export interface ContactFormData {
  schoolkey: string;
  name: string;
  phone: string;
  message: string;
  email?: string;
  subject?: string;
}

export interface ContactActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Server Action to submit a contact enquiry via Supabase RPC.
 * Uses SUPABASE_SERVICE_ROLE_KEY to bypass RLS and ensure secure submission.
 */
export async function submitContactAction(data: ContactFormData): Promise<ContactActionResult> {
  const { schoolkey, name, phone, message, email, subject } = data;

  // 1. Server-side Validation
  if (!name || name.trim() === '') {
    return { success: false, error: 'Name is required' };
  }

  // 10-digit Indian mobile number validation
  if (!phone || !/^[0-9]{10}$/.test(phone)) {
    return { success: false, error: 'Phone number must be a 10-digit mobile number' };
  }

  if (!message || message.trim().length < 10) {
    return { success: false, error: 'Message must be at least 10 characters long' };
  }

  if (email && email.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Invalid email address' };
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
      console.error('[contact.action] Error: NEXT_PUBLIC_SUPABASE_URL is missing');
      return { success: false, error: 'Database configuration error' };
    }

    // Use Service Role Key if available, fallback to Anon Key
    const supabaseKey = supabaseServiceKey || supabaseAnonKey;

    if (!supabaseKey) {
      console.error('[contact.action] Error: No Supabase keys found in environment');
      return { success: false, error: 'Database configuration error' };
    }

    if (!supabaseServiceKey) {
      console.warn('[contact.action] Warning: SUPABASE_SERVICE_ROLE_KEY missing, using Anon Key as fallback.');
    }

    console.log('[contact.action] submit →', { schoolkey, name });

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Insert into 'formsubmissions' table
    const { error: insertError } = await supabase
      .from('formsubmissions')
      .insert({
        schoolkey: schoolkey,
        formtype: 'contact',
        payload: {
          name,
          phone,
          message,
          email: email || null,
          subject: subject || null
        },
        status: 'pending',
        isactive: true
      });
    
    if (insertError) {
      console.error('[contact.action] Insert Error:', insertError);
      return { success: false, error: 'Failed to submit enquiry. Please try again later.' };
    }

    return { success: true, message: 'Enquiry submitted successfully' };

  } catch (error) {
    console.error('[contact.action] Unexpected Error:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}
