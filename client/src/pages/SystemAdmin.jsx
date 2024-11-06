import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import './brokerStyle.css';
import { useUserContext } from '../context/userContext.jsx';
import Header from '../components/Header.jsx';

const SystemAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useUserContext();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:3000/users`)
      .then((response) => {
        
        const filteredUsers = response.data.filter((request) => request.u_type === "broker");
        console.log("users reponse data filtered:", filteredUsers);
        setUsers(filteredUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

  }, [user, setUsers]);

  return (
    <div className="body">
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <div className="parent flex justify-center items-center">
          <div className="div1 m-4 rounded-lg ">
            <table className="p-4 border-solid text-sm text-left text-gray-500 dark:text-gray-400 rounded lg">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse your current brokers on PropertyHub. Edit their information as needed.
                </p>
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lisence
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((userBroker, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {userBroker.name}
                    </td>
                    <td className="px-6 py-4">{userBroker.email}</td>
                    <td className="px-6 py-4"> {userBroker.contact.phone}</td>
                    <td className="px-6 py-4">{userBroker.contact.company}</td>
                    <td className="px-6 py-4">{userBroker.contact.authorization}</td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/users/edit/${userBroker._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`/users/delete/${userBroker._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemAdmin;
