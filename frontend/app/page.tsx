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
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                  {language === 'th' ? 'สมาชิก' : 'Members'}
                </a>
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

        {/* Hero Section */}
        <div
          style={{
            backgroundColor: '#8B1E14',
            backgroundImage: `
              radial-gradient(circle at center, #A22A1D, #8B1E14),
              repeating-linear-gradient(45deg, rgba(178,59,42,0.2) 0, rgba(178,59,42,0.2) 2px, transparent 2px, transparent 40px),
              repeating-linear-gradient(-45deg, rgba(178,59,42,0.2) 0, rgba(178,59,42,0.2) 2px, transparent 2px, transparent 40px)
            `,
            backgroundBlendMode: 'overlay',
            backgroundAttachment: 'fixed'
          }}
          className="text-white py-32 relative"
        >
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{
              textShadow: '0 2px 8px rgba(74, 14, 10, 0.4)'
            }}>
              {language === 'th'
                ? 'ยินดีต้อนรับสู่สมาคมกีฬาโป๊กเกอร์ไทย'
                : 'Welcome to Thai Poker Sports Association'}
            </h1>
            <p className="text-lg lg:text-xl mb-12 opacity-95" style={{
              textShadow: '0 2px 4px rgba(74, 14, 10, 0.3)'
            }}>
              {language === 'th'
                ? 'ส่งเสริมและพัฒนากีฬาโป๊กเกอร์ในประเทศไทย'
                : 'Promoting and Developing Poker Sports in Thailand'}
            </p>
            <button
              onClick={startRegistration}
              style={{
                backgroundColor: '#660E06',
                boxShadow: '0 4px 12px rgba(102, 14, 6, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFD700';
                e.currentTarget.style.color = '#7C0A02';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#660E06';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 14, 6, 0.4)';
              }}
              className="inline-block px-10 py-3 font-semibold rounded-full transition-all duration-300"
            >
              {language === 'th' ? 'สมัครสมาชิก' : 'Register Now'}
            </button>
          </div>
        </div>

        {/* Mission Section */}
        <div style={{ backgroundColor: '#F9FAFB' }} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#7C0A02' }}>
              {language === 'th' ? 'พันธกิจ' : 'Mission'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all text-center"
                style={{ borderRadius: '20px' }}>
                <div className="text-6xl mb-6">🏆</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#7C0A02' }}>
                  {language === 'th' ? 'ส่งเสริมกีฬาโป๊กเกอร์' : 'Promote Poker Sports'}
                </h3>
                <p style={{ color: '#555555' }} className="text-sm leading-relaxed">
                  {language === 'th'
                    ? 'ส่งเสริมและพัฒนากีฬาโป๊กเกอร์ให้เป็นที่ยอมรับในสังคมไทย'
                    : 'Promote and develop poker as a recognized sport in Thailand'}
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all text-center"
                style={{ borderRadius: '20px' }}>
                <div className="text-6xl mb-6">👥</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#7C0A02' }}>
                  {language === 'th' ? 'พัฒนานักกีฬา' : 'Develop Athletes'}
                </h3>
                <p style={{ color: '#555555' }} className="text-sm leading-relaxed">
                  {language === 'th'
                    ? 'พัฒนานักกีฬาโป๊กเกอร์ไทยให้มีมาตรฐานสากลและเข้าร่วมการแข่งขันนานาชาติ'
                    : 'Develop Thai poker athletes to international standards and competition'}
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all text-center"
                style={{ borderRadius: '20px' }}>
                <div className="text-6xl mb-6">🎓</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#7C0A02' }}>
                  {language === 'th' ? 'การอบรมและศึกษา' : 'Training & Education'}
                </h3>
                <p style={{ color: '#555555' }} className="text-sm leading-relaxed">
                  {language === 'th'
                    ? 'จัดอบรมและให้ความรู้ด้านกีฬาโป๊กเกอร์อย่างถูกต้องและมีจริยธรรม'
                    : 'Provide proper training and ethical education in poker'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div
          style={{
            backgroundColor: '#8B1E14',
            backgroundImage: `
              radial-gradient(circle at center, #A22A1D, #8B1E14),
              repeating-linear-gradient(45deg, rgba(178,59,42,0.2) 0, rgba(178,59,42,0.2) 2px, transparent 2px, transparent 40px),
              repeating-linear-gradient(-45deg, rgba(178,59,42,0.2) 0, rgba(178,59,42,0.2) 2px, transparent 2px, transparent 40px)
            `,
            backgroundBlendMode: 'overlay',
            backgroundAttachment: 'fixed'
          }}
          className="text-white py-20 relative"
        >
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-8" style={{
              textShadow: '0 2px 8px rgba(74, 14, 10, 0.4)'
            }}>
              {language === 'th' ? 'วิสัยทัศน์' : 'Vision'}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed opacity-95 max-w-3xl mx-auto" style={{
              textShadow: '0 2px 4px rgba(74, 14, 10, 0.3)'
            }}>
              {language === 'th'
                ? 'เป็นองค์กรชั้นนำในการส่งเสริมและพัฒนากีฬาโป๊กเกอร์ประเทศไทย ให้เป็นที่ยอมรับในระดับประเทศ และส่งกีฬาโป๊กเกอร์ไทยไปสู่เวทีสากล'
                : 'To be a leading organization in promoting and developing poker sports in Thailand, recognized nationally and internationally'}
            </p>
          </div>
        </div>

        {/* News Section */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#A53030' }}>
              {language === 'th' ? 'ข่าวสาร' : 'News & Activities'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* News Item 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="/news-1.png"
                  alt="Thailand National Poker Championship 2024"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#A53030' }}>
                    {language === 'th'
                      ? 'การแข่งขันโป๊กเกอร์ทีมชาติประเทศไทย 2024'
                      : 'Thailand National Poker Championship 2024'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {language === 'th'
                      ? 'สมาคมกีฬาโป๊กเกอร์ไทยจัดแข่งขันชิงแชมป์เพื่อคัดเลือกตัวแทนไทยไปแข่งขันระดับนานาชาติ'
                      : 'National championship to select Thai representatives for international competition'}
                  </p>
                  <span className="text-sm text-gray-500">
                    {language === 'th' ? '15 เมษายน 2024' : 'April 15, 2024'}
                  </span>
                </div>
              </div>

              {/* News Item 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="/news-2.png"
                  alt="New Member Recruitment 2024"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#A53030' }}>
                    {language === 'th'
                      ? 'เปิดรับสมัครสมาชิกใหม่ประจำปี 2024'
                      : 'New Member Recruitment 2024'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {language === 'th'
                      ? 'สมาคมเปิดรับสมัครสมาชิกใหม่สำหรับผู้ที่สนใจเล่นโป๊กเกอร์อย่างมีระดับ'
                      : 'Join the association as a new member and develop your poker skills'}
                  </p>
                  <span className="text-sm text-gray-500">
                    {language === 'th' ? '10 เมษายน 2024' : 'April 10, 2024'}
                  </span>
                </div>
              </div>

              {/* News Item 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="/news-3.png"
                  alt="Poker Referee Training Program"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#A53030' }}>
                    {language === 'th'
                      ? 'การอบรมผู้ตัดสินโป๊กเกอร์'
                      : 'Poker Referee Training Program'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {language === 'th'
                      ? 'จัดอบรมหลักสูตรผู้ตัดสินโป๊กเกอร์เพื่อพัฒนาความเชี่ยวชาญการตัดสินการแข่งขัน'
                      : 'Training program to develop expert poker referees and judges'}
                  </p>
                  <span className="text-sm text-gray-500">
                    {language === 'th' ? '5 เมษายน 2024' : 'April 5, 2024'}
                  </span>
                </div>
              </div>
            </div>

            {/* View All Button */}
            <div className="text-center">
              <button style={{ borderColor: '#A53030', color: '#A53030' }} className="px-8 py-3 border-2 font-semibold rounded-full hover:bg-red-50 transition-colors">
                {language === 'th' ? 'ดูข่าวสารทั้งหมด' : 'View All News'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* About */}
              <div>
                <h3 className="text-lg font-bold mb-4">
                  {language === 'th' ? 'สมาคมกีฬาโป๊กเกอร์ไทย' : 'Thai Poker Sports Association'}
                </h3>
                <p className="text-gray-400 text-sm">
                  {language === 'th'
                    ? 'ส่งเสริมและพัฒนากีฬาโป๊กเกอร์ในประเทศไทย'
                    : 'Promoting and developing poker sports in Thailand'}
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold mb-4">
                  {language === 'th' ? 'รายการ' : 'Menu'}
                </h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">{language === 'th' ? 'เกี่ยวกับเรา' : 'About Us'}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{language === 'th' ? 'สมาชิก' : 'Members'}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{language === 'th' ? 'ติดต่อเรา' : 'Contact'}</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-bold mb-4">
                  {language === 'th' ? 'ติดต่อ' : 'Contact'}
                </h3>
                <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                  <span>📞</span>
                  02-123-4567
                </p>
                <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                  <span>📧</span>
                  info@thaipokersportsassociation.org
                </p>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <span>📍</span>
                  {language === 'th' ? 'กรุงเทพมหานคร' : 'Bangkok'}
                </p>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
              <p>© 2024 {language === 'th' ? 'สมาคมกีฬาโป๊กเกอร์ไทย' : 'Thai Poker Sports Association'}. {language === 'th' ? 'สงวนสิทธิ์ทั้งหมด' : 'All rights reserved'}.</p>
            </div>
          </div>
        </footer>
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
