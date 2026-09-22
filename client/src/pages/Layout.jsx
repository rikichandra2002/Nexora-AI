import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-gray-50">

      {/* ================= NAVBAR ================= */}

      <header className="
        h-14
        min-h-14
        w-full
        px-5
        sm:px-7
        flex
        items-center
        justify-between
        bg-white
        border-b
        border-gray-200
        z-50
      ">

        <img
          src={assets.logo}
          alt="Nexora AI"
          onClick={() => navigate('/')}
          className="
            w-[135px]
            cursor-pointer
            object-contain
          "
        />

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setSidebar(prev => !prev)}
          className="
            md:hidden
            p-2
            rounded-lg
            text-gray-600
            hover:bg-gray-100
            transition
          "
        >
          {sidebar ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

      </header>


      {/* ================= MAIN AREA ================= */}

      <div className="flex flex-1 min-h-0 relative">

        {/* Mobile backdrop */}
        {sidebar && (
          <div
            onClick={() => setSidebar(false)}
            className="
              fixed
              inset-0
              top-14
              bg-black/20
              z-30
              md:hidden
            "
          />
        )}


        {/* Sidebar */}
        <Sidebar
          sidebar={sidebar}
          setSidebar={setSidebar}
        />


        {/* Page */}
        <main className="
          flex-1
          min-w-0
          h-full
          overflow-y-auto
          bg-gray-50
        ">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default Layout