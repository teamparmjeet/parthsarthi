import mongoose, { Schema } from "mongoose";

const DealSchema = new Schema(
    {
        Deal: { type: Date, required: true },
        defaultdata: { type: String, default: "Deal" }

    },
    { timestamps: true }
);

const DealModel = mongoose.models.Deal || mongoose.model("Deal", DealSchema);

export default DealModel;