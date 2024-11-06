import React, { useEffect, useState } from 'react';
import Axios from 'axios'; // Make sure to import Axios
import SubmittedOffer from './submittedOffer.jsx'; // Assuming this component is correctly named and located
import { useUserContext } from '../context/userContext.jsx';
import HeaderNav from './HeaderNav.jsx';
import Footer from './Footer.jsx';

const SubmittedOffersList = ( ) => {
  const { user } = useUserContext();
  const [offers, setOffers] = useState(null);
  
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await Axios.get(`http://localhost:3000/offer/user/${user._id}`);
        setOffers(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching offer:', error);
      }
    };
  
    fetchOffers(); // Call the async function inside useEffect
  
  }, [user._id]); // Add user._id as a dependency to useEffect

  return (
    <div>
      <HeaderNav/>
    <div className="mt-4">
         <strong>Submitted Offers</strong>
      {offers ? (
        offers.map((offer) => (
          <SubmittedOffer key={offer._id} offer={offer} />
        ))
      ) : (
        <p>No submitted offers available.</p>
      )}
    </div>
    <Footer/>
    </div>
  );
};
export default SubmittedOffersList;
