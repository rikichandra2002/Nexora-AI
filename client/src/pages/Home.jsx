import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background:
          'linear-gradient(135deg, #f7fcff 0%, #fffaff 50%, #f8f7ff 100%)',
      }}
    >

      <Navbar />

      <main>

        <Hero />

        {/* ==========================================
            AI TOOLS
        =========================================== */}

        <section
          id="ai-tools"
          style={{
            width: '100%',
          }}
        >
          <AiTools />
        </section>


        {/* ==========================================
            TESTIMONIALS
        =========================================== */}

        <Testimonial />


        {/* ==========================================
            PLANS
        =========================================== */}

        <Plan />

      </main>


      {/* ==========================================
          FOOTER
      =========================================== */}

      <Footer />

    </div>
  )
}

export default Home