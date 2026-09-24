import express from "express";

import { auth } from "../middlewares/auth.js";

import {
    generateArticle,
    generateBlogTitle,
    generateImage,
    removeImageBackground,
    removeImageObject,
    resumeReview
} from "../controllers/aicontrollers.js";

import { upload } from "../configs/multer.js";

const aiRouter = express.Router();


// ==========================================
// AI ROUTES
// ==========================================

// Generate Article
aiRouter.post(
    "/generate-article",
    auth,
    generateArticle
);


// Generate Blog Title
aiRouter.post(
    "/generate-blog-title",
    auth,
    generateBlogTitle
);


// Generate Image
aiRouter.post(
    "/generate-image",
    auth,
    generateImage
);


// Remove Image Background
aiRouter.post(
    "/remove-image-background",
    auth,
    upload.single("image"),
    removeImageBackground
);


// Remove Image Object
aiRouter.post(
    "/remove-image-object",
    auth,
    upload.single("image"),
    removeImageObject
);


// Resume Review
aiRouter.post(
    "/resume-review",
    auth,
    upload.single("resume"),
    resumeReview
);


export default aiRouter;