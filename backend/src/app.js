const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS setup for local, production, and any Vercel deployment
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow Postman or server-side requests
        const productionOrigin = process.env.ALLOWED_ORIGIN?.replace(/\/$/, ""); // Remove trailing slash
        if (origin === productionOrigin) return callback(null, true);
        if (origin === "http://localhost:5173") return callback(null, true);
        if (origin.endsWith(".vercel.app")) return callback(null, true); // Allow any Vercel subdomain
        callback(new Error("Not allowed by CORS"));
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
