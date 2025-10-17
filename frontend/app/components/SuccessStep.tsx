'use client';

import { translations, Language } from '../translations';
import { RegistrationFormData } from '../types';

interface SuccessStepProps {
  formData: RegistrationFormData;
  language: Language;
}

export default function SuccessStep({ formData, language }: SuccessStepProps) {
  const t = translations[language];

  return (
    <div className="space-y-6 text-center">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src="/logo.png"
          alt="Thai Poker Sports Association Logo"
          className="h-24 w-auto"
        />
      </div>

      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-16 h-16 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-800">{t.registrationSuccess}</h2>
      <p className="text-gray-600">{t.registrationSuccessMessage}</p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
        <p className="text-sm text-blue-800 mb-2">{t.registrationId}:</p>
        <p className="text-2xl font-mono font-bold text-blue-900">
          {formData.registrationId || 'N/A'}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mt-6 text-left">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {language === 'th' ? 'ข้อมูลการลงทะเบียน' : 'Registration Information'}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">{t.firstNameTH}:</span>
            <span className="font-semibold text-gray-900">{formData.firstNameTH} {formData.lastNameTH}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">{t.firstNameEN}:</span>
            <span className="font-semibold text-gray-900">{formData.firstNameEN} {formData.lastNameEN}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">{t.email}:</span>
            <span className="font-semibold text-gray-900">{formData.email}</span>
          </div>
          {formData.phone && (
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">{t.phone}:</span>
              <span className="font-semibold text-gray-900">{formData.phone}</span>
            </div>
          )}
          {formData.birthDate && (
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">{t.birthDate}:</span>
              <span className="font-semibold text-gray-900">{formData.birthDate}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {language === 'th' ? 'ลงทะเบียนใหม่' : 'Register New Member'}
        </button>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500">
          {language === 'th'
            ? 'กรุณาเก็บหมายเลขการลงทะเบียนไว้เพื่อการติดตามผล'
            : 'Please keep your registration ID for future reference'}
        </p>
      </div>
    </div>
  );
}
