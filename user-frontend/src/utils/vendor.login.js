import axios from 'axios';

export function loginVendor(email, password) {
  return new Promise((resolve, reject) => {
    const apiUrl = 'http://localhost:8080/vendor/login';
    const userData = {
      email: email,
      password: password,
    };

    // Make a POST request to the server
    axios
      .post(apiUrl, userData)
      .then((response) => {
        // Store the token in local storage
        console.log(response);
        localStorage.setItem('vendor-token', response.data.token);
        resolve(response.data); // Resolve the promise with the response data
      })
      .catch((error) => {
        console.log(error);
        reject(error.response.data); // Reject the promise with the error data
      });
  });
}




