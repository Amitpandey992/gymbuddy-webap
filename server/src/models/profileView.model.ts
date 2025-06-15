import mongoose from "mongoose";

const profileViewSchema = new mongoose.Schema(
    {
        viewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        viewedUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: { type: String, required: true },
        viewedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const ProfileView = mongoose.model("ProfileView", profileViewSchema);
export default ProfileView;
