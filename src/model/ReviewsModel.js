import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema(
    {
        name: { type: String },
        location: { type: String },
        star: { type: Number },
        review: { type: String },
        defaultdata: { type: String, default: "review" }

    },
    { timestamps: true }
);

const ReviewModel = mongoose.models.reviews1 || mongoose.model("reviews1", ReviewSchema);

export default ReviewModel;