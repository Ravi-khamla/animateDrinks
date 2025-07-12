import React from 'react'
import NavBar from './components/NavBar'
import HeroSection from './sections/HeroSection'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import MessageSection from './sections/MessageSection'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PlantScroll from './pages/PlantScroll'

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plant" element={<PlantScroll />} />
    </Routes>
  )
}

export default App