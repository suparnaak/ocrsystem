import React from 'react';
import { Upload, X } from 'lucide-react';

const UploadZone = ({
  label,
  type,
  preview,
  onFileUpload,
  onOpenModal,
  onRemoveImage
}) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileUpload(file, type);
    }
  };

  const handleClick = () => {
    document.getElementById(`${type}-upload`).click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt={`${label} preview`}
              className="max-h-48 mx-auto rounded-lg shadow-md cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(preview);
              }}
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveImage(type);
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="text-gray-500">
            <Upload className="h-12 w-12 mx-auto mb-4" />
            <p className="text-sm">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 10MB</p>
          </div>
        )}
      </div>
      <input
        id={`${type}-upload`}
        type="file"
        accept="image/*"
        onChange={(e) => onFileUpload(e.target.files[0], type)}
        className="hidden"
      />
    </div>
  );
};

export default UploadZone;