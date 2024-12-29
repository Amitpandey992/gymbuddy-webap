import express from "express";
import { dbConnection } from "./db.js";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user.routes.js";
import matchRequest from "./routes/matchRequest.routes.js";
import { verifiedUser } from "./middlewares/verified.js";
import profileView from "./routes/profileView.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true, 
  })
);
//MIDDLEWARES
app.use(express.json());

//user routes
app.use("/", userRoutes);

//profile view routes
app.use("/", profileView);

//match requests route
app.use("/matchRequest", verifiedUser, matchRequest);

//admin routes
app.use("/", adminRoutes);

//Start server
const server = async () => {
  try {
    await dbConnection();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
  }
};
server();
