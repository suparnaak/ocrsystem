import multer from "multer";
import { STATUS_CODES, MESSAGES } from "../utils/constants.js";
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          error: MESSAGES.FILE_TOO_LARGE,
          code: ERROR_CODES.FILE_TOO_LARGE,
        });
      case "LIMIT_FILE_COUNT":
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          error: MESSAGES.TOO_MANY_FILES,
          code: ERROR_CODES.TOO_MANY_FILES,
        });
      case "LIMIT_UNEXPECTED_FILE":
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          error: MESSAGES.UNEXPECTED_FILE_FIELD,
          code: ERROR_CODES.UNEXPECTED_FILE,
        });
      default:
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          error: MESSAGES.UPLOAD_ERROR,
          code: ERROR_CODES.UPLOAD_ERROR,
        });
    }
  } else if (err) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      error: err.message,
      details: err.message,
    });
  }
  next();
};
