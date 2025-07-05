import vision from '@google-cloud/vision';
import dotenv from 'dotenv';
dotenv.config();

const client = new vision.ImageAnnotatorClient({
  keyFilename: /* process.env.GOOGLE_CREDENTIALS_JSON, */'/etc/secrets/google-service-account.json'
});

export default client;
