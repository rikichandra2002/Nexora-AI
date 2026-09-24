import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Play,
  Sparkles,
  X,
  ExternalLink,
  FileText,
  Type,
  Image as ImageIcon,
  Eraser,
  FileCheck2
} from 'lucide-react'
import { useClerk, useUser } from '@clerk/react'

// ======================================================
// DEMO VIDEOS
// ======================================================

const demoVideos = [
  {
    id: 'JPzJl3yuFPk',
    title: 'AI Article Writer',
    description: 'Write complete articles in seconds.',
    icon: FileText,
    color: 'violet',
  },
  {
    id: 'HCaURbwBA8k',
    title: 'AI Blog Title Generator',
    description: 'Generate catchy and SEO-friendly titles.',
    icon: Type,
    color: 'emerald',
  },
  {
    id: 'jsyuLkcUnrs',
    title: 'AI Image Generator',
    description: 'Create stunning images from text.',
    icon: ImageIcon,
    color: 'orange',
  },
  {
    id: 'GAxnOWbWVRg',
    title: 'Background & Object Removal',
    description: 'Remove backgrounds and unwanted objects.',
    icon: Eraser,
    color: 'pink',
  },
  {
    id: 'KprWxa9WtIk',
    title: 'AI Resume Reviewer',
    description: 'Get useful AI-powered resume feedback.',
    icon: FileCheck2,
    color: 'blue',
  },
]

// ======================================================
// DEMO COLORS
// ======================================================

const colorStyles = {
  violet: {
    icon: 'bg-violet-100 text-violet-600',
    active: 'border-violet-200 bg-violet-50',
    number: 'text-violet-600',
  },

  emerald: {
    icon: 'bg-emerald-100 text-emerald-600',
    active: 'border-emerald-200 bg-emerald-50',
    number: 'text-emerald-600',
  },

  orange: {
    icon: 'bg-orange-100 text-orange-600',
    active: 'border-orange-200 bg-orange-50',
    number: 'text-orange-600',
  },

  pink: {
    icon: 'bg-pink-100 text-pink-600',
    active: 'border-pink-200 bg-pink-50',
    number: 'text-pink-600',
  },

  blue: {
    icon: 'bg-blue-100 text-blue-600',
    active: 'border-blue-200 bg-blue-50',
    number: 'text-blue-600',
  },
}

const Hero = () => {
  const navigate = useNavigate()
  const { openSignIn } = useClerk()
  const { user } = useUser()

  // ======================================================
  // DEMO STATE
  // ======================================================

  const [showDemo, setShowDemo] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0])

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
    setSelectedVideo(demoVideos[0])
    setShowDemo(true)
  }

  // ==========================================
  // CLOSE DEMO
  // ==========================================

  const closeDemo = () => {
    setShowDemo(false)
  }

  return (
    <>
      {/* =========================================================
          YOUR ORIGINAL HERO SECTION
      ========================================================= */}

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


      {/* =========================================================
          DEMO MODAL
      ========================================================= */}

      {showDemo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/65 p-3 backdrop-blur-md sm:p-5"
          onClick={closeDemo}
        >

          {/* =====================================================
              DEMO CONTAINER
          ===================================================== */}

          <div
            className="flex h-[90vh] w-full max-w-[1250px] flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_30px_100px_rgba(15,23,42,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-100 bg-white px-5 sm:px-7">

              <div>

                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Nexora AI Demo
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  Explore what you can create with Nexora AI
                </p>

              </div>

              <button
                type="button"
                onClick={closeDemo}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={19} />
              </button>

            </div>


            {/* =================================================
                MODAL BODY
            ================================================= */}

            <div className="flex min-h-0 flex-1 flex-col lg:flex-row">

              {/* =================================================
                  LEFT FEATURE MENU
              ================================================= */}

              <aside className="w-full shrink-0 border-b border-slate-100 bg-slate-50/70 p-3 sm:p-4 lg:w-[270px] lg:border-b-0 lg:border-r">

                <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  AI Features
                </p>

                <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">

                  {demoVideos.map((video, index) => {

                    const Icon = video.icon

                    const styles =
                      colorStyles[video.color]

                    const active =
                      selectedVideo.id === video.id

                    return (
                      <button
                        type="button"
                        key={video.id}
                        onClick={() =>
                          setSelectedVideo(video)
                        }
                        className={`flex min-w-0 items-center gap-2.5 rounded-xl border px-2.5 py-2.5 text-left transition-all duration-200 ${
                          active
                            ? `${styles.active} shadow-sm`
                            : 'border-transparent hover:bg-white'
                        }`}
                      >

                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}
                        >
                          <Icon size={17} />
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex items-center gap-1.5">

                            <span
                              className={`text-[9px] font-bold ${styles.number}`}
                            >
                              {String(index + 1).padStart(
                                2,
                                '0'
                              )}
                            </span>

                            <h3 className="truncate text-[12px] font-bold text-slate-800 sm:text-sm">
                              {video.title}
                            </h3>

                          </div>

                          <p className="mt-0.5 hidden truncate text-[11px] text-slate-500 lg:block">
                            {video.description}
                          </p>

                        </div>

                      </button>
                    )
                  })}

                </div>

              </aside>


              {/* =================================================
                  VIDEO AREA
              ================================================= */}

              <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">

                {/* VIDEO */}

                <div className="relative min-h-0 flex-1 bg-black">

                  <iframe
                    key={selectedVideo.id}
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo.id}?rel=0`}
                    title={selectedVideo.title}
                    className="absolute inset-0 h-full w-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />

                </div>


                {/* =================================================
                    VIDEO INFORMATION
                ================================================= */}

                <div className="flex shrink-0 items-center justify-between gap-4 border-t border-slate-100 bg-white px-5 py-4 sm:px-6">

                  <div className="flex min-w-0 items-center gap-3">

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        colorStyles[
                          selectedVideo.color
                        ].icon
                      }`}
                    >

                      {React.createElement(
                        selectedVideo.icon,
                        {
                          size: 18,
                        }
                      )}

                    </div>

                    <div className="min-w-0">

                      <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                        {selectedVideo.title}
                      </h3>

                      <p className="mt-0.5 truncate text-xs text-slate-500 sm:text-sm">
                        {selectedVideo.description}
                      </p>

                    </div>

                  </div>


                  <a
                    href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 sm:px-5 sm:text-sm"
                  >

                    <span className="hidden sm:inline">
                      Watch on YouTube
                    </span>

                    <span className="sm:hidden">
                      YouTube
                    </span>

                    <ExternalLink size={14} />

                  </a>

                </div>

              </main>

            </div>

          </div>

        </div>
      )}
    </>
  )
}

export default Hero