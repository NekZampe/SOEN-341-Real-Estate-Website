// PropertyDetails.js
import React from "react";

const PropertyDetails = ({ property }) => {
  if (!property) {
    return <div>No property details available</div>;
  }

  const { size, price, bedrooms, bathrooms, img_url, address, h_type, s_type} = property;
  const { country, province, street_number, street_name, postal_code } = address;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
      <div className="mb-4">
        <img src={img_url} alt="Property" className="max-w-full max-h-64 object-cover mb-2" />
      </div>
      <div className="mb-4">
        <span className="font-semibold">Size:</span> {size}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Price:</span> {price}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Bedrooms:</span> {bedrooms}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Bathrooms:</span> {bathrooms}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Address:</span> {street_number} {street_name}, {province}, {country}, {postal_code}
      </div>
      <div className="mb-4">
        <span className="font-semibold">House Type:</span> {h_type}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Sale Type:</span> {s_type}
      </div>
    </div>
  );
};

export default PropertyDetails;
