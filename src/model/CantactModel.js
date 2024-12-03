import mongoose, { Schema } from "mongoose";

const ContactSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        terms: {
            type: Boolean,
            required: true,
        },
       
        defaultValue: {
            type: String,
            default: "contact"
        }
    },
    { timestamps: true }
)

const ContactModel = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default ContactModel;