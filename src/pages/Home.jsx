import React from 'react'
import NavBar from '../components/NavBar'
import HeroSection from '../sections/HeroSection'
import MessageSection from '../sections/MessageSection'

function Home() {
  return (
    <>
        <main>
            <NavBar />
            <HeroSection />
            <MessageSection />
            <div className='h-dvh'></div>
        </main>
    </>
  )
}

export default Home