import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../../../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export const EditUser = () => {
  const { userid } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendError, setBackendError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/admin/EditUser/${userid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUser(data.user);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userid]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const response = await fetch(`/api/admin/updateUser/${userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setBackendError(errorData.message || 'Failed to save user details');
        dispatch(updateUserFailure(response))
        return;
      }

      const result = await response.json();
      
      setBackendError(''); 
      setSuccessMessage('User details updated successfully!'); 

      
      if (result.updatedUser) {
        setUser(result.updatedUser);
      }

      dispatch(updateUserSuccess(result.updatedUser))
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      dispatch(updateUserFailure(err.message))
      setBackendError('An error occurred while saving user details. Please try again.');
    }
  };

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user found.</div>;
  }

  
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit User</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          value={user.username || ''}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="block w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          placeholder="Enter username"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={user.email || ''}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="block w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          placeholder="Enter email address"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-200"
      >
        Save Changes
      </button>
      {successMessage && (
        <p className="mt-4 text-center text-green-600 font-semibold">
          {successMessage}
        </p>
      )}
      {backendError && (
        <p className="mt-4 text-center text-red-600 font-semibold">
          {backendError}
        </p>
      )}
    </form>
  </div>
  
  );
};
