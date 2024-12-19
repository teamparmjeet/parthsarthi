import mongoose, { Schema } from "mongoose";

const LeadSchema = new Schema(
    {
        project: {
            type: String,
            required: true
        },
        bhk: {
            type: String,
        },

        size: {
            type: String,
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

const LeadModel = mongoose.models.Lead2 || mongoose.model("Lead2", LeadSchema);

export default LeadModel;