import React from 'react';
import { Link } from 'react-router-dom';
import AvatarDropdown from '../ui/popover';
import Button from '../ui/Button';

const Navbar = () => {
  const user = false; // Change this value to toggle user login state
  return (
    <div className='bg-white my-2 shadow-md sticky top-0 z-50 w-full'> 
      <div className='flex p-3 items-center justify-between mx-auto max-w-7xl size_1:flex-row gap-5 flex-col size_1:h-16 '>
        <div>
          <h1 className='text-2xl font-bold'>
            ᴄᴀʀᴇᴇʀ<span className='text-blue-600'>xᴘᴇʀᴛ</span>
          </h1>
        </div>
        <div className='flex justify-center gap-5 items-center'>
          <ul className='flex cursor-pointer font-medium items-center gap-5'>
            <li className="relative group pb-1 size_1:ml-0 ml-2">
              <Link to="/">Home</Link>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </li>
            <li className="relative group pb-1">
              <Link to="/Job">Jobs</Link>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </li>
            <li className="relative group pb-1">
              <Link to="/browse">Browse</Link>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </li>
          </ul>

          {user ? (
            <AvatarDropdown
              className="cursor-pointer"
              userName="Marmik Vasava"
              userEmail="marmikvasava051404@gmail.com"
              userImage="./src/assets/marmik.jpg"
            />
          ) : (
            <div className='flex items-center justify-center cursor-pointer'>
              <Link to="/login"><Button name="Login" /></Link>
              <Link to="/signup"><Button name="Signup" /></Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
