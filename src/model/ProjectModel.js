import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
    {
        category: {
            type: [String],
            required: true,
            default: "Not-Provided"
        },

        price: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        projectSize: [
            {
                size: { type: String, required: true },
                image: { type: [String], required: true }
            }
        ],
        bhk: [
            {
                bhk: { type: String, required: true },
                image: { type: [String], required: true }
            }
        ],
        isFeatured: {
            type: Boolean,
            required: true,
            default: false
        },
        propertyType: {
            type: String
        },
        possessionStatus: {
            type: String
        },
        AvailablePlot: {
            type: String
        },
        map: {
            type: String
        },
        logo: {
            type: String,
            default: null
        },
        image: {
            type: String,
            default: null
        },
        gallery: {
            type: [String],
            default: []
        },
        sitePlan: {
            type: String,
            default: null
        },
        pdf: {
            type: String,
            default: null
        },
        seoTitle: {
            type: String,
            trim: true
        },
        seoDescription: {
            type: String,
            trim: true
        },


        defaultValue: {
            type: String,
            default: "project"
        }
    },
    { timestamps: true }
);

const ProjectModel = mongoose.models.project6 || mongoose.model("project6", ProjectSchema);

export default ProjectModel;
