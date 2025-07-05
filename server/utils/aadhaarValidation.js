import { backIndicators,frontIndicators } from "./constants.js";
export function isValidAadhaar(lines) {
  const text = lines.join(" ").toLowerCase();
  return (
    text.includes("government of india") &&
    /[0-9]{4}\s[0-9]{4}\s[0-9]{4}/.test(text)
  );
}

export function isSwapped(frontLines, backLines) {
  const frontText = frontLines.join(" ").toLowerCase();
  const backText = backLines.join(" ").toLowerCase();

  

  const frontHasBackClues = backIndicators.some(word => frontText.includes(word));
  const backHasFrontClues = frontIndicators.some(word => backText.includes(word));

  return frontHasBackClues && backHasFrontClues;
}

export function isDuplicateContent(frontLines, backLines) {
  const front = frontLines.join(" ").toLowerCase().replace(/\s+/g, " ").trim();
  const back = backLines.join(" ").toLowerCase().replace(/\s+/g, " ").trim();
  return front === back;
}

export function isAadhaarNumberMismatch(frontNumber, backLines) {
  const frontNo = frontNumber?.replace(/\s/g, "");

  const backMatch = backLines
    .map(line => line.match(/(\d{4}\s?\d{4}\s?\d{4})/))
    .find(m => m && m[1]);

  if (!frontNo || !backMatch) return false;

  const backNo = backMatch[1].replace(/\s/g, "");
  return frontNo !== backNo;
}
