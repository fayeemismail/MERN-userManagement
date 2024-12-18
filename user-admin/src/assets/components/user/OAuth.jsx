import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 403) {
          setErrorMessage(errorData.message || 'Account is blocked.')
          setTimeout(()=>{
            setErrorMessage('');
          },10000);
          return;
        }
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Could not login with Google:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-[#ffffff] text-black p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 w-full border border-black"
      >
        Continue with Google
      </button>
      
      {/* Conditionally render error message */}
      {errorMessage && <p className="text-red-700 mt-3">{errorMessage}</p>}
    </div>
  );
};

export default OAuth;
