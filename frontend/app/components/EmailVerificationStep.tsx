'use client';

import { useState } from 'react';
import { translations, Language } from '../translations';
import { API_URL } from '../config';
import { RegistrationFormData } from '../types';

interface EmailVerificationStepProps {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  language: Language;
}

export default function EmailVerificationStep({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  language
}: EmailVerificationStepProps) {
  const t = translations[language];
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sentOtp, setSentOtp] = useState('');

  const sendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, language }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        // For demo - show OTP in console only
        if (data.otp) {
          console.log('='.repeat(50));
          console.log('OTP CODE:', data.otp);
          console.log('='.repeat(50));
        }
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (_err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        updateFormData({ emailVerified: true });
        alert(t.otpSuccess);
        nextStep();
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (_err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.step2}</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">{t.otpInstructions}</p>
        <p className="text-sm font-semibold text-blue-900 mt-2">
          {t.email}: {formData.email}
        </p>
      </div>

      {!otpSent ? (
        <div className="space-y-4">
          <button
            onClick={sendOTP}
            disabled={loading}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400"
          >
            {loading ? 'Sending...' : t.otpSent}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.otpCode} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest text-gray-900"
              placeholder="000000"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={sendOTP}
              disabled={loading}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
            >
              {t.otpResend}
            </button>
            <button
              onClick={verifyOTP}
              disabled={loading || otp.length !== 6}
              className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400"
            >
              {loading ? 'Verifying...' : t.otpVerify}
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          {t.back}
        </button>
      </div>
    </div>
  );
}
