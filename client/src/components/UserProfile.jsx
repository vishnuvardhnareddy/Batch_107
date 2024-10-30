import React from 'react';

const UserProfile = () => {
  // Dummy user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '********', // Display as masked
    age: 30,
    gender: 'Male',
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-blue-300 rounded-full flex items-center justify-center text-white font-bold text-3xl">
            JD
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-semibold text-gray-700">{userData.name}</h2>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Account Details</h3>
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-600">Age:</span>
            <span className="text-gray-700">{userData.age}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-600">Gender:</span>
            <span className="text-gray-700">{userData.gender}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-600">Password:</span>
            <span className="text-gray-700">{userData.password}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
