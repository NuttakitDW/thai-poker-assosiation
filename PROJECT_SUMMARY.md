# Thai Poker Association Registration System - MVP

## Project Overview

A complete MVP registration website for the Thai Poker Association with bilingual support (Thai/English), email verification via OTP, and document upload functionality.

## Features Implemented

### 1. Bilingual Support
- Full Thai and English translations
- Language toggle button in header
- All form fields and messages translated

### 2. Multi-Step Registration Process

#### Step 1: Personal Information
- Name in Thai (ชื่อ-นามสกุล)
- Name in English
- Date of Birth
- Nationality
- ID Card / Passport Number
- Address
- Phone Number
- Email (required)
- Social Media (Line ID, Telegram, Facebook)

#### Step 2: Email Verification
- OTP sent to email
- 6-digit code verification
- Mock implementation shows OTP in console and alert for demo
- Resend OTP functionality

#### Step 3: Document Upload
- ID Card / Passport upload
- File type validation (JPG, PNG, PDF)
- File size limit (5MB max)
- Drag and drop interface
- File preview

#### Step 4: Success Confirmation
- Registration ID display
- Summary of submitted information
- Option to register new member

### 3. Technical Features
- Responsive design (mobile-friendly)
- Form validation
- Error handling
- Loading states
- Progress indicator
- Mock backend API

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **File Upload**: Multer
- **CORS**: Enabled for local development

## Project Structure

```
thai-poker-assoiation/
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── PersonalInfoStep.tsx
│   │   │   ├── EmailVerificationStep.tsx
│   │   │   ├── DocumentUploadStep.tsx
│   │   │   └── SuccessStep.tsx
│   │   ├── page.tsx (main registration page)
│   │   ├── translations.ts (bilingual content)
│   │   └── layout.tsx
│   ├── public/
│   ├── package.json
│   └── .env.local
├── backend/
│   ├── server.js (Express API)
│   ├── uploads/ (uploaded files)
│   ├── package.json
│   └── .env
├── README.md
├── QUICKSTART.md
├── PROJECT_SUMMARY.md
├── vercel.json
├── .gitignore
└── package.json (root)
```

## API Endpoints

### Backend (http://localhost:3001/api)

1. **GET /api/health**
   - Health check endpoint
   - Returns: `{"status": "ok", "message": "Server is running"}`

2. **POST /api/send-otp**
   - Send OTP to email
   - Body: `{"email": "user@example.com"}`
   - Returns: `{"success": true, "message": "OTP sent successfully", "otp": "123456"}`
   - Note: OTP is returned in development mode for testing

3. **POST /api/verify-otp**
   - Verify OTP code
   - Body: `{"email": "user@example.com", "otp": "123456"}`
   - Returns: `{"success": true, "message": "OTP verified successfully"}`

4. **POST /api/register**
   - Submit complete registration
   - Content-Type: multipart/form-data
   - Includes all form fields + file upload
   - Returns: `{"success": true, "message": "Registration completed successfully", "registrationId": "..."}`

5. **GET /api/registrations**
   - View all registrations (for demo purposes)
   - Returns: Array of all registration data

## How to Run

### Quick Start

1. **Install dependencies:**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   cd ..
   ```

2. **Run both servers:**
   ```bash
   npm run dev
   ```
   This starts:
   - Backend on http://localhost:3001
   - Frontend on http://localhost:3000

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Testing the Complete Flow

1. Fill in personal information (at minimum: name in Thai, name in English, email)
2. Click "Next" to proceed to email verification
3. Click "Send OTP" - OTP will appear in browser console and alert
4. Enter the OTP code shown
5. Click "Verify OTP"
6. Upload a sample image or PDF file for ID card
7. Click "Submit"
8. View registration success page with registration ID

## Demo Features

### Mock OTP System
- OTP codes are generated randomly (6 digits)
- In development mode, OTP is shown in:
  - Browser console (look for "DEMO OTP CODE")
  - Alert popup
  - API response (for testing)
- OTP expires after 5 minutes
- Can resend OTP if needed

### Mock File Storage
- Files are uploaded to `backend/uploads/` directory
- Files are stored during demo session
- File names are timestamped to prevent collisions

### Mock Database
- All registration data stored in memory (JavaScript array)
- Data persists only while server is running
- Use GET /api/registrations to view all submissions

## Deployment Considerations

### Frontend (Vercel)
1. Deploy to Vercel with `vercel` command
2. Update environment variable `NEXT_PUBLIC_API_URL` to production backend URL

### Backend
Options for deployment:
- **Railway**: Easy Node.js deployment
- **Render**: Free tier available
- **Heroku**: Traditional option
- **DigitalOcean App Platform**: Scalable option

After deploying backend, update the frontend environment variable.

## Security Considerations for Production

**IMPORTANT**: This is an MVP with mock functionality. For production:

1. **Email**: Replace mock OTP with real email service (SendGrid, AWS SES, etc.)
2. **Database**: Use real database (PostgreSQL, MongoDB, etc.)
3. **File Storage**: Use cloud storage (AWS S3, Google Cloud Storage, etc.)
4. **Authentication**: Add admin authentication
5. **Rate Limiting**: Add rate limiting to prevent abuse
6. **Input Validation**: Enhance server-side validation
7. **HTTPS**: Ensure all communications use HTTPS
8. **Environment Variables**: Properly secure all API keys and secrets
9. **File Scanning**: Add virus/malware scanning for uploads
10. **Data Encryption**: Encrypt sensitive data at rest

## What's Working (MVP Demo)

✅ Complete registration flow from start to finish
✅ Bilingual interface (Thai/English)
✅ Form validation
✅ Email verification with OTP
✅ File upload functionality
✅ Responsive design
✅ Success confirmation
✅ Mock backend API
✅ All required form fields from specification
✅ Progress indicator
✅ Error handling

## Next Steps for Production

- [ ] Integrate real email service
- [ ] Set up production database
- [ ] Implement cloud file storage
- [ ] Add admin dashboard
- [ ] Add member login
- [ ] Email templates (HTML)
- [ ] PDF generation for registration confirmation
- [ ] Payment integration (if needed)
- [ ] Member ID generation system
- [ ] Backend validation improvements
- [ ] API authentication
- [ ] Rate limiting
- [ ] Monitoring and logging

## Contact & Support

For questions or issues, please refer to:
- README.md - Full documentation
- QUICKSTART.md - Quick start guide
- This file - Project overview

---

**Built with**: Next.js, TypeScript, Tailwind CSS, Express.js, Node.js
**Version**: 1.0.0 MVP
**Date**: October 2025
