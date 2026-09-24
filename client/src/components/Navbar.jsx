import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
  useClerk,
  UserButton,
  useUser,
} from '@clerk/react'

const Navbar = () => {

  const navigate = useNavigate()

  const { user } = useUser()

  const { openSignIn } = useClerk()


  // ==========================================
  // GET STARTED
  // ==========================================

  const handleGetStarted = () => {

    if (user) {

      navigate('/ai')

    } else {

      openSignIn()

    }

  }


  return (
    <header
      className="fixed left-0 top-0 z-50 w-full"
      style={{
        backgroundColor:
          'rgba(255,255,255,0.68)',
        backdropFilter:
          'blur(18px)',
        WebkitBackdropFilter:
          'blur(18px)',
        borderBottom:
          '1px solid rgba(226,232,240,0.35)',
      }}
    >

      <div
        className="flex w-full items-center justify-between"
        style={{
          height: '68px',
          padding:
            '0 clamp(18px, 5vw, 60px)',
        }}
      >

        {/* ======================================
            LOGO
        ======================================= */}

        <img
          src={assets.logo}
          alt="Nexora.ai"
          onClick={() =>
            navigate('/')
          }
          style={{
            width: '145px',
            height: 'auto',
            objectFit: 'contain',
            cursor: 'pointer',
            transition:
              'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              'scale(1.02)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              'scale(1)'
          }}
        />


        {/* ======================================
            RIGHT SIDE
        ======================================= */}

        {user ? (

          <div
            className="flex items-center gap-3"
          >

            <button
              type="button"
              onClick={() =>
                navigate('/ai')
              }
              style={{
                height: '38px',
                padding:
                  '0 16px',
                borderRadius:
                  '999px',
                border:
                  '1px solid #e2e8f0',
                backgroundColor:
                  '#ffffff',
                color: '#475569',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Dashboard
            </button>

            <UserButton />

          </div>

        ) : (

          <button
            type="button"
            onClick={handleGetStarted}
            className="group flex items-center gap-2 rounded-full"
            style={{
              height: '38px',
              padding:
                '0 17px',
              border: 'none',
              background:
                'linear-gradient(90deg, #4f46e5, #6366f1)',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow:
                '0 7px 18px rgba(79,70,229,0.20)',
              transition:
                'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                'translateY(0)'
            }}
          >

            Get started

            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />

          </button>

        )}

      </div>

    </header>
  )
}

export default Navbar