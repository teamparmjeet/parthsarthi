import mongoose, { Schema } from "mongoose";

const SubscribeSchema = new Schema(
    {
        email: { type: String, required: true },
        mobile: { type: String, required: true },
        defaultdata: { type: String, default: "subscribe" }

    },
    { timestamps: true }
);

const SubscribeModel = mongoose.models.Subscribes1 || mongoose.model("Subscribes1", SubscribeSchema);

export default SubscribeModel;