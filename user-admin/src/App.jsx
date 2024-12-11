import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './assets/pages/Home'
import About from './assets/pages/About'
import SignIn from './assets/pages/SignIn'
import SignUp from './assets/pages/SignUp'
import Profile from './assets/pages/Profile'
import Header from './assets/components/Header'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App