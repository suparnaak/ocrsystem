import multer from "multer";
import {
  MESSAGES,
  ALLOWED_IMAGE_TYPES,
  EXPECTED_UPLOAD_FIELDS,
} from "../utils/constants.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 2,
    fieldSize: 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      return cb(new Error(MESSAGES.INVALID_FILE_TYPE), false);
    }

    if (!EXPECTED_UPLOAD_FIELDS.includes(file.fieldname)) {
      return cb(new Error(MESSAGES.UNEXPECTED_FILE_FIELD), false);
    }

    cb(null, true);
  },
});

export default upload;
