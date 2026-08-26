import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'

const Hero = () => {
  const navigate = useNavigate()

  return (
    <section
  className='relative w-full overflow-hidden pt-4 pb-2 sm:pt-8 sm:pb-4'
  style={{
    background:
      'radial-gradient(circle at 20% 20%, rgba(91, 231, 255, 0.18), transparent 35%), radial-gradient(circle at 80% 25%, rgba(180, 120, 255, 0.18), transparent 35%), linear-gradient(135deg, #f4fbff 0%, #fff9fc 50%, #f8f7ff 100%)',
  }}
>
      <div className='flex min-h-screen w-full items-center justify-center px-4 sm:px-8'>
        <div className='flex w-full max-w-4xl flex-col items-center gap-5 text-center'>

          {/* Heading */}
          <h1 className='text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl md:text-5xl'>
            Create amazing content
            <br />
            with <span className='text-primary'>AI tools</span>
          </h1>

          {/* Description */}
          <p className='max-w-xl text-sm leading-6 text-slate-600 sm:text-[15px]'>
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
          </p>

          {/* Buttons */}
          <div className='flex flex-wrap items-center justify-center gap-5'>
            <button
              onClick={() => navigate('/ai')}
              className='group flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-indigo-500 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95'
            >
              Start creating now
              <ArrowRight className='h-5 w-5 transition-transform duration-200 group-hover:translate-x-1' />
            </button>

            <button
              className='group flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-10 py-4 text-base font-semibold text-slate-700 backdrop-blur-sm transition-all duration-200 hover:border-slate-400 hover:bg-white hover:-translate-y-0.5 active:translate-y-0 active:scale-95'
            >
              <span className='flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 transition-colors group-hover:bg-slate-300'>
                <Play className='h-3 w-3 fill-slate-700 text-slate-700' />
              </span>
              Watch demo
            </button>
          </div>

          {/* Trusted users */}
          <div className='flex items-center justify-center gap-3 text-sm text-slate-500'>
            <img
              src={assets.user_group}
              alt='Trusted users'
              className='h-8 w-auto'
            />
            <span>
              Trusted by{' '}
              <span className='font-semibold text-slate-700'>10k+</span> people
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero