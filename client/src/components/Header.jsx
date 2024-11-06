import React from 'react';
import { FaHome } from 'react-icons/fa';
import UserDropdown from '../helpers/userDropdown';

const Header = () => {

  return (
    <header className="bg-gray-600 p-4 flex justify-between items-center w-full mx-auto">
      <div className="flex items-center">
      <span className="text-white font-semibold text-lg flex items-center">
        PropertyHub <FaHome />
      </span>
    </div>
      <div className="text-white text-xl">
       <UserDropdown/>
      </div>
    </header>
  );
};

export default Header;