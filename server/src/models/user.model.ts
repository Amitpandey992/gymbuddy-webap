import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            // required: true,
            min: 8,
            max: 15,
        },
        phoneNumber: {
            type: Number,
            // required: true,
            unique: true,
            minLength: 10,
            maxLength: 10,
        },
        gender: {
            type: String,
            // required: true,
            enum: ["male", "female", "other"],
        },
        dateOfBirth: {
            type: Date,
            // required: true,
        },
        profilePicture: {
            type: String,
            // required: false,
        },
        profession: {
            type: String,
            // required: true,
        },
        city: {
            type: String,
            // required: true,
        },
        state: {
            type: String,
            // required: true,
        },
        latitude: {
            type: Number,
            required: false,
        },
        longitude: {
            type: Number,
            required: false,
        },
        matches: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Match",
                },
            ],
            default: [],
        },
        sentRequests: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
            default: [],
        },
        receivedRequests: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
            default: [],
        },
        isPremium: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        fcmToken: {
            type: String,
        },
    },

    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
