import {React,  useRefModelswicher } from 'react';
import useMacbookStore from '../store';
import clsx from 'clsx';
import { Canvas } from '@react-three/fiber';
import {Box,OrbitControls} from '@react-three/drei';
import Studiolight from './three/Studiolight.jsx';
import Modelswitcher from './three/Modelswicher.jsx';
import { useMediaQuery } from 'react-responsive';

const Productviewer = () => {
  const {color, scale , setColor, setScale} = useMacbookStore();
  const ismobile = useMediaQuery({ maxWidth: 768 }) ;


  return (
    <>
        <section id='product-viewer'>
          <h2>Take a closer look</h2>
            <div className='controls'>
              <p className='info'>MacbookPro {scale} {color}</p>
                <div className='flex-center gap-5 mt-5'>
                  <div className='color-control'>
                    < div onClick={()=> 
                      setColor('#adb5bd')} className
                      ={clsx('bg-neutral-300' , color==='#adb5bd' && 'active')}
                    />

                    < div onClick={()=> 
                      setColor('#2e2c2e')} className
                      ={clsx('bg-neutral-900' , color==='#2e2c2e' && 'active')}
                    />
                  </div>
                  < div className='size-control'>
                    < div onClick={()=> 
                      setScale('0.06')} className
                      ={clsx( scale==='0.06' ? 'bg-white text-black' : 'bg-transparent' , 'border border-white')}
                    />
                    <p>14"</p>

                    < div onClick={()=> 
                      setScale('0.08')} className
                      ={clsx( scale==='0.08' ? 'bg-white text-black' : 'bg-transparent' , 'border border-white')}
                    />
                    <p>16"</p>
                  </div>

                </div>
                
            </div>
            <Canvas id='canvas' camera={{position:[0,2,5], fov:50 ,near:2 ,far:100}}>
              <Studiolight/>
              
              <Modelswitcher  scale={ismobile ? scale -0.03 : scale} ismobile={ismobile}/>
            </Canvas>
        </section>
    </>
  )
}

export default Productviewer