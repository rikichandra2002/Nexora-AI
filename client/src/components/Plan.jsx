import React from 'react'
import { PricingTable } from '@clerk/react'

const Plan = () => {
  return (
    <section
      style={{
        width: '100%',
        padding: '80px 20px 100px',
        textAlign: 'center',
      }}
    >
      {/* Heading */}
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            margin: 0,
            color: '#334155',
            fontSize: '42px',
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          Choose your plan
        </h2>

        <p
          style={{
            width: '100%',
            maxWidth: '600px',
            margin: '16px auto 0',
            color: '#6b7280',
            fontSize: '16px',
            lineHeight: 1.5,
            textAlign: 'center',
          }}
        >
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>

      {/* Pricing Table */}
      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          margin: '56px auto 0',
        }}
      >
        <PricingTable />
      </div>
    </section>
  )
}

export default Plan