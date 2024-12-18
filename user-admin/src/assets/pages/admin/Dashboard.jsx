import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../../../redux/user/userSlice';

export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserBlock = async (userID) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to change the user status?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!',
      });

      if (isConfirmed) {
        const res = await fetch('/api/admin/userBlock', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid: userID }),
        });

        if (!res.ok) throw new Error('Failed to update user status');

        const updatedUser = await res.json();

        
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userID ? { ...user, isBlocked: updatedUser.user.isBlocked } : user
          )
        );

        Swal.fire(
          'Updated!',
          `User has been ${updatedUser.user.isBlocked ? 'blocked' : 'unblocked'}.`,
          'success'
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Something went wrong while updating user status.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-red-500 font-semibold">Error: {error}</div>
      </div>
    );
  }

  const handleEdit =  (userid) =>{
    try {
      if(userid){
        navigate(`/admin/edit-user/${userid}`);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const handleDelete = async (userid) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });
  
      if (isConfirmed) {
        dispatch(deleteUserStart());
        const response = await fetch(`/api/admin/userDelete/${userid}`, {
          method: 'DELETE',
        });
        const data = await response.json();
  
        if (!response.ok || data.success === false) {
          dispatch(deleteUserFailure(data.message || 'Failed to delete user.'));
          Swal.fire('Error!', data.message || 'Failed to delete user.', 'error');
          return;
        }
  
        dispatch(deleteUserSuccess());
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userid));
  
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      }
    } catch (error) {
      console.error(error);
      dispatch(deleteUserFailure(error.message));
      Swal.fire('Error!', 'Something went wrong while deleting the user.', 'error');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">User Details</h1>
        {users.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                    User Profile
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                    Username
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                    User Email
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                    Action
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                    Update
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={user.profilePicture || '/default-profile.png'}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleUserBlock(user._id)}
                        className={`px-4 py-2 rounded-md text-white transition-all ${
                          user.isBlocked
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                    <td className='border border-gray-300 px-4 py-2 text-center'>
                        <a onClick={ ()=> handleEdit(user._id)} className='cursor-pointer hover:underline text-black hover:text-blue-500'>Edit</a>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className={`px-4 py-2 rounded-md text-white transition-all bg-red-600`}>
                        X
                      </button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
