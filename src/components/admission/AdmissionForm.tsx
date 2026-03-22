'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Users, 
  School, 
  FileText, 
  History, 
  MapPin, 
  Phone, 
  Mail, 
  ClipboardCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  ShieldCheck,
  Info
} from 'lucide-react';
import { submitAdmissionAction, AdmissionFormData } from '@/core/actions/admission.action';
import { checkAdmissionLimit, incrementAdmissionLimit } from '@/core/utils/admissionRateLimit';

interface AdmissionFormProps {
  schoolkey: string;
  schoolname: string;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const AdmissionForm: React.FC<AdmissionFormProps> = ({ schoolkey, schoolname }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<AdmissionFormData>({
    schoolkey,
    studentInfo: {
      studentName: '',
      dateOfBirth: '',
      bloodGroup: '',
      aadharNo: '',
      religion: '',
      seekingClass: '',
      emisNo: ''
    },
    previousSchool: {
      lastSchoolName: '',
      lastSchoolDistrict: '',
      lastSchoolBlock: ''
    },
    documents: {
      tcSubmitted: false,
      attendanceCertificate: false,
      markSheetSubmitted: false
    },
    reference: {
      name: '',
      designation: '',
      address: '',
      mobileNo: ''
    },
    history: {
      breakOfStudy: false
    },
    fatherInfo: {
      name: '',
      occupation: '',
      qualification: '',
      annualIncome: '',
      cellNo: ''
    },
    motherInfo: {
      name: '',
      occupation: '',
      qualification: '',
      annualIncome: '',
      cellNo: ''
    },
    general: {
      residentialAddress: '',
      distanceFromSchool: '',
      conveyanceRequired: false
    }
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (section: keyof AdmissionFormData, field: string, value: any) => {
    if (section === 'schoolkey') return; // Read only
    
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }));
    
    // Clear error
    const errorKey = `${section}.${field}`;
    if (fieldErrors[errorKey]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[errorKey];
        return next;
      });
    }
  };

  const validateStep = (step: number) => {
    const errors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.studentInfo.studentName?.trim()) errors['studentInfo.studentName'] = 'Student name is required';
      if (!formData.studentInfo.dateOfBirth) errors['studentInfo.dateOfBirth'] = 'Date of birth is required';
      if (!formData.studentInfo.seekingClass?.trim()) errors['studentInfo.seekingClass'] = 'Seeking class is required';
    } else if (step === 2) {
      if (!formData.fatherInfo.name?.trim()) errors['fatherInfo.name'] = 'Father name is required';
      if (!formData.fatherInfo.cellNo?.trim() && !formData.motherInfo.cellNo?.trim()) {
        errors['fatherInfo.cellNo'] = 'At least one parent cell number is required';
      }
    } else if (step === 4) {
      if (!formData.general.residentialAddress?.trim()) errors['general.residentialAddress'] = 'Address is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    // Client-side rate limit check
    const { allowed } = checkAdmissionLimit();
    if (!allowed) {
      setErrorMessage('Daily submission limit reached (5 per day). Please try again tomorrow.');
      setState('error');
      return;
    }

    setState('submitting');
    setErrorMessage(null);

    try {
      const result = await submitAdmissionAction(formData);
      if (result.success) {
        incrementAdmissionLimit();
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
      <div className="bg-white/80 backdrop-blur-xl p-12 rounded-[2rem] shadow-2xl text-center border border-white max-w-2xl mx-auto animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 mx-auto">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 italic tracking-tight uppercase">Application Received</h2>
        <p className="text-xl text-slate-600 mb-8 font-medium">Thank you for choosing {schoolname}. Your application for <span className="text-emerald-600 font-bold">{formData.studentInfo.studentName}</span> has been successfully submitted.</p>
        <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100 italic">
          <p className="text-sm text-slate-500 lowercase tracking-wider">our admission department will review your details and contact you via "{formData.fatherInfo.cellNo || formData.motherInfo.cellNo}" within 2-3 business days.</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all uppercase tracking-widest text-sm"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  const steps = [
    { id: 1, title: 'Student', icon: User },
    { id: 2, title: 'Parents', icon: Users },
    { id: 3, title: 'Academic', icon: School },
    { id: 4, title: 'General', icon: ClipboardCheck },
  ];

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto scroll-mt-32">
      {/* Progress Stepper */}
      <div className="mb-12 flex justify-between items-center relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${
              currentStep === s.id 
                ? 'bg-emerald-600 border-emerald-100 text-white shadow-xl shadow-emerald-200 scale-110' 
                : currentStep > s.id 
                  ? 'bg-emerald-100 border-white text-emerald-600' 
                  : 'bg-white border-slate-100 text-slate-300'
            }`}>
              {currentStep > s.id ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
            </div>
            <span className={`text-[10px] uppercase tracking-[0.2em] mt-3 font-bold ${currentStep >= s.id ? 'text-slate-800' : 'text-slate-300'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/50 relative overflow-hidden">
        {state === 'submitting' && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
            <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
            <p className="text-emerald-700 font-black uppercase tracking-widest text-sm italic">Processing Application...</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-8"
            >
              <div className="border-l-4 border-emerald-500 pl-6 mb-8">
                <h3 className="text-2xl font-black text-slate-900 italic uppercase">Student Information</h3>
                <p className="text-slate-500 text-sm">Primary details of the applicant</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup label="Student Full Name" error={fieldErrors['studentInfo.studentName']}>
                  <input
                    type="text"
                    required
                    value={formData.studentInfo.studentName}
                    onChange={(e) => handleChange('studentInfo', 'studentName', e.target.value)}
                    placeholder="Enter full name"
                    className={inputClass(!!fieldErrors['studentInfo.studentName'])}
                  />
                </FormGroup>

                <FormGroup label="Date of Birth" error={fieldErrors['studentInfo.dateOfBirth']}>
                  <input
                    type="date"
                    required
                    value={formData.studentInfo.dateOfBirth}
                    onChange={(e) => handleChange('studentInfo', 'dateOfBirth', e.target.value)}
                    onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                    className={inputClass(!!fieldErrors['studentInfo.dateOfBirth'])}
                  />
                </FormGroup>

                <FormGroup label="Seeking Class">
                  <select
                    required
                    value={formData.studentInfo.seekingClass}
                    onChange={(e) => handleChange('studentInfo', 'seekingClass', e.target.value)}
                    className={inputClass()}
                  >
                    <option value="">Select Class</option>
                    {['LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup label="Aadhar Number">
                  <input
                    type="text"
                    value={formData.studentInfo.aadharNo}
                    onChange={(e) => handleChange('studentInfo', 'aadharNo', e.target.value)}
                    placeholder="12 digit number"
                    maxLength={12}
                    className={inputClass()}
                  />
                </FormGroup>

                <FormGroup label="Blood Group">
                  <select
                    value={formData.studentInfo.bloodGroup}
                    onChange={(e) => handleChange('studentInfo', 'bloodGroup', e.target.value)}
                    className={inputClass()}
                  >
                    <option value="">Select</option>
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup label="Religion">
                  <input
                    type="text"
                    value={formData.studentInfo.religion}
                    onChange={(e) => handleChange('studentInfo', 'religion', e.target.value)}
                    placeholder="e.g. Hindu, Muslim, Christian"
                    className={inputClass()}
                  />
                </FormGroup>
                
                <FormGroup label="EMIS Number (If any)">
                  <input
                    type="text"
                    value={formData.studentInfo.emisNo}
                    onChange={(e) => handleChange('studentInfo', 'emisNo', e.target.value)}
                    placeholder="School ID"
                    className={inputClass()}
                  />
                </FormGroup>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-12"
            >
              <div>
                <div className="border-l-4 border-emerald-500 pl-6 mb-8">
                  <h3 className="text-2xl font-black text-slate-900 italic uppercase">Father Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormGroup label="Father's Name" error={fieldErrors['fatherInfo.name']}>
                    <input
                      type="text"
                      required
                      value={formData.fatherInfo.name}
                      onChange={(e) => handleChange('fatherInfo', 'name', e.target.value)}
                      className={inputClass(!!fieldErrors['fatherInfo.name'])}
                    />
                  </FormGroup>
                  <FormGroup label="Phone Number" error={fieldErrors['fatherInfo.cellNo']}>
                    <input
                      type="tel"
                      required
                      value={formData.fatherInfo.cellNo}
                      onChange={(e) => handleChange('fatherInfo', 'cellNo', e.target.value)}
                      maxLength={10}
                      className={inputClass(!!fieldErrors['fatherInfo.cellNo'])}
                    />
                  </FormGroup>
                  <FormGroup label="Occupation">
                    <input
                      type="text"
                      value={formData.fatherInfo.occupation}
                      onChange={(e) => handleChange('fatherInfo', 'occupation', e.target.value)}
                      className={inputClass()}
                    />
                  </FormGroup>
                  <FormGroup label="Qualification">
                    <input
                      type="text"
                      value={formData.fatherInfo.qualification}
                      onChange={(e) => handleChange('fatherInfo', 'qualification', e.target.value)}
                      className={inputClass()}
                    />
                  </FormGroup>
                </div>
              </div>

              <div>
                <div className="border-l-4 border-emerald-500 pl-6 mb-8">
                  <h3 className="text-2xl font-black text-slate-900 italic uppercase">Mother Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormGroup label="Mother's Name">
                    <input
                      type="text"
                      value={formData.motherInfo.name}
                      onChange={(e) => handleChange('motherInfo', 'name', e.target.value)}
                      className={inputClass()}
                    />
                  </FormGroup>
                  <FormGroup label="Phone Number">
                    <input
                      type="tel"
                      value={formData.motherInfo.cellNo}
                      onChange={(e) => handleChange('motherInfo', 'cellNo', e.target.value)}
                      maxLength={10}
                      className={inputClass()}
                    />
                  </FormGroup>
                  <FormGroup label="Occupation">
                    <input
                      type="text"
                      value={formData.motherInfo.occupation}
                      onChange={(e) => handleChange('motherInfo', 'occupation', e.target.value)}
                      className={inputClass()}
                    />
                  </FormGroup>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-12"
            >
              <div>
                <div className="border-l-4 border-emerald-500 pl-6 mb-8">
                  <h3 className="text-2xl font-black text-slate-900 italic uppercase">Previous School</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormGroup label="Last School Name">
                    <input
                      type="text"
                      value={formData.previousSchool.lastSchoolName}
                      onChange={(e) => handleChange('previousSchool', 'lastSchoolName', e.target.value)}
                      className={inputClass()}
                    />
                  </FormGroup>
                  <FormGroup label="District">
                    <input
                      type="text"
                      value={formData.previousSchool.lastSchoolDistrict}
                      onChange={(e) => handleChange('previousSchool', 'lastSchoolDistrict', e.target.value)}
                      className={inputClass()}
                    />
                  </FormGroup>
                </div>
              </div>

              <div>
                <div className="border-l-4 border-emerald-500 pl-6 mb-8">
                  <h3 className="text-2xl font-black text-slate-900 italic uppercase">Documents Check</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <FormCheckbox 
                    label="Transfer Certificate (TC) Available?" 
                    checked={formData.documents.tcSubmitted} 
                    onChange={(val) => handleChange('documents', 'tcSubmitted', val)} 
                  />
                  <FormCheckbox 
                    label="Mark Sheet (Final Exam) Available?" 
                    checked={formData.documents.markSheetSubmitted} 
                    onChange={(val) => handleChange('documents', 'markSheetSubmitted', val)} 
                  />
                  <FormCheckbox 
                    label="Attendance Certificate Available?" 
                    checked={formData.documents.attendanceCertificate} 
                    onChange={(val) => handleChange('documents', 'attendanceCertificate', val)} 
                  />
                  <FormCheckbox 
                    label="Break of Study (History)?" 
                    checked={formData.history.breakOfStudy} 
                    onChange={(val) => handleChange('history', 'breakOfStudy', val)} 
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-8"
            >
              <div className="border-l-4 border-emerald-500 pl-6 mb-8">
                <h3 className="text-2xl font-black text-slate-900 italic uppercase">General & Reference</h3>
              </div>

              <div className="space-y-6">
                <FormGroup label="Residential Address" error={fieldErrors['general.residentialAddress']}>
                  <textarea
                    required
                    rows={3}
                    value={formData.general.residentialAddress}
                    onChange={(e) => handleChange('general', 'residentialAddress', e.target.value)}
                    className={inputClass(!!fieldErrors['general.residentialAddress'])}
                  />
                </FormGroup>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormGroup label="Distance from School (KM)">
                    <input
                      type="text"
                      value={formData.general.distanceFromSchool}
                      onChange={(e) => handleChange('general', 'distanceFromSchool', e.target.value)}
                      className={inputClass()}
                    />
                  </FormGroup>
                  <FormCheckbox 
                    label="School Conveyance Required?" 
                    checked={formData.general.conveyanceRequired} 
                    onChange={(val) => handleChange('general', 'conveyanceRequired', val)} 
                  />
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-800 italic">Reference (Optional)</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormGroup label="Referred By Name">
                      <input
                        type="text"
                        value={formData.reference?.name}
                        onChange={(e) => handleChange('reference', 'name', e.target.value)}
                        className={inputClass()}
                      />
                    </FormGroup>
                    <FormGroup label="Reference Phone">
                      <input
                        type="tel"
                        value={formData.reference?.mobileNo}
                        onChange={(e) => handleChange('reference', 'mobileNo', e.target.value)}
                        className={inputClass()}
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium rounded-2xl flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  {errorMessage}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-100">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1 || state === 'submitting'}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 disabled:opacity-0 transition-all font-bold uppercase tracking-widest text-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all active:scale-95 group"
            >
              Next Step
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={state === 'submitting'}
              className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-black shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:bg-slate-400"
            >
              Submit Application
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// --- Helper Components ---

const FormGroup: React.FC<{ label: string; error?: string; children: React.ReactNode }> = ({ label, error, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 ml-1 italic">{label}</label>
    {children}
    {error && <p className="text-[10px] text-rose-500 font-bold ml-1 uppercase tracking-wider">{error}</p>}
  </div>
);

const FormCheckbox: React.FC<{ label: string; checked: boolean; onChange: (val: boolean) => void }> = ({ label, checked, onChange }) => (
  <label className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${checked ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
    <span className={`text-sm font-bold ${checked ? 'text-emerald-700' : 'text-slate-600'}`}>{label}</span>
    <input
      type="checkbox"
      className="hidden"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 bg-white'}`}>
      {checked && <CheckCircle2 className="w-4 h-4" strokeWidth={4} />}
    </div>
  </label>
);

const inputClass = (hasError: boolean = false) => `
  w-full px-5 py-4 rounded-2xl bg-slate-50/50 border transition-all duration-300 outline-none font-medium text-slate-900
  ${hasError 
      ? 'border-rose-400 ring-4 ring-rose-50 bg-rose-50/20' 
      : 'border-slate-100 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 focus:bg-white shadow-sm hover:shadow-md'
  }
`;

export default AdmissionForm;
