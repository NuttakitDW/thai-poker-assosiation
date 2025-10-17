const sgMail = require('@sendgrid/mail');

// Initialize SendGrid (only if API key is provided)
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * Send OTP verification email (plain text version)
 * @param {string} email - Recipient email address
 * @param {string} firstName - User's first name
 * @param {string} otpCode - 6-digit OTP code
 * @param {string} language - 'th' or 'en'
 */
async function sendOtpEmail(email, firstName, otpCode, language = 'en') {
  // If SendGrid is not configured, use mock mode
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    console.log(`[MOCK EMAIL] OTP for ${email}: ${otpCode}`);
    return { success: true, mode: 'mock' };
  }

  const subject = language === 'th'
    ? 'รหัส OTP สำหรับการลงทะเบียน - Thai Poker Sports Association'
    : 'Your OTP Code - Thai Poker Sports Association';

  // Logo URL - use environment variable or fallback
  const logoUrl = process.env.API_URL
    ? `${process.env.API_URL}/public/logo.png`
    : 'https://thai-poker-assosiation-production.up.railway.app/public/logo.png';

  const text = language === 'th'
    ? `สวัสดีคุณ ${firstName},\n\nรหัส OTP ของคุณคือ: ${otpCode}\n\nรหัสนี้จะหมดอายุใน 5 นาที\n\nกรุณาอย่าแชร์รหัสนี้กับผู้อื่น\n\nขอบคุณที่ลงทะเบียนกับ Thai Poker Sports Association`
    : `Hello ${firstName},\n\nYour OTP code is: ${otpCode}\n\nThis code will expire in 5 minutes.\n\nDo not share this code with anyone.\n\nThank you for registering with Thai Poker Sports Association`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .content {
          padding: 40px 30px;
        }
        .otp-box {
          background-color: #f8f9fa;
          border: 2px dashed #667eea;
          border-radius: 8px;
          padding: 30px;
          text-align: center;
          margin: 30px 0;
        }
        .otp-code {
          font-size: 36px;
          font-weight: bold;
          color: #667eea;
          letter-spacing: 8px;
          font-family: 'Courier New', monospace;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px 30px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .warning {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${logoUrl}" alt="Thai Poker Sports Association" style="height: 80px; margin: 0 auto 15px auto; display: block;" />
          <h1>Thai Poker Sports Association</h1>
        </div>

        <div class="content">
          ${language === 'th' ? `
            <h2>ยืนยันอีเมลของคุณ</h2>
            <p>สวัสดีคุณ <strong>${firstName}</strong>,</p>
            <p>ขอบคุณที่ลงทะเบียนกับ Thai Poker Sports Association กรุณาใช้รหัส OTP ด้านล่างเพื่อยืนยันอีเมลของคุณ:</p>
          ` : `
            <h2>Verify Your Email</h2>
            <p>Hello <strong>${firstName}</strong>,</p>
            <p>Thank you for registering with Thai Poker Sports Association. Please use the OTP code below to verify your email:</p>
          `}

          <div class="otp-box">
            <div class="otp-code">${otpCode}</div>
            <p style="margin-top: 15px; color: #666;">
              ${language === 'th' ? 'รหัสนี้จะหมดอายุใน <strong>5 นาที</strong>' : 'This code will expire in <strong>5 minutes</strong>'}
            </p>
          </div>

          <div class="warning">
            ${language === 'th' ? `
              <p><strong>หมายเหตุ:</strong></p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>กรุณาอย่าแชร์รหัสนี้กับผู้อื่น</li>
                <li>หากคุณไม่ได้ลงทะเบียน กรุณาเพิกเฉยต่อออีเมลนี้</li>
              </ul>
            ` : `
              <p><strong>Important:</strong></p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Do not share this code with anyone</li>
                <li>If you didn't register, please ignore this email</li>
              </ul>
            `}
          </div>
        </div>

        <div class="footer">
          ${language === 'th' ? `
            <p>© 2024 Thai Poker Sports Association. สงวนลิขสิทธิ์.</p>
            <p>หากคุณมีคำถาม กรุณาติดต่อ support@thaipokersportsassociation.com</p>
          ` : `
            <p>© 2024 Thai Poker Sports Association. All rights reserved.</p>
            <p>If you have questions, please contact support@thaipokersportsassociation.com</p>
          `}
        </div>
      </div>
    </body>
    </html>
  `;

  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: process.env.SENDGRID_FROM_NAME || 'Thai Poker Sports Association',
    },
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`✓ OTP email sent to ${email}`);
    return { success: true, mode: 'sendgrid' };
  } catch (error) {
    console.error('SendGrid Error:', error.response?.body || error.message);
    throw new Error('Failed to send OTP email');
  }
}

/**
 * Send registration success email
 * @param {string} email - Recipient email address
 * @param {string} firstName - User's first name
 * @param {string} registrationId - Registration ID
 * @param {string} language - 'th' or 'en'
 */
async function sendRegistrationSuccessEmail(email, firstName, registrationId, language = 'en') {
  // If SendGrid is not configured, use mock mode
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM_EMAIL) {
    console.log(`[MOCK EMAIL] Registration success for ${email}: ${registrationId}`);
    return { success: true, mode: 'mock' };
  }

  const subject = language === 'th'
    ? 'การลงทะเบียนสำเร็จ - Thai Poker Sports Association'
    : 'Registration Successful - Thai Poker Sports Association';

  // Logo URL - use environment variable or fallback
  const logoUrl = process.env.API_URL
    ? `${process.env.API_URL}/public/logo.png`
    : 'https://thai-poker-assosiation-production.up.railway.app/public/logo.png';

  const text = language === 'th'
    ? `สวัสดีคุณ ${firstName},\n\nการลงทะเบียนของคุณเสร็จสมบูรณ์แล้ว\n\nหมายเลขการลงทะเบียน: ${registrationId}\nสถานะ: รอการอนุมัติ\n\nเราจะตรวจสอบข้อมูลของคุณและแจ้งผลการอนุมัติภายใน 3-5 วันทำการ`
    : `Hello ${firstName},\n\nYour registration has been completed successfully.\n\nRegistration ID: ${registrationId}\nStatus: Pending Approval\n\nWe will review your information and notify you of the approval within 3-5 business days.`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .content {
          padding: 40px 30px;
        }
        .info-box {
          background-color: #f7fafc;
          border-left: 4px solid #48bb78;
          padding: 20px;
          margin: 20px 0;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px 30px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${logoUrl}" alt="Thai Poker Sports Association" style="height: 80px; margin: 0 auto 15px auto; display: block;" />
          <h1>✓ Registration Successful</h1>
        </div>

        <div class="content">
          ${language === 'th' ? `
            <h2>ยินดีต้อนรับคุณ ${firstName}!</h2>
            <p>การลงทะเบียนของคุณเสร็จสมบูรณ์แล้ว</p>
            <div class="info-box">
              <p><strong>หมายเลขการลงทะเบียน:</strong> ${registrationId}</p>
              <p><strong>สถานะ:</strong> รอการอนุมัติ</p>
            </div>
            <p>เราจะตรวจสอบข้อมูลของคุณและแจ้งผลการอนุมัติภายใน 3-5 วันทำการ</p>
          ` : `
            <h2>Welcome ${firstName}!</h2>
            <p>Your registration has been completed successfully.</p>
            <div class="info-box">
              <p><strong>Registration ID:</strong> ${registrationId}</p>
              <p><strong>Status:</strong> Pending Approval</p>
            </div>
            <p>We will review your information and notify you of the approval within 3-5 business days.</p>
          `}
        </div>

        <div class="footer">
          <p>© 2024 Thai Poker Sports Association</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: process.env.SENDGRID_FROM_NAME || 'Thai Poker Sports Association',
    },
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`✓ Success email sent to ${email}`);
    return { success: true, mode: 'sendgrid' };
  } catch (error) {
    console.error('SendGrid Error:', error.response?.body || error.message);
    throw new Error('Failed to send success email');
  }
}

module.exports = {
  sendOtpEmail,
  sendRegistrationSuccessEmail,
};
