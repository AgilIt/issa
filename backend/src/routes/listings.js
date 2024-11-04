const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// Get all listings with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, city } = req.query;
    const filter = {};
    
    if (category && category !== 'Tous') {
      filter.category = category;
    }
    if (city) {
      filter.city = new RegExp(city, 'i');
    }
    
    const listings = await Listing.find(filter).sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new listing
router.post('/', async (req, res) => {
  try {
    const listing = new Listing({
      ...req.body,
      userId: req.body.userId // In production, get this from auth middleware
    });
    
    const newListing = await listing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;