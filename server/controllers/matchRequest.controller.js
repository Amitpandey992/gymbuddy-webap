import User from "../models/user.model.js";

// user's like
export const like = async (req, res) => {
  const currentUserId = req.user._id;
  const { likedUserId } = req.params;

  const currentUser = await User.findById(currentUserId);
  const likedUser = await User.findById(likedUserId);

  if (
    currentUser.sentRequests.includes(likedUserId) ||
    likedUser.receivedRequests.includes(currentUserId)
  ) {
    return res.status(400).json({ message: "Already liked this user" });
  } else {
    currentUser.sentRequests.push(likedUserId);
    likedUser.receivedRequests.push(currentUserId);
  }
  // match
  let isMatch =
    currentUser.sentRequests.includes(likedUserId) &&
    likedUser.sentRequests.includes(currentUserId);

  if (isMatch) {
    currentUser.matches.push(likedUserId);
    likedUser.matches.push(currentUserId);
    
    

    await currentUser.save();
    await likedUser.save();
    

    return res.status(200).json({ message: "It's a match! You can now see each other's private information." });
  }

  // const MAX_RETRIES = 3;

  // for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
  //   const session = await mongoose.startSession();
  //   try {
  //     session.startTransaction();

  //     // Fetch current user and liked user within the transaction
  //     const currentUser = await User.findById(currentUserId).session(session);
  //     const likedUser = await User.findById(likedUserId).session(session);

  //     if (!likedUser) {
  //       await session.abortTransaction();
  //       session.endSession();
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     // Check if user can like more users
  //     const canLike =
  //       currentUser.isPremium || currentUser.sentRequests.length < 5;
  //     if (!canLike) {
  //       await session.abortTransaction();
  //       session.endSession();
  //       return res.status(403).json({ message: "Like limit reached" });
  //     }

  //     // Check if the current user has already liked the target user
  //     if (currentUser.sentRequests.includes(likedUserId)) {
  //       await session.abortTransaction();
  //       session.endSession();
  //       return res.status(400).json({ message: "Already liked this user" });
  //     }

  //     // Update sentRequests and receivedRequests
  //     currentUser.sentRequests.push(likedUserId);
  //     likedUser.receivedRequests.push(currentUserId);

  //     let isMatch = false;

  //     // Check if likedUser also liked currentUser
  //     if (likedUser.sentRequests.includes(currentUserId)) {
  //       // Update matches for both users
  //       currentUser.matches.push(likedUserId);
  //       likedUser.matches.push(currentUserId);
  //       isMatch = true;
  //     }

  //     // Save changes within the session
  //     await currentUser.save({ session });
  //     await likedUser.save({ session });

  //     await session.commitTransaction();
  //     session.endSession();

  //     // Response handling
  //     const responseMessage = isMatch
  //       ? "It's a match! You can now see each other's private information."
  //       : "User liked successfully";

  //     // Send matched user data if there is a match
  //     const matchData = isMatch
  //       ? {
  //           instagram: likedUser.privateInfo.instagram,
  //           phoneNumber: likedUser.privateInfo.phoneNumber,
  //           whatsappNumber: likedUser.privateInfo.whatsappNumber,
  //           snapchatAccount: likedUser.privateInfo.snapchatAccount,
  //         }
  //       : null;

  //     return res.status(200).json({ message: responseMessage, matchData });
  //   } catch (error) {
  //     // Handle WriteConflict error and retry if necessary
  //     if (error.code === 112 && attempt < MAX_RETRIES - 1) {
  //       console.log(
  //         `Retrying transaction due to WriteConflict... Attempt ${attempt + 1}`
  //       );
  //       continue; // Retry the transaction
  //     }

  //     console.error(error);
  //     return res
  //       .status(500)
  //       .json({ message: "Error liking user", error: error.message });
  //   } finally {
  //     session.endSession();
  //   }
  // }

  // return res.status(500).json({
  //   message: "Unable to process the like request after multiple attempts.",
  // });
};

// export const handleSocketConnection = (socket, io) => {
//   socket.on("join", ({userId}) => {
//     userSocketMap[userId] = socket.id;
//     console.log(`User ${userId} joined the socket ID ${socket.id}`);
//   });

//   socket.on("like", async ({ fromUserId, toUserId }) => {
//     const currentUser = await User.findById(fromUserId);
//     const likedUser = await User.findById(toUserId);

//     if (
//       !currentUser.sentRequests.includes(toUserId) &&
//       !likedUser.receivedRequests.includes(fromUserId)
//     ) {
//       currentUser.sentRequests.push(toUserId);
//       likedUser.receivedRequests.push(fromUserId);

//       if (
//         currentUser.sentRequests.includes(toUserId) &&
//         likedUser.sentRequests.includes(fromUserId)
//       ) {
//         currentUser.matches.push(toUserId);
//         likedUser.matches.push(fromUserId);

//         const currentUserSocketId = userSocketMap[fromUserId];
//         const likedUserSocketId = userSocketMap[toUserId];
//         console.log('currentUserSocketId', currentUserSocketId, 'likedUserSocketId', likedUserSocketId);
//         if (currentUserSocketId) {
//           io.to(currentUserSocketId).emit("match", {
//             userId: likedUser._id,
//           });
//         }
//         if (likedUserSocketId) {
//           io.to(likedUserSocketId).emit("match", {
//             userId: currentUser._id,
//           });
//         }
//       }

//       await currentUser.save();
//       await likedUser.save();
//     }
//   });
// };
