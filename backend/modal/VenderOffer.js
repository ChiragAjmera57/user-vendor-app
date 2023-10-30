const mongoose = require('mongoose');

// Define a schema for the user data
const userToUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming you use ObjectIds for user IDs
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming you use ObjectIds for vendor IDs
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  dateOfShipping: {
    type: Date,
    required: true,
  },
  shippingDatesFromVendor: {
    schedule1: {
      type: Date,
      required: true,
    },
    schedule2: {
      type: Date,
      required: true,
    },
    schedule3: {
      type: Date,
      required: true,
    },
  },
});

// Create a model using the schema
const UserToUser = mongoose.model('UserToUser', userToUserSchema);

module.exports = UserToUser;
