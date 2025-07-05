// src/api/ocrService.js
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const uploadAadhaarImages = async (frontFile, backFile) => {
  const form = new FormData();
  form.append("front", frontFile);
  form.append("back", backFile);

  const response = await axios.post(`${BACKEND_URL}/api/aadhaar/ocr`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
