import vision from '@google-cloud/vision';
import dotenv from 'dotenv';
dotenv.config();

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_CREDENTIALS_JSON,
});

export default client;
