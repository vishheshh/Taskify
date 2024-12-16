import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import userRouter from "./routers/User.js";
import taskRouter from "./routers/Task.js";


const app = express();
app.use(express.json());
dotenv.config();

// env config
const PORT = process.env.PORT; 
const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE" ,"PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use("/user", userRouter);
app.use("/tasks", taskRouter);

// Middleware 
app.use(cookieParser());

app.use(express.static("Public")); // Serve static files from 'Public' directory


// Tester 
app.get("/test", (req, res) => {
  res.send("You are authenticated and have access to this route");
});



mongoose
  .connect("mongodb://localhost:27017/", {
    dbName: "task_manager",
  })
  .then((result) => {
    app.listen(5000, () => console.log("server listening on port 5000"));
  })
  .catch((err) => {
    console.log("connection failed");
  });
