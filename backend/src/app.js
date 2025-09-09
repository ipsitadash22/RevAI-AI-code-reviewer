const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Enable CORS with allowed origin from .env (or allow all if not set)
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || '*',
    methods: ["GET", "POST"],
    credentials: true
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Root endpoint for health check
app.get("/", (req, res) => {
    res.json({ message: "Backend is running successfully" });
});

// AI-related routes
app.use("/ai", aiRoutes);

// Global error handler for unexpected issues
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
