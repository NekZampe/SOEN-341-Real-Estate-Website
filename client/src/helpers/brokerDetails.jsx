import React from "react";

const BrokerDetails = ({ broker }) => {
  if (!broker) {
    return <div>No broker details available</div>;
  }

  const { name, email, contact } = broker;
  const { authorization, phone, company } = contact;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-h-96 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">Broker Details</h2>
      <div className="mb-4">
        <span className="font-semibold">Name:</span> {name}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Email:</span> {email}
      </div>
      <div className="mb-4">
        <span className="font-semibold">License:</span> {authorization}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Phone:</span> {phone}
      </div>
      <div>
        <span className="font-semibold">Company:</span> {company}
      </div>
    </div>
  );
};

export default BrokerDetails;


