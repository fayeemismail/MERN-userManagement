// import React from 'react'
import {GoogleAuthProvider} from 'firebase/auth'

const OAuth = () => {
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
        } catch (error) {
            console.log("could not login with google", error)
        }
    }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-gradient-to-r from-[#30ab69] via-[#a83434] to-[#fff700] rounded-lg p-3 uppercase text-white hover:opacity-90' >Continue with Google</button>
  )
}

export default OAuth