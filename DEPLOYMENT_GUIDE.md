# Deployment Guide - Thai Poker Association Registration System

## Overview

This guide will help you deploy your registration system to production. We'll deploy:
- **Frontend** → Vercel (free tier available)
- **Backend** → Railway/Render (free tier available)

## 🚀 Step-by-Step Deployment

### Part 1: Deploy Backend First

We need to deploy the backend first to get its URL, which we'll use for the frontend.

#### Option A: Deploy to Railway (Recommended)

Railway offers a generous free tier and is very easy to use.

1. **Sign up for Railway**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select your repository

3. **Configure Backend**
   - Railway will auto-detect your Node.js app
   - Set the root directory to `backend`
   - Add environment variables:
     ```
     PORT=3001
     NODE_ENV=production
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://your-app.railway.app`)

#### Option B: Deploy to Render

1. **Sign up for Render**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     ```
     Name: thai-poker-backend
     Root Directory: backend
     Environment: Node
     Build Command: npm install
     Start Command: npm start
     ```

3. **Add Environment Variables**
   ```
   PORT=3001
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Copy your backend URL (e.g., `https://thai-poker-backend.onrender.com`)

### Part 2: Deploy Frontend to Vercel

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to Frontend Directory**
   ```bash
   cd /Users/nuttakit/project/thai-poker-assoiation/frontend
   ```

4. **Deploy to Vercel**
   ```bash
   vercel
   ```

5. **Follow the Prompts**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? `thai-poker-registration`
   - In which directory is your code located? `./`
   - Want to override the settings? **N**

6. **Add Environment Variable**

   After initial deployment, add your backend URL:

   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   ```

   When prompted, enter your backend URL:
   ```
   https://your-backend-url.railway.app
   ```

   Select:
   - Production: **Y**
   - Preview: **Y**
   - Development: **N** (we use localhost for dev)

7. **Redeploy with Environment Variable**
   ```bash
   vercel --prod
   ```

## 🎯 Alternative: Deploy via Vercel Dashboard

### Frontend Deployment

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import Repository**
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

4. **Environment Variables**
   Click "Environment Variables" and add:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://your-backend-url.railway.app
   Environment: Production
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (usually 2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

## 📋 Post-Deployment Checklist

After deployment, test these features:

- [ ] Open your Vercel URL
- [ ] Test language switching (Thai/English)
- [ ] Fill out Step 1 (Personal Information)
- [ ] Request OTP on Step 2
- [ ] Check if OTP is generated (check browser console)
- [ ] Verify OTP
- [ ] Upload document on Step 3
- [ ] Submit registration
- [ ] Verify success page appears

## 🔧 Environment Variables Summary

### Frontend (Vercel)
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

### Backend (Railway/Render)
```bash
PORT=3001
NODE_ENV=production
```

## 🌐 Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `register.thaipoker.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

### Update Backend CORS

Update `backend/server.js` to allow your domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-project.vercel.app',
    'https://register.thaipoker.com'
  ]
}));
```

Redeploy backend after this change.

## 🔍 Troubleshooting

### Frontend Can't Connect to Backend

**Issue**: API calls failing with CORS or connection errors

**Solutions**:
1. Check if backend is running (visit backend URL in browser)
2. Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
3. Redeploy frontend after adding environment variable
4. Check backend CORS settings

### OTP Not Working

**Issue**: OTP not being generated or verified

**Solutions**:
1. Check backend logs in Railway/Render dashboard
2. Verify backend `/api/send-otp` endpoint works (test with curl)
3. Check browser console for errors
4. For production, you'll need to integrate real email service

### File Upload Failing

**Issue**: Document upload not working

**Solutions**:
1. Check file size (must be < 5MB)
2. Check file type (JPG, PNG, PDF only)
3. Verify backend storage is configured
4. For production, consider using cloud storage (AWS S3, Cloudinary)

### Build Failures on Vercel

**Issue**: Deployment fails during build

**Solutions**:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Test build locally: `cd frontend && npm run build`
4. Check Node.js version compatibility

## 📊 Monitoring Your Deployment

### Vercel Analytics
- Go to your project → "Analytics"
- View page views, performance metrics
- Monitor errors and warnings

### Backend Monitoring
- **Railway**: Check "Metrics" tab for CPU, memory usage
- **Render**: Check "Metrics" and "Logs" tabs

## 🔒 Production Considerations

### Before Going Live

1. **Email Integration**
   - Replace mock OTP with real email service (SendGrid, AWS SES)
   - Update backend to send actual emails

2. **Database**
   - Set up PostgreSQL or MongoDB
   - Migrate from in-memory storage
   - Add data persistence

3. **File Storage**
   - Use cloud storage (AWS S3, Google Cloud Storage)
   - Don't store files on server filesystem

4. **Security**
   - Add rate limiting
   - Implement CAPTCHA on forms
   - Add input sanitization
   - Enable HTTPS everywhere
   - Add helmet.js for security headers

5. **Monitoring**
   - Set up error tracking (Sentry)
   - Add logging (Winston, Pino)
   - Monitor uptime (UptimeRobot)

## 💰 Cost Estimates

### Free Tier Limits

**Vercel (Frontend)**
- ✅ Free for hobby projects
- Unlimited deployments
- 100GB bandwidth/month
- Custom domain supported

**Railway (Backend)**
- ✅ $5 free credit/month
- ~500 hours execution time
- Good for MVP/testing

**Render (Backend Alternative)**
- ✅ Free tier available
- 750 hours/month
- Spins down after inactivity

### When You Need to Upgrade

- High traffic (>100k requests/month)
- Need 24/7 uptime
- Production database
- Email service (SendGrid: $15/mo for 40k emails)
- Cloud storage (AWS S3: pay per use, usually <$5/mo)

## 🆘 Need Help?

Common commands for quick fixes:

```bash
# Redeploy frontend
cd frontend
vercel --prod

# Check Vercel environment variables
vercel env ls

# View deployment logs
vercel logs

# Pull environment variables locally
vercel env pull
```

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎉 Quick Deploy Commands

For fastest deployment:

```bash
# 1. Deploy frontend to Vercel
cd frontend
vercel --prod

# 2. Set backend URL
vercel env add NEXT_PUBLIC_API_URL production

# 3. Redeploy with environment variable
vercel --prod
```

Your registration system will be live! 🚀
