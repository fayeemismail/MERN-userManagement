import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminSigninStart, adminSignInSuccess, adminSignInFail, clearAdminError } from '../../../redux/admin/adminSlice.js';

export const AdminSignIn = () => {
  const [formData, setFormData] = useState({});
  const { adminData, loading, error } = useSelector((state) => state.admin);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch(clearAdminError());
    
    try {
      dispatch(adminSigninStart);
      const res = await fetch('/api/auth/admin/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      

      if (data.success === false) {
        dispatch(adminSignInFail(data));
        return;
      }

      dispatch(adminSignInSuccess(data));
      navigate('/admin');
    } catch (error) {
      dispatch(adminSignInFail({ message: error.message }));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h2 className="text-3xl text-center font-semibold my-7">Admin Sign In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="input-group">
          <input
            className="bg-slate-100 p-3 rounded-lg w-full"
            type="email"
            id="email"
            onChange={handleOnChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <input
            className="bg-slate-100 p-3 rounded-lg w-full"
            type="password"
            id="password"
            onChange={handleOnChange}
            placeholder="Enter your password"
            required
          />
        </div>

        

        <button
          disabled={loading}
          className="bg-[#0095F6] text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      {/* Displaying error message from Redux state */}
      {error && (
          <p className="text-red-700 mt-3">
            {error.message || 'Something went wrong!'}
          </p>
        )}
    </div>
  );
};
