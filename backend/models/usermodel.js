import mongoose from "mongoose";

const userschema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        u_type: {
            type: String,
            required: true,
            enum: ["admin", "client", "broker"]
        },
        contact: {
            authorization: {
                type: String,
                required: function () {
                    return this.UserType == 'broker';  // Make it required only for brokers
                }
            },
            phone: {
                type: String,
                required: function () {
                    return this.UserType == 'broker';
                }
            },
            company: {
                type: String,
                required: function () {
                    return this.UserType == 'broker';
                }
            }
        }
    }
);

export const User = mongoose.model('User',userschema);
