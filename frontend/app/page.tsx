'use client';

import { useState } from 'react';
import { translations, Language } from './translations';
import PersonalInfoStep from './components/PersonalInfoStep';
import EmailVerificationStep from './components/EmailVerificationStep';
import DocumentUploadStep from './components/DocumentUploadStep';
import SuccessStep from './components/SuccessStep';

export default function Home() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-4">
            <img
              src="/logo.png"
              alt="Thai Poker Sports Association Logo"
              className="h-32 w-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-800 text-center">{t.title}</h1>
            <p className="text-sm text-gray-600 text-center mt-2">{t.subtitle}</p>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-center">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t.languageSwitch}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep >= step.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step.number}
                </div>
                <span className="text-xs mt-2 text-center">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 transition-colors ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-lg shadow-lg p-8">
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

        {/* Demo Note */}
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">{t.demoNote}</p>
        </div>
      </div>
    </div>
  );
}
