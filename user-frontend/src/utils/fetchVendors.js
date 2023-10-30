// api.js

import axios from 'axios';

// Define the base URL for your API
const baseURL = 'http://localhost:8080';
const token = localStorage.getItem('user-token');
// Function to fetch connected vendors
 const fetchConnectedVendors = async () => {
  try {
    const response = await axios.get(`${baseURL}/user/vendors`, {
      headers: {
        Authorization: token, // Include the user's token in the request headers
      },
    });

    return response.data.vendors;
  } catch (error) {
    throw error;
  }
};
export default fetchConnectedVendors;