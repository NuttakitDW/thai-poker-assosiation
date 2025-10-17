# Quick Start Guide

## 🚀 Running the Application

### Option 1: Run Both Servers Together (Recommended)

From the root directory:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:3001
- Frontend server on http://localhost:3000

### Option 2: Run Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 📝 Testing the Registration Flow

1. Open http://localhost:3000 in your browser

2. **Step 1: Personal Information**
   - Fill in your name in both Thai and English
   - Add your email address
   - Fill in other optional fields
   - Click "Next"

3. **Step 2: Email Verification**
   - Click "Send OTP" button
   - An alert will show the OTP code (also visible in browser console)
   - Example OTP: `123456`
   - Enter the OTP code in the input field
   - Click "Verify OTP"

4. **Step 3: Document Upload**
   - Upload a sample ID card image (JPG, PNG, or PDF)
   - Click "Submit"

5. **Step 4: Success**
   - View your registration confirmation
   - See your registration ID

## 🎯 Demo Features

- **Language Toggle**: Click the language button in the header to switch between Thai and English
- **OTP Display**: In demo mode, OTP codes are shown in browser console and alert
- **Mock Data**: All data is stored in memory only
- **File Upload**: Files are uploaded but not permanently stored

## 🧪 Sample Test Data

**Thai Name:**
- ชื่อ: สมชาย
- นามสกุล: ใจดี

**English Name:**
- First Name: Somchai
- Last Name: Jaidee

**Email:** test@example.com

**OTP:** Will be shown when you click "Send OTP"

## 🔍 Troubleshooting

**Backend not connecting:**
- Make sure backend is running on port 3001
- Check if another service is using port 3001

**Frontend not loading:**
- Make sure frontend is running on port 3000
- Clear browser cache and reload

**OTP not working:**
- Check browser console for the OTP code
- Make sure you're entering exactly 6 digits

## 📱 Browser Console

Open browser console (F12) to see:
- OTP codes
- API responses
- Debug information
