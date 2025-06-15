import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import { dbConnection } from "./db.js";

import cors from "cors";
import allRoutes from "./routes/index.js";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app: Express = express();

// MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use("/api", allRoutes);

const startServer = async (): Promise<void> => {
  try {
    await dbConnection();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
  }
};

startServer(); 