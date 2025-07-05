import React from 'react';
import PersonalDetails from './PersonalDetails';
import AddressDetails from './AddressDetails';

const ResultsDisplay = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Extracted Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PersonalDetails data={data} />
        <AddressDetails data={data} />
      </div>
    </div>
  );
};

export default ResultsDisplay;