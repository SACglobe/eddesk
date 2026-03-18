'use client'

import React, { useState, useEffect } from 'react';
import { submitContactAction, ContactFormData } from '@/core/actions/contact.action';
import { canSubmitContactForm, recordContactSubmission } from '@/core/utils/contactRateLimit';

interface ContactFormProps {
  schoolkey: string;
  schoolname: string;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error' | 'rate_limited';

const ContactForm: React.FC<ContactFormProps> = ({ schoolkey, schoolname }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Check rate limit on mount
  useEffect(() => {
    if (!canSubmitContactForm()) {
      setState('rate_limited');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = 'Enter a valid 10-digit mobile number';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmitContactForm()) {
      setState('rate_limited');
      return;
    }

    if (!validateForm()) return;

    setState('submitting');
    setErrorMessage(null);

    try {
      const submissionData: ContactFormData = {
        schoolkey,
        ...formData
      };

      const result = await submitContactAction(submissionData);

      if (result.success) {
        recordContactSubmission();
        setState('success');
      } else {
        setErrorMessage(result.error || 'Failed to submit. Please try again.');
        setState('error');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      setState('error');
    }
  };

  if (state === 'rate_limited') {
    return (
      <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl text-amber-800 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-2">Daily Limit Reached</h3>
        <p className="text-sm opacity-90">
          You have reached the daily limit of 5 enquiries. Please try again tomorrow.
        </p>
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center flex flex-col items-center justify-center min-h-[400px] animate-in slide-in-from-bottom-8 fade-in duration-700 ease-out">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Thank You, {formData.name.split(' ')[0]}!</h2>
        <p className="text-lg text-slate-600 mb-2">{schoolname} will contact you as soon as possible.</p>
        <p className="text-sm text-slate-400">We typically respond within 1 business day.</p>
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-500 ${state === 'submitting' ? 'opacity-70' : 'opacity-100'}`}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-xl animate-in slide-in-from-top-2 duration-300">
            {errorMessage}
          </div>
        )}

        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-slate-700 ml-1">Your Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleChange}
            disabled={state === 'submitting'}
            className={`w-full px-5 py-3.5 rounded-2xl bg-white border transition-all duration-300 outline-none ${
              fieldErrors.name 
                ? 'border-rose-400 ring-4 ring-rose-50' 
                : 'border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50'
            }`}
          />
          {fieldErrors.name && <p className="text-xs text-rose-500 ml-1 mt-1 font-medium">{fieldErrors.name}</p>}
        </div>

        {/* Phone Field */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-slate-700 ml-1">10-digit Mobile Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="10-digit Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            disabled={state === 'submitting'}
            maxLength={10}
            className={`w-full px-5 py-3.5 rounded-2xl bg-white border transition-all duration-300 outline-none ${
              fieldErrors.phone 
                ? 'border-rose-400 ring-4 ring-rose-50' 
                : 'border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50'
            }`}
          />
          {fieldErrors.phone && <p className="text-xs text-rose-500 ml-1 mt-1 font-medium">{fieldErrors.phone}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700 ml-1">Email Address (Optional)</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address (Optional)"
              value={formData.email}
              onChange={handleChange}
              disabled={state === 'submitting'}
              className={`w-full px-5 py-3.5 rounded-2xl bg-white border transition-all duration-300 outline-none ${
                fieldErrors.email 
                  ? 'border-rose-400 ring-4 ring-rose-50' 
                  : 'border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50'
              }`}
            />
            {fieldErrors.email && <p className="text-xs text-rose-500 ml-1 mt-1 font-medium">{fieldErrors.email}</p>}
          </div>

          {/* Subject Field */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700 ml-1">Subject (Optional)</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject (Optional)"
              value={formData.subject}
              onChange={handleChange}
              disabled={state === 'submitting'}
              className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all duration-300 outline-none"
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-slate-700 ml-1">Your Message</label>
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            disabled={state === 'submitting'}
            className={`w-full px-5 py-3.5 rounded-2xl bg-white border transition-all duration-300 outline-none resize-none ${
              fieldErrors.message 
                ? 'border-rose-400 ring-4 ring-rose-50' 
                : 'border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50'
            }`}
          />
          {fieldErrors.message && <p className="text-xs text-rose-500 ml-1 mt-1 font-medium">{fieldErrors.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
        >
          {state === 'submitting' ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
