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

app.use(cors());

app.use(express.json());

app.use(clerkMiddleware());


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.send("Server is Live!");
});


// ==========================================
// AUTHENTICATION
// ==========================================

app.use(requireAuth());


// ==========================================
// AI ROUTES
// ==========================================

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter)


// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});