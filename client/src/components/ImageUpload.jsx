import React from 'react';
import UploadZone from './UploadZone';

const ImageUpload = ({
  frontPreview,
  backPreview,
  onFileUpload,
  onOpenModal,
  onRemoveImage
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Aadhaar Card Images</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UploadZone
          label="Front Side"
          type="front"
          preview={frontPreview}
          onFileUpload={onFileUpload}
          onOpenModal={onOpenModal}
          onRemoveImage={onRemoveImage}
        />
        
        <UploadZone
          label="Back Side"
          type="back"
          preview={backPreview}
          onFileUpload={onFileUpload}
          onOpenModal={onOpenModal}
          onRemoveImage={onRemoveImage}
        />
      </div>
    </div>
  );
};

export default ImageUpload;