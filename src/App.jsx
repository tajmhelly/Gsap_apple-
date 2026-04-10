import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Productviewer from './components/Productviewer'
import './index.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import ShowCase from './components/ShowCase'
import Performance from './components/Performance'
import Features from './components/Features'
import Highlights from './components/Highlights'
import Footer from './components/Footer'



gsap.registerPlugin(ScrollTrigger)
const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Productviewer />
      <ShowCase />
      <Performance />
      <Features />
      <Highlights />
      <Footer/>

    </main>
  )
}

export default App