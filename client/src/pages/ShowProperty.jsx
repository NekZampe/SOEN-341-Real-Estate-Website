import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import PropertyCard from '../components/PropertyCard';

const ShowProperty = () => {
    const [property, setProperty] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/properties/${id}`)
            .then((response) => {
                setProperty(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false); 
            });
    }, [id]);

    return (
            <div className='m-10 flex flex-col min-h-screen bg-gray-100'>
                <BackButton />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='p-4 h-screen flex justify-center items-center'>
                        <PropertyCard property={property} />
                    </div>
                )}
            </div>
    );
}


export default ShowProperty;