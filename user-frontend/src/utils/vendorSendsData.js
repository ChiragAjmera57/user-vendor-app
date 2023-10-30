import axios from 'axios';

// Function to send data from a vendor to a user
const sendVendorData = async (userId, productName, quantity, dateOfShipping, schedule1, schedule2, schedule3) => {
  // Get the token from local storage
  const token = localStorage.getItem('vendor-token');
  if (!token) {
    return Promise.reject('Vendor token not found in local storage.');
  }

  const apiUrl = 'http://localhost:8080/send-data-vendor'; // Replace with your actual API endpoint

  return new Promise(async (resolve, reject) => {
    try {
      // Define the request body
      const requestBody = {
        userId,
        productName,
        quantity,
        dateOfShipping,
        schedule1,
        schedule2,
        schedule3,
      };
      console.log(requestBody);

      // Set the request headers, including the vendor's JWT token
      const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
      };

      // Make the POST request to the server
      const response = await axios.post(apiUrl, requestBody, { headers });

      // Handle success and resolve the promise
      console.log('Data sent successfully:', response.data);
      resolve(response.data);

    } catch (error) {
      // Handle errors and reject the promise with the error
      console.error('Error sending data:', error);
      reject(error);
    }
  });
};

export default sendVendorData;
