import React from 'react';

const InfoRow = ({ icon, label, value, valueClass = '' }) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="mt-0.5 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600">{label}</p>
        <p className={`font-medium text-gray-900 ${valueClass}`}>{value}</p>
      </div>
    </div>
  );
};

export default InfoRow;