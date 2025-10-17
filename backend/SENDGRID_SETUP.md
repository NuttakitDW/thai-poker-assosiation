# SendGrid Email Setup Guide

## Quick Start

The application is configured to work in **two modes**:

1. **Mock Mode** (Default) - Emails are printed to console
2. **SendGrid Mode** - Real emails sent via SendGrid

## Current Setup

Currently running in **Mock Mode** because `SENDGRID_API_KEY` is not configured.

### Mock Mode Features:
- OTP codes are printed to console
- OTP codes are returned in API response (development only)
- No actual emails are sent
- Perfect for development and testing

## Setting Up SendGrid (Production)

### Step 1: Create SendGrid Account

1. Go to [SendGrid](https://sendgrid.com)
2. Sign up for a free account
   - Free tier: 100 emails/day
   - Perfect for testing and small deployments

### Step 2: Verify Sender Email

1. Log in to SendGrid dashboard
2. Go to **Settings → Sender Authentication**
3. Click **"Verify a Single Sender"**
4. Enter your email (e.g., `noreply@thaipokerassociation.com`)
5. Fill in sender details
6. Check your email and verify

### Step 3: Generate API Key

1. Go to **Settings → API Keys**
2. Click **"Create API Key"**
3. Name: `Thai Poker Association - Production`
4. Permissions: **"Full Access"** (or "Mail Send" for security)
5. Click **"Create & View"**
6. **⚠️ COPY THE API KEY NOW** (you'll only see it once!)

### Step 4: Add to Environment Variables

**For Local Development:**

Update `backend/.env`:
```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@thaipokerassociation.com
SENDGRID_FROM_NAME=Thai Poker Association
```

**For Railway (Production):**

1. Go to Railway dashboard
2. Click your backend service
3. Go to **Variables** tab
4. Add these variables:
   - `SENDGRID_API_KEY`: Your API key from Step 3
   - `SENDGRID_FROM_EMAIL`: Your verified sender email
   - `SENDGRID_FROM_NAME`: Thai Poker Association

### Step 5: Test Email Sending

Restart your server and test:

```bash
# The server will automatically switch to SendGrid mode
# when SENDGRID_API_KEY is detected

# Check logs for:
# ✓ OTP email sent to user@example.com
# ✓ Success email sent to user@example.com
```

## Email Templates

### OTP Verification Email

**Languages Supported:** Thai (th) and English (en)

**Features:**
- Beautiful gradient header
- Large, easy-to-read OTP code
- 5-minute expiration notice
- Security warnings
- Mobile responsive

### Registration Success Email

**Languages Supported:** Thai (th) and English (en)

**Features:**
- Success confirmation
- Registration ID
- Status information
- Next steps

## Rate Limiting

**Protection enabled:**
- Maximum 3 OTP requests per hour per IP address
- Prevents abuse and spam
- Returns error: "Too many OTP requests. Please try again later."

## Monitoring

### Check Email Delivery

1. Go to SendGrid dashboard
2. Click **"Activity"** in sidebar
3. View delivery status:
   - ✓ Delivered
   - ⚠️ Bounced
   - ⚠️ Blocked
   - ⚠️ Spam Report

### Important Metrics

- **Delivery Rate**: Should be >95%
- **Bounce Rate**: Should be <5%
- **Spam Reports**: Should be near 0%

## Troubleshooting

### Email Not Received

1. **Check SendGrid Activity Feed**
   - Go to Activity tab
   - Search for recipient email
   - Check delivery status

2. **Check Spam Folder**
   - SendGrid emails may initially go to spam
   - Ask users to mark as "Not Spam"

3. **Verify Sender Email**
   - Make sure sender email is verified in SendGrid
   - Check Settings → Sender Authentication

4. **Check API Key**
   - Verify API key is correct
   - Check API key has "Mail Send" permission

### Common Errors

**Error: "Unauthorized"**
- API key is invalid or not set
- Regenerate API key and update environment variables

**Error: "Sender email not verified"**
- Complete sender verification in SendGrid
- Wait for verification email

**Error: "Rate limit exceeded"**
- Too many emails sent too quickly
- Check SendGrid plan limits
- Wait or upgrade plan

## Cost & Limits

### SendGrid Free Tier
- **100 emails/day**
- Good for: MVP, testing, small user base
- Cost: $0

### SendGrid Essentials ($19.95/month)
- **50,000 emails/month**
- Email API
- Basic templates
- Good for: Growing applications

### SendGrid Pro ($89.95/month)
- **100,000 emails/month**
- Advanced features
- Dedicated IP
- Priority support

## Security Best Practices

1. **Never commit API keys** - Always use environment variables
2. **Rotate keys regularly** - Change API keys every 3-6 months
3. **Use minimum permissions** - "Mail Send" only if possible
4. **Monitor usage** - Watch for unusual activity
5. **Rate limit** - Already implemented (3 per hour)

## Development vs Production

**Development (Mock Mode):**
- `SENDGRID_API_KEY` not set
- OTP codes in console
- OTP codes in API response
- No real emails sent

**Production (SendGrid Mode):**
- `SENDGRID_API_KEY` set
- Real emails sent
- OTP codes NOT in API response
- Full email delivery

## Support

- **SendGrid Docs**: https://docs.sendgrid.com
- **SendGrid Support**: https://support.sendgrid.com
- **API Reference**: https://docs.sendgrid.com/api-reference

## Next Steps

After setting up SendGrid:

1. ✅ Verify sender email
2. ✅ Generate API key
3. ✅ Add to Railway environment variables
4. ✅ Test email sending
5. ✅ Monitor delivery rates
6. 📊 Set up alerts for bounces/spam
7. 📈 Scale as needed
