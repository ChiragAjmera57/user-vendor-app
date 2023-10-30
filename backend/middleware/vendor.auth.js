const jwt = require('jsonwebtoken');
const Vendor = require('../modal/vender.modal');

const authenticateVendor = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  try {
    const decoded = jwt.verify(token, 'CHIRAG24'); // Use your secret key

    // Find the vendor by ID from the token
    const vendor = await Vendor.findById(decoded.vendorId);

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found.' });
    }

    req.vendor = vendor; // Attach the vendor to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateVendor;
