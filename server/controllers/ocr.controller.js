import { extractTextFromBuffer } from "../utils/extractText.js";
import { parseAadhaarText } from "../utils/parseAadhaar.js";
import { STATUS_CODES, MESSAGES } from "../utils/constants.js";
import {
  isValidAadhaar,
  isSwapped,
  isDuplicateContent,
  isAadhaarNumberMismatch
} from "../utils/aadhaarValidation.js";

export const processAadhaarOCR = async (req, res) => {
  try {
    const frontFile = req.files["front"]?.[0];
    const backFile = req.files["back"]?.[0];

    if (!frontFile || !backFile) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        error: MESSAGES.MISSING_IMAGES,
      });
    }

    // Extract text from both images
    const frontTextData = await extractTextFromBuffer(frontFile.buffer);
    const backTextData = await extractTextFromBuffer(backFile.buffer);

    // Check if front and back sides are duplicates
    if (isDuplicateContent(frontTextData.lines, backTextData.lines)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        error: MESSAGES.SAME_SIDE
      });
    }

    // Check if overall Aadhaar structure is valid
    if (!isValidAadhaar([...frontTextData.lines, ...backTextData.lines])) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        error: MESSAGES.INVALID_AADHAAR_IMAGE,
      });
    }

    // Check if the front and back are swapped
    if (isSwapped(frontTextData.lines, backTextData.lines)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        error: MESSAGES.SIDE_REVERSED
      });
    }

    // Parse Aadhaar content
    const extractedData = parseAadhaarText(
      frontTextData.lines,
      backTextData.lines
    );

    // Check if Aadhaar numbers mismatch
    if (isAadhaarNumberMismatch(extractedData.aadhaarNumber, backTextData.lines)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        error: MESSAGES.MISMATCHED_SIDES,
      });
    }

    // Clean up unnecessary fields
    delete extractedData.fatherName;

    // Clean up pincode from address
    if (extractedData.address && extractedData.pincode) {
      extractedData.address = extractedData.address
        .replace(new RegExp(`\\b${extractedData.pincode}\\b`), "")
        .replace(/,\s*,/g, ",")
        .replace(/,\s*$/, "")
        .trim();
    }

    return res.status(STATUS_CODES.OK).json({
      message: MESSAGES.OCR_SUCCESS,
      data: extractedData,
      rawText: {
        front: frontTextData.lines,
        back: backTextData.lines,
      },
    });

  } catch (error) {
    console.error("OCR Error:", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: MESSAGES.OCR_FAILURE,
      details: error.message,
    });
  }
};
