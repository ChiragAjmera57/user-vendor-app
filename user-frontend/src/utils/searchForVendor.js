import axios from 'axios';

// Function to search for a vendor
export const searchVendor = async (vendorEmail) => {
  const token = localStorage.getItem('user-token');
  const apiUrl = 'http://localhost:8080/search-vendor';

  try {
    const response = await axios.get(apiUrl, {
      params: { vendorEmail }, // Add vendorEmail as a query parameter
      headers: {
        Authorization: token, // Set the Authorization header with the token
      },
    });

    // Handle the response data here
    console.log('Search result:', response.data);
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error('Search error:', error);
    throw error;
  }
};
