'use client'

import React, { useState } from 'react';
import { submitCallbackAction, CallbackFormData } from '@/core/actions/contact.action';

interface CallbackFormProps {
  schoolkey: string;
  schoolname: string;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const CallbackForm: React.FC<CallbackFormProps> = ({ schoolkey, schoolname }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    callbackdate: ''
  });

  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
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
      errors.phone = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.callbackdate) errors.callbackdate = 'Preferred date/time is required';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setState('submitting');
    setErrorMessage(null);

    try {
      const submissionData: CallbackFormData = {
        schoolkey,
        ...formData
      };

      const result = await submitCallbackAction(submissionData);

      if (result.success) {
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

  if (state === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-emerald-900 mb-2">Callback Requested!</h3>
        <p className="text-emerald-700">We will call you back at your preferred time.</p>
        <button 
          onClick={() => {
            setState('idle');
            setFormData({ name: '', phone: '', callbackdate: '' });
          }}
          className="mt-4 text-sm font-semibold text-emerald-600 hover:underline"
        >
          Request another callback
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Request a Call Back</h3>
          <p className="text-sm text-slate-500">Prefer to talk? Schedule a call with us.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-xl">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              disabled={state === 'submitting'}
              className={`w-full px-4 py-3 rounded-xl bg-slate-50 border transition-all outline-none ${
                fieldErrors.name ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50'
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Mobile Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="10-digit number"
              value={formData.phone}
              onChange={handleChange}
              disabled={state === 'submitting'}
              maxLength={10}
              className={`w-full px-4 py-3 rounded-xl bg-slate-50 border transition-all outline-none ${
                fieldErrors.phone ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50'
              }`}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Preferred Date & Time</label>
          <input
            type="datetime-local"
            name="callbackdate"
            value={formData.callbackdate}
            onChange={handleChange}
            disabled={state === 'submitting'}
            className={`w-full px-4 py-3 rounded-xl bg-slate-50 border transition-all outline-none ${
              fieldErrors.callbackdate ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50'
            }`}
          />
        </div>

        <button
          type="submit"
          disabled={state === 'submitting'}
          className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {state === 'submitting' ? (
            <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full" />
          ) : (
            'Confirm Callback Request'
          )}
        </button>
      </form>
    </div>
  );
};

export default CallbackForm;
