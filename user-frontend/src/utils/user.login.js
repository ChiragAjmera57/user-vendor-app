import axios from 'axios';

export function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    const apiUrl = 'http://localhost:8080/login';
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
        localStorage.setItem('user-token', response.data.token);
        resolve(response.data); // Resolve the promise with the response data
      })
      .catch((error) => {
        reject(error.response.data); // Reject the promise with the error data
      });
  });
}




