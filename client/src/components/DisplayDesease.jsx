import React from 'react';

const DisplayDisease = () => {
  // Dummy disease data
  const diseaseData = {
    title: 'Hypertension',
    description: 'A condition in which the blood pressure in the arteries is persistently elevated.',
    issuedOn: '2023-10-20',
    issuedBy: 'Dr. Jane Smith',
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{diseaseData.title}</h2>
        <p className="text-gray-600 mb-4">{diseaseData.description}</p>
        
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-600">Issued On:</span>
            <span className="text-gray-700">{diseaseData.issuedOn}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Issued By:</span>
            <span className="text-gray-700">{diseaseData.issuedBy}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayDisease;
