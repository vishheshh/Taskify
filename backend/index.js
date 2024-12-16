import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routers/User.js";
import taskRouter from "./routers/Task.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Environment Variables
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"; // Default for local dev

// CORS Configuration
app.use(
  cors({
    origin: [FRONTEND_URL, "https://taskify-frontend-rlw0.onrender.com"], // Add all allowed frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Static Files
app.use(express.static("Public"));

// Routes
app.use("/user", userRouter);
app.use("/tasks", taskRouter);

// Test Route
app.get("/test", (req, res) => {
  res.send("You are authenticated and have access to this route");
});

// MongoDB Connection
mongoose
  .connect(DB_URI, { dbName: process.env.DB_NAME || "task_manager" })
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
