const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Configure CORS to allow frontend access
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [
        process.env.FRONTEND_URL,
        /\.vercel\.app$/,  // Allow all Vercel preview deployments
      ]
    : ['http://localhost:3000'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Mock database (in-memory)
const registrations = [];
const otpStore = {};

// Generate random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Send OTP (mock)
app.post('/api/send-otp', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Generate OTP
  const otp = generateOTP();
  otpStore[email] = {
    code: otp,
    expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
  };

  // Mock email sending - just log it
  console.log(`[MOCK EMAIL] Sending OTP to ${email}: ${otp}`);

  res.json({
    success: true,
    message: 'OTP sent successfully',
    // For demo purposes, always return the OTP (this is MVP/demo mode)
    // In production, remove this and integrate real email service
    otp: otp
  });
});

// Verify OTP
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const storedOTP = otpStore[email];

  if (!storedOTP) {
    return res.status(400).json({ error: 'OTP not found. Please request a new one.' });
  }

  if (Date.now() > storedOTP.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
  }

  if (storedOTP.code !== otp) {
    return res.status(400).json({ error: 'Invalid OTP. Please try again.' });
  }

  // OTP is valid
  delete otpStore[email];
  res.json({ success: true, message: 'OTP verified successfully' });
});

// Submit registration
app.post('/api/register', upload.single('idCard'), (req, res) => {
  try {
    const {
      firstNameTH,
      lastNameTH,
      firstNameEN,
      lastNameEN,
      birthDate,
      nationality,
      idNumber,
      address,
      phone,
      email,
      lineId,
      telegram,
      facebook,
      verified
    } = req.body;

    // Validate required fields
    if (!firstNameTH || !lastNameTH || !firstNameEN || !lastNameEN || !email || !verified) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (verified !== 'true') {
      return res.status(400).json({ error: 'Email must be verified first' });
    }

    const registration = {
      id: Date.now().toString(),
      firstNameTH,
      lastNameTH,
      firstNameEN,
      lastNameEN,
      birthDate,
      nationality,
      idNumber,
      address,
      phone,
      email,
      lineId,
      telegram,
      facebook,
      idCard: req.file ? req.file.filename : null,
      createdAt: new Date().toISOString()
    };

    registrations.push(registration);

    console.log('[REGISTRATION] New registration:', registration);

    res.json({
      success: true,
      message: 'Registration completed successfully',
      registrationId: registration.id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all registrations (for demo purposes)
app.get('/api/registrations', (req, res) => {
  res.json({ registrations });
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
