import mongoose, { Schema } from "mongoose";

const SubscribeSchema = new Schema(
    {
        email: { type: String, required: true },
        defaultdata: { type: String, default: "subscribe" }

    },
    { timestamps: true }
);

const SubscribeModel = mongoose.models.Subscribes || mongoose.model("Subscribes", SubscribeSchema);

export default SubscribeModel;