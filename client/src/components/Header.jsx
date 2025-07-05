import React from 'react';
import { FileText } from 'lucide-react';

const Header = ({ onClearData }) => {
  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Aadhaar OCR Scanner</h1>
          </div>

          <button
            onClick={onClearData}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;