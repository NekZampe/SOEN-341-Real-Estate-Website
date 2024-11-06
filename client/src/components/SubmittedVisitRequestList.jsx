import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import VisitRequest from './VisitRequest.jsx'; // Assuming this component is correctly named and located
import { useUserContext } from '../context/userContext.jsx';
import HeaderNav from './HeaderNav.jsx';
import Footer from './Footer.jsx';

const SubmittedVisitRequestsList = () => {
  const { user } = useUserContext();
  const [visitRequests, setVisitRequests] = useState(null);
  
  useEffect(() => {
    const fetchVisitRequests = async () => {
      try {
       
        const response = await Axios.get(`http://localhost:3000/requestVisit/user/${user._id}`);
        setVisitRequests(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching visit requests:', error);
      }
    };
  
    fetchVisitRequests(); // Call the async function inside useEffect
  
  }, [user._id]); // Add user._id as a dependency to useEffect

  return (
    <div>
      <HeaderNav/>
    <div className="mt-4">
      <strong>Visit Requests</strong>
      {visitRequests ? (
        visitRequests.map((request) => (
          <VisitRequest key={request._id} request={request} />
        ))
      ) : (
        <p>No visit requests available.</p>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default SubmittedVisitRequestsList;
