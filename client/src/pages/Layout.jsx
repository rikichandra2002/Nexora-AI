import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-50">

      {/* Navbar */}
      <header className="h-[70px] min-h-[70px] w-full flex items-center px-6 bg-white border-b border-slate-200">

        <img
          src={assets.logo}
          alt="Nexora AI"
          onClick={() => navigate('/')}
          className="w-[135px] cursor-pointer object-contain"
        />

        <button
          onClick={() => setSidebar(prev => !prev)}
          className="ml-auto md:hidden p-2 rounded-lg hover:bg-slate-100"
        >
          {sidebar ? (
            <X className="w-5 h-5 text-slate-600" />
          ) : (
            <Menu className="w-5 h-5 text-slate-600" />
          )}
        </button>

      </header>


      {/* Main Area */}
      <div className="flex flex-1 min-h-0">

        <Sidebar
          sidebar={sidebar}
          setSidebar={setSidebar}
        />

        {/* Content */}
        <main className="flex-1 min-w-0 min-h-0 overflow-y-auto bg-slate-50">

          {/* LARGE SPACE BETWEEN SIDEBAR AND CONTENT */}
          <div className="pt-7 pr-8 pb-10 pl-12">
            <Outlet />
          </div>

        </main>

      </div>

    </div>
  )
}

export default Layout