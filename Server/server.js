import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Nexora AI Server is Live!",
    });
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
        message: "API route not found",
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
// VERCEL
// ==========================================

// IMPORTANT:
// Do NOT use app.listen() on Vercel.
// Vercel handles the server/function itself.

export default app;