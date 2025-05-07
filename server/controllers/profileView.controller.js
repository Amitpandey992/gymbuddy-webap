import ProfileView from "../models/profileView.model.js";
import User from "../models/user.model.js";

export const viewUserProfile = async (req, res) => {
  try {
    const { viewedUserId } = req.params;

    const viewedUser = await User.findById(viewedUserId);

    if (!viewedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let message;

    if (viewedUser.isPremium) {
      message = `${req.user.fullName} viewed your profile`;
    } else {
      message = "Someone Viewed your profile";
    }
    const notification = new ProfileView({
      viewer: req.user._id,
      viewedUser: viewedUserId,
      message,
    });
    await notification.save();
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error viewing profile", error: error.message });
  }
};

export const getNotificationsForUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await ProfileView.find({ viewedUser: userId })
      .populate("viewer", "fullName")
      .sort({ viewedAt: -1 });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ message: "Error fetching notifications", error: error.message });
  }
};
