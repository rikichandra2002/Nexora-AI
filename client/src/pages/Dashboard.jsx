import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles } from 'lucide-react'
import CreationItem from '../components/CreationItem'

const Dashboard = () => {
  const [creations, setCreations] = useState([])

  const getDashboardData = async () => {
    setCreations(dummyCreationData)
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        backgroundColor: '#f5f8fc',
        padding: '32px 40px 60px 60px',
        boxSizing: 'border-box',
      }}
    >

      {/* ================= TOP CARDS ================= */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
        }}
      >

        {/* Total Creations */}
        <div
          style={{
            width: '290px',
            height: '150px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            flexShrink: 0,
          }}
        >

          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#e0e7ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            }}
          >
            <Sparkles
              style={{
                width: '21px',
                height: '21px',
                color: '#4f46e5',
              }}
            />
          </div>

          <p
            style={{
              margin: 0,
              fontSize: '14px',
              fontWeight: 500,
              color: '#64748b',
            }}
          >
            Total Creations
          </p>

          <h2
            style={{
              margin: '4px 0 0',
              fontSize: '26px',
              fontWeight: 600,
              color: '#0f172a',
            }}
          >
            {creations.length}
          </h2>

        </div>


        {/* Active Plan */}
        <div
          style={{
            width: '290px',
            height: '150px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            flexShrink: 0,
          }}
        >

          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ff61c5, #9e53ee)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            }}
          >
            <Gem
              style={{
                width: '21px',
                height: '21px',
                color: '#ffffff',
              }}
            />
          </div>

          <p
            style={{
              margin: 0,
              fontSize: '14px',
              fontWeight: 500,
              color: '#64748b',
            }}
          >
            Active Plan
          </p>

          <h2
            style={{
              margin: '4px 0 0',
              fontSize: '26px',
              fontWeight: 600,
              color: '#0f172a',
            }}
          >
            Premium
          </h2>

        </div>

      </div>


 {/* ================= RECENT CREATIONS ================= */}

<div
  style={{
    marginTop: '55px',
    width: '100%',
    maxWidth: '1050px',
  }}
>

  {/* Header */}
  <div className="flex items-end justify-between mb-6">

    <div>
      <h2 className="
        text-xl
        font-semibold
        text-slate-800
      ">
        Recent Creations
      </h2>

      <p className="
        mt-1
        text-sm
        text-slate-400
      ">
        Your latest AI generated content
      </p>
    </div>

    <span className="
      text-xs
      font-medium
      text-slate-500
      bg-white
      border border-slate-200
      px-3
      py-1.5
      rounded-full
      shadow-sm
    ">
      {creations.length} items
    </span>

  </div>


  {/* Creation List */}
  <div style={{ width: '100%' }}>
  {creations.map((item) => (
    <CreationItem
      key={item.id}
      item={item}
    />
  ))}
</div>

</div>

    </div>
  )
}

export default Dashboard