//Allowed image types
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

//Field names
export const EXPECTED_UPLOAD_FIELDS = ["front", "back"];

// Status Codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Error and Success Messages
export const MESSAGES = {
  OCR_SUCCESS: "Aadhaar data extracted successfully",

  MISSING_IMAGES: "Both front and back images are required",
  OCR_FAILURE: "Failed to process Aadhaar OCR",
  INVALID_FILE_TYPE: "Only JPG, JPEG, PNG, and WEBP image files are allowed.",
  FILE_TOO_LARGE: "File size exceeds 5MB limit",
  TOO_MANY_FILES: "You can only upload 2 files",
  UNEXPECTED_FILE_FIELD: 'Only "front" and "back" fields are allowed',
  UPLOAD_ERROR: "File upload error occurred",
  VALIDATION_ERROR: "Validation failed",
  INVALID_AADHAAR_IMAGE:
    "The uploaded image does not appear to be a valid Aadhaar card. Please upload proper front and back Aadhaar images.",
    MISMATCHED_SIDES:"Front and back Aadhaar numbers do not match.",
    SAME_SIDE:"Front and back Aadhaar images appear to be the same. Please upload different sides.",
    SIDE_REVERSED:"It seems like the front and back Aadhaar images are uploaded in reverse. Please swap and re-upload.",
};

//Error codes for handleMulter middleware
export const ERROR_CODES = {
  FILE_TOO_LARGE: "FILE_TOO_LARGE",
  TOO_MANY_FILES: "TOO_MANY_FILES",
  UNEXPECTED_FILE: "UNEXPECTED_FILE",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UPLOAD_ERROR: "UPLOAD_ERROR",
};

//front and back identification for validation
export const backIndicators = [
    "unique identification authority of india",
    "address",
    "s/o", "w/o", "d/o",
    "ward", "road", "pincode", "help@uidai", "1947"
  ];

  export const frontIndicators = [
    "government of india",
    "dob", "date of birth", "yob",
    "male", "female"
  ];