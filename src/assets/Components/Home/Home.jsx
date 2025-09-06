import React from 'react'
import HeroSection from './HeroSection'
import HowItWorks from './HowItWorks'
import FeaturedServices from './FeaturedServices'
import WhyChooseUs from './WhyChooseUs'
import CTASection from './CTASection'

function Home() {
  return (
    <div className='text-black min-h-[100vh]'>
     <HeroSection/>
     <HowItWorks/>
     <FeaturedServices/>
     <WhyChooseUs/>
     <CTASection/>

      </div>
  )
}

export default Home