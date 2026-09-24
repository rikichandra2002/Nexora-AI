import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

// ==========================================
// BASIC MIDDLEWARE
// ==========================================

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.status(200).send("Nexora AI Server is Live!");
});

// ==========================================
// LOAD CLERK + ROUTES
// ==========================================

const startRoutes = async () => {
    try {
        const { clerkMiddleware, requireAuth } = await import(
            "@clerk/express"
        );

        const { default: aiRouter } = await import(
            "./routes/aiRoutes.js"
        );

        const { default: userRouter } = await import(
            "./routes/userRoutes.js"
        );

        // Clerk middleware
        app.use(clerkMiddleware());

        // Authentication
        app.use(requireAuth());

        // AI routes
        app.use("/api/ai", aiRouter);

        // User routes
        app.use("/api/user", userRouter);

        console.log("✅ Clerk and API routes loaded");
    } catch (error) {
        console.error("❌ Failed to load API routes:");
        console.error(error);
    }
};

await startRoutes();

// ==========================================
// 404
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
    console.error("❌ Server Error:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// ==========================================
// LOCAL DEVELOPMENT
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
// VERCEL
// ==========================================

export default app;