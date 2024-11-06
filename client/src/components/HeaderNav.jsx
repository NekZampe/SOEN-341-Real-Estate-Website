// HeaderNav.jsx

import React from 'react';
import { FaHome } from 'react-icons/fa';
import UserDropdown from '../helpers/userDropdown';
import { Link } from 'react-router-dom';

const HeaderNav = () => {
  return (
    <header className="bg-gray-600 p-4 flex justify-between items-center w-full mx-auto">
      <div className="flex items-center">
        <span className="text-white font-semibold text-lg flex items-center">
          <Link to="/" className="text-white">
            PropertyHub <FaHome />
          </Link>
        </span>
      </div>

      {/* Navigation options in the middle */}
      <nav className="flex-grow text-center">
        <ul className="flex space-x-4 justify-center">
          <li>
            <Link to="/properties" className="text-white">
              Properties
            </Link>
          </li>
          <li>
            <Link to="/viewoffers" className="text-white">
              View Offers
            </Link>
          </li>
          <li>
            <Link to="/viewrequests" className="text-white">
              View Requests
            </Link>
          </li>
          <li>
            <Link to="/brokersearch" className="text-white">
              Broker Search
            </Link>
          </li>
        </ul>
      </nav>

      {/* UserDropdown on the right */}
      <div className="text-white text-xl">
        <UserDropdown />
      </div>
    </header>
  );
};

export default HeaderNav;
