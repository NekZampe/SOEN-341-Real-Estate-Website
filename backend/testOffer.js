import axios from 'axios';

const createTestOffer = async () => {
  const testOffer = {
    propertyId: '654d2ef094b1456c7edffe92', // Replace with an actual property ID from your database
    userId: '653d88ef6f9de0138f28d11a', // Replace with an actual user ID from your database
    offerAmount: 200000, // Set the offer amount
    offerType: 'sale', // Set the offer type (sale or rent)
    additionalTerms: 'No additional terms', // Add any additional terms if required
  };

  try {
    // Create a new offer
    const offerResponse = await axios.post('http://localhost:3000/offer/new', testOffer);
    console.log('Offer creation successful:', offerResponse.data);

    // Retrieve the created offer
    const offerId = offerResponse.data._id;
    const retrieveResponse = await axios.get(`http://localhost:3000/offer/${offerId}`);
    console.log('Offer retrieval after creation:', retrieveResponse.data);

    // Update the offer (if needed)
    const updateResponse = await axios.put(`http://localhost:3000/offer/${offerId}`, {
      offerAmount: 220000, // Update the offer amount
    });
    console.log('Offer update successful:', updateResponse.data);

    // Delete the offer
    const deleteResponse = await axios.delete(`http://localhost:3000/offer/${offerId}`);
    console.log('Offer deletion successful:', deleteResponse.data);
  } catch (error) {
    console.error('Test failed:', error.response.data);
  }
};

// Call the function to create a test offer
createTestOffer();
