import express from 'express';
import upload from '../config/multer.config.js';
import { handleMulterError } from '../middleware/handleMulterError.js';
import { processAadhaarOCR } from '../controllers/ocr.controller.js';

const router = express.Router();

router.post(
  '/ocr',
  upload.fields([
    { name: 'front', maxCount: 1 },
    { name: 'back', maxCount: 1 },
  ]),
  handleMulterError,
  processAadhaarOCR
);

export default router;
