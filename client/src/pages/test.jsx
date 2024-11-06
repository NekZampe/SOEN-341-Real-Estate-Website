import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3000/properties')
            .then((response) => {
                setProperties(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-center items-center gap-x-4">
                <h1 className="text-3xl my-8">Your properties</h1>
            </div>
            <Link to="/properties/create">
                <div className="flex justify-center items-center">
                    <button
                        type="button"
                        className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        create property
                    </button>
                </div>
            </Link>
            {loading ? (
                <Spinner />
            ) : (
                <div className="mt-5 flex">
                    <div className="w-1/4 p-4">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Browse your current listings on PropertyHub. Edit your own listings.
                                </p>
                            </caption>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Listing Address
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Size
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Selling type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Housing type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map((property, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {`${property.address.street_number} ${property.address.street_name}, ${property.address.postal_code}, ${property.address.province}, ${property.address.country}`}
                                        </td>
                                        <td className="px-6 py-4">{property.size}</td>
                                        <td className="px-6 py-4">for {property.s_type}</td>
                                        <td className="px-6 py-4">{property.h_type}</td>
                                        <td className="px-6 py-4">${property.price}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link to={`/properties/details/${property._id}`}>
                                                <BsInfoCircle className="text-2xl text-green-800" />
                                            </Link>
                                            <Link to={`/properties/edit/${property._id}`}>
                                                <AiOutlineEdit className="text-2xl text-yellow-600" />
                                            </Link>
                                            <Link to={`/properties/delete/${property._id}`}>
                                                <MdOutlineDelete className="text-2xl text-red-600" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-3/4 p-4 flex">
                        <div className="w-1/2 p-4 overflow-auto">
                            TEST
                        </div>
                        <div className="w-1/2 p-4 overflow-auto">
                            TEST
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
