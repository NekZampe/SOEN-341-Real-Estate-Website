import mongoose from "mongoose";
import {Property} from "./propertymodel"
import { User } from "./usermodel.js";

const savedPropertySchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User, // Reference to the User model
      required: true,
    },
    propertyIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Property, // Reference to the Property model
        required: true,
      }],
  });
  
  export const SavedProperty = mongoose.model('SavedProperty', savedPropertySchema);