'use client';

import { useState, useRef } from 'react';
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
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
      const otp = otpDigits.join('');
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

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value.slice(-1); // Take last character only
    setOtpDigits(newOtpDigits);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtpDigits = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtpDigits(newOtpDigits);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
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
            <div className="flex gap-2 justify-center">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otpDigits[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-2xl font-bold text-gray-900 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              ))}
            </div>
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
              disabled={loading || otpDigits.some(digit => !digit)}
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
