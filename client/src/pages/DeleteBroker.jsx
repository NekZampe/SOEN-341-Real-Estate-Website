import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const DeleteBroker = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const HandleDeleteBroker = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:3000/users/delete/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Broker Deleted successfully', { variant: 'success' });
                navigate('/SystemAdmin');
            })
            .catch((error) => {
                setLoading(false);
                // alert('An error happened. Please Chack console');
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
    };



    return (
        <div className='p-4 bg-gray-100'>
            <div className='flex'>
                <Link to='/SystemAdmin' className='bg-blue-500 text-white px-4 py-1 rounded-lg w-fit'>
                    <BsArrowLeft className='text-2xl' />
                    <span className='hover:after:bg-blue-500 hover:content-["Go Back"] hover:bg-opacity-100 hover:px-2 hover:rounded-lg hover:w-fit hover:inline-block hover:transform hover:-translate-x-2 hover:transition-transform hover:duration-300'>Go Back</span>
                </Link>
            </div>
            <h1 className='text-3xl my-4'>Delete Broker</h1>
            {loading ? <Spinner /> : ''}
            <div className='p-6 bg-white border text-white border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-w-md mx-auto'>
                <h3 className='text-2xl text-center text-white-600 mb-4'>
                    Are you sure you want to delete this Broker?
                </h3>

                <button
                    className='p-4 bg-red-600 text-white w-full rounded-md hover:bg-red-700 focus:outline-none'
                    onClick={HandleDeleteBroker}
                >
                    Yes, Delete It
                </button>
            </div>

        </div>
    )
}

export default DeleteBroker