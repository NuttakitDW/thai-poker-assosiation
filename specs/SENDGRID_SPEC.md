# SendGrid Email Specification - Thai Poker Association

## Overview
SendGrid integration for sending OTP verification emails to users during registration.

## Technology Stack
- **Email Service**: SendGrid (Twilio SendGrid)
- **API**: SendGrid Web API v3
- **Node.js Package**: `@sendgrid/mail`
- **Template Engine**: SendGrid Dynamic Templates

## SendGrid Setup

### 1. Create SendGrid Account

1. Go to [SendGrid](https://sendgrid.com)
2. Sign up for free account (100 emails/day free tier)
3. Verify your email address
4. Complete sender authentication

### 2. Create API Key

1. Go to Settings → API Keys
2. Click "Create API Key"
3. Name: `Thai Poker Association - Production`
4. Permissions: `Full Access` (or `Mail Send` only for security)
5. Copy API key (you'll only see it once!)

### 3. Verify Sender Identity

**Option A: Single Sender Verification (Recommended for MVP)**
1. Go to Settings → Sender Authentication
2. Click "Verify a Single Sender"
3. Enter email address (e.g., `noreply@thaipokerassociation.com`)
4. Fill in sender details
5. Verify email address

**Option B: Domain Authentication (Recommended for Production)**
1. Go to Settings → Sender Authentication
2. Click "Authenticate Your Domain"
3. Follow DNS setup instructions
4. Wait for DNS propagation (24-48 hours)

## Email Templates

### Template 1: OTP Verification Email

**Template Name**: `otp-verification-th-en`

**Subject (Thai)**: `รหัส OTP สำหรับการลงทะเบียน - Thai Poker Association`
**Subject (English)**: `Your OTP Code - Thai Poker Association`

**HTML Template**:

```html
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
    .button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>{{#if language}}{{#eq language "th"}}Thai Poker Association{{else}}Thai Poker Association{{/eq}}{{else}}Thai Poker Association{{/if}}</h1>
    </div>

    <div class="content">
      {{#if language}}
        {{#eq language "th"}}
          <h2>ยืนยันอีเมลของคุณ</h2>
          <p>สวัสดีคุณ <strong>{{firstName}}</strong>,</p>
          <p>ขอบคุณที่ลงทะเบียนกับ Thai Poker Association กรุณาใช้รหัส OTP ด้านล่างเพื่อยืนยันอีเมลของคุณ:</p>
        {{else}}
          <h2>Verify Your Email</h2>
          <p>Hello <strong>{{firstName}}</strong>,</p>
          <p>Thank you for registering with Thai Poker Association. Please use the OTP code below to verify your email:</p>
        {{/eq}}
      {{else}}
        <h2>Verify Your Email</h2>
        <p>Hello <strong>{{firstName}}</strong>,</p>
        <p>Thank you for registering with Thai Poker Association. Please use the OTP code below to verify your email:</p>
      {{/if}}

      <div class="otp-box">
        <div class="otp-code">{{otpCode}}</div>
        {{#if language}}
          {{#eq language "th"}}
            <p style="margin-top: 15px; color: #666;">รหัสนี้จะหมดอายุใน <strong>5 นาที</strong></p>
          {{else}}
            <p style="margin-top: 15px; color: #666;">This code will expire in <strong>5 minutes</strong></p>
          {{/eq}}
        {{else}}
          <p style="margin-top: 15px; color: #666;">This code will expire in <strong>5 minutes</strong></p>
        {{/if}}
      </div>

      {{#if language}}
        {{#eq language "th"}}
          <p><strong>หมายเหตุ:</strong></p>
          <ul>
            <li>กรุณาอย่าแชร์รหัสนี้กับผู้อื่น</li>
            <li>หากคุณไม่ได้ลงทะเบียน กรุณาเพิกเฉยต่ออีเมลนี้</li>
          </ul>
        {{else}}
          <p><strong>Important:</strong></p>
          <ul>
            <li>Do not share this code with anyone</li>
            <li>If you didn't register, please ignore this email</li>
          </ul>
        {{/eq}}
      {{else}}
        <p><strong>Important:</strong></p>
        <ul>
          <li>Do not share this code with anyone</li>
          <li>If you didn't register, please ignore this email</li>
        </ul>
      {{/if}}
    </div>

    <div class="footer">
      {{#if language}}
        {{#eq language "th"}}
          <p>© 2024 Thai Poker Association. สงวนลิขสิทธิ์.</p>
          <p>หากคุณมีคำถาม กรุณาติดต่อ support@thaipokerassociation.com</p>
        {{else}}
          <p>© 2024 Thai Poker Association. All rights reserved.</p>
          <p>If you have questions, please contact support@thaipokerassociation.com</p>
        {{/eq}}
      {{else}}
        <p>© 2024 Thai Poker Association. All rights reserved.</p>
        <p>If you have questions, please contact support@thaipokerassociation.com</p>
      {{/if}}
    </div>
  </div>
</body>
</html>
```

### Template 2: Registration Success Email

**Template Name**: `registration-success-th-en`

**Subject (Thai)**: `การลงทะเบียนสำเร็จ - Thai Poker Association`
**Subject (English)**: `Registration Successful - Thai Poker Association`

**HTML Template**:

```html
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
      <h1>✓ Registration Successful</h1>
    </div>

    <div class="content">
      {{#if language}}
        {{#eq language "th"}}
          <h2>ยินดีต้อนรับคุณ {{firstName}}!</h2>
          <p>การลงทะเบียนของคุณเสร็จสมบูรณ์แล้ว</p>
          <div class="info-box">
            <p><strong>หมายเลขการลงทะเบียน:</strong> {{registrationId}}</p>
            <p><strong>สถานะ:</strong> รอการอนุมัติ</p>
          </div>
          <p>เราจะตรวจสอบข้อมูลของคุณและแจ้งผลการอนุมัติภายใน 3-5 วันทำการ</p>
        {{else}}
          <h2>Welcome {{firstName}}!</h2>
          <p>Your registration has been completed successfully.</p>
          <div class="info-box">
            <p><strong>Registration ID:</strong> {{registrationId}}</p>
            <p><strong>Status:</strong> Pending Approval</p>
          </div>
          <p>We will review your information and notify you of the approval within 3-5 business days.</p>
        {{/eq}}
      {{else}}
        <h2>Welcome {{firstName}}!</h2>
        <p>Your registration has been completed successfully.</p>
        <div class="info-box">
          <p><strong>Registration ID:</strong> {{registrationId}}</p>
          <p><strong>Status:</strong> Pending Approval</p>
        </div>
        <p>We will review your information and notify you of the approval within 3-5 business days.</p>
      {{/if}}
    </div>

    <div class="footer">
      <p>© 2024 Thai Poker Association</p>
    </div>
  </div>
</body>
</html>
```

## Environment Variables

Add to `backend/.env`:

```bash
# SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@thaipokerassociation.com
SENDGRID_FROM_NAME=Thai Poker Association

# SendGrid Template IDs (after creating templates)
SENDGRID_OTP_TEMPLATE_ID=d-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_SUCCESS_TEMPLATE_ID=d-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Implementation

### 1. Install SendGrid Package

```bash
cd backend
npm install @sendgrid/mail
```

### 2. Create Email Service

Create `backend/services/emailService.js`:

```javascript
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send OTP verification email
 * @param {string} email - Recipient email address
 * @param {string} firstName - User's first name
 * @param {string} otpCode - 6-digit OTP code
 * @param {string} language - 'th' or 'en'
 */
async function sendOtpEmail(email, firstName, otpCode, language = 'en') {
  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: process.env.SENDGRID_FROM_NAME,
    },
    templateId: process.env.SENDGRID_OTP_TEMPLATE_ID,
    dynamicTemplateData: {
      firstName,
      otpCode,
      language,
    },
  };

  try {
    await sgMail.send(msg);
    console.log(`OTP email sent to ${email}`);
    return { success: true };
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
  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: process.env.SENDGRID_FROM_NAME,
    },
    templateId: process.env.SENDGRID_SUCCESS_TEMPLATE_ID,
    dynamicTemplateData: {
      firstName,
      registrationId,
      language,
    },
  };

  try {
    await sgMail.send(msg);
    console.log(`Success email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('SendGrid Error:', error.response?.body || error.message);
    throw new Error('Failed to send success email');
  }
}

/**
 * Send plain text OTP email (fallback if templates not set up)
 * @param {string} email - Recipient email address
 * @param {string} firstName - User's first name
 * @param {string} otpCode - 6-digit OTP code
 * @param {string} language - 'th' or 'en'
 */
async function sendOtpEmailPlain(email, firstName, otpCode, language = 'en') {
  const subject = language === 'th'
    ? 'รหัส OTP สำหรับการลงทะเบียน - Thai Poker Association'
    : 'Your OTP Code - Thai Poker Association';

  const text = language === 'th'
    ? `สวัสดีคุณ ${firstName},\n\nรหัส OTP ของคุณคือ: ${otpCode}\n\nรหัสนี้จะหมดอายุใน 5 นาที\n\nขอบคุณที่ลงทะเบียนกับ Thai Poker Association`
    : `Hello ${firstName},\n\nYour OTP code is: ${otpCode}\n\nThis code will expire in 5 minutes.\n\nThank you for registering with Thai Poker Association`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>${subject}</h2>
      <p>${language === 'th' ? 'สวัสดีคุณ' : 'Hello'} <strong>${firstName}</strong>,</p>
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
        <h1 style="color: #667eea; font-size: 36px; letter-spacing: 8px;">${otpCode}</h1>
      </div>
      <p>${language === 'th' ? 'รหัสนี้จะหมดอายุใน 5 นาที' : 'This code will expire in 5 minutes'}</p>
    </div>
  `;

  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: process.env.SENDGRID_FROM_NAME,
    },
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`OTP email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('SendGrid Error:', error.response?.body || error.message);
    throw new Error('Failed to send OTP email');
  }
}

module.exports = {
  sendOtpEmail,
  sendRegistrationSuccessEmail,
  sendOtpEmailPlain,
};
```

### 3. Update Server to Use Email Service

Update `backend/server.js`:

```javascript
const emailService = require('./services/emailService');

// Send OTP endpoint
app.post('/api/send-otp', async (req, res) => {
  const { email, language = 'en' } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP (in memory for now)
  otpStore[email] = {
    code: otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  };

  try {
    // Send OTP via SendGrid
    await emailService.sendOtpEmailPlain(email, 'User', otp, language);

    console.log(`OTP sent to ${email}: ${otp}`);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Failed to send OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP email' });
  }
});

// Registration endpoint
app.post('/api/register', upload.single('idCard'), async (req, res) => {
  // ... existing validation code ...

  try {
    // Save registration
    const registrationId = `TPA-${Date.now()}`;
    registrations[registrationId] = {
      ...req.body,
      idCardUrl,
      status: 'pending',
      createdAt: new Date(),
    };

    // Send success email
    const language = req.body.language || 'en';
    const firstName = language === 'th' ? req.body.firstNameTH : req.body.firstNameEN;

    await emailService.sendRegistrationSuccessEmail(
      req.body.email,
      firstName,
      registrationId,
      language
    );

    res.json({
      message: 'Registration successful',
      registrationId,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});
```

## Rate Limiting

Prevent abuse by implementing rate limiting:

```bash
npm install express-rate-limit
```

Update `backend/server.js`:

```javascript
const rateLimit = require('express-rate-limit');

// Rate limiter for OTP requests
const otpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Max 3 OTP requests per hour per IP
  message: 'Too many OTP requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to OTP endpoint
app.post('/api/send-otp', otpLimiter, async (req, res) => {
  // ... existing code ...
});
```

## Error Handling

### Common SendGrid Errors

```javascript
function handleSendGridError(error) {
  if (error.code === 401) {
    return 'Invalid API key';
  }
  if (error.code === 403) {
    return 'Sender email not verified';
  }
  if (error.code === 429) {
    return 'Rate limit exceeded';
  }
  if (error.code === 500) {
    return 'SendGrid service error';
  }
  return 'Failed to send email';
}
```

## Testing

### 1. Test Email Sending (Local)

```javascript
// backend/test-email.js
require('dotenv').config();
const emailService = require('./services/emailService');

async function testEmail() {
  try {
    // Test OTP email
    await emailService.sendOtpEmailPlain(
      'your-email@example.com',
      'John',
      '123456',
      'en'
    );
    console.log('✓ Test email sent successfully!');
  } catch (error) {
    console.error('✗ Test email failed:', error.message);
  }
}

testEmail();
```

Run test:
```bash
node backend/test-email.js
```

### 2. Check SendGrid Activity

1. Go to SendGrid Dashboard
2. Click "Activity" in left sidebar
3. View email delivery status
4. Check for bounces, blocks, or spam reports

## Production Checklist

- [ ] SendGrid API key added to Railway environment variables
- [ ] Sender email verified
- [ ] Domain authenticated (optional but recommended)
- [ ] Email templates created and tested
- [ ] Template IDs added to environment variables
- [ ] Rate limiting configured
- [ ] Error handling implemented
- [ ] Monitoring set up (SendGrid Activity Feed)
- [ ] Unsubscribe link added (if sending marketing emails)
- [ ] Email content reviewed for spam triggers

## Monitoring

### SendGrid Analytics

Monitor these metrics:
- **Delivery Rate**: Should be >95%
- **Open Rate**: Typical 15-25% for transactional emails
- **Bounce Rate**: Should be <5%
- **Spam Reports**: Should be near 0%

### Alerts

Set up alerts in SendGrid:
1. Go to Settings → Alerts
2. Configure alerts for:
   - High bounce rate
   - High spam report rate
   - API key usage limits

## Cost Estimation

**SendGrid Free Tier:**
- 100 emails/day
- Good for MVP and initial testing

**SendGrid Essentials ($19.95/month):**
- 50,000 emails/month
- Email API
- Basic templates

**SendGrid Pro ($89.95/month):**
- 100,000 emails/month
- Advanced templates
- Dedicated IP
- Subuser management

## Best Practices

1. **Use Templates**: Easier to manage and update
2. **Test Before Production**: Always test with real emails
3. **Monitor Deliverability**: Check bounce and spam rates regularly
4. **Keep Sender Reputation**: Don't send spam
5. **Use Proper Subject Lines**: Avoid spam trigger words
6. **Include Unsubscribe**: Required for marketing emails
7. **Authenticate Domain**: Improves deliverability
8. **Handle Bounces**: Remove invalid email addresses
9. **Rate Limit**: Prevent abuse
10. **Log Everything**: Track all email sending activities

## Troubleshooting

### Email Not Received

1. Check SendGrid Activity Feed
2. Check spam folder
3. Verify sender email is verified
4. Check email address is valid
5. Look for bounce or block in Activity Feed

### Template Not Working

1. Verify template ID is correct
2. Check dynamic template data matches template variables
3. Test template in SendGrid UI first
4. Check for syntax errors in Handlebars template

### API Key Invalid

1. Regenerate API key
2. Update environment variables
3. Redeploy application
4. Check API key has correct permissions

## Security Considerations

1. **Never commit API keys** - Use environment variables only
2. **Use HTTPS** - Always send emails over secure connections
3. **Validate email addresses** - Prevent injection attacks
4. **Rate limit** - Prevent abuse
5. **Sanitize inputs** - Clean user-provided data before sending
6. **Monitor usage** - Watch for unusual activity
7. **Rotate API keys** - Change keys periodically

## Next Steps

1. Create SendGrid account
2. Verify sender email
3. Generate API key
4. Add environment variables to Railway
5. Create email templates in SendGrid
6. Update backend code to use email service
7. Test email sending
8. Deploy to production
9. Monitor email delivery
