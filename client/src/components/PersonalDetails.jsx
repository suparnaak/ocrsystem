import React from 'react';
import { User, Calendar, Hash } from 'lucide-react';
import InfoRow from './InfoRow';

const PersonalDetails = ({ data }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Personal Details</h3>
      
      <div className="space-y-3">
        <InfoRow
          icon={<User className="h-5 w-5 text-indigo-600" />}
          label="Name"
          value={data.name}
        />
        
        <InfoRow
          icon={<Calendar className="h-5 w-5 text-indigo-600" />}
          label="Date of Birth"
          value={data.dob}
        />
        
        <InfoRow
          icon={<Hash className="h-5 w-5 text-indigo-600" />}
          label="Aadhaar Number"
          value={data.aadhaarNumber}
          valueClass="font-mono"
        />
        
        <InfoRow
          icon={
            <div className="h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {data.gender === 'Male' ? 'M' : 'F'}
              </span>
            </div>
          }
          label="Gender"
          value={data.gender}
        />
      </div>
    </div>
  );
};

export default PersonalDetails;