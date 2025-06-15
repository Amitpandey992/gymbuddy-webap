import admin from "../firebaseAdmin.js";
import User from "../models/user.model.js";

export const sendNotification = async (userId: string, title: string, body) => {
    try {
        const user = await User.findById(userId);
        if (!user || !user.fcmToken) {
            console.log(`No FCM token found for user ${userId}`);
            return;
        }

        const message = {
            notification: {
                title,
                body,
            },
            token: user.fcmToken,
        };

        const response = await admin.messaging().send(message);
        console.log("Successfully sent notification:", response);
        return response;
    } catch (error) {
        console.error("Error sending notification:", error);
        throw error;
    }
};

export const sendLikeNotification = async (fromUserId, toUserId) => {
    try {
        const fromUser = await User.findById(fromUserId);
        if (!fromUser) return;

        const title = "New Like!";
        const body = `${fromUser.fullName} liked your profile!`;

        await sendNotification(toUserId, title, body);
    } catch (error) {
        console.error("Error sending like notification:", error);
    }
};

export const sendMatchNotification = async (userAId, userBId) => {
    try {
        const userA = await User.findById(userAId);
        const userB = await User.findById(userBId);

        if (!userA || !userB) return;

        // Send notification to user A
        await sendNotification(
            userAId,
            "It's a Match! 🎉",
            `You matched with ${userB.fullName}!`
        );

        // Send notification to user B
        await sendNotification(
            userBId,
            "It's a Match! 🎉",
            `You matched with ${userA.fullName}!`
        );
    } catch (error) {
        console.error("Error sending match notification:", error);
    }
};
