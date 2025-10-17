require('dotenv').config();
const { uploadToS3 } = require('./services/s3Service');
const fs = require('fs');
const path = require('path');

async function testS3Upload() {
  console.log('🧪 Testing S3 Upload...\n');

  // Check if credentials are set
  console.log('📋 Configuration:');
  console.log('   Access Key:', process.env.AWS_ACCESS_KEY_ID ? '✓ Set' : '✗ NOT SET');
  console.log('   Secret Key:', process.env.AWS_SECRET_ACCESS_KEY ? '✓ Set' : '✗ NOT SET');
  console.log('   Bucket:', process.env.AWS_S3_BUCKET);
  console.log('   Region:', process.env.AWS_REGION);
  console.log('');

  // Create a test text file
  const testContent = `Test file uploaded at ${new Date().toISOString()}
This is a test upload to verify S3 integration.
Bucket: ${process.env.AWS_S3_BUCKET}
Region: ${process.env.AWS_REGION}`;

  const testBuffer = Buffer.from(testContent, 'utf-8');
  const testFileName = 'test-upload.txt';

  try {
    console.log('📤 Uploading test file to S3...');
    const url = await uploadToS3(
      testBuffer,
      testFileName,
      'text/plain',
      'test-uploads'
    );

    console.log('\n✅ SUCCESS!');
    console.log('📍 File URL:', url);
    console.log('\n✓ S3 API key is working correctly!');
    console.log('✓ You can now use S3 for file uploads');

  } catch (error) {
    console.error('\n❌ FAILED!');
    console.error('Error:', error.message);
    if (error.name === 'InvalidAccessKeyId') {
      console.error('\n💡 Tip: Check your AWS_ACCESS_KEY_ID');
    } else if (error.name === 'SignatureDoesNotMatch') {
      console.error('\n💡 Tip: Check your AWS_SECRET_ACCESS_KEY');
    } else if (error.message.includes('bucket')) {
      console.error('\n💡 Tip: Verify your bucket name and region');
    }
  }
}

testS3Upload();
