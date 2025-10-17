# Database Specification - Thai Poker Association

## Overview
PostgreSQL database to store user registration data and OTP verification records.

## Technology Stack
- **Database**: PostgreSQL 15+
- **ORM**: Prisma (recommended) or raw SQL
- **Hosting**: Railway PostgreSQL addon (free tier available)

## Database Schema

### Table: `users`
Stores member registration information.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Personal Information (Thai)
  first_name_th VARCHAR(255) NOT NULL,
  last_name_th VARCHAR(255) NOT NULL,

  -- Personal Information (English)
  first_name_en VARCHAR(255) NOT NULL,
  last_name_en VARCHAR(255) NOT NULL,

  -- Contact Information
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),

  -- Identity Information
  birth_date DATE,
  nationality VARCHAR(100),
  id_number VARCHAR(50),
  address TEXT,

  -- Social Media
  line_id VARCHAR(100),
  telegram VARCHAR(100),
  facebook VARCHAR(255),

  -- Document
  id_card_url TEXT,  -- URL to uploaded ID card image

  -- Status
  email_verified BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'pending',  -- pending, approved, rejected

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_email (email),
  INDEX idx_created_at (created_at),
  INDEX idx_status (status)
);
```

### Table: `otp_codes`
Stores OTP codes for email verification (with expiration).

```sql
CREATE TABLE otp_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  email VARCHAR(255) NOT NULL,
  code VARCHAR(6) NOT NULL,

  -- Expiration
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,

  -- Verification Status
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP WITH TIME ZONE,

  -- Attempts tracking
  attempts INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_email_code (email, code),
  INDEX idx_expires_at (expires_at)
);
```

### Table: `admin_users` (Optional - for future admin dashboard)
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,

  role VARCHAR(50) DEFAULT 'admin',  -- admin, super_admin

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP WITH TIME ZONE,

  INDEX idx_email (email)
);
```

## Prisma Schema (Recommended)

Create `backend/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(uuid())

  // Personal Information (Thai)
  firstNameTh   String   @map("first_name_th")
  lastNameTh    String   @map("last_name_th")

  // Personal Information (English)
  firstNameEn   String   @map("first_name_en")
  lastNameEn    String   @map("last_name_en")

  // Contact Information
  email         String   @unique
  phone         String?

  // Identity Information
  birthDate     DateTime? @map("birth_date") @db.Date
  nationality   String?
  idNumber      String?  @map("id_number")
  address       String?  @db.Text

  // Social Media
  lineId        String?  @map("line_id")
  telegram      String?
  facebook      String?

  // Document
  idCardUrl     String?  @map("id_card_url") @db.Text

  // Status
  emailVerified Boolean  @default(false) @map("email_verified")
  status        String   @default("pending")

  // Timestamps
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  @@index([email])
  @@index([createdAt])
  @@index([status])
  @@map("users")
}

model OtpCode {
  id          String   @id @default(uuid())

  email       String
  code        String

  // Expiration
  expiresAt   DateTime @map("expires_at")

  // Verification Status
  verified    Boolean  @default(false)
  verifiedAt  DateTime? @map("verified_at")

  // Attempts tracking
  attempts    Int      @default(0)

  // Timestamps
  createdAt   DateTime @default(now()) @map("created_at")

  @@index([email, code])
  @@index([expiresAt])
  @@map("otp_codes")
}
```

## Environment Variables

Add to `backend/.env`:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/dbname?schema=public"

# Railway PostgreSQL format:
# DATABASE_URL="postgresql://postgres:password@containers-us-west-123.railway.app:7654/railway"
```

## Implementation Steps

### 1. Install Dependencies

```bash
cd backend
npm install prisma @prisma/client
npm install -D prisma
```

### 2. Initialize Prisma

```bash
npx prisma init
```

### 3. Create Schema

Copy the Prisma schema above to `backend/prisma/schema.prisma`

### 4. Add PostgreSQL Database (Railway)

1. Go to Railway dashboard
2. Click your backend service
3. Click "Add Plugin" → "PostgreSQL"
4. Railway will automatically add `DATABASE_URL` to your environment variables

### 5. Run Migration

```bash
npx prisma migrate dev --name init
```

### 6. Generate Prisma Client

```bash
npx prisma generate
```

## Usage Examples

### Save User Registration

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create new user
const user = await prisma.user.create({
  data: {
    firstNameTh: 'สมชาย',
    lastNameTh: 'ใจดี',
    firstNameEn: 'Somchai',
    lastNameEn: 'Jaidee',
    email: 'somchai@example.com',
    phone: '0812345678',
    birthDate: new Date('1990-01-01'),
    nationality: 'Thai',
    idNumber: '1234567890123',
    address: '123 ถนนสุขุมวิท กรุงเทพ',
    lineId: 'somchai123',
    idCardUrl: 'https://storage.example.com/id-cards/somchai.jpg',
    emailVerified: true,
  }
});
```

### Save OTP Code

```javascript
// Create OTP
const otp = await prisma.otpCode.create({
  data: {
    email: 'somchai@example.com',
    code: '123456',
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  }
});
```

### Verify OTP

```javascript
// Find and verify OTP
const otpRecord = await prisma.otpCode.findFirst({
  where: {
    email: 'somchai@example.com',
    code: '123456',
    verified: false,
    expiresAt: {
      gte: new Date(), // Not expired
    }
  }
});

if (otpRecord) {
  // Mark as verified
  await prisma.otpCode.update({
    where: { id: otpRecord.id },
    data: {
      verified: true,
      verifiedAt: new Date(),
    }
  });

  // Update user email verified status
  await prisma.user.update({
    where: { email: 'somchai@example.com' },
    data: { emailVerified: true }
  });
}
```

### Cleanup Expired OTPs (Scheduled Job)

```javascript
// Delete expired OTPs (run daily)
await prisma.otpCode.deleteMany({
  where: {
    expiresAt: {
      lt: new Date(),
    }
  }
});
```

## Data Validation

### Backend Validation Rules

```javascript
const validateUser = (data) => {
  const errors = [];

  // Required fields
  if (!data.firstNameTh) errors.push('Thai first name is required');
  if (!data.lastNameTh) errors.push('Thai last name is required');
  if (!data.firstNameEn) errors.push('English first name is required');
  if (!data.lastNameEn) errors.push('English last name is required');
  if (!data.email) errors.push('Email is required');

  // Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Invalid email format');
  }

  // ID Number (13 digits for Thai ID)
  if (data.idNumber && !/^\d{13}$/.test(data.idNumber)) {
    errors.push('ID number must be 13 digits');
  }

  return errors;
};
```

## Security Considerations

1. **Never store plain text OTP codes** - Consider hashing if needed
2. **Implement rate limiting** - Max 3 OTP requests per email per hour
3. **Auto-cleanup** - Delete expired OTPs regularly
4. **Encrypt sensitive data** - Consider encrypting ID numbers at rest
5. **Use parameterized queries** - Prevent SQL injection (Prisma handles this)
6. **Input sanitization** - Always validate and sanitize user input

## Backup Strategy

1. **Automated Daily Backups** - Railway provides automatic backups
2. **Manual Backups** - Before major migrations
3. **Export to CSV** - Regular exports for compliance

```javascript
// Export users to CSV
const users = await prisma.user.findMany();
// Convert to CSV and store
```

## Migration Strategy

### From In-Memory to PostgreSQL

1. Deploy database
2. Run migrations
3. Update backend API to use Prisma
4. Test thoroughly
5. Deploy to production
6. Monitor for errors

## Performance Optimization

1. **Indexes** - Already added on frequently queried fields
2. **Connection Pooling** - Prisma handles this automatically
3. **Query Optimization** - Use `select` to fetch only needed fields

```javascript
// Optimized query - only fetch needed fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    firstNameEn: true,
    lastNameEn: true,
    email: true,
    status: true,
  }
});
```

## Monitoring

1. **Query Performance** - Use Prisma Studio
2. **Database Size** - Monitor storage usage
3. **Connection Pool** - Monitor active connections

## Admin Queries (Useful)

```sql
-- Count total users
SELECT COUNT(*) FROM users;

-- Count verified vs unverified
SELECT email_verified, COUNT(*)
FROM users
GROUP BY email_verified;

-- Recent registrations
SELECT email, created_at
FROM users
ORDER BY created_at DESC
LIMIT 10;

-- Expired OTPs to cleanup
DELETE FROM otp_codes
WHERE expires_at < NOW();
```

## Next Steps

1. Set up PostgreSQL on Railway
2. Install Prisma and dependencies
3. Create and run migrations
4. Update backend API to use database
5. Test all endpoints
6. Deploy to production
