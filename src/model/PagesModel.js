import mongoose, { Schema } from "mongoose";

const pagesSchema = new Schema(
    {
        title: {
            type: String,
            required: true, // Title is required
            trim: true
        },
        slug: {
            type: String,
            required: true, // Slug is required for dynamic routing
            unique: true, // Ensures slugs are unique
            trim: true
        },
        content: {
            type: String, // Rich text content stored as a string (HTML)
            required: true
        },
        image: {
            type: String, // URL of the image (optional)
            default: null
        },
        seoTitle: {
            type: String, // SEO title (optional)
            trim: true
        },
        seoDescription: {
            type: String, // SEO description (optional)
            trim: true
        },
        defaultValue: {
            type: String,
            default: "page"
        }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const PageModel = mongoose.models.page || mongoose.model("page", pagesSchema);

export default PageModel;