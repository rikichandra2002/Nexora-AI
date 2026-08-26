import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/react'

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()

  return (
    <div className='fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
      
      <img
        src={assets.logo}
        alt="Nexora.ai Logo"
        className='w-36 sm:w-48 h-auto cursor-pointer object-contain hover:opacity-95 transition-all duration-300 transform hover:scale-[1.02]'
        onClick={() => navigate('/')}
      />

      {user ? (
        <UserButton />
      ) : (
        <button
          onClick={openSignIn}
          className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'
        >
          Get started
          <ArrowRight className='w-4 h-4' />
        </button>
      )}

    </div>
  )
}

export default Navbar