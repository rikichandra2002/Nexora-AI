import React from 'react'
import { useClerk, useUser } from '@clerk/react'
import {
  LogOut,
  UserRound,
  Users,
  House,
  SquarePen,
  Hash,
  Image,
  Eraser,
  Scissors,
  FileText,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <aside
      className={`
        fixed md:relative
        top-14 md:top-0
        left-0
        z-40
        w-[280px]
        h-[calc(100vh-56px)] md:h-full
        shrink-0
        bg-white
        border-r border-gray-200
        flex flex-col
        justify-between
        transition-transform duration-300 ease-in-out

        ${sidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >

      {/* ================= PROFILE + MENU ================= */}

      <div className="flex-1 overflow-y-auto px-4 py-5">

        {/* Profile Card */}
        <div className="
          bg-gray-50
          border border-gray-100
          rounded-2xl
          px-4
          py-5
          text-center
          mb-7
        ">

          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="User avatar"
              className="
                w-[68px]
                h-[68px]
                rounded-full
                object-cover
                mx-auto
                border-[3px]
                border-white
                shadow-sm
              "
            />
          ) : (
            <div className="
              w-[68px]
              h-[68px]
              rounded-full
              mx-auto
              bg-indigo-100
              text-indigo-600
              flex
              items-center
              justify-center
              text-xl
              font-semibold
            ">
              {user?.firstName?.charAt(0) || 'U'}
            </div>
          )}

          <h1 className="
            mt-3
            text-sm
            font-semibold
            text-gray-800
            truncate
          ">
            {user?.fullName || 'User'}
          </h1>

          <p className="
            mt-1
            text-xs
            text-gray-400
            truncate
          ">
            {user?.primaryEmailAddress?.emailAddress || ''}
          </p>

        </div>


        {/* Menu Title */}
        <p className="
          px-2
          mb-3
          text-[11px]
          font-semibold
          uppercase
          tracking-wider
          text-gray-400
        ">
          Main Menu
        </p>


        {/* Navigation */}
        <nav className="space-y-1.5">

          {navItems.map(({ to, label, Icon }) => (

            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) => `
                group
                flex
                items-center
                gap-3
                w-full
                min-h-[44px]
                px-3.5
                rounded-xl
                text-sm
                no-underline
                transition-all
                duration-200

                ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >

              {({ isActive }) => (
                <>
                  <Icon
                    className={`
                      w-[19px]
                      h-[19px]
                      shrink-0
                      ${
                        isActive
                          ? 'text-indigo-600'
                          : 'text-gray-400 group-hover:text-gray-600'
                      }
                    `}
                  />

                  <span>
                    {label}
                  </span>
                </>
              )}

            </NavLink>

          ))}

        </nav>


        {/* Manage Profile */}
        <div className="mt-6 pt-5 border-t border-gray-100">

          <button
            onClick={openUserProfile}
            className="
              w-full
              min-h-[44px]
              flex
              items-center
              gap-3
              px-3.5
              rounded-xl
              text-sm
              text-gray-600
              hover:bg-gray-50
              hover:text-gray-900
              transition
              text-left
            "
          >
            <UserRound className="w-[19px] h-[19px] text-gray-400" />

            <span>
              Manage Profile
            </span>
          </button>

        </div>

      </div>


      {/* ================= SIGN OUT ================= */}

      <div className="
        px-4
        py-4
        border-t
        border-gray-100
      ">

        <button
          onClick={() => signOut()}
          className="
            w-full
            min-h-[44px]
            flex
            items-center
            gap-3
            px-3.5
            rounded-xl
            text-sm
            text-red-500
            hover:bg-red-50
            transition
            text-left
          "
        >

          <LogOut className="w-[19px] h-[19px]" />

          <span>
            Sign Out
          </span>

        </button>

      </div>

    </aside>
  )
}

export default Sidebar