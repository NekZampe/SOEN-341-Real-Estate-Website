import React from 'react';
//import PropertyCards from '../components/PropertyCards';
import Footer from '../components/Footer'
import { Routes, Route } from 'react-router-dom';
//import SearchBar from '../components/searchBar';
//import { useUserContext } from '../context/userContext';
import PropertyFilter from '../helpers/propertyFilter';
import SubmittedOffersList from '../components/submittedOfferList.jsx'
import SubmittedVisitRequestsList from '../components/SubmittedVisitRequestList.jsx';
import BrokerCards from '../components/BrokersCards.jsx';
import HeaderNav from '../components/HeaderNav.jsx';

const ClientPage = () => {
  return (
    <div>
      <HeaderNav />
      <div className="text-center my-8">
  <h1 className="text-4xl font-bold text-gray-800">Welcome</h1>
</div>

      <Footer />
    </div>
  );
};

export default ClientPage;