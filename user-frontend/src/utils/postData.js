export function sendDataToServer(vendors, downloadLink, productName, quantity, dateOfShipping) {
    return new Promise((resolve, reject) => {
      // Get the user token from localStorage
      const authToken = localStorage.getItem('user-token');
  
      if (!authToken) {
        reject(new Error('User is not authenticated.'));
        return;
      }
  
      // Define the request body
      const requestBody = {
        vendors,
        downloadLink,
        productName,
        quantity,
        dateOfShipping,
      };
  
      // Define the headers, including the authorization token
      const headers = {
        'Content-Type': 'application/json',
        Authorization: authToken,
      };
  
      // Make the POST request
      fetch('http://localhost:8080/send-data', {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to send data to the server.');
          }
          return response.json();
        })
        .then((data) => {
          resolve(data); // Resolve the Promise with the response data
        })
        .catch((error) => {
          reject(error); // Reject the Promise with the error
        });
    });
  }
  