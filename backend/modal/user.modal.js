const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  vendors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor', // Reference to the Vendor model
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
