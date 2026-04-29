import { NextResponse } from 'next/server';
import { sendMarketingLeadEmail } from '@/core/utils/email';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Standardizing to lowercase keys as per plan
    const { 
      schoolname, 
      name, 
      email, 
      mobileno, 
      message,
      _source = 'Contact Form' 
    } = body;

    // 1. Validation
    if (!email || !name || !message) {
      return NextResponse.json({ error: 'Missing required fields (Name, Email, Message)' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (mobileno && !/^[0-9]{10}$/.test(mobileno)) {
      return NextResponse.json({ error: 'Mobile number must be exactly 10 digits' }, { status: 400 });
    }

    // 2. Send email using the central utility
    // Note: We skip database storage as per user feedback
    const result = await sendMarketingLeadEmail({
      schoolname: schoolname || body.school_name, // Support both legacy and new key during migration
      name,
      email,
      mobileno: mobileno || body.phone, // Support both legacy and new key during migration
      message,
      source: _source,
      date: new Date().toLocaleString('en-IN')
    });

    if (!result.success) {
      console.error('[contact.api] notification failed:', result.error);
      // Still return 200/success if the core lead was processed, 
      // but here since we ONLY do email, we fail if email fails.
      return NextResponse.json({ error: result.error || 'Failed to send notification' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[contact.api] internal error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
