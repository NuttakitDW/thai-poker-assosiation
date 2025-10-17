# Thai Poker Association - Registration System

A bilingual (Thai/English) registration website built with Next.js and Node.js.

## Features

- Multi-step registration form
- Bilingual support (Thai/English)
- Email verification with OTP
- ID card/passport upload
- Mock flow for demonstration
- Responsive design with Tailwind CSS

## Project Structure

```
thai-poker-assoiation/
├── frontend/          # Next.js frontend application
├── backend/           # Node.js/Express backend API
├── vercel.json        # Vercel deployment configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Install backend dependencies:
```bash
cd ../backend
npm install
```

### Running Locally

1. Start the backend server (from the backend directory):
```bash
npm start
```
The backend will run on http://localhost:3001

2. In a new terminal, start the frontend (from the frontend directory):
```bash
npm run dev
```
The frontend will run on http://localhost:3000

3. Open http://localhost:3000 in your browser

## Demo Mode

This is a demonstration version with mock functionality:

- **OTP Verification**: When you request an OTP, it will be displayed in:
  - Browser console
  - Alert popup (in development mode)
  - You can use the displayed OTP to verify your email

- **File Upload**: Files are uploaded to the backend but not permanently stored

- **Registration**: All registration data is stored in memory and will be lost when the server restarts

## Registration Flow

1. **Personal Information** - Enter your personal details in both Thai and English
2. **Email Verification** - Verify your email with OTP code
3. **Document Upload** - Upload your ID card or passport
4. **Success** - View your registration confirmation

## Deployment to Vercel

**📖 See detailed deployment instructions in:**
- **VERCEL_QUICKSTART.md** - Quick 5-minute deployment guide
- **DEPLOYMENT_GUIDE.md** - Complete deployment documentation with troubleshooting

### Quick Deploy Summary

1. **Deploy Backend** (Railway/Render - FREE):
   - Go to https://railway.app
   - Deploy from GitHub repo
   - Copy your backend URL

2. **Deploy Frontend** (Vercel - FREE):
   ```bash
   cd frontend
   vercel
   vercel env add NEXT_PUBLIC_API_URL
   # Enter your backend URL
   vercel --prod
   ```

Done! Your site is live. ✅

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

For production, update this to your deployed backend URL.

### Backend (.env)
```
PORT=3001
NODE_ENV=development
```

## Form Fields

### Personal Information
- First Name & Last Name (Thai)
- First Name & Last Name (English)
- Date of Birth
- Nationality
- ID Card / Passport Number
- Address
- Phone Number
- Email
- Line ID / Telegram / Facebook

### KYC Documents
- ID Card / Passport Copy (JPG, PNG, or PDF, max 5MB)

## Technologies Used

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- React Hooks

### Backend
- Node.js
- Express.js
- Multer (file upload)
- CORS

## License

ISC
