import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useUserContext } from '../context/userContext.jsx';

const CreatePropertyForm = () => {
    const { user, logout } = useUserContext();
    console.log(user);

    const [formData, setFormData] = useState({
        size: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        img_url: '',
        address: {
            country: 'Canada',
            province: '',
            street_number: '',
            street_name: '',
            postal_code: '',
        },
        h_type: '',
        s_type: 'sale',
        owner: user._id, // You need to set this value based on authentication

    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address.')) {
            const addressField = name.split('address.')[1];
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [addressField]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log('Form data to be submitted:', formData);
        // Create a data object with the property details
        const data = {
            size: formData.size,
            price: formData.price,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            img_url: formData.img_url,
            address: formData.address,
            h_type: formData.h_type,
            s_type: formData.s_type,
            owner: user._id,
        };
        console.log(data);

        axios
            .post('http://localhost:3000/properties', data) // Replace with your API endpoint
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Property Created successfully', { variant: 'success' });
                navigate('/Broker');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', { variant: 'error' });
                console.error(error);
            });
    };
    return (
        <div className='m-10 flex flex-col min-h-screen bg-gray-100'>
            <BackButton/>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label htmlFor="size" className="block text-gray-700">Size</label>
                    <select
                        name="size"
                        id="size"
                        value={formData.size}
                        onChange={handleChange}
                        className="border-2 border-gray-300 rounded w-full py-2 px-3"
                    >
                        <option value="" disabled>
                            Select Size
                        </option>
                        <option value="1.5">1.5</option>
                        <option value="2.5">2.5</option>
                        <option value="3.5">3.5</option>
                        <option value="4.5">4.5</option>
                        <option value="5.5">5.5</option>
                        <option value="6.5">6.5</option>
                        <option value="7.5">7.5</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border-2 border-gray-300 rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="bedrooms" className="block text-gray-700">Bedrooms</label>
                    <input
                        type="number"
                        name="bedrooms"
                        id="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        className="border-2 border-gray-300 rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="bathrooms" className="block text-gray-700">Bathrooms</label>
                    <input
                        type="number"
                        name="bathrooms"
                        id="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        className="border-2 border-gray-300 rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="img_url" className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="img_url"
                        id="img_url"
                        value={formData.img_url}
                        onChange={handleChange}
                        className="border-2 border-gray-300 rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="address.street_number"
                            value={formData.address.street_number}
                            onChange={handleChange}
                            placeholder="Street Number"
                            className="border-2 border-gray-300 rounded w-full py-2 px-3"
                        />
                        <input
                            type="text"
                            name="address.street_name"
                            value={formData.address.street_name}
                            onChange={handleChange}
                            placeholder="Street Name"
                            className="border-2 border-gray-300 rounded w-full py-2 px-3"
                        />
                        <input
                            type="text"
                            name="address.postal_code"
                            value={formData.address.postal_code}
                            onChange={handleChange}
                            placeholder="Postal Code"
                            className="border-2 border-gray-300 rounded w-full py-2 px-3"
                        />
                        <select
                            name="address.province"
                            value={formData.address.province}
                            onChange={handleChange}
                            className="border-2 border-gray-300 rounded w-full py-2 px-3"
                        >
                            <option value="" disabled>
                                Select Province
                            </option>
                            <option value="Alberta">Alberta</option>
                            <option value="British Columbia">British Columbia</option>
                            <option value="Manitoba">Manitoba</option>
                            <option value="New Brunswick">New Brunswick</option>
                            <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                            <option value="Nova Scotia">Nova Scotia</option>
                            <option value="Ontario">Ontario</option>
                            <option value="Prince Edward Island">Prince Edward Island</option>
                            <option value="Quebec">Quebec</option>
                            <option value="Saskatchewan">Saskatchewan</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="h_type" className="block text-gray-700">Housing Type</label>
                    <select
                        name="h_type"
                        id="h_type"
                        value={formData.h_type}
                        onChange={handleChange}
                        className="border-2 border-gray-300 rounded w-full py-2 px-3"
                    >
                        <option value="" disabled>
                            Select Housing Type
                        </option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Condo">Condo</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Studio">Studio</option>
                        <option value="Loft">Loft</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="s_type" className="block text-gray-700">Selling Type</label>
                    <select
                        name="s_type"
                        id="s_type"
                        value={formData.s_type}
                        onChange={handleChange}
                        className="border-2 border-gray-300 rounded w-full py-2 px-3"
                    >
                        <option value="sale">Sale</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                    Save Property
                </button>
            </form>
        </div>
    );
};

export default CreatePropertyForm;