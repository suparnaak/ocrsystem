import React from 'react';

const ProcessButton = ({ frontImage, backImage, isProcessing, onProcess }) => {
  return (
    <div className="mb-8 text-center">
      <button
        onClick={onProcess}
        disabled={!frontImage || !backImage || isProcessing}
        className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${
          !frontImage || !backImage || isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : (
          'Extract Aadhaar Data'
        )}
      </button>
    </div>
  );
};

export default ProcessButton;