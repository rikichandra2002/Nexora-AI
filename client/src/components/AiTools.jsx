import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/react'

const AiTools = () => {

  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <section
      style={{
        width: '100%',
        padding: '64px 20px 96px',
        overflow: 'hidden',
      }}
    >

      {/* Heading */}
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2 className="text-slate-800 text-4xl sm:text-[42px] font-semibold leading-tight">
          Powerful AI Tools
        </h2>

        <p className="text-slate-600 mt-4 text-sm sm:text-base leading-6">
          Everything you need to create, enhance, and optimize your content
          with cutting-edge AI technology.
        </p>
      </div>


      {/* AI Tools */}
      <div
        style={{
          width: '100%',
          maxWidth: '1152px',
          margin: '48px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '24px',
        }}
        className="ai-tools-grid"
      >

        {AiToolsData.map((tool, index) => (

          <div
            key={index}
            onClick={() => user && navigate(tool.path)}
            className="
              min-h-[210px]
              p-6
              sm:p-7
              rounded-2xl
              bg-[#FDFDFE]
              border
              border-gray-100
              shadow-sm
              hover:shadow-lg
              hover:-translate-y-1
              transition-all
              duration-300
              cursor-pointer
            "
          >

            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`
              }}
            />

            <h3 className="mt-5 mb-3 text-lg font-semibold text-slate-800">
              {tool.title}
            </h3>

            <p className="text-gray-400 text-sm leading-6">
              {tool.description}
            </p>

          </div>

        ))}

      </div>

    </section>
  )
}

export default AiTools