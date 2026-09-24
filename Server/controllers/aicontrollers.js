import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import cloudinary from "../configs/cloudinary.js";
import fs from "fs";

// IMPORTANT:
// Do NOT import pdf-parse here.
// It causes pdfjs-dist/DOMMatrix to load during Vercel startup.

// ==========================================
// AI CONFIGURATION
// ==========================================

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});


// ==========================================
// GENERATE ARTICLE
// ==========================================

export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;

        const plan = req.plan;
        const free_usage = req.free_usage || 0;

        if (!prompt || !prompt.trim()) {
            return res.json({
                success: false,
                message: "Prompt is required",
            });
        }

        if (plan !== "premium" && free_usage >= 10) {
            return res.json({
                success: false,
                message: "Limit reached. Upgrade to continue.",
            });
        }

        const response = await AI.chat.completions.create({
            model: "gemini-3.5-flash-lite",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length || 1000,
        });

        const content = response.choices?.[0]?.message?.content;

        if (!content) {
            return res.json({
                success: false,
                message: "AI did not return any content.",
            });
        }

        await sql`
            INSERT INTO creations (
                user_id,
                prompt,
                content,
                type
            )
            VALUES (
                ${userId},
                ${prompt},
                ${content},
                'article'
            )
        `;

        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1,
                },
            });
        }

        res.json({
            success: true,
            content,
        });

    } catch (error) {
        console.error("Generate Article Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// GENERATE BLOG TITLE
// ==========================================

export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();

        const { prompt, category } = req.body;

        const plan = req.plan;
        const free_usage = req.free_usage || 0;

        if (!prompt || !prompt.trim()) {
            return res.json({
                success: false,
                message: "Keyword is required",
            });
        }

        if (plan !== "premium" && free_usage >= 10) {
            return res.json({
                success: false,
                message: "Limit reached. Upgrade to continue.",
            });
        }

        const aiPrompt = `
Generate exactly 5 creative, catchy and SEO-friendly blog titles.

Topic / Keyword:
${prompt.trim()}

Category:
${category || "General"}

IMPORTANT RULES:
- Generate exactly 5 titles.
- Each title must be a complete blog title.
- Keep each title unique.
- Make them interesting and engaging.
- Make them suitable for a blog.
- Do NOT write an article.
- Do NOT explain the topic.
- Do NOT provide descriptions.
- Do NOT provide paragraphs.
- Do NOT provide headings such as "Here are some titles".
- Do NOT use bullet points.
- Do NOT number the titles.
- Return ONLY the 5 titles.
- Put each title on a separate line.
`;

        const response = await AI.chat.completions.create({
            model: "gemini-3.5-flash-lite",
            messages: [
                {
                    role: "user",
                    content: aiPrompt,
                },
            ],
            temperature: 0.8,
            max_tokens: 200,
        });

        const content = response.choices?.[0]?.message?.content;

        if (!content) {
            return res.json({
                success: false,
                message: "AI did not return any titles.",
            });
        }

        await sql`
            INSERT INTO creations (
                user_id,
                prompt,
                content,
                type
            )
            VALUES (
                ${userId},
                ${prompt},
                ${content},
                'blog-title'
            )
        `;

        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1,
                },
            });
        }

        res.json({
            success: true,
            content,
        });

    } catch (error) {
        console.error("Generate Blog Title Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// GENERATE IMAGE
// ==========================================

export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;

        if (req.plan !== "premium") {
            return res.json({
                success: false,
                message: "This feature is only available for premium subscription",
            });
        }

        if (!prompt || !prompt.trim()) {
            return res.json({
                success: false,
                message: "Prompt is required",
            });
        }

        if (!process.env.CLIPDROP_API_KEY) {
            return res.json({
                success: false,
                message: "Clipdrop API key is not configured.",
            });
        }

        // ==========================================
        // CLIPDROP
        // ==========================================

        const formData = new FormData();

        formData.append("prompt", prompt);

        const { data } = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            formData,
            {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API_KEY,
                },
                responseType: "arraybuffer",
            }
        );

        // ==========================================
        // BASE64
        // ==========================================

        const imageDataUri =
            `data:image/png;base64,${Buffer.from(data).toString("base64")}`;

        // ==========================================
        // CLOUDINARY
        // ==========================================

        const result = await cloudinary.uploader.upload(
            imageDataUri,
            {
                folder: "nexora-ai",
                resource_type: "image",
            }
        );

        // ==========================================
        // DATABASE
        // ==========================================

        await sql`
            INSERT INTO creations (
                user_id,
                prompt,
                content,
                type,
                publish
            )
            VALUES (
                ${userId},
                ${prompt},
                ${result.secure_url},
                'image',
                ${publish ?? false}
            )
        `;

        res.json({
            success: true,
            content: result.secure_url,
        });

    } catch (error) {
        console.error("Generate Image Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// REMOVE IMAGE BACKGROUND
// ==========================================

export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        const image = req.file;
        const plan = req.plan;

        if (plan !== "premium") {
            return res.json({
                success: false,
                message: "This feature is only available for premium subscriptions",
            });
        }

        if (!image) {
            return res.json({
                success: false,
                message: "Image is required",
            });
        }

        const uploadResult = await cloudinary.uploader.upload(
            image.path,
            {
                folder: "nexora-ai/background-removal",
                resource_type: "image",
            }
        );

        const imageUrl = cloudinary.url(uploadResult.public_id, {
            resource_type: "image",
            secure: true,
            effect: "background_removal",
        });

        await sql`
            INSERT INTO creations (
                user_id,
                prompt,
                content,
                type
            )
            VALUES (
                ${userId},
                ${"Remove image background"},
                ${imageUrl},
                'image'
            )
        `;

        res.json({
            success: true,
            content: imageUrl,
        });

    } catch (error) {
        console.error("Remove Background Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// REMOVE IMAGE OBJECT
// ==========================================

export const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { object } = req.body;
        const image = req.file;
        const plan = req.plan;

        if (plan !== "premium") {
            return res.json({
                success: false,
                message: "This feature is only available for premium subscriptions",
            });
        }

        if (!image) {
            return res.json({
                success: false,
                message: "Image is required",
            });
        }

        if (!object || !object.trim()) {
            return res.json({
                success: false,
                message: "Object to remove is required",
            });
        }

        // ==========================================
        // CLOUDINARY UPLOAD
        // ==========================================

        const uploadResult = await cloudinary.uploader.upload(
            image.path,
            {
                folder: "nexora-ai/object-removal",
                resource_type: "image",
            }
        );

        console.log("Original image uploaded:");
        console.log(uploadResult.secure_url);

        // ==========================================
        // GENERATIVE REMOVE
        // ==========================================

        const cleanObject = object
            .trim()
            .replace(/\s+/g, " ");

        const imageUrl = cloudinary.url(
            uploadResult.public_id,
            {
                resource_type: "image",
                secure: true,
                transformation: [
                    {
                        effect: `gen_remove:prompt_${cleanObject}`,
                    },
                ],
            }
        );

        console.log("Generated object removal URL:");
        console.log(imageUrl);

        // ==========================================
        // DATABASE
        // ==========================================

        await sql`
            INSERT INTO creations (
                user_id,
                prompt,
                content,
                type
            )
            VALUES (
                ${userId},
                ${`Removed ${cleanObject} from image`},
                ${imageUrl},
                'image'
            )
        `;

        res.json({
            success: true,
            content: imageUrl,
        });

    } catch (error) {
        console.error("Remove Object Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// REVIEW RESUME
// ==========================================

export const resumeReview = async (req, res) => {
    try {
        const { userId } = req.auth();
        const plan = req.plan;

        // ==========================================
        // PREMIUM CHECK
        // ==========================================

        if (plan !== "premium") {
            return res.json({
                success: false,
                message: "This feature is only available for premium subscription",
            });
        }

        // ==========================================
        // CHECK FILE
        // ==========================================

        if (!req.file) {
            return res.json({
                success: false,
                message: "Please upload a resume PDF",
            });
        }

        // ==========================================
        // LOAD PDF PARSER ONLY WHEN NEEDED
        // ==========================================

        // IMPORTANT:
        // Do NOT move this import to the top of the file.
        const { PDFParse } = await import("pdf-parse");

        // ==========================================
        // READ PDF
        // ==========================================

        const dataBuffer = fs.readFileSync(req.file.path);

        const parser = new PDFParse({
            data: dataBuffer,
        });

        const pdfData = await parser.getText();

        await parser.destroy();

        const resumeText = pdfData.text;

        if (!resumeText || !resumeText.trim()) {
            return res.json({
                success: false,
                message:
                    "Could not extract text from the resume. Please upload a text-based PDF.",
            });
        }

        // ==========================================
        // AI PROMPT
        // ==========================================

        const prompt = `
You are an expert resume reviewer.

Review the following resume and provide ONLY a SHORT, CONCISE summary of the most important findings.

Do NOT provide a long review.
Do NOT analyze every section.
Do NOT repeat the resume.
Do NOT provide lengthy explanations.

Return EXACTLY this structure:

### Overall Summary
Write only 2-3 short sentences summarizing the resume.

### Key Strengths
- Strength 1
- Strength 2
- Strength 3

### Key Weaknesses
- Weakness 1
- Weakness 2
- Weakness 3

### Top Improvements
- Improvement 1
- Improvement 2
- Improvement 3

IMPORTANT:
- Keep the entire response under 250 words.
- Be specific to the uploaded resume.
- Prioritize the most important findings.
- Use simple professional language.
- Do not include a score.
- Do not include an introduction before "Overall Summary".
- Do not include a conclusion after "Top Improvements".

RESUME:
${resumeText}
`;

        // ==========================================
        // GEMINI
        // ==========================================

        const response = await AI.chat.completions.create({
            model: "gemini-3.5-flash-lite",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.4,
            max_tokens: 500,
        });

        const content =
            response.choices?.[0]?.message?.content?.trim();

        if (!content) {
            return res.json({
                success: false,
                message: "AI could not generate a resume review.",
            });
        }

        // ==========================================
        // SAVE REVIEW
        // ==========================================

        await sql`
            INSERT INTO creations (
                user_id,
                prompt,
                content,
                type
            )
            VALUES (
                ${userId},
                ${"Resume Review"},
                ${content},
                'resume-review'
            )
        `;

        // ==========================================
        // RESPONSE
        // ==========================================

        res.json({
            success: true,
            content,
        });

    } catch (error) {
        console.error("Resume Review Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};