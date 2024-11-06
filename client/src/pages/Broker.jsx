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
import moment from 'moment';

const Broker = () => {
  const [properties, setProperties] = useState([]);
  const [visitRequests, setVisitRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useUserContext();
  const [propertyData, setPropertyData] = useState([]);

  const handleAccept = async (index) => {
    try {
      const response = await axios.put(`http://localhost:3000/requestVisit/accept-visit-request/${visitRequests[index]._id}`);
      console.log(`Accepted request at index ${index}`, response.data);

      //update
      const updatedVisitRequests = [...visitRequests];
      updatedVisitRequests[index].status = 'accepted';
      setVisitRequests(updatedVisitRequests);
    } catch (error) {
      console.error(`Error accepting request at index ${index}`, error);
    }
  };
  const handleAcceptOffer = async (index) => {
    try {
      const offerId = offers[index]._id;
  
      const response = await axios.put(`http://localhost:3000/offer/${offerId}`, {
        status: 'accepted',
      });
  
      console.log(`Accepted offer at index ${index}`, response.data);
  
      // Update state
      const updatedOffers = [...offers];
      updatedOffers[index].status = 'accepted';
      setOffers(updatedOffers);
    } catch (error) {
      console.error(`Error accepting offer at index ${index}`, error);
    }
  };
  
  const handleRefuse = async (index) => {
    try {
      const response = await axios.put(`http://localhost:3000/requestVisit/refuse-visit-request/${visitRequests[index]._id}`);
      console.log(`Refused request at index ${index}`, response.data);

      // update in UI
      const updatedVisitRequests = [...visitRequests];
      updatedVisitRequests[index].status = 'refused';S
      setVisitRequests(updatedVisitRequests);
    } catch (error) {
      console.error(`Error refusing request at index ${index}`, error);
    }
  };

  const handleRefuseOffer = async (index) => {
    try {
      const offerId = offers[index]._id;
  
      const response = await axios.put(`http://localhost:3000/offer/${offerId}`, {
        status: 'rejected',
      });
  
      console.log(`rejected offer at index ${index}`, response.data);
  
      // Update state
      const updatedOffers = [...offers];
      updatedOffers[index].status = 'rejected';
      setOffers(updatedOffers);
    } catch (error) {
      console.error(`Error refusing offer at index ${index}`, error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const propertiesResponse = await axios.get(`http://localhost:3000/properties/properties/${user._id}`);
        setProperties(propertiesResponse.data);

        const visitRequestsResponse = await axios.get(`http://localhost:3000/requestVisit`);
        const filteredRequests = visitRequestsResponse.data.filter((request) => request.broker === user._id);
        setVisitRequests(filteredRequests);

        const propertyDataPromises = filteredRequests.map((request) =>
          axios.get(`http://localhost:3000/properties/${request.property}`)
        );

        const propertyData = await Promise.all(propertyDataPromises);
        setPropertyData(propertyData);

        const usersResponse = await axios.get(`http://localhost:3000/users`);
        const filteredUsers = usersResponse.data.filter((request) => request.broker === user._id);
        setUsers(filteredUsers);

        const offersResponse = await axios.get(`http://localhost:3000/offer`);
        setOffers(offersResponse.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user, setPropertyData, setUsers, setOffers]);

  return (
    <div className="body">
      <Header />
      <Link to="/properties/create">
        <div className="flex justify-center items-center p-5">
          <button
            type="button"
            className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Create Property
          </button>
        </div>
      </Link>
      {loading ? (
        <Spinner />
      ) : (
        <div className="parent">
          <div className="div1 m-4 rounded-lg ">
            <table className="m-4 border-solid text-sm text-left text-gray-500 dark:text-gray-400 rounded lg">
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
            <table className="text-sm text-left m-4 text-gray-500 dark:text-gray-400 rounded-lg">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse your current listings on PropertyHub that require your attention.
                </p>
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Request ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Requesting User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Postal Code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Requested On
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Accept
                  </th>
                </tr>
              </thead>
              <tbody>
                {visitRequests.map((request, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index}</td>
                    <td className="px-6 py-4">{request.client.slice(0, 5)}</td>
                    <td className="px-6 py-4">
                      {propertyData[index].data.address.postal_code}
                    </td>
                    <td className="px-6 py-4">
                      {moment(request.requestedDate).format('MMMM D, YYYY, h:mm A')}
                    </td>
                    <td className="px-6 py-4">
                      {request.status}
                    </td>
                    <td className="px-6 py-4">
                      {request.status === 'pending' && (
                        <>
                          <button onClick={() => handleAccept(index)} className="text-green-600 hover:underline">
                            Accept
                          </button>
                          <button onClick={() => handleRefuse(index)} className="text-red-600 hover:underline ml-2">
                            Refuse
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
            <table className="text-sm text-left m-4 text-gray-500 dark:text-gray-400 rounded-lg">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse your current listings on PropertyHub that require your attention.
                </p>
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Property address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Offer Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Submitted Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Additional terms
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer, index) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">{offer.propertyId}</td>
                    <td className="px-6 py-4">{offer.userId}</td>
                    <td className="px-6 py-4">{offer.offerAmount}</td>
                    <td className="px-6 py-4">{moment(offer.createdAt).format('MMMM D, YYYY, h:mm A')}</td>
                    <td className="px-6 py-4">{offer.additionalTerms}</td>
                    <td className="px-6 py-4">
                      {offer.status}
                    </td>
                    <td className="px-6 py-4">
                      {offer.status === 'pending' && (
                        <>
                          <button onClick={() => handleAcceptOffer(index)} className="text-green-600 hover:underline">
                            Accept
                          </button>
                          <button onClick={() => handleRefuseOffer(index)} className="text-red-600 hover:underline ml-2">
                            Reject
                          </button>
                        </>
                      )}
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

export default Broker;
