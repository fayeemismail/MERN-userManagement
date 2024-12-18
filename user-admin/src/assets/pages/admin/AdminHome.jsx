import React from 'react';

export const AdminHome = () => {
  return (
    <div className="bg-gray-100 text-gray-800 font-sans p-10 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-orange-600 uppercase mb-6">
        Welcome to the Admin Dashboard
      </h1>
      <p className="text-lg mb-8">
        You're in control of the platform. Manage users, monitor activity, and adjust settings all from here.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-orange-600 text-white p-6 rounded-lg w-60 shadow-md">
          <h3 className="text-xl font-semibold">Manage Users</h3>
          <p className="mt-2">Control user accounts and permissions.</p>
        </div>
        <div className="bg-blue-400 text-white p-6 rounded-lg w-60 shadow-md">
          <h3 className="text-xl font-semibold">System Settings</h3>
          <p className="mt-2">Adjust the platform settings to your needs.</p>
        </div>
        <div className="bg-green-400 text-white p-6 rounded-lg w-60 shadow-md">
          <h3 className="text-xl font-semibold">Monitor Activity</h3>
          <p className="mt-2">Check platform performance and reports.</p>
        </div>
      </div>
      <p className="text-sm italic text-gray-600 mt-8">
        Need assistance? Contact the system administrator or refer to the documentation.
      </p>
    </div>
  );
};
