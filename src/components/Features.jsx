import React from 'react'
import { Canvas } from '@react-three/fiber'

import { features , featureSequence} from '../constants/index.js'
import clsx from 'clsx'
import { useMediaQuery } from 'react-responsive'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

import { Suspense, useRef, useEffect } from 'react'
import { Html } from '@react-three/drei'
import Macbook from './models/Macbook.jsx'
import Studiolight  from './three/Studiolight.jsx'
import useMacbookStore from '../store/index.js'
import { preload } from 'react-dom'
import { cross } from 'three/tsl'
import { useGSAP } from '@gsap/react'


const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const { setTexture } = useMacbookStore();
  
  useEffect(() => {
    featureSequence.forEach((feature) => {
      const v = document.createElement('video');

      Object.assign(v, {
        src: feature.videoPath,
        crossOrigin: 'anonymous',
        muted: true,
        preload: 'auto',
        playsInline: true,
      });
      v.load(); 
    });
  }, []);

    useGSAP(() => {
        // 3D MODEL ROTATION ANIMATION
        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top top',
                end: 'bottom  top',
                scrub: 1,
                pin: true,
            }
        });

        // SYNC THE FEATURE CONTENT
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top center',
                end: 'bottom  top',
                scrub: 1,
            }
        })

        // 3D SPIN
        if(groupRef.current) {
            modelTimeline.to(groupRef.current.rotation, { y: Math.PI * 2, ease: 'power1.inOut'})
        }

        //CONTENT SYNC
        timeline
        .call(() => setTexture('/videos/feature-1.mp4'))
        .to('.box-1', { opacity: 1, y: 0,delay: 1})

        .call(() => setTexture('/videos/feature-2.mp4'))
        .to('.box-2', { opacity: 1, y: 0})

        .call(() => setTexture('/videos/feature-3.mp4'))
        .to('.box-3', { opacity: 1, y: 0})

        .call(() => setTexture('/videos/feature-4.mp4'))
        .to('.box-4', { opacity: 1, y: 0})
        
        .call(() => setTexture('/videos/feature-5.mp4'))
        .to('.box-5', { opacity: 1, y: 0})
        
        
        
        }, []);

  return (
    <group ref={groupRef} >
      <Suspense fallback= {
        <Html><h1 className='text-white text-3xl uppercase'>
        Loading...
          </h1></Html>}>
        <Macbook  scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]}/>
        
      </Suspense>
    </group>
  )
}

const Features = () => {
  return (
    <>
      <section id='features'>
        <h2> see it all in a new light.</h2>

        <Canvas id="f-canvas" camera={{ }} >
          <Studiolight/>
          <ambientLight intensity={0.5} />
          <ModelScroll/>

        </Canvas>
        <div className='absolute inset-0 z-50'>
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={clsx('box', `box-${index + 1}`, feature.styles)}
            >
              <img
                src={feature.icon}
                alt={feature.highlight}
                className='w-10 h-10 mb-3 block'
              />
              <p> <span className='text-white'>{feature.highlight}</span> 
                   {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      
    </>
  )
}

export default Features