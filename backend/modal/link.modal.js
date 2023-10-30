const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vendors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
    },
  ],
  downloadLink: {
    type: String,
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
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
