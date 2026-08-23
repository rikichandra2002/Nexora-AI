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

const App = () => {
  return (
    <div>
      <Routes>

        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* AI Dashboard Layout */}
        <Route path="/ai" element={<Layout />}>

          {/* /ai */}
          <Route index element={<Dashboard />} />

          {/* /ai/write-article */}
          <Route path="write-article" element={<WriteArticle />} />

          {/* /ai/blog-titles */}
          <Route path="blog-titles" element={<BlogTitles />} />

          {/* /ai/generate-images */}
          <Route path="generate-images" element={<GenerateImages  />} />

          {/* /ai/remove-background */}
          <Route path="remove-background" element={<RemoveBackground />} />

          {/* /ai/remove-object */}
          <Route path="remove-object" element={<RemoveObject />} />

          {/* /ai/review-resume */}
          <Route path="review-resume" element={<ReviewResume />} />

          {/* /ai/community */}
          <Route path="community" element={<Community />} />

        </Route>

      </Routes>
    </div>
  )
}

export default App