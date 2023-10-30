import axios from 'axios';

// Define the base URL for your API
const baseURL = 'http://localhost:8080';

// Function to make a GET request with the token
export const fetchSelfVendor = async () => {
  // Get the token from local storage
  const authToken = localStorage.getItem('vendor-token');

  if (!authToken) {
    // Handle the case when the token is not available in local storage
    throw new Error('Token not found in local storage.');
  }

  try {
    const response = await axios.get(`${baseURL}/toselfVendor`, {
      headers: {
        Authorization: authToken, // Include the user's token in the request headers
      },
    });

    return response.data; // You may return the data you receive
  } catch (error) {
    console.log(error);
    throw error;
  }
};
