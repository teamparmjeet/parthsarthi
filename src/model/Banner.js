import mongoose, { Schema } from "mongoose";

const BannerSchema = new Schema(
    {
        imgurl: { type: String, required: true },
        defaultdata: { type: String, default: "Banner" }

    },
    { timestamps: true }
);

const BannerModel = mongoose.models.Banner || mongoose.model("Banner", BannerSchema);

export default BannerModel;