import express from 'express';
import { SavedProperty } from '../models/savedPropertyModel.js';

const savedPropertyRouter = express.Router();

// Create a new saved property entry
savedPropertyRouter.post('/', async (req, res) => {
  try {
    const { user, propertyIds } = req.body;

    const savedProperty = new SavedProperty({ user, propertyIds });
    await savedProperty.save();

    res.status(201).json({ message: 'Saved property entry created successfully!', savedProperty });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all saved property entries
savedPropertyRouter.get('/', async (req, res) => {
  try {
    const savedProperties = await SavedProperty.find();
    res.json(savedProperties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get saved property entry by user ID
savedPropertyRouter.get('/user/:id', async (req, res) => {
  try {
    const userSavedProperties = await SavedProperty.find({ user: req.params.id });
    res.json(userSavedProperties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update saved property entry by ID
savedPropertyRouter.put('/:id', async (req, res) => {
  try {
    const savedProperty = await SavedProperty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!savedProperty) {
      return res.status(404).json({ error: 'Saved property entry not found' });
    }
    res.json(savedProperty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete saved property entry by ID
savedPropertyRouter.delete('/:id', async (req, res) => {
  try {
    const savedProperty = await SavedProperty.findByIdAndDelete(req.params.id);
    if (!savedProperty) {
      return res.status(404).json({ error: 'Saved property entry not found' });
    }
    res.json({ message: 'Saved property entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default savedPropertyRouter;
