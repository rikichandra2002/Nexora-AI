import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200/70 bg-white/40">

      {/* Main Footer */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">

          {/* Brand Section */}
          <div className="max-w-md">

            {/* Nexora Logo */}
            <div className="flex items-center gap-2">

              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.75 11.3L15.5 15.184L22.25 11.299M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408L15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585Z"
                  stroke="#4F39F6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <h2 className="text-2xl font-semibold">
                <span className="text-slate-800">Nexora</span>
                <span className="text-blue-500">.ai</span>
              </h2>

            </div>


            {/* Description */}
            <p className="mt-5 text-sm text-gray-500 leading-6 max-w-md">
              Create, enhance, and optimize your content with powerful
              AI-driven tools designed to make your workflow faster and
              smarter.
            </p>

          </div>


          {/* Company */}
          <div>

            <h2 className="font-semibold text-slate-800 mb-5">
              Company
            </h2>

            <ul className="text-sm text-gray-500 space-y-3">

              <li>
                <a
                  href="/"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-indigo-600 transition-colors"
                >
                  About us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Contact us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Privacy policy
                </a>
              </li>

            </ul>

          </div>


          {/* Newsletter */}
          <div className="w-full">

            <h2 className="font-semibold text-slate-800 mb-5">
              Subscribe to our newsletter
            </h2>

            <p className="text-sm text-gray-500 leading-6 max-w-md">
              Get the latest AI tools, articles, updates, and resources
              delivered straight to your inbox.
            </p>


            {/* Email Form */}
            <form className="flex flex-col sm:flex-row gap-3 mt-5">

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  h-10
                  px-3
                  rounded-lg
                  border
                  border-gray-300
                  bg-white/80
                  text-sm
                  text-gray-700
                  placeholder-gray-400
                  outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                  focus:border-transparent
                "
              />

              <button
                type="submit"
                className="
                  h-10
                  px-5
                  rounded-lg
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  text-sm
                  font-medium
                  transition-colors
                  whitespace-nowrap
                "
              >
                Subscribe
              </button>

            </form>

          </div>

        </div>


        {/* Bottom Border */}
        <div className="mt-12 pt-5 border-t border-gray-200/70">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © 2026 Nexora.ai. All rights reserved.
            </p>

            <p className="text-xs sm:text-sm text-gray-400 text-center">
              Powered by AI. Built for creators.
            </p>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer