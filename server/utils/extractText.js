import client from "./visionClient.js";

export async function extractTextFromBuffer(buffer) {
  try {
    //This is the Document Text Detection API of Google Vision
    const [result] = await client.documentTextDetection({
      image: { content: buffer },
    });

    const fullText = result.fullTextAnnotation?.text || ""; //Entire payload as a single string from the documentTextDetection

    //full text is split onnew line and trimmed
    const lines = fullText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => cleanLine(line));

    const blocks = result.fullTextAnnotation?.pages?.[0]?.blocks || [];
    const structuredData = extractStructuredData(blocks);

    return {
      fullText,
      lines,
      structuredData,
    };
  } catch (error) {
    console.error("Error during OCR:", error.message);
    throw error;
  }
}

//removes extras likepunctuations
function cleanLine(line) {
  return line
    .replace(/[^\w\s\/:.,-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

//checks blocks, paragraphs and words returns non empty and confidence score more than 0.5 words only
function extractStructuredData(blocks) {
  const structuredData = [];

  for (const block of blocks) {
    for (const paragraph of block.paragraphs || []) {
      for (const word of paragraph.words || []) {
        const text = word.symbols?.map((s) => s.text).join("") || "";
        const confidence = word.confidence || 0;

        if (text.trim() && confidence > 0.5) {
          structuredData.push({
            text: text.trim(),
            confidence,
            boundingBox: word.boundingBox,
          });
        }
      }
    }
  }

  return structuredData;
}
