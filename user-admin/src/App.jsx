import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './assets/pages/user/Home';
import About from './assets/pages/user/About';
import SignIn from './assets/pages/user/SignIn';
import SignUp from './assets/pages/user/SignUp';
import Profile from './assets/pages/user/Profile';
import Header from './assets/components/user/Header';
import { PrivateRoute } from './assets/components/user/PrivateRoute';
import { Dashboard } from './assets/pages/admin/Dashboard';
import { AdminSignIn } from './assets/pages/admin/AdminSignIn';
import AdminHeader from './assets/components/admin/adminHeader';
import { AdminPrivateRoute } from './assets/components/admin/adminPrivateRoute'; 
import { AdminHome } from './assets/pages/admin/AdminHome';
import {  EditUser } from './assets/pages/admin/EditUser'

const App = () => {
  return (
    <BrowserRouter>
      <HeaderAndRoutes />
    </BrowserRouter>
  );
}

const HeaderAndRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <>
      {isAdminRoute ? <AdminHeader /> : <Header />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        
        {/* Protecting profile route with PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

        {/* Protecting admin routes with AdminPrivateRoute */}
        <Route element={<AdminPrivateRoute />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
        </Route>

        <Route element={<AdminPrivateRoute />}>
        <Route path='/admin' element={<AdminHome />} />
        </Route>

        <Route element={<AdminPrivateRoute />} >
          <Route path='/admin/edit-user/:userid' element={<EditUser />} />  
        </Route>

        <Route path='/admin/sign-in' element={<AdminSignIn />} />
      </Routes>
    </>
  );
}

export default App;
