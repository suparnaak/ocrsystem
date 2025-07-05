//Front image
export function parseFrontText(lines) {
  const fields = {};

  // Patterns for different languages
  const dobPatterns = [
    /DOB|Date of Birth|जन्म|YoB|Year of Birth/i,
    /जन्म\s*तारीख|जन्म\s*दिनांक/i,
    /വയസ്സ്|YoB/i,
  ];

  const genderPatterns = {
    male: /Male|पुरुष|പുരുഷൻ|M(?!\w)/i,
    female: /Female|महिला|സ്ത്രീ|F(?!\w)/i,
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = lines[i + 1] || "";
    const prevLine = lines[i - 1] || "";

    // Name detection
    if (!fields.name) {
      fields.name = detectName(lines, i);
    }

    // DOB detection
    if (!fields.dob) {
      fields.dob = detectDOB(lines, i, dobPatterns);
    }

    // Gender detection
    if (!fields.gender) {
      const context = [line, lines[i + 1] || "", lines[i - 1] || ""];
      for (const l of context) {
        const g = detectGender(l);
        if (g) {
          fields.gender = g;
          break;
        }
      }
    }

    // Aadhaar number detection
    if (!fields.aadhaarNumber) {
      fields.aadhaarNumber = detectAadhaarNumber(line);
    }
  }

  return fields; //it returns {name, dob, gender, aadhaarNumber}
}

//Back Image
export function parseBackText(lines) {
  const fields = {
    address: "",
    issueAuthority: "",
    pincode: "",
  };

  const addressLines = [];
  let isAddress = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (/Address|पता|വിലാസം/i.test(line)) {
      isAddress = true;
      continue;
    }

    // Stop collecting address when reaching footer or contact to avoid extra text in address
    if (isAddress && shouldStopAddressCollection(line)) {
      break;
    }

    if (isAddress) {
      // Avoid unwanted lines
      if (
        line === "." ||
        line === ":" ||
        /^\d{4}\s\d{4}\s\d{4}$/.test(line) ||
        /^\d{12}$/.test(line) ||
        line.toLowerCase().includes("www")
      ) {
        continue;
      }
      addressLines.push(line);
    }

    // UIDAI detection
    if (/Unique Identification Authority of India|UIDAI/i.test(line)) {
      fields.issueAuthority = "UIDAI";
    }
  }

  // Merge address lines

    const rawAddress = addressLines.join(" ");
    const parts = rawAddress
    .split(",")
    .map(p => p.trim())
    .filter(p => p.length);
fields.address = parts.join(", ");

  // Extract pincode
  fields.pincode = extractPincode(fields.address);

  return fields; //it returns { address, issueAuthority, pincode }
}

// Helper functions

function detectName(lines, currentIndex) {
  const line = lines[currentIndex];
  const nextLine = lines[currentIndex + 1] || "";
  const prevLine = lines[currentIndex - 1] || "";

  const excludedPatterns = [
    /S\/O|W\/O|D\/O/i,
    /\b(Son|Daughter|Wife|Husband|Father|Mother)\b/i,
    /\b(UIDAI|Aadhaar|Government|Authority|India|www|help|1947)\b/i,
  ];

  if (excludedPatterns.some((pattern) => pattern.test(line))) {
    return null;
  }

  const isLikelyName =
    /^[A-Za-z\s\.]{3,}$/.test(line) &&
    line.split(" ").length <= 4 &&
    !/\d/.test(line);

  const nextLineHasDOB = /DOB|YoB|Date|Birth|जन्म|വയസ്സ്/i.test(nextLine);
  const prevLineHeader = /Government|UIDAI|भारत|Authority/i.test(prevLine);

  if (isLikelyName && (nextLineHasDOB || prevLineHeader)) {
    return cleanName(line);
  }

  return null;
}

function detectDOB(lines, currentIndex, patterns) {
  const line = lines[currentIndex];

  for (const pattern of patterns) {
    if (pattern.test(line)) {
      const dateMatch = line.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
      if (dateMatch) return dateMatch[1];

      const nextLine = lines[currentIndex + 1] || "";
      const nextDateMatch = nextLine.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
      if (nextDateMatch) return nextDateMatch[1];

      const yearMatch = line.match(/(\d{4})/);
      if (
        yearMatch &&
        parseInt(yearMatch[1]) > 1900 &&
        parseInt(yearMatch[1]) < 2020
      ) {
        return yearMatch[1];
      }
    }
  }

  return null;
}
function detectGender(line) {
  const lower = line.toLowerCase();

  if (/female|महिला|സ്ത്രീ/.test(lower)) return "Female";
  if (/male|पुरुष|പുരുഷൻ/.test(lower)) return "Male";

  if (/[^a-z](f)(emale)?[^a-z]/i.test(` ${line} `)) return "Female";
  if (/[^a-z](m)(ale)?[^a-z]/i.test(` ${line} `)) return "Male";

  return null;
}

function detectAadhaarNumber(line) {
  const standardMatch = line.match(/^\d{4}\s\d{4}\s\d{4}$/);
  if (standardMatch) return standardMatch[0];

  const altMatch = line.match(/(\d{4}\s?\d{4}\s?\d{4})/);
  if (altMatch) {
    return altMatch[1].replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3");
  }

  return null;
}

function detectFatherName(line) {
  const patterns = [
    /S\/O\s*[:\-]?\s*(.+)/i,
    /W\/O\s*[:\-]?\s*(.+)/i,
    /D\/O\s*[:\-]?\s*(.+)/i,
    /पिता\s*[:\-]?\s*(.+)/i,
    /पति\s*[:\-]?\s*(.+)/i,
    /Son of\s*[:\-]?\s*(.+)/i,
    /Wife of\s*[:\-]?\s*(.+)/i,
    /Daughter of\s*[:\-]?\s*(.+)/i,
  ];

  for (const pattern of patterns) {
    const match = line.match(pattern);
    if (match) {
      return match[1].trim().replace(/,$/, "");
    }
  }

  return null;
}

function shouldStopAddressCollection(line) {
  return (
    /^\d{4}\s\d{4}\s\d{4}$/.test(line) ||
    /@|www|help|1947|1800/i.test(line) ||
    /Aadhaar|आधार|അധാർ|UIDAI|Authority/i.test(line)
  );
}

function extractPincode(address) {
  const pinMatch = address.match(/\b\d{6}\b/);
  return pinMatch ? pinMatch[0] : "";
}

function cleanName(name) {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s\.]/g, "")
    .trim();
}

export function parseAadhaarText(frontLines, backLines) {
  const frontData = parseFrontText(frontLines);
  const backData = parseBackText(backLines);

  const mergedData = { ...frontData, ...backData };

  return validateAndCleanData(mergedData);
}

function validateAndCleanData(data) {
  if (data.aadhaarNumber && !/^\d{4}\s\d{4}\s\d{4}$/.test(data.aadhaarNumber)) {
    const digits = data.aadhaarNumber.replace(/\D/g, "");
    if (digits.length === 12) {
      data.aadhaarNumber = `${digits.slice(0, 4)} ${digits.slice(
        4,
        8
      )} ${digits.slice(8, 12)}`;
    }
  }

  if (data.address) {
    data.address = data.address
      .replace(/,\s*,/g, ",")
      .replace(/,\s*$/, "")
      .trim();
  }

  if (data.pincode && !/^\d{6}$/.test(data.pincode)) {
    data.pincode = "";
  }

  return data;
}
