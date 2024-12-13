import mongoose, { Schema } from "mongoose";

const LeadSchema = new Schema(
    {
        project:{
            type: String,
            required: true
        },
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
            default: "lead"
        }
    },
    { timestamps: true }
)

const LeadModel = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);

export default LeadModel;