import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Logo = ({ className = 'h-10 w-auto', showText = true, onClick }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate('/')
    }
  }

  return (
    <div 
      onClick={handleClick}
      className="flex items-center gap-3 cursor-pointer group select-none transition-all duration-300"
    >
      <img 
        src={assets.logo} 
        alt="Nexora.ai Logo" 
        className={`${className} object-contain transition-transform duration-300 group-hover:scale-105`} 
      />
    </div>
  )
}

export default Logo
