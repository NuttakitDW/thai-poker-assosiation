const { Pool } = require('pg');

// Log environment info for debugging
console.log('🔗 Initializing database connection...');
console.log('   DATABASE_URL:', process.env.DATABASE_URL ? 'Set ✓' : 'Not set ✗');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'development');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test connection
pool.on('connect', () => {
  console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
  process.exit(-1);
});

module.exports = pool;
