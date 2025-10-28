'use client';

import { useState } from 'react';
import Link from 'next/link';
import { translations, Language } from '../translations';
import PersonalInfoStep from '../components/PersonalInfoStep';
import EmailVerificationStep from '../components/EmailVerificationStep';
import DocumentUploadStep from '../components/DocumentUploadStep';
import SuccessStep from '../components/SuccessStep';

export default function RegisterPage() {
  const [language, setLanguage] = useState<Language>('th');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstNameTH: '',
    lastNameTH: '',
    firstNameEN: '',
    lastNameEN: '',
    birthDate: '',
    nationality: '',
    idNumber: '',
    address: '',
    phone: '',
    email: '',
    lineId: '',
    telegram: '',
    facebook: '',
    emailVerified: false,
    idCardFile: null as File | null,
    registrationId: ''
  });

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'th' ? 'en' : 'th');
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, label: t.step1 },
    { number: 2, label: t.step2 },
    { number: 3, label: t.step3 },
    { number: 4, label: t.step4 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src="/logo.png"
                alt="Thai Poker Sports Association Logo"
                className="h-12 w-auto"
              />
              <span className="text-xl font-semibold text-gray-900">
                {language === 'th' ? 'สมาคมกีฬาโป๊กเกอร์ไทย' : 'Thai Poker Sports Association'}
              </span>
            </Link>

            {/* Menu Items */}
            <div className="flex items-center gap-8 flex-1 justify-center">
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                {language === 'th' ? 'หน้าแรก' : 'Home'}
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                {language === 'th' ? 'เกี่ยวกับเรา' : 'About Us'}
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                {language === 'th' ? 'ปฏิทินกิจกรรม' : 'Calendar'}
              </a>
              <Link href="/register" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                {language === 'th' ? 'สมาชิก' : 'Members'}
              </Link>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                {language === 'th' ? 'การอบรม และฝึกอบรม' : 'Training'}
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                {language === 'th' ? 'ภาพกิจกรรม' : 'Activity Photos'}
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                {language === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
              </a>
            </div>

            <button
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            >
              {language === 'th' ? 'English' : 'ไทย'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      currentStep >= step.number
                        ? 'bg-red-600 text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-500'
                    }`}
                    style={{
                      backgroundColor: currentStep >= step.number ? '#A53030' : 'white',
                      borderColor: currentStep >= step.number ? '#A53030' : '#d1d5db',
                      color: currentStep >= step.number ? 'white' : '#9ca3af'
                    }}
                  >
                    {currentStep > step.number ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={`text-xs mt-2 text-center font-medium ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 transition-all mx-4 ${
                    currentStep > step.number
                      ? 'bg-red-600'
                      : 'bg-gray-300'
                  }`}
                  style={{
                    backgroundColor: currentStep > step.number ? '#A53030' : '#d1d5db'
                  }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {currentStep === 1 && (
            <PersonalInfoStep
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              language={language}
            />
          )}
          {currentStep === 2 && (
            <EmailVerificationStep
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
              language={language}
            />
          )}
          {currentStep === 3 && (
            <DocumentUploadStep
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
              language={language}
            />
          )}
          {currentStep === 4 && (
            <SuccessStep formData={formData} language={language} />
          )}
        </div>
      </div>
    </div>
  );
}
