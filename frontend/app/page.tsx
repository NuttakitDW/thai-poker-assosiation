'use client';

import { useState } from 'react';
import { translations, Language } from './translations';
import PersonalInfoStep from './components/PersonalInfoStep';
import EmailVerificationStep from './components/EmailVerificationStep';
import DocumentUploadStep from './components/DocumentUploadStep';
import SuccessStep from './components/SuccessStep';

export default function Home() {
  const [language, setLanguage] = useState<Language>('th');
  const [showForm, setShowForm] = useState(false);
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

  const startRegistration = () => {
    setShowForm(true);
  };

  const goToHome = () => {
    setShowForm(false);
    setCurrentStep(1);
  };

  // Homepage View
  if (!showForm) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation Bar */}
        <nav className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Thai Poker Sports Association Logo"
                  className="h-12 w-auto"
                />
                <span className="text-xl font-semibold text-gray-900">
                  {language === 'th' ? 'สมาคมกีฬาโป๊กเกอร์ไทย' : 'Thai Poker Sports Association'}
                </span>
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

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                {language === 'th' ? 'เปิดรับสมัครสมาชิก' : 'Now Accepting Applications'}
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                {language === 'th' ? (
                  <>
                    ลงทะเบียน<br />
                    <span className="text-red-600">สมาชิก</span>
                  </>
                ) : (
                  <>
                    Member<br />
                    <span className="text-red-600">Registration</span>
                  </>
                )}
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {language === 'th'
                  ? 'เข้าร่วมเป็นส่วนหนึ่งของสมาคมกีฬาโป๊กเกอร์ไทย ลงทะเบียนออนไลน์ได้ง่ายๆ ภายในไม่กี่นาที'
                  : 'Join the Thai Poker Sports Association. Complete your online registration in just a few minutes.'}
              </p>

              <button
                onClick={startRegistration}
                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
              >
                <span>{language === 'th' ? 'เริ่มลงทะเบียน' : 'Start Registration'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <p className="mt-6 text-sm text-gray-500">
                {language === 'th'
                  ? 'กรุณาเตรียมบัตรประชาชนหรือหนังสือเดินทางสำหรับการยืนยันตัวตน'
                  : 'Please have your ID card or passport ready for verification'}
              </p>
            </div>

            {/* Right Column - Logo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-amber-100 rounded-full blur-3xl opacity-30"></div>
                <img
                  src="/logo.png"
                  alt="Thai Poker Sports Association Logo"
                  className="relative h-96 w-auto"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Form View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goToHome}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/logo.png"
                alt="Thai Poker Sports Association Logo"
                className="h-12 w-auto"
              />
              <div className="text-left">
                <h1 className="text-xl font-semibold text-gray-900">
                  {language === 'th' ? 'ลงทะเบียนสมาชิก' : 'Member Registration'}
                </h1>
                <p className="text-sm text-gray-500">{t.subtitle}</p>
              </div>
            </button>

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
                  }`} />
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
