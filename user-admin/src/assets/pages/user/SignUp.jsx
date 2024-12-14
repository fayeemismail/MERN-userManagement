import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../../components/OAuth';

const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id] : e.target.value })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      setLoading(true)
      setError(false)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false)
      if(data.success == false){
        setError(true);
        return;
      }
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit} >

        <input type="text" placeholder='Enter your name' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />

        <input type="email" placeholder='Enter Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />

        <input type="password" placeholder='Enter Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />

        <button disabled={loading} className='bg-[#0095F6] text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>{ loading ? 'Loading...' : 'Sign Up'  }</button>

        <OAuth />

      </form>
      <div className='flex gap-2 mt-5' >
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-7'>{ error && 'Something went wrong!'}</p>
    </div>
  )
}

export default SignUp