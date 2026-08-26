import React from 'react'
import { AiToolsData } from '../assets/assets'

const AiTools = () => {
  return (
    <section className='w-full px-4 sm:px-20 xl:px-32 -mt-40 pt-0 pb-24'>
      <div className='w-full flex flex-col items-center text-center mx-auto'>
        <h2 className='text-slate-800 text-[42px] font-semibold'>
          Powerful AI Tools
        </h2>

        <p className='text-slate-600 mt-4'>
          Everything you need to create, enhance, and optimize your content
          with cutting-edge AI technology.
        </p>
      </div>
      <div className='flex flex-wrap mt-10 justify-center '>
        {AiToolsData.map((tool, index) =>(
          <div key={index} className=' p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-1g border border-gray-100 hover:-translate-y-1
           transition-all duration-300 cursor-pointer'> </div>
        ) )}

      </div>
    </section>
  )
}

export default AiTools