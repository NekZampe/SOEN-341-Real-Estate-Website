import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';
import axios from 'axios';
import Header from '../components/Header.jsx';

const EditBroker = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    // Add the initial state for formData
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        u_type: '',
        contact: {
            authorization: '',
            phone: '',
            company: '',
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Modify the axios.put request to send the updated data
        axios
            .put(`http://localhost:3000/users/edit/${id}`, formData)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Broker edited successfully', { variant: 'success' });
                navigate('/SystemAdmin');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error editing broker', { variant: 'error' });
                console.log(error);
            });
    };

    useEffect(() => {
        // Fetch broker details and set them to state
        axios.get(`http://localhost:3000/users/${id}`)
            .then(response => setFormData(response.data))
            .catch(error => console.log(error));
    }, [id]);

    return (
        <div className=' bg-gray-100'>
            <Header/>
            <div className='flex'>
                <Link to='/SystemAdmin' className='m-4 bg-blue-500 text-white px-4 py-1 rounded-lg w-fit'>
                    <BsArrowLeft className='text-2xl' />
                    <span className='m-4 hover:after:bg-blue-500 hover:content-["Go Back"] hover:bg-opacity-100 hover:px-2 hover:rounded-lg hover:w-fit hover:inline-block hover:transform hover:-translate-x-2 hover:transition-transform hover:duration-300'>Go Back</span>
                </Link>
            </div>
            <h1 className='text-3xl m-4 my-4'>Edit Broker</h1>
            {loading ? <Spinner /> : ''}
            <form className="m-5 max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-2 border-gray-300 rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-2 border-gray-300 rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border-2 border-gray-300 rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="u_type" className="block text-gray-700">User Type</label>
                    <select
                        name="u_type"
                        id="u_type"
                        value={formData.u_type}
                        onChange={handleChange}
                        className="border-2 border-gray-300 rounded w-full py-2 px-3"
                    >
                        <option value="" disabled>Select User Type</option>
                        <option value="admin">Admin</option>
                        <option value="client">Client</option>
                        <option value="broker">Broker</option>
                    </select>
                </div>
                {formData.u_type === "broker" && (
                    <div>
                        <div className="mb-4">
                            <label htmlFor="contact.authorization" className="block text-gray-700">Authorization</label>
                            <input
                                type="text"
                                name="contact.authorization"
                                value={formData.contact.authorization}
                                onChange={handleChange}
                                className="border-2 border-gray-300 rounded w-full py-2 px-3"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contact.phone" className="block text-gray-700">Phone</label>
                            <input
                                type="text"
                                name="contact.phone"
                                value={formData.contact.phone}
                                onChange={handleChange}
                                className="border-2 border-gray-300 rounded w-full py-2 px-3"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contact.company" className="block text-gray-700">Company</label>
                            <input
                                type="text"
                                name="contact.company"
                                value={formData.contact.company}
                                onChange={handleChange}
                                className="border-2 border-gray-300 rounded w-full py-2 px-3"
                            />
                        </div>
                    </div>
                )}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Save User
                </button>
            </form>
        </div>
    );
};

export default EditBroker;
