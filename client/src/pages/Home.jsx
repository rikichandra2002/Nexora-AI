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
      className='min-h-screen w-full overflow-x-hidden'
      style={{
        background:
          'radial-gradient(circle at 20% 20%, rgba(91, 231, 255, 0.18), transparent 35%), radial-gradient(circle at 80% 25%, rgba(180, 120, 255, 0.18), transparent 35%), linear-gradient(135deg, #f4fbff 0%, #fff9fc 50%, #f8f7ff 100%)',
      }}
    >
      <Navbar />
      <Hero />
      <AiTools />
      <Testimonial />
      <Plan />
      <Footer />
    </div>
  )
}
export default Home