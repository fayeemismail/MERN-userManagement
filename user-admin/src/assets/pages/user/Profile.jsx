import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOut,
} from '../../../redux/user/userSlice';

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: '',
    profilePicture: currentUser.profilePicture,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'ml_default');
    uploadData.append('cloud_name', 'dkmamqd9b');

    try {
      setIsUploading(true);
      const response = await axios.post('https://api.cloudinary.com/v1_1/dkmamqd9b/image/upload', uploadData);
      setFormData((prev) => ({ ...prev, profilePicture: response.data.secure_url }));
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'password') {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (value && !passwordRegex.test(value)) {
        setPasswordError('Password must be at least 8 characters long, include a special character, and a number.');
      } else {
        setPasswordError('');
      }
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      return;
    }

    const updatedData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "password" && !formData[key]) {
        return;
      }
      updatedData.append(key, formData[key]);
    });

    try {
      dispatch(updateUserStart());
      const res = await axios.post(`/api/user/update/${currentUser._id}`, updatedData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      dispatch(updateUserSuccess(res.data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/userDelete/${currentUser._id}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignout = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userData = async () => {
      try {
        const res = await fetch(`/api/user/${currentUser._id}`);
        const data = await res.json();
        if (data.success == false) {
          dispatch(signOut(data));
          navigate('/');
        }
      } catch (error) {
        dispatch(signInFailure(error));
      }
    }
    userData()
  }, []);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleFileChange} />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="h-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        {isUploading && <p className="text-center text-sm text-gray-500">Uploading...</p>}

        <input
          value={formData.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3 mt-2"
          onChange={handleChange}
        />

        <input
          value={formData.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3 mt-2"
          onChange={handleChange}
        />

        <input
          value={formData.password}
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3 mt-2"
          onChange={handleChange}
        />
        {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}

        <button className="bg-green-950 text-white p-3 rounded-lg uppercase hover:opacity-90">
          {loading ? 'Updating...' : 'Update Details'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteAccount} className="text-red-800 cursor-pointer">Delete Account</span>
        <span onClick={handleSignout} className="text-red-800 cursor-pointer">Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error && "Something went wrong."}</p>
      <p className='text-green-700 mt-5'>{updateSuccess && "User is updated successfully!"}</p>
    </div>
  );
};

export default Profile;
