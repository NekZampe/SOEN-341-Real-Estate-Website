import express from 'express';
import { Offer } from '../models/offermodel.js';

const offerRouter = express.Router();

// Create a new offer
offerRouter.post('/new', async (req, res) => {
  try {
    const {
      propertyId,
      userId,
      offerAmount,
      offerType,
      additionalTerms,
      status
    } = req.body;

    // Create a new offer instance
    const newOffer = new Offer({
      propertyId,
      userId,
      offerAmount,
      offerType,
      additionalTerms,
      status: status || 'pending', // If status is not provided, default to 'pending'
    });

    // Save the offer to the database
    await newOffer.save();

    // Respond with the created offer
    res.status(201).json(newOffer);
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all offers
offerRouter.get('/', async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific offer by ID
offerRouter.get('/:offerId', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.offerId);
    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }
    res.status(200).json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get offers by userId
offerRouter.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const offers = await Offer.find({ userId });
    res.status(200).json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an offer by ID
offerRouter.put('/:offerId', async (req, res) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(req.params.offerId, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedOffer) {
      return res.status(404).json({ error: 'Offer not found' });
    }
    res.status(200).json(updatedOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an offer by ID
offerRouter.delete('/:offerId', async (req, res) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.offerId);
    if (!deletedOffer) {
      return res.status(404).json({ error: 'Offer not found' });
    }
    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default offerRouter;
