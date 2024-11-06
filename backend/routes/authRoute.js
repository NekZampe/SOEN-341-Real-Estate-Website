import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

const authRouter = express.Router();

authRouter.post('/:token', (req, res) => {
  const  token  = req.params.token;

  try {
    console.log("Received Token:", token);
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("DECODED", decoded);
    res.status(200).json({ decoded });
  } catch (error) {
    console.error("error token:", token);
    // Handle invalid or expired token here
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

export default authRouter;
