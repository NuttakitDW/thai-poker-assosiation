'use client';

import { useState } from 'react';
import { translations, Language } from '../translations';
import { API_URL } from '../config';

interface DocumentUploadStepProps {
  formData: any;
  updateFormData: (data: any) => void;
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
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Only JPG, PNG, and PDF files are allowed');
        return;
      }

      setFile(selectedFile);
      setError('');
      updateFormData({ idCardFile: selectedFile });
    }
  };

  const handleSubmit = async () => {
    if (!formData.emailVerified) {
      alert(t.emailVerificationRequired);
      return;
    }

    if (!file) {
      setError('Please upload your ID card or passport');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();

      // Append all form data
      Object.keys(formData).forEach((key) => {
        if (key !== 'idCardFile' && key !== 'registrationId' && formData[key]) {
          formDataToSend.append(key, formData[key].toString());
        }
      });

      // Append file
      formDataToSend.append('idCard', file);
      formDataToSend.append('verified', formData.emailVerified.toString());

      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        updateFormData({ registrationId: data.registrationId });
        nextStep();
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
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
          Please upload a clear copy of your ID card or passport
        </p>
        <ul className="text-xs text-blue-700 mt-2 list-disc list-inside">
          <li>Accepted formats: JPG, PNG, PDF</li>
          <li>Maximum file size: 5MB</li>
          <li>Make sure all information is clearly visible</li>
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.idCard} <span className="text-red-500">*</span>
        </label>

        <div className="mt-2">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {file ? (
                <>
                  <svg className="w-12 h-12 mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-700">
                    <span className="font-semibold">{t.fileSelected}:</span>
                  </p>
                  <p className="text-xs text-gray-500">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">{t.uploadFile}</span>
                  </p>
                  <p className="text-xs text-gray-500">JPG, PNG, or PDF (MAX. 5MB)</p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/jpeg,image/jpg,image/png,application/pdf"
            />
          </label>
        </div>

        {file && (
          <button
            onClick={() => {
              setFile(null);
              updateFormData({ idCardFile: null });
            }}
            className="mt-2 text-sm text-red-600 hover:text-red-700"
          >
            Remove file
          </button>
        )}
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
          disabled={loading || !file}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : t.submit}
        </button>
      </div>
    </div>
  );
}
