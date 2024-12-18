import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure, clearError } from '../../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../../components/user/OAuth';

const SignIn = () => {

  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      dispatch(signInStart)

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();


      if (data.success == false) {
        dispatch(signInFailure(data))
        setTimeout(()=> {
          dispatch(clearError())
        }, 9000);
        return;
      }

      dispatch(signInSuccess(data));

      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error))
    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit} >

        <input type="email" placeholder='Enter Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />

        <input type="password" placeholder='Enter Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />

        <button disabled={loading} className='bg-[#0095F6] text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>

        <OAuth />

      </form>
      <div className='flex gap-2 mt-5' >
        <p>Dont Have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-7'>{ error ? error.message || 'Something went wrong!' : ""}</p>
    </div>
  )
}

export default SignIn 