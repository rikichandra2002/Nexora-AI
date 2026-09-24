import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Layout from './pages/Layout'

import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'

import ProtectedRoute from './components/ProtectedRoute'

import { Toaster } from 'react-hot-toast'

const App = () => {

  return (
    <div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <Routes>

        {/* ==========================================
            PUBLIC HOME PAGE
        =========================================== */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ==========================================
            PROTECTED AI APPLICATION
        =========================================== */}

        <Route
          element={<ProtectedRoute />}
        >

          <Route
            path="/ai"
            element={<Layout />}
          >

            {/* Dashboard */}

            <Route
              index
              element={<Dashboard />}
            />


            {/* Write Article */}

            <Route
              path="write-article"
              element={<WriteArticle />}
            />


            {/* Blog Titles */}

            <Route
              path="blog-titles"
              element={<BlogTitles />}
            />


            {/* Generate Images */}

            <Route
              path="generate-images"
              element={<GenerateImages />}
            />


            {/* Remove Background */}

            <Route
              path="remove-background"
              element={<RemoveBackground />}
            />


            {/* Remove Object */}

            <Route
              path="remove-object"
              element={<RemoveObject />}
            />


            {/* Review Resume */}

            <Route
              path="review-resume"
              element={<ReviewResume />}
            />


            {/* Community */}

            <Route
              path="community"
              element={<Community />}
            />

          </Route>

        </Route>

      </Routes>

    </div>
  )
}

export default App