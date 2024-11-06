import mongoose from "mongoose";
import  { Property } from "./propertymodel.js"
import { User } from "./usermodel.js";

const reqVisitSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true 
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Property,
        required: true 
    },
    broker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true // Reference to the broker associated with the property
    },
    requestedDate: {
        type: Date,
        required: true // Date and time of the visit request
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending' // Status of the request
    }
});

export const reqVisit = mongoose.model('reqVisit', reqVisitSchema);
