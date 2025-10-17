const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const emailService = require('./services/emailService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

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

// Generate random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Rate limiter for OTP requests - max 3 requests per hour per IP
const otpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Max 3 OTP requests per hour
  message: { error: 'Too many OTP requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Send OTP (with rate limiting)
app.post('/api/send-otp', otpLimiter, async (req, res) => {
  try {
    const { email, language = 'en' } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save OTP to database
    await prisma.otpCode.create({
      data: {
        email,
        code: otp,
        expiresAt,
      }
    });

    // Send OTP via email (SendGrid or mock)
    try {
      const result = await emailService.sendOtpEmail(email, 'User', otp, language);

      // For demo purposes, return OTP only in mock mode or development
      const response = {
        success: true,
        message: 'OTP sent successfully',
      };

      // In development or mock mode, include OTP in response
      if (result.mode === 'mock' || process.env.NODE_ENV === 'development') {
        response.otp = otp;
      }

      res.json(response);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Still return success since OTP is saved in database
      // In production, you might want to handle this differently
      res.json({
        success: true,
        message: 'OTP generated but email delivery may be delayed',
        otp: process.env.NODE_ENV === 'development' ? otp : undefined
      });
    }
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    // Find the most recent OTP for this email that hasn't been verified
    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        email,
        code: otp,
        verified: false,
        expiresAt: {
          gte: new Date(), // Not expired
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!otpRecord) {
      return res.status(400).json({ error: 'Invalid or expired OTP. Please request a new one.' });
    }

    // Mark OTP as verified
    await prisma.otpCode.update({
      where: { id: otpRecord.id },
      data: {
        verified: true,
        verifiedAt: new Date(),
      }
    });

    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

// Submit registration
app.post('/api/register', upload.single('idCard'), async (req, res) => {
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

    // Check if email already registered
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user in database
    const user = await prisma.user.create({
      data: {
        firstNameTh: firstNameTH,
        lastNameTh: lastNameTH,
        firstNameEn: firstNameEN,
        lastNameEn: lastNameEN,
        email,
        phone: phone || null,
        birthDate: birthDate ? new Date(birthDate) : null,
        nationality: nationality || null,
        idNumber: idNumber || null,
        address: address || null,
        lineId: lineId || null,
        telegram: telegram || null,
        facebook: facebook || null,
        idCardUrl: req.file ? `/uploads/${req.file.filename}` : null,
        emailVerified: true,
        status: 'pending',
      }
    });

    console.log('[REGISTRATION] New registration:', user);

    // Send registration success email
    const language = req.body.language || 'en';
    const firstName = language === 'th' ? firstNameTH : firstNameEN;

    try {
      await emailService.sendRegistrationSuccessEmail(
        email,
        firstName,
        user.id,
        language
      );
    } catch (emailError) {
      console.error('Failed to send success email:', emailError);
      // Don't fail registration if email fails
    }

    res.json({
      success: true,
      message: 'Registration completed successfully',
      registrationId: user.id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all registrations (for demo purposes)
app.get('/api/registrations', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json({ registrations: users });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log('Database connected via Prisma');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing server gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
