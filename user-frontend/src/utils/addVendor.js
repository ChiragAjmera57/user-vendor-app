import axios from 'axios';

export const addVendorToUserList = async ( vendorEmail) => {
  const apiUrl = 'http://localhost:8080/add-vendor';
  const token = localStorage.getItem('user-token');
  const requestData = {
    vendorEmail: vendorEmail,
  };

  // Set the Authorization header with the user's token
  const headers = {
    Authorization: token,
  };

  // Make a POST request to the server
  return await axios.post(apiUrl, requestData, { headers })
    .then((response) => {
      console.log('Vendor added to user list:', response.data);
      // Handle success - You can navigate to another page or display a success message.
    })
    .catch((error) => {
      console.error('Add vendor error:', error.response.data);
      // Handle error - Display an error message or take appropriate action.
      throw error; // Rethrow the error for further handling in your application
    });
}
