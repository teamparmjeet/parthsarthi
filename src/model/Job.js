import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema(
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
        jobprofile: {
            type: String,
            required: true
        },
        defaultValue: {
            type: String,
            default: "Job"
        }
    },
    { timestamps: true }
)

const JobModel = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default JobModel;