import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnection } from "./db.js";
import userRoutes from "./routes/user.routes.js";
import matchRequest from "./routes/matchRequest.routes.js";
import { verifiedUser } from "./middlewares/verified.js";
import profileView from "./routes/profileView.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleSocketConnection } from "./controllers/matchRequest.controller.js";
import allRoutes from "./routes/index.js";

const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use("/api", allRoutes);

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  handleSocketConnection(socket, io);
  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

//Start server
const startServer = async () => {
  try {
    await dbConnection();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
  }
};
startServer();
