const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

// Lazy initialization of S3 client to ensure env vars are loaded
let s3Client = null;

function getS3Client() {
  if (!s3Client) {
    s3Client = new S3Client({
      region: process.env.AWS_REGION || 'ap-southeast-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  return s3Client;
}

/**
 * Upload a file to S3
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} fileName - Original file name
 * @param {string} mimeType - File MIME type
 * @param {string} folder - Folder in S3 bucket (e.g., 'id-cards')
 * @returns {Promise<string>} - URL of uploaded file
 */
async function uploadToS3(fileBuffer, fileName, mimeType, folder = 'uploads') {
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const key = `${folder}/${timestamp}-${sanitizedFileName}`;

  try {
    const client = getS3Client();
    const upload = new Upload({
      client: client,
      params: {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: fileBuffer,
        ContentType: mimeType,
      },
    });

    await upload.done();

    // Return the S3 URL
    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    console.log(`✓ File uploaded to S3: ${url}`);
    return url;
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw new Error('Failed to upload file to S3');
  }
}

module.exports = {
  uploadToS3,
};
