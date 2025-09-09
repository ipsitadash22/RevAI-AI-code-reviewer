const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Allowed origins for both local and production
const allowedOrigins = [
    process.env.ALLOWED_ORIGIN?.replace(/\/$/, ""), // Production frontend (no trailing slash)
    "http://localhost:5173" // Local frontend URL
];

// CORS setup
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Backend is running successfully" });
});

app.use("/ai", aiRoutes);

app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
