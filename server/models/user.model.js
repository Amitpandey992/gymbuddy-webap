import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 15,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      minLength: 10,
      maxLength: 10,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    dateOfBirth: {
      type: Date,
      // required: true,
    },
    profilePicture: {
      type: String,
      // required: true,
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
    matches: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    sentRequests: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    receivedRequests: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    privateInfo: {
      instagram: String,
      phoneNumber: String,
      whatsappNumber: String,
      snapchatAccount: String,
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
