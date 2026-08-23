import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'

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

        </Route>

      </Routes>
    </div>
  )
}

export default App