export const translations = {
  th: {
    // Navigation
    languageSwitch: 'English',

    // Header
    title: 'ลงทะเบียนสมาชิก',
    subtitle: 'สมาคมไพ่โป๊กเกอร์ไทย',

    // Steps
    step1: 'ข้อมูลส่วนตัว',
    step2: 'ยืนยันอีเมล',
    step3: 'เอกสารยืนยันตัวตน',
    step4: 'เสร็จสิ้น',

    // Form labels - Personal Info
    firstNameTH: 'ชื่อ (ภาษาไทย)',
    lastNameTH: 'นามสกุล (ภาษาไทย)',
    firstNameEN: 'ชื่อ (ภาษาอังกฤษ)',
    lastNameEN: 'นามสกุล (ภาษาอังกฤษ)',
    birthDate: 'วัน/เดือน/ปีเกิด',
    nationality: 'สัญชาติ',
    idNumber: 'หมายเลขบัตรประชาชน/พาสปอร์ต',
    address: 'ที่อยู่ตามบัตรประชาชน',
    phone: 'เบอร์โทรศัพท์',
    email: 'อีเมล',
    lineId: 'Line ID',
    telegram: 'Telegram',
    facebook: 'Facebook',

    // Form labels - Verification
    otpCode: 'รหัส OTP',
    otpSent: 'ส่ง OTP',
    otpVerify: 'ยืนยัน OTP',
    otpResend: 'ส่ง OTP อีกครั้ง',
    otpInstructions: 'กรุณากรอกรหัส OTP 6 หลักที่ส่งไปยังอีเมลของคุณ',
    otpSuccess: 'ยืนยันอีเมลสำเร็จ',

    // Form labels - Documents
    idCard: 'สำเนาบัตรประชาชน/พาสปอร์ต',
    uploadFile: 'อัพโหลดไฟล์',
    fileSelected: 'ไฟล์ที่เลือก',

    // Buttons
    next: 'ถัดไป',
    back: 'ย้อนกลับ',
    submit: 'ส่งข้อมูล',
    finish: 'เสร็จสิ้น',

    // Messages
    requiredField: 'กรุณากรอกข้อมูลที่จำเป็น',
    registrationSuccess: 'ลงทะเบียนสำเร็จ!',
    registrationSuccessMessage: 'ขอบคุณที่ลงทะเบียนกับสมาคมไพ่โป๊กเกอร์ไทย',
    registrationId: 'หมายเลขการลงทะเบียน',
    error: 'เกิดข้อผิดพลาด',
    emailVerificationRequired: 'กรุณายืนยันอีเมลก่อนดำเนินการต่อ',

    // Placeholders
    enterFirstName: 'กรุณากรอกชื่อ',
    enterLastName: 'กรุณากรอกนามสกุล',
    enterEmail: 'กรุณากรอกอีเมล',
    enterPhone: 'กรุณากรอกเบอร์โทรศัพท์',
    enterOTP: 'กรอกรหัส OTP',

    // Demo Note
    demoNote: 'หมายเหตุ: นี่คือเวอร์ชันทดสอบ รหัส OTP จะแสดงในคอนโซลของเบราว์เซอร์'
  },
  en: {
    // Navigation
    languageSwitch: 'ไทย',

    // Header
    title: 'Member Registration',
    subtitle: 'Thai Poker Association',

    // Steps
    step1: 'Personal Information',
    step2: 'Email Verification',
    step3: 'Identity Documents',
    step4: 'Complete',

    // Form labels - Personal Info
    firstNameTH: 'First Name (Thai)',
    lastNameTH: 'Last Name (Thai)',
    firstNameEN: 'First Name (English)',
    lastNameEN: 'Last Name (English)',
    birthDate: 'Date of Birth',
    nationality: 'Nationality',
    idNumber: 'ID Card / Passport Number',
    address: 'Address (as per ID Card)',
    phone: 'Phone Number',
    email: 'Email',
    lineId: 'Line ID',
    telegram: 'Telegram',
    facebook: 'Facebook',

    // Form labels - Verification
    otpCode: 'OTP Code',
    otpSent: 'Send OTP',
    otpVerify: 'Verify OTP',
    otpResend: 'Resend OTP',
    otpInstructions: 'Please enter the 6-digit OTP code sent to your email',
    otpSuccess: 'Email verified successfully',

    // Form labels - Documents
    idCard: 'ID Card / Passport Copy',
    uploadFile: 'Upload File',
    fileSelected: 'Selected File',

    // Buttons
    next: 'Next',
    back: 'Back',
    submit: 'Submit',
    finish: 'Finish',

    // Messages
    requiredField: 'Please fill in required fields',
    registrationSuccess: 'Registration Successful!',
    registrationSuccessMessage: 'Thank you for registering with Thai Poker Association',
    registrationId: 'Registration ID',
    error: 'Error',
    emailVerificationRequired: 'Please verify your email before proceeding',

    // Placeholders
    enterFirstName: 'Enter first name',
    enterLastName: 'Enter last name',
    enterEmail: 'Enter email',
    enterPhone: 'Enter phone number',
    enterOTP: 'Enter OTP code',

    // Demo Note
    demoNote: 'Note: This is a demo version. OTP code will be shown in the browser console'
  }
};

export type Language = 'th' | 'en';
export type TranslationKey = keyof typeof translations.th;
