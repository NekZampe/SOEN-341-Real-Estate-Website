import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

const decodeJWT = (token) => {
  console.log("Received Token:", token);
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("DECODED", decoded);
    return decoded;
  } catch (error) {
    console.error("error token:", token);
    // Handle invalid or expired token here
    throw new Error('Error');
  }
};

export { decodeJWT };

