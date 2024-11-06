import express from 'express';
import { reqVisit } from '../models/requestVisitModel.js';

const reqVisitRouter = express.Router();

// Create a new visit request
reqVisitRouter.post('/request', async (req, res) => {
  try {
    const { client, property, broker, requestedDate } = req.body;

    const visitRequest = new reqVisit({ client, property, broker, requestedDate });
    await visitRequest.save();
    
    res.status(201).json({ message: 'Visit request created successfully!', visitRequest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all visit requests
reqVisitRouter.get('/', async (req, res) => {
  try {
    const visitRequests = await reqVisit.find();
    res.json(visitRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific visit request by ID
reqVisitRouter.get('/:id', async (req, res) => {
  try {
    const visitRequest = await reqVisit.findById(req.params.id);
    if (!visitRequest) {
      return res.status(404).json({ error: 'Visit request not found' });
    }
    res.json(visitRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all visit requests by userID
reqVisitRouter.get('/user/:client', async (req, res) => {
  try {
    const client = req.params.client;
    const visitRequests = await reqVisit.find({ client });
    res.status(200).json(visitRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a visit request by ID
reqVisitRouter.put('/:id', async (req, res) => {
  try {
    const visitRequest = await reqVisit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!visitRequest) {
      return res.status(404).json({ error: 'Visit request not found' });
    }
    res.json(visitRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a visit request by ID
reqVisitRouter.delete('/:id', async (req, res) => {
  try {
    const visitRequest = await reqVisit.findByIdAndDelete(req.params.id);
    if (!visitRequest) {
      return res.status(404).json({ error: 'Visit request not found' });
    }
    res.json({ message: 'Visit request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// accept visit
reqVisitRouter.put('/accept-visit-request/:id', async (req, res) => {
  try {
    const visitRequest = await reqVisit.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
    res.json(visitRequest);
  } catch (error) {
    console.error('Error accepting visit request', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//refuse visit
reqVisitRouter.put('/refuse-visit-request/:id', async (req, res) => {
  try {
    const visitRequest = await reqVisit.findByIdAndUpdate(req.params.id, { status: 'refused' }, { new: true });
    res.json(visitRequest);
  } catch (error) {
    console.error('Error refusing visit request', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default reqVisitRouter;
