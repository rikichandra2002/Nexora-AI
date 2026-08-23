import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div
      className='px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center bg-cover bg-center bg-no-repeat min-h-screen'
      style={{
        backgroundImage: `url(${assets.gradientBackground})`,
      }}
    >
      <div className='w-full text-center mb-6'>

  <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2] text-white'>
    Create amazing content
    <br />
    with <span className='text-primary'>AI</span>
  </h1>

  <p className='mt-5 mx-auto w-full max-w-2xl text-center text-sm sm:text-base leading-7 text-white/85'>
    Transform your content creation process with our premium AI tools.
  </p>

</div>
    </div>
  )
}

export default Hero