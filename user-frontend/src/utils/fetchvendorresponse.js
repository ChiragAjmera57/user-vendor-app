export function fetchVendorResponse() {
    return new Promise((resolve, reject) => {
      // Get the vendor token from localStorage
      const authToken = localStorage.getItem('user-token');
  
      if (!authToken) {
        reject(new Error('user is not authenticated.'));
        return;
      }
  
      // Define the headers, including the authorization token
      const headers = {
        Authorization: authToken,
      };
  
      // Make the GET request
      fetch('http://localhost:8080/user-to-user-data', { headers })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch vendor dashboard data from the server.');
          }
          console.log(response);
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
  