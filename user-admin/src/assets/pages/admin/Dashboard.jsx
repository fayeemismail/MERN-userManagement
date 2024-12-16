import React, { useState } from 'react';

export const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const handleClick = async () => {
    try {
      const res = await fetch('/api/admin'); 
      const data = await res.json();
      console.log(data) 
      setUsers(data); 
    } catch (error) {
      console.error('Error fetching users:', error); // Log any errors
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-500 transition duration-300"
      >
        Load Users
      </button>

      {/* Display user data */}
      <ul className="mt-4">
        {users.map((user) => (
          <li key={user._id} className="border-b py-2">
            <strong>{user.username}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};
