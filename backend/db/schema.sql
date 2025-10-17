-- Thai Poker Association Database Schema

-- Enable UUID extension (for older PostgreSQL versions)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Personal Information (Thai)
  first_name_th VARCHAR(255) NOT NULL,
  last_name_th VARCHAR(255) NOT NULL,

  -- Personal Information (English)
  first_name_en VARCHAR(255) NOT NULL,
  last_name_en VARCHAR(255) NOT NULL,

  -- Contact Information
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),

  -- Identity Information
  birth_date DATE,
  nationality VARCHAR(100),
  id_number VARCHAR(100),
  address TEXT,

  -- Social Media
  line_id VARCHAR(100),
  telegram VARCHAR(100),
  facebook VARCHAR(255),

  -- Status
  email_verified BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'pending',

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OTP Codes table
CREATE TABLE IF NOT EXISTS otp_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  email VARCHAR(255) NOT NULL,
  code VARCHAR(6) NOT NULL,

  -- Expiration
  expires_at TIMESTAMP NOT NULL,

  -- Verification Status
  verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMP,

  -- Attempts tracking
  attempts INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_otp_codes_email_code ON otp_codes(email, code);
CREATE INDEX IF NOT EXISTS idx_otp_codes_expires_at ON otp_codes(expires_at);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger only if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_updated_at'
  ) THEN
    CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END
$$;
