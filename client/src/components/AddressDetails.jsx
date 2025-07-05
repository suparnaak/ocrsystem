import React from 'react';
import { MapPin, Hash, Building } from 'lucide-react';
import InfoRow from './InfoRow';

const AddressDetails = ({ data }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Address Details</h3>
      
      <div className="space-y-3">
        <InfoRow
          icon={<MapPin className="h-5 w-5 text-indigo-600" />}
          label="Address"
          value={data.address}
          valueClass="leading-relaxed"
        />
        
        <InfoRow
          icon={<Hash className="h-5 w-5 text-indigo-600" />}
          label="Pincode"
          value={data.pincode}
        />
        
        <InfoRow
          icon={<Building className="h-5 w-5 text-indigo-600" />}
          label="Issue Authority"
          value={data.issueAuthority}
        />
      </div>
    </div>
  );
};

export default AddressDetails;