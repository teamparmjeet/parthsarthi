import mongoose, { Schema } from "mongoose";

const JobcategorySchema = new Schema(
    {
        category: {
            type: String,
            required: true
        },

        defaultValue: {
            type: String,
            default: "Jobcategorycategory"
        }
    },
    { timestamps: true }
)

const JobcategoryModel = mongoose.models.Jobcategory || mongoose.model("Jobcategory", JobcategorySchema);

export default JobcategoryModel;