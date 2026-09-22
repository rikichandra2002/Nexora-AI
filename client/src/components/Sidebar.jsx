import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/react'

import {
  House,
  SquarePen,
  Hash,
  Image,
  Eraser,
  Scissors,
  FileText,
  Users,
  UserRound,
  LogOut,
  X
} from 'lucide-react'


const navItems = [
  {
    to: '/ai',
    label: 'Dashboard',
    icon: House,
    end: true
  },
  {
    to: '/ai/write-article',
    label: 'Write Article',
    icon: SquarePen
  },
  {
    to: '/ai/blog-titles',
    label: 'Blog Titles',
    icon: Hash
  },
  {
    to: '/ai/generate-images',
    label: 'Generate Images',
    icon: Image
  },
  {
    to: '/ai/remove-background',
    label: 'Remove Background',
    icon: Eraser
  },
  {
    to: '/ai/remove-object',
    label: 'Remove Object',
    icon: Scissors
  },
  {
    to: '/ai/review-resume',
    label: 'Review Resume',
    icon: FileText
  },
  {
    to: '/ai/community',
    label: 'Community',
    icon: Users
  }
]


const Sidebar = ({ sidebar, setSidebar }) => {

  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <>
      {/* Mobile Overlay */}
      {sidebar && (
        <div
          onClick={() => setSidebar(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}


      {/* Sidebar */}
      <aside
        className={`
          w-[250px]
          min-w-[250px]
          h-full
          bg-white
          border-r border-slate-200
          flex flex-col
          z-50

          fixed md:static
          top-[70px] left-0

          transition-transform duration-300

          ${sidebar
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
          }
        `}
      >

        {/* ================= PROFILE ================= */}
        <div className="p-4">

          <div className="rounded-xl border border-slate-200 bg-white p-4">

            <div className="flex flex-col items-center">

              <img
                src={user?.imageUrl}
                alt="Profile"
                className="w-[72px] h-[72px] rounded-full object-cover border border-slate-200"
              />

              <h2 className="mt-3 text-sm font-semibold text-slate-800">
                {user?.fullName || user?.firstName || 'User'}
              </h2>

              <p className="mt-1 text-xs text-slate-400 truncate max-w-[200px]">
                {user?.primaryEmailAddress?.emailAddress || ''}
              </p>

            </div>

          </div>

        </div>


        {/* ================= MENU ================= */}
        <div className="px-3">

          <p className="px-2 mb-2 text-[11px] uppercase tracking-wide text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-1">

            {navItems.map((item) => {

              const Icon = item.icon

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setSidebar(false)}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    h-11
                    px-3
                    rounded-lg
                    text-sm
                    transition-all

                    ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 font-medium'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }
                    `
                  }
                >

                  <Icon
                    className="w-[19px] h-[19px] shrink-0"
                    strokeWidth={1.8}
                  />

                  <span className="whitespace-nowrap">
                    {item.label}
                  </span>

                </NavLink>
              )
            })}

          </nav>

        </div>


        {/* ================= BOTTOM ================= */}
        <div className="mt-auto">

          <button
            onClick={openUserProfile}
            className="
              w-full
              h-12
              px-4
              flex
              items-center
              gap-3
              border-t
              border-slate-200
              text-sm
              text-slate-600
              hover:bg-slate-50
            "
          >

            <UserRound
              className="w-[19px] h-[19px]"
              strokeWidth={1.8}
            />

            <span>Manage Profile</span>

          </button>


          <button
            onClick={handleSignOut}
            className="
              w-full
              h-12
              px-4
              flex
              items-center
              gap-3
              border-t
              border-slate-200
              text-sm
              text-red-500
              hover:bg-red-50
            "
          >

            <LogOut
              className="w-[19px] h-[19px]"
              strokeWidth={1.8}
            />

            <span>Sign Out</span>

          </button>

        </div>

      </aside>
    </>
  )
}

export default Sidebar