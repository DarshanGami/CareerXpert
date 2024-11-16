import React from 'react';
import User from './User';
import New_user from './New_user';


const Navbar = () => {
  const user = true;
  const role = false; // Change this value to toggle user login state
  return (
    <div className='bg-white my-2 shadow-md sticky top-0 z-50 w-full'> 
      {user ? (
        <User role={role} ></User>
      ) : (
        <New_user></New_user>
      )}
    </div>
  );
};

export default Navbar;
