const jwt = require('jsonwebtoken');

// Define the secret key for JWT
const secretKey = 'CHIRAG57'; // Replace with the same secret key used for token generation

function authenticateUser(req, res, next) {
  // Get the token from the request headers
  const token = req.header('Authorization');

  // Check if a token is provided
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Set the user information in the request object
    req.user = {
      userId: decoded.userId, // Modify this to match your user schema
    };

    next(); // Move to the next middleware or route
  } catch (error) {
    res.status(401).json({ message: 'Invalid token. Access denied.' });
  }
}

module.exports = authenticateUser;
