const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // Base64 encoded image
    required: true
  },
  city: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Immobilier', 'Véhicules', 'Emploi', 'Services']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});