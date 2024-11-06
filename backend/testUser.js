import axios from 'axios';
const requestedDate = new Date('2023-12-01T10:00:00');
// Function to create a test user
const createTestUser = async () => {
  const testUser = {
    name: 'Test User',
    email: 'testuser90232323@example.com',
    password: 'testpassword',
    u_type: 'client',
  };

  try {
    // Create a new user
    const response = await axios.post('http://localhost:3000/users/client/register', testUser);
    console.log('User creation successful:', response.data);

    const loginCred = {
    email: testUser.email,
    password: testUser.password
    };

   
    const loginResponse = await axios.post('http://localhost:3000/users/login', loginCred);

    const token = loginResponse.data.token;
    console.log("JWT: ", token);

    const userDecoded = await axios.post(`http://localhost:3000/verify/${token}`);

    const userData  = userDecoded.data;

    console.log("User Data Decoded:", userData);

   const userId = userData.decoded._id;

   console.log("User ID:", userId);

    // Check if the user exists
    const userResponse = await axios.get(`http://localhost:3000/users/${userId}`);
    console.log('User retrieval after creation:', userResponse.data);

    // const visitRequestData = {
    //   client: userId,
    //   property: '653d93242f826e26d6ba5847', // Replace with an actual property ID
    //   broker: '654d2ef094b1456c7edffe92', // Replace with an actual broker ID
    //   requestedDate: requestedDate
    // };
    // console.log(visitRequestData);
    // const requestVisitResponse = await axios.post('http://localhost:3000/reqVisit/request', visitRequestData);
    // console.log('Request visit creation successful:');


    // Delete the user
    const deleteResponse = await axios.delete(`http://localhost:3000/users/${userId}`);
    console.log('User deletion successful:', deleteResponse.data);

    // Check if the user is deleted
    try {
      await axios.get(`http://localhost:3000/users/${userId}`);
      console.error('User still exists after deletion!');
    } catch (error) {
      console.log('User not found after deletion:');
    }
  } catch (error) {
    console.error('User creation failed:');
  }
};

// Call the function to create a test user and perform deletion check
createTestUser();
