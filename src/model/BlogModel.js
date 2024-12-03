import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        content: {
            type: String
        },
        author: {
            type: String
        },
        image: {
            type: String
        },
        defaultValue: {
            type: String,
            default: "blog"
        }
    },
    { timestamps: true }
)

const BlogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default BlogModel;