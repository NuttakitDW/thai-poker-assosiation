# Deployment Checklist ✅

Use this checklist to deploy your Thai Poker Association Registration System.

## Pre-Deployment

- [ ] Code is tested locally and working
- [ ] All environment variables are documented
- [ ] Git repository is up to date
- [ ] `.gitignore` excludes sensitive files

## Backend Deployment (Railway)

- [ ] Sign up at https://railway.app
- [ ] Create new project from GitHub repo
- [ ] Set root directory to `backend`
- [ ] Add environment variables:
  - [ ] `PORT=3001`
  - [ ] `NODE_ENV=production`
  - [ ] `FRONTEND_URL=https://your-app.vercel.app` (update after frontend deployment)
- [ ] Deploy backend
- [ ] Copy backend URL (e.g., `https://thai-poker-backend.up.railway.app`)
- [ ] Test backend health: Visit `https://your-backend-url/api/health`
- [ ] Verify response: `{"status":"ok","message":"Server is running"}`

## Frontend Deployment (Vercel)

### Option 1: Using Vercel CLI

- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login: `vercel login`
- [ ] Navigate to frontend: `cd frontend`
- [ ] Deploy: `vercel`
- [ ] Add environment variable:
  ```bash
  vercel env add NEXT_PUBLIC_API_URL
  ```
- [ ] Enter your backend URL when prompted
- [ ] Select Production and Preview: Y
- [ ] Deploy to production: `vercel --prod`
- [ ] Copy frontend URL

### Option 2: Using Vercel Dashboard

- [ ] Go to https://vercel.com/new
- [ ] Import GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Add environment variable:
  - Name: `NEXT_PUBLIC_API_URL`
  - Value: Your Railway backend URL
  - Environment: Production
- [ ] Click Deploy
- [ ] Wait for deployment to complete
- [ ] Copy frontend URL

## Post-Deployment

- [ ] Update backend `FRONTEND_URL` environment variable with actual Vercel URL
- [ ] Redeploy backend (Railway will auto-redeploy)
- [ ] Open frontend URL in browser
- [ ] Test complete registration flow:
  - [ ] Fill personal information
  - [ ] Switch language (Thai/English)
  - [ ] Request OTP
  - [ ] Verify OTP appears in browser console
  - [ ] Enter OTP and verify
  - [ ] Upload sample document
  - [ ] Complete registration
  - [ ] Verify success page appears
- [ ] Test on mobile device
- [ ] Share URL with team for testing

## Optional: Custom Domain

- [ ] Purchase domain (e.g., `register.thaipoker.com`)
- [ ] In Vercel dashboard → Settings → Domains
- [ ] Add custom domain
- [ ] Update DNS records as instructed
- [ ] Wait for DNS propagation (up to 48 hours)
- [ ] Update backend `FRONTEND_URL` to custom domain
- [ ] Test with custom domain

## Monitoring Setup

- [ ] Enable Vercel Analytics (Dashboard → Analytics)
- [ ] Check Railway metrics regularly
- [ ] Monitor error logs in both platforms
- [ ] Set up uptime monitoring (optional: UptimeRobot)

## Share with Stakeholders

- [ ] Production URL: `_________________________`
- [ ] Demo credentials/test data provided
- [ ] Known limitations documented
- [ ] Feedback collection method set up

## Production Readiness (Future)

For full production launch, you'll need:

- [ ] Real email service (SendGrid, AWS SES)
- [ ] Production database (PostgreSQL, MongoDB)
- [ ] Cloud file storage (AWS S3)
- [ ] SSL certificate (automatic with Vercel)
- [ ] Rate limiting
- [ ] Input validation & sanitization
- [ ] Error tracking (Sentry)
- [ ] Backup strategy
- [ ] Privacy policy & Terms of service
- [ ] GDPR compliance (if applicable)

## Troubleshooting

### Frontend can't connect to backend
- [ ] Verify `NEXT_PUBLIC_API_URL` is set correctly
- [ ] Check backend is running (visit health endpoint)
- [ ] Verify CORS settings in backend
- [ ] Check browser console for errors
- [ ] Redeploy frontend: `vercel --prod`

### OTP not working
- [ ] Check browser console for OTP code
- [ ] Verify backend `/api/send-otp` endpoint works
- [ ] Test with curl: `curl -X POST https://your-backend/api/send-otp -H "Content-Type: application/json" -d '{"email":"test@test.com"}'`

### File upload failing
- [ ] Check file size (max 5MB)
- [ ] Verify file type (JPG, PNG, PDF only)
- [ ] Check backend logs for errors
- [ ] Verify uploads directory exists

## Deployment URLs

Record your URLs here:

- **Frontend (Vercel)**: `_________________________`
- **Backend (Railway)**: `_________________________`
- **Custom Domain** (if any): `_________________________`

## Deployment Date

- **First Deployment**: `_________________________`
- **Latest Update**: `_________________________`

---

**Status**: ☐ Not Started | ☐ In Progress | ☐ Completed

**Deployed By**: `_________________________`

**Notes**:
```
(Add any deployment notes, issues encountered, or special configurations here)
```
