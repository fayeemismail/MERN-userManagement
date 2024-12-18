import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInFailure, signOut } from '../../../redux/user/userSlice';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleAboutPage = () => {
    navigate('/about');
  };

  const handleProfilePage = () => {
    if (currentUser) {
      navigate('/profile');
    } else {
      setErrorMessage('You need to log in first to visit the Profile page.');
    }
  };

  useEffect(() => {
    const userData = async () => {
      try {
        const res = await fetch(`/api/user/${currentUser._id}`);
        const data = await res.json();
        if(data.success == false){
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
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-green-950 mb-4">
          {currentUser ? `Welcome Back, ${currentUser.username}!` : 'Welcome To Home Page'}
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          We are thrilled to have you here. This is your home page where you can navigate to other parts of our app.
        </p>
        <p className="text-gray-500 mb-6">
          You can visit your Profile to update your details or learn more about us on the About page.
        </p>
        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleAboutPage}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-500 transition duration-300"
          >
            About Page
          </button>
          <button
            onClick={handleProfilePage}
            className="bg-green-950 text-white py-2 px-4 rounded-lg shadow hover:bg-green-800 transition duration-300"
          >
            Profile Page
          </button>
        </div>
      </div>
      <footer className="mt-10 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Your MERN App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
