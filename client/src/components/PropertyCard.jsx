import React, {useState} from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { FaBed } from 'react-icons/fa';
import { FaBath } from 'react-icons/fa';
import PropertyPopup from "../helpers/PropertyPopup.jsx";

const PropertyCard = ({ propertyID, ownerID, property, saleType, propertyIMG }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const {
    img_url,
    size,
    price,
    bedrooms,
    bathrooms,
    h_type,
    s_type,
    address,
  } = property;

  const handleDoubleClick = () => {
    setSelectedProperty(property);
    setPopupVisible(true);
     console.log("Property owner: ",ownerID);
  };


  return (
    <div onDoubleClick={handleDoubleClick}>
    <div className="max-w-sm rounded overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl m-1">
    <div className={`max-w-sm w-full sm:w-full lg:w-full py-3 px-4`}>
      <div className='bg-white shadow-xl rounded-lg overflow-hidden'>
        <div className='bg-cover bg-center h-56 p-4' style={{ backgroundImage: `url(${img_url})` }}>
          <div className='flex justify-end'>
            <BsInfoCircle className='text-2xl text-white fill-current' />
          </div>
        </div>
        <div className='p-4'>
          <p className='uppercase tracking-wide text-sm font-bold text-gray-700'>{`${h_type} • ${size}`}</p>
          <h2 className='text-3xl text-gray-900'>{`$${price}${s_type === 'rent' ? '/month' : ''}`}</h2>
          <p className='text-gray-700 mr-10'>{`${address.street_number} ${address.street_name}, ${address.postal_code}, ${address.province}, ${address.country}`}</p>
        </div>
        <div className='flex p-4 border-t border-gray-300 text-gray-700'>
          <div className='flex-1 inline-flex items-center'>
          <FaBed className='h-6 w-6 text-gray-600 fill-current mr-3' />
            <p><span className='text-gray-900 font-bold'>{bedrooms}</span> Bedrooms</p>
          </div>
          <div className='flex-1 inline-flex items-center'>
          <FaBath className='h-6 w-6 text-gray-600 fill-current mr-3' />
            <p><span className='text-gray-900 font-bold'>{bathrooms}</span> Bathrooms</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    {isPopupVisible && <PropertyPopup ownerID={property.owner} propertyID={property._id} saleType={property.s_type} propertyIMG={property.img_url}  onClose={() => setPopupVisible(false)} />}
    </div>
  );
};

export default PropertyCard;