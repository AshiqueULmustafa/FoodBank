import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./config/database.js";

import authRoutes from "./routes/auth.routes.js";
import donationRoutes from "./routes/donation.routes.js";
// import userRoutes from "./routes/user.routes.js";

const app = express();

// Middleware setup
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donation", donationRoutes);
// app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
dotenv.config();

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
