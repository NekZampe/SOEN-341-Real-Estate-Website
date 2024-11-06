import React from 'react'
import moment from 'moment';

const SubmittedOffer = ({ offer }) => {
  const { 
    propertyId, offerAmount, offerType, additionalTerms, status, createdAt
  } = offer;

  return (
  
    <div className="flex border-b border-gray-300 py-2">
      <div className="w-1/4 px-4">
        <strong>Property ID</strong>: {propertyId}
      </div>
      <div className="w-1/4 px-4">
        <strong>Offer Amount</strong>: {offerAmount}
      </div>
      <div className="w-1/4 px-4">
        <strong>Offer Type</strong>: {offerType}
      </div>
      <div className="w-1/4 px-4">
        <strong>Additional Terms</strong>: {additionalTerms}
      </div>
      <div className="w-1/4 px-4">
        <strong>Status</strong>: {status}
      </div>
      <div className="w-1/4 px-4">
        <strong>Created At</strong>: {moment(createdAt).format('MMMM D, YYYY')}
      </div>
    </div>
  );
};

export default SubmittedOffer;
