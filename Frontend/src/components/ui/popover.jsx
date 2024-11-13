import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { UserRound } from 'lucide-react';

function AvatarDropdown({ userName = "Bonnie Green", userEmail = "name@flowbite.com", userImage = "/docs/images/people/profile-picture-3.jpg" }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex text-sm bg-gray-800 rounded-full border border-black"
        type="button"
      >

        <img
          className="w-9 h-9 rounded-full"
          src={userImage}
          alt="user avatar"
        />
      </button>

      {isOpen && (
        <div className="absolute top-10 right-0.5 z-10 border-2 border-blue-600 bg-white divide-y divide-gray-100 rounded-lg shadow   size:w-80 w-44 dark:bg-gray-700 dark:divide-blue-600">


          <div className="img flex justify-center px-2 py-2">
            <img
              className="w-11 h-11 rounded-full border-2 border-blue-500"
              src={userImage}
              alt="user avatar"
            />
          </div>

          <div className="px-4 py-3 text-base text-white">
            <div>{userName}</div>
            <div className="font-medium truncate">{userEmail}</div>
          </div>
          <ul className="py-2 text-sm text-white">
            <li>
              <div className='flex items-center px-4 py-2  dark:hover:bg-blue-600  dark:hover:text-white rounded-lg gap-4 text-base'>
                <UserRound />
                <a href="#" className="block">View Profile</a>
              </div>
            </li>
          </ul>
          <div className="py-2 text-white">
            <div className='flex items-center px-4 py-2  dark:hover:bg-blue-600  dark:hover:text-white rounded-lg gap-4 text-base'>
              <LogOut />
              <a href="#" className="block">Sign out</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
