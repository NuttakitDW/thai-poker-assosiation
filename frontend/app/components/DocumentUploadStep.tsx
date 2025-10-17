'use client';

import { useState } from 'react';
import { translations, Language } from '../translations';
import { API_URL } from '../config';
import { RegistrationFormData } from '../types';

interface DocumentUploadStepProps {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  language: Language;
}

export default function DocumentUploadStep({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  language
}: DocumentUploadStepProps) {
  const t = translations[language];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!formData.emailVerified) {
      alert(t.emailVerificationRequired);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Send as JSON instead of FormData
      const dataToSend = {
        firstNameTH: formData.firstNameTH,
        lastNameTH: formData.lastNameTH,
        firstNameEN: formData.firstNameEN,
        lastNameEN: formData.lastNameEN,
        birthDate: formData.birthDate,
        nationality: formData.nationality,
        idNumber: formData.idNumber,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        lineId: formData.lineId,
        telegram: formData.telegram,
        facebook: formData.facebook,
        verified: formData.emailVerified.toString(),
        language
      };

      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        updateFormData({ registrationId: data.registrationId });
        nextStep();
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (_err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.step3}</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          {language === 'th'
            ? 'กรุณาตรวจสอบข้อมูลของคุณก่อนกดส่ง'
            : 'Please review your information before submitting'
          }
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-gray-800 mb-4">
          {language === 'th' ? 'ข้อมูลของคุณ' : 'Your Information'}
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">{language === 'th' ? 'ชื่อ (ไทย)' : 'First Name (Thai)'}</p>
            <p className="font-medium">{formData.firstNameTH}</p>
          </div>
          <div>
            <p className="text-gray-600">{language === 'th' ? 'นามสกุล (ไทย)' : 'Last Name (Thai)'}</p>
            <p className="font-medium">{formData.lastNameTH}</p>
          </div>
          <div>
            <p className="text-gray-600">{language === 'th' ? 'ชื่อ (English)' : 'First Name (English)'}</p>
            <p className="font-medium">{formData.firstNameEN}</p>
          </div>
          <div>
            <p className="text-gray-600">{language === 'th' ? 'นามสกุล (English)' : 'Last Name (English)'}</p>
            <p className="font-medium">{formData.lastNameEN}</p>
          </div>
          <div>
            <p className="text-gray-600">{language === 'th' ? 'อีเมล' : 'Email'}</p>
            <p className="font-medium">{formData.email}</p>
          </div>
          {formData.phone && (
            <div>
              <p className="text-gray-600">{language === 'th' ? 'เบอร์โทร' : 'Phone'}</p>
              <p className="font-medium">{formData.phone}</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={loading}
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium disabled:bg-gray-400"
        >
          {t.back}
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : t.submit}
        </button>
      </div>
    </div>
  );
}
