import React from 'react';
import moment from 'moment';

const VisitRequest = ({ request }) => {
  const { client, property, broker, requestedDate, status } = request;

  return (
    <div className="flex border-b border-gray-300 py-2">
      <div className="w-1/4 px-4">
        <strong>Client</strong>: {client}
      </div>
      <div className="w-1/4 px-4">
        <strong>Property</strong>: {property} 
      </div>
      <div className="w-1/4 px-4">
        <strong>Broker</strong>: {broker}
      </div>
      <div className="w-1/4 px-4">
        <strong>Requested Date</strong>: {moment(requestedDate).format('MMMM D, YYYY, h:mm A')}
      </div>
      <div className="w-1/4 px-4">
        <strong>Status</strong>: {status}
      </div>
    </div>
  );
};

export default VisitRequest;
