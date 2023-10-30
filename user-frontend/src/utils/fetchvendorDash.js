export function fetchVendorDashboardData() {
    return new Promise((resolve, reject) => {
      // Get the vendor token from localStorage
      const authToken = localStorage.getItem('vendor-token');
  
      if (!authToken) {
        reject(new Error('Vendor is not authenticated.'));
        return;
      }
  
      // Define the headers, including the authorization token
      const headers = {
        Authorization: authToken,
      };
  
      // Make the GET request
      fetch('http://localhost:8080/api/vendor/dashboard', { headers })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch vendor dashboard data from the server.');
          }
          return response.json();
        })
        .then((data) => {
          resolve(data.data); // Resolve the Promise with the response data
        })
        .catch((error) => {
          reject(error); // Reject the Promise with the error
        });
    });
  }
  