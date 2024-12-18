import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminSignOut } from '../../../redux/admin/adminSlice';

const AdminHeader = () => {
  const { adminData } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/admin/signout');
      dispatch(adminSignOut())
    } catch (error) {
      console.log(error)
    }
  };
  
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="flex justify-between items-center">{ 
        adminData ?  <h1 className="text-lg font-bold">Welcome {adminData.username}</h1> : 
        <h1 className="text-lg font-bold">Login</h1> }
        
        <ul className="flex gap-4">{
          adminData ? <Link to='/admin/dashboard'>
          <li>Dashboard</li>
          </Link> :
          '' }
          { adminData ? <li><a 
          onClick={handleLogout}
           className="hover:underline">Logout</a>
          </li> : <li><a 
           className="hover:underline">Login</a>
          </li>  }
          
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
