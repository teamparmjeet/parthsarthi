import mongoose, { Schema } from "mongoose";

// Define the Project Category Schema
const ProjectCategorySchema = new Schema(
    {
        title: {
            type: String,
            required: true, // Title is required
            unique: true, // Title must be unique
            trim: true // Removes any trailing/leading spaces
        },
        slug: {
            type: String,
            required: true, // Slug is required for dynamic routing
            unique: true, // Ensures slugs are unique
            trim: true // Removes any trailing/leading spaces
        },
        image: {
            type: String, // URL of the image (optional)
            default: null
        },
        seoTitle: {
            type: String, // SEO title (optional)
            trim: true // Removes any trailing/leading spaces
        },
        seoDescription: {
            type: String, // SEO meta description (optional)
            trim: true // Removes any trailing/leading spaces
        },
        defaultValue: {
            type: String,
            default: "category"
        }
    },
    { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Create the model or use the existing one if it's already created
const ProjectCategoryModel = mongoose.models.ProjectCategory || mongoose.model("ProjectCategory", ProjectCategorySchema);

export default ProjectCategoryModel;
