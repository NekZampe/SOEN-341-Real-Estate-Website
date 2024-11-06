import axios from 'axios';

// Function to create a test property
const createTestProperty = async () => {
  const testProperty = {
    size: '3.5',
    price: 150000,
    bedrooms: 3,
    bathrooms: 2,
    img_url: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
    address: {
      country: 'Canada',
      province: 'Ontario',
      street_number: '123',
      street_name: 'Main Street',
      postal_code: 'M1M 1M1',
    },
    h_type: 'House',
    s_type: 'sale',
    owner: '653d88ef6f9de0138f28d11a', // Replace USER_ID with the actual user ID from your database
  };

  try {
    // Create a new property
    const createResponse = await axios.post('http://localhost:3000/properties/', testProperty);
    console.log('Property creation successful:', createResponse.data);

    // Retrieve the created property's ID
    const propertyId = createResponse.data._id;

    // Retrieve the property after creation
    const retrieveResponse = await axios.get(`http://localhost:3000/properties/${propertyId}`);
    console.log('Property retrieval after creation:', retrieveResponse.data);

    // Update the property
    const updatedProperty = { ...testProperty, price: 160000 };
    const updateResponse = await axios.put(`http://localhost:3000/properties/${propertyId}`, updatedProperty);
    console.log('Property update successful:', updateResponse.data);

    // Check if the property is updated
    const updatedRetrieveResponse = await axios.get(`http://localhost:3000/properties/${propertyId}`);
    console.log('Property retrieval after update:', updatedRetrieveResponse.data);

    // Delete the property
    const deleteResponse = await axios.delete(`http://localhost:3000/properties/${propertyId}`);
    console.log('Property deletion successful:', deleteResponse.data);

    // Check if the property is deleted
    try {
      await axios.get(`http://localhost:3000/properties/${propertyId}`);
      console.error('Property still exists after deletion!');
    } catch (error) {
      console.log('Property not found after deletion OKAY');
    }
  } catch (error) {
    console.error('Property creation failed:', error.response.data);
  }
};

// Call the function to create a test property and perform checks
createTestProperty();