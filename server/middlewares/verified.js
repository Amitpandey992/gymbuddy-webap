import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifiedUser = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("User not authenticated");
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(verified.id);
  if (!user) return res.status(401).send("User not authenticated");
  req.user = user;
  next();
};
