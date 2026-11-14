
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// Frontend connection
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// Read JSON data
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Home route
// Simple test route to verify server connection
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is up and connected!"
    });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
