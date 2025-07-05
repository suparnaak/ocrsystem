import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aadhaarRoutes from './routes/ocr.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL
}));
app.use(express.json());

// Routes
app.use('/api/aadhaar', aadhaarRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Aadhaar OCR System is Running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
