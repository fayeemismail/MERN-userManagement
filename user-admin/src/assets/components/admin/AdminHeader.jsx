import React from 'react';

const AdminHeader = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <ul className="flex gap-4">
          <li><a href="/admin" className="hover:underline">Dashboard</a></li>
          <li><a href="/admin/sign-in" className="hover:underline">Logout</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
