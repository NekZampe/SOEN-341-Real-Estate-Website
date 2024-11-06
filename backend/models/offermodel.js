import mongoose from "mongoose";
import { User } from "./usermodel.js";
import {Property} from "./propertymodel.js"

const offerSchema = new mongoose.Schema({

  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Property, // Reference to the Property model
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, // Reference to the User model
    required: true
  },
  offerAmount: {
    type: Number,
    required: true
  },
  offerType: {
    type: String,
    enum: ['sale', 'rent'], // Offer type can be either 'buy' or 'rent'
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  additionalTerms: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Offer = mongoose.model('Offer', offerSchema);

