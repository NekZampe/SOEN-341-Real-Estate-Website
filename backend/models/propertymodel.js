import mongoose from "mongoose";
import { User } from "./usermodel.js";

const propertyschema = mongoose.Schema(
    {
        size: {
            type: String,  
            required: true,
            enum: ["1.5", "2.5", "3.5", "4.5", "5.5", "6.5","7.5"]  
        },
        price: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        img_url: {
            type: String,
            default: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
        },
        address: {
            country: {
                type: String,
                required: true,
                default: "Canada"
            },
            province: {
                type: String,
                required: true,
                enum: ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Other"]
            },
            street_number: {
                type: String,
                required: true,
            },
            street_name: {
                type: String,
                required: true,
            },
            postal_code: {
                type: String,
                required: true,
            }
    },
        h_type: {
            type: String,
            required: true,
            enum: ['Apartment', 'House', 'Condo', 'Duplex', 'Studio', 'Loft', 'Other']
        },
        s_type: {
            type: String,
            required: true,
            enum: ["sale", "rent"]
        }, 
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true
        }
    }
);

export const Property = mongoose.model('Property',propertyschema);
