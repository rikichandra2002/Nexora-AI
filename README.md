# 🚀 Nexora AI

> An all-in-one AI-powered content creation platform for writing, image generation, image editing, blog title generation, and resume analysis.

Nexora AI is a modern full-stack AI web application designed to bring multiple AI-powered productivity tools into one simple and beautiful platform.

---

## ✨ Features

### 📝 AI Article Writer

Generate complete, high-quality articles using AI.

- Enter your topic or prompt
- Select the desired article length
- Generate content automatically
- View generated content directly inside the application
- Markdown-supported output

---

### 💡 AI Blog Title Generator

Generate catchy and SEO-friendly blog titles.

- Enter a topic or keyword
- Select a category
- Generate multiple title suggestions
- Useful for blogs, websites, content creators, and SEO

---

### 🎨 AI Image Generator

Create images from natural-language prompts.

- Describe the image you want
- Choose a visual style
- Generate AI images
- Save generated images
- Option to publish images to the community

---

### 🪄 Background Removal

Remove the background from uploaded images using AI.

- Upload an image
- Process the image
- Get a transparent-background result
- Download the processed image

---

### ✂️ Object Removal

Remove unwanted objects from images.

- Upload an image
- Select/process unwanted content
- Generate the cleaned image
- View the final result

---

### 📄 AI Resume Reviewer

Analyze your resume using AI.

- Upload a PDF resume
- AI analyzes the resume
- Receive feedback and recommendations
- Identify strengths and areas for improvement

---

### 🌎 Community

Explore AI-generated images shared by users.

- View published creations
- Search community content
- Like creations
- Open creations in a larger view
- Download generated images

---

### 🎬 Interactive AI Demo

Nexora AI includes an interactive demo section showcasing the platform's major features.

The demo contains videos for:

1. AI Article Writer
2. AI Blog Title Generator
3. AI Image Generator
4. Background & Object Removal
5. AI Resume Reviewer

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Clerk Authentication
- Axios
- Lucide React
- React Markdown

### Backend

- Node.js
- Express.js
- Clerk
- OpenAI-compatible Gemini API
- Neon PostgreSQL
- Cloudinary
- Multer
- PDF Parse
- Clipdrop API

### Deployment

- GitHub
- Vercel

---

## 📁 Project Structure

```text
Nexora-AI/
│
├── client/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── AiTools.jsx
│   │   │   ├── CreationItem.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Plan.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Testimonial.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── BlogTitles.jsx
│   │   │   ├── Community.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── GenerateImages.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── RemoveBackground.jsx
│   │   │   ├── RemoveObject.jsx
│   │   │   ├── ReviewResume.jsx
│   │   │   └── WriteArticle.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── Server/
│   │
│   ├── configs/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── multer.js
│   │
│   ├── controllers/
│   │   ├── aicontrollers.js
│   │   └── UserController.js
│   │
│   ├── middlewares/
│   │   └── auth.js
│   │
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── vercel.json
│
├── .gitignore
└── README.md