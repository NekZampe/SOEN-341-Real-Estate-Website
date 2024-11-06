import React, { useState } from 'react';

const OfferForm = ({ onRequest }) => {
  const [offerData, setOfferData] = useState({
    propertyId: '',
    userId: '',
    offerAmount:'',
    saleType: '',
    additionalTerms:'',
    status: 'pending',
  });
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
   
    onRequest(offerData);
  };

    return (
        <div className=" max-w-md mx-auto p-4">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-300 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="offerAmount" className="block text-sm font-medium text-gray-600">Offer Amount</label>
              <input
  type="number"
  id="offerAmount"
  value={offerData.offerAmount}
  onChange={(e) => setOfferData({ ...offerData, offerAmount: e.target.value })}
  required
  className="mt-1 p-2.5 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
/>
            </div>
            <div className="mb-4">
              <label htmlFor="additionalTerms" className="block text-sm font-medium text-gray-600">Additional Terms</label>
              <textarea
  id="additionalTerms"
  value={offerData.additionalTerms}
  onChange={(e) => setOfferData({ ...offerData, additionalTerms: e.target.value })}
  className="mt-1 p-2.5 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
/>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm py-2.5"
            >
              Submit Offer
            </button>
          </form>
        </div>
      );
      
};

export default OfferForm;
