import axios from 'axios';

export function signUpVendor(email, name, password) {
  return new Promise((resolve, reject) => {
    const apiUrl = 'http://localhost:8080/vendor/signup';
    const userData = {
      email: email,
      name: name,
      password: password,
    };

    // Make a POST request to the server
    axios
      .post(apiUrl, userData)
      .then((response) => {
        // Handle success - You can navigate to another page or display a success message.
        console.log(response);
        resolve(response.data); // Resolve the promise with the response data
      })
      .catch((error) => {
        // Handle error - Display an error message or take appropriate action.
        console.log(error);
        reject(error.response.data); // Reject the promise with the error data
      });
  });
}


