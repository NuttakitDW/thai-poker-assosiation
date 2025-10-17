# Quick Vercel Deployment - 5 Minutes ⚡

## Step 1: Deploy Backend (2 minutes)

### Using Railway (Easiest)

1. Go to **https://railway.app** and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will detect your app automatically
5. Click **"Deploy"**
6. Once deployed, click on your service → **"Settings"** → Copy the URL
   - Example: `https://thai-poker-backend.up.railway.app`

That's it! Backend is live. ✅

## Step 2: Deploy Frontend to Vercel (3 minutes)

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Go to frontend directory
cd /Users/nuttakit/project/thai-poker-assoiation/frontend

# Login to Vercel
vercel login

# Deploy
vercel

# Add your backend URL as environment variable
vercel env add NEXT_PUBLIC_API_URL

# When prompted, paste your Railway URL:
# https://thai-poker-backend.up.railway.app

# Select Production and Preview: Y
# Select Development: N

# Redeploy with environment variable
vercel --prod
```

Done! Your site is live at the URL shown. ✅

### Option B: Using Vercel Dashboard (No CLI needed)

1. Go to **https://vercel.com/new**
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js (auto-detected)
4. Add Environment Variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your Railway URL (e.g., `https://thai-poker-backend.up.railway.app`)
5. Click **"Deploy"**

Done! ✅

## Step 3: Test Your Site

1. Open your Vercel URL
2. Try the registration flow:
   - Fill personal info
   - Get OTP (check browser console)
   - Upload document
   - Complete registration

## 🎯 Important URLs

After deployment, you'll have:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.railway.app`

## 🔧 Update Backend URL Later

If you need to change the backend URL:

```bash
cd frontend
vercel env rm NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_API_URL production
# Enter new URL
vercel --prod
```

## ⚠️ Demo Mode Notice

This deployment uses mock features:
- **OTP**: Shows in browser console (not sent via email)
- **Database**: In-memory (data lost on restart)
- **Files**: Stored temporarily

For production use, you'll need to integrate:
- Real email service (SendGrid, AWS SES)
- Database (PostgreSQL, MongoDB)
- Cloud storage (AWS S3)

See **DEPLOYMENT_GUIDE.md** for full production setup.

## 🆘 Troubleshooting

**Frontend can't connect to backend?**
- Verify environment variable: `vercel env ls`
- Check backend is running: Visit Railway URL in browser
- Redeploy: `vercel --prod`

**OTP not working?**
- Open browser console (F12)
- OTP will be displayed there
- This is expected in demo mode

## 📚 Next Steps

- Add custom domain in Vercel dashboard
- Set up production email service
- Add real database
- Monitor analytics in Vercel dashboard

---

**Total Time**: ~5 minutes
**Cost**: FREE (both Vercel and Railway have free tiers)

Enjoy your live registration system! 🎉
