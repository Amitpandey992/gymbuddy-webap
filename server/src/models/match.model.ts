import mongoose, { Schema } from "mongoose";

const matchRequestSchema = new mongoose.Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

const Match = mongoose.model("Match", matchRequestSchema);

export default Match;
