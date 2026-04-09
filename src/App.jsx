import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Productviewer from './components/Productviewer'
import './index.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)
const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Productviewer />

    </main>
  )
}

export default App