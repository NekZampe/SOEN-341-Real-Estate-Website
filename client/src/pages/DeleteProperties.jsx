import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteProperties = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const HandleDeleteProperty = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:3000/properties/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Property Deleted successfully', { variant: 'success' });
                navigate('/Broker');
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
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Property</h1>
            {loading ? <Spinner /> : ''}
            <div className='p-6 bg-white border text-white border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-w-md mx-auto'>
                <h3 className='text-2xl text-center text-white-600 mb-4'>
                    Are you sure you want to delete this property?
                </h3>

                <button
                    className='p-4 bg-red-600 text-white w-full rounded-md hover:bg-red-700 focus:outline-none'
                    onClick={HandleDeleteProperty}
                >
                    Yes, Delete It
                </button>
            </div>

        </div>
    )
}

export default DeleteProperties