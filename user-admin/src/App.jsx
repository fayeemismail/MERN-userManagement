import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './assets/pages/user/Home'
import About from './assets/pages/user/About'
import SignIn from './assets/pages/user/SignIn'
import SignUp from './assets/pages/user/SignUp'
import Profile from './assets/pages/user/Profile'
import Header from './assets/components/Header'
import { PrivateRoute } from './assets/components/PrivateRoute'
import { Dashboard } from './assets/pages/admin/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={ <PrivateRoute />} >
        <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App