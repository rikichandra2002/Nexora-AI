import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// ==========================================
// CORS
// ==========================================

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// ==========================================
// BODY PARSER
// ==========================================

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ==========================================
// CLERK MIDDLEWARE
// ==========================================

app.use(clerkMiddleware());

// ==========================================
// ROOT TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.status(200).send("Nexora AI Server is Live!");
});

// ==========================================
// AUTHENTICATION
// ==========================================

app.use(requireAuth());

// ==========================================
// AI ROUTES
// ==========================================

app.use("/api/ai", aiRouter);

// ==========================================
// USER ROUTES
// ==========================================

app.use("/api/user", userRouter);

// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl,
    });
});

// ==========================================
// ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// ==========================================
// LOCAL SERVER
// ==========================================

if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log("");
        console.log("==========================================");
        console.log("🚀 Nexora AI Server is running");
        console.log(`📡 http://localhost:${PORT}`);
        console.log("==========================================");
        console.log("");
    });
}

// ==========================================
// VERCEL EXPORT
// ==========================================

export default app;