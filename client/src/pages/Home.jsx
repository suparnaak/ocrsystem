import React, { useState } from "react";
import Header from "../components/Header";
import ImageUpload from "../components/ImageUpload";
import ProcessButton from "../components/ProcessButton";
import ResultsDisplay from "../components/ResultsDisplay";
import ImageModal from "../components/ImageModal";
import { uploadAadhaarImages } from "../api/ocrService";
import { toast } from "react-toastify";

export default function Home() {
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile]   = useState(null);
  const [previewFront, setPreviewFront] = useState(null);
  const [previewBack, setPreviewBack]   = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrData, setOcrData] = useState(null);
  const [modalSrc, setModalSrc] = useState(null);
  const [error, setError] = useState("");

  const handleFileUpload = (file, side) => {
    const url = URL.createObjectURL(file);
    if (side === "front") {
      setFrontFile(file);
      setPreviewFront(url);
    } else {
      setBackFile(file);
      setPreviewBack(url);
    }
  };

  const handleRemoveImage = (side) => {
    if (side === "front") {
      setFrontFile(null);
      setPreviewFront(null);
    } else {
      setBackFile(null);
      setPreviewBack(null);
    }
  };

  const handleOpenModal = (src) => setModalSrc(src);
  const handleCloseModal = () => setModalSrc(null);

  const handleClear = () => {
    setFrontFile(null);
    setBackFile(null);
    setPreviewFront(null);
    setPreviewBack(null);
    setOcrData(null);
    setError("");
  };

  const handleProcess = async () => {
    setError("");
  if (!frontFile || !backFile) {
    setError("Please upload both front and back images before extracting.");
    return;
}
  setIsProcessing(true);

  try {
    const res = await uploadAadhaarImages(frontFile, backFile);
    toast.success("Aadhar data fetched successfully")
    setOcrData(res.data); 
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.error );
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <>
<Header onClearData={handleClear} />
      <main className="max-w-4xl mx-auto p-4">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded">
            {error}
          </div>
        )}
        <ImageUpload
          frontPreview={previewFront}
          backPreview={previewBack}
          onFileUpload={handleFileUpload}
          onOpenModal={handleOpenModal}
          onRemoveImage={handleRemoveImage}
        />

        <ProcessButton
          frontImage={frontFile}
          backImage={backFile}
          isProcessing={isProcessing}
          onProcess={handleProcess}
        />

        {ocrData && <ResultsDisplay data={ocrData} />}
      </main>

      <ImageModal
        isOpen={!!modalSrc}
        imageSrc={modalSrc}
        onClose={handleCloseModal}
      />
    </>
  );
}
