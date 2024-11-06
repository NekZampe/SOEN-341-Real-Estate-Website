import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { useUserContext } from "../context/userContext";

const UserDropdown = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  return (
    <div className="relative inline-block text-left z-50 ">
      <div>
        <button
          type="button"
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={handleDropdownToggle}
        >
          <FaUserCircle className="h-8 w-8 text-white text-xl" />
        </button>
      </div>
      {isDropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <div className="block px-4 py-2 text-sm text-gray-700">
              {user && (
                <div>
                  <p>{user.name}</p>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              )}
            </div>
            <div className="border-t border-gray-200"></div>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
