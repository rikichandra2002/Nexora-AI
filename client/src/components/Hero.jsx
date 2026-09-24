import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { useClerk, useUser } from '@clerk/react'

const Hero = () => {
  const navigate = useNavigate()
  const { openSignIn } = useClerk()
  const { user } = useUser()

  // ==========================================
  // START CREATING
  // ==========================================

  const handleStartCreating = () => {
    if (user) {
      navigate('/ai')
    } else {
      openSignIn()
    }
  }

  // ==========================================
  // WATCH DEMO
  // ==========================================

  const handleWatchDemo = () => {
    const toolsSection =
      document.getElementById('ai-tools')

    if (toolsSection) {
      toolsSection.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: 'calc(100vh - 72px)',
        background:
          'radial-gradient(circle at 18% 25%, rgba(91, 231, 255, 0.18), transparent 32%), radial-gradient(circle at 82% 25%, rgba(190, 120, 255, 0.18), transparent 34%), radial-gradient(circle at 50% 75%, rgba(255, 190, 220, 0.12), transparent 32%), linear-gradient(135deg, #f5fcff 0%, #fffaff 48%, #f8f7ff 100%)',
      }}
    >

      {/* ==========================================
          BACKGROUND DECORATIONS
      ========================================== */}

      <div
        className="pointer-events-none absolute rounded-full blur-3xl"
        style={{
          width: '320px',
          height: '320px',
          backgroundColor:
            'rgba(103, 232, 249, 0.14)',
          top: '90px',
          left: '-120px',
        }}
      />

      <div
        className="pointer-events-none absolute rounded-full blur-3xl"
        style={{
          width: '360px',
          height: '360px',
          backgroundColor:
            'rgba(196, 181, 253, 0.15)',
          top: '60px',
          right: '-130px',
        }}
      />

      <div
        className="pointer-events-none absolute rounded-full blur-3xl"
        style={{
          width: '250px',
          height: '250px',
          backgroundColor:
            'rgba(251, 207, 232, 0.12)',
          bottom: '20px',
          left: '50%',
          transform:
            'translateX(-50%)',
        }}
      />


      {/* ==========================================
          HERO CONTENT
      ========================================== */}

      <div
        className="relative z-10 flex w-full items-center justify-center px-5 sm:px-8"
        style={{
          minHeight:
            'calc(100vh - 72px)',
        }}
      >

        <div
          className="flex w-full max-w-5xl flex-col items-center text-center"
          style={{
            paddingTop: '35px',
            paddingBottom: '70px',
          }}
        >

          {/* ======================================
              SMALL BADGE
          ======================================= */}

          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
            style={{
              backgroundColor:
                'rgba(255,255,255,0.72)',
              borderColor:
                'rgba(148,163,184,0.22)',
              boxShadow:
                '0 5px 20px rgba(15,23,42,0.04)',
              backdropFilter:
                'blur(12px)',
            }}
          >

            <span
              className="flex h-6 w-6 items-center justify-center rounded-full"
              style={{
                background:
                  'linear-gradient(135deg, #6366f1, #a855f7)',
              }}
            >
              <Sparkles
                size={13}
                color="#ffffff"
              />
            </span>

            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#475569',
              }}
            >
              Powerful AI tools for creators
            </span>

          </div>


          {/* ======================================
              MAIN HEADING
          ======================================= */}

          <h1
            style={{
              margin: 0,
              maxWidth: '850px',
              fontSize:
                'clamp(42px, 6vw, 76px)',
              lineHeight: 1.05,
              letterSpacing:
                '-0.045em',
              fontWeight: 700,
              color: '#0f172a',
            }}
          >

            Create amazing content

            <br />

            with{' '}

            <span
              style={{
                background:
                  'linear-gradient(90deg, #4f46e5, #7c3aed, #a855f7)',
                WebkitBackgroundClip:
                  'text',
                WebkitTextFillColor:
                  'transparent',
                backgroundClip:
                  'text',
              }}
            >
              AI tools
            </span>

          </h1>


          {/* ======================================
              DESCRIPTION
          ======================================= */}

          <p
            style={{
              maxWidth: '680px',
              margin:
                '25px auto 0',
              fontSize:
                '15px',
              lineHeight: 1.75,
              color: '#64748b',
            }}
          >
            Transform your content creation with
            our suite of powerful AI tools. Write
            articles, generate images, create blog
            titles, review resumes, and enhance your
            workflow — all in one place.
          </p>


          {/* ======================================
              BUTTONS
          ======================================= */}

          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >

            {/* START CREATING */}

            <button
              type="button"
              onClick={handleStartCreating}
              className="group flex items-center gap-2 rounded-full"
              style={{
                minHeight: '48px',
                padding:
                  '0 25px',
                border: 'none',
                background:
                  'linear-gradient(90deg, #4f46e5, #6366f1)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow:
                  '0 10px 25px rgba(79,70,229,0.22)',
                transition:
                  'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  'translateY(-2px)'
                e.currentTarget.style.boxShadow =
                  '0 14px 30px rgba(79,70,229,0.30)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  'translateY(0)'
                e.currentTarget.style.boxShadow =
                  '0 10px 25px rgba(79,70,229,0.22)'
              }}
            >

              Start creating now

              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />

            </button>


            {/* WATCH DEMO */}

            <button
              type="button"
              onClick={handleWatchDemo}
              className="group flex items-center gap-2 rounded-full"
              style={{
                minHeight: '48px',
                padding:
                  '0 22px',
                border:
                  '1px solid #dbe2ea',
                backgroundColor:
                  'rgba(255,255,255,0.72)',
                color: '#334155',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter:
                  'blur(10px)',
                transition:
                  'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  '#ffffff'
                e.currentTarget.style.transform =
                  'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  'rgba(255,255,255,0.72)'
                e.currentTarget.style.transform =
                  'translateY(0)'
              }}
            >

              <span
                className="flex items-center justify-center rounded-full"
                style={{
                  width: '25px',
                  height: '25px',
                  backgroundColor:
                    '#eef2f7',
                }}
              >
                <Play
                  size={11}
                  fill="#475569"
                  color="#475569"
                />
              </span>

              Watch demo

            </button>

          </div>


          {/* ======================================
              TRUSTED USERS
          ======================================= */}

          <div
            className="mt-7 flex items-center justify-center gap-3"
          >

            <img
              src={assets.user_group}
              alt="Trusted users"
              style={{
                height: '34px',
                width: 'auto',
              }}
            />

            <span
              style={{
                fontSize: '12px',
                color: '#64748b',
              }}
            >
              Trusted by{' '}

              <strong
                style={{
                  color: '#334155',
                  fontWeight: 700,
                }}
              >
                10k+
              </strong>{' '}

              people
            </span>

          </div>


          {/* ======================================
              SMALL FEATURE TEXT
          ======================================= */}

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-5"
            style={{
              color: '#94a3b8',
              fontSize: '10px',
            }}
          >

            <span>✦ AI Writing</span>

            <span>✦ AI Images</span>

            <span>✦ Resume Review</span>

            <span>✦ Smart Editing</span>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero