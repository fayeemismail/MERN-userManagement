import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const AdminPrivateRoute = () => {
  const {adminData} = useSelector(state => state.admin) 
return (
  adminData ? <Outlet /> : <Navigate to='admin/sign-in' />
)
}
