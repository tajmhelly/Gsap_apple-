import React from 'react';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from 'react-responsive';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



const Highlights = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  useGSAP(() => {
    gsap.to('.left-column, .right-column', {
      scrollTrigger: {
        trigger: '#highlights',
        start: isMobile ? 'bottom bottom' : 'top center',
        
      },
      y: 0,
      ease: 'power1.inOut',
      duration: 1,
      stagger: 0.5,
      opacity: 1,
    });
  }, [isMobile])
  return (
    <>
    <section id='highlights'>
      <h2>There's never been a better time to upgrade.</h2>
      <h3>Here is what yo get with the new Macbook Pro.</h3>
      <div className='masonry'>
        <div className='left-column'>
          <div>
            <img src="/laptop.png" alt="laptop" />
            <p>Fly through demanding tasks up to 9.8x faster </p>

            
          </div>
          <div>
            <img src="/sun.png" alt="sun" />
            <p> A stunning <br /> Liquid Retina XDR <br />
            display.</p>
          </div>

        </div>
        <div className='right-column'>
          <div className='apple-gradient'>
            <img src="/ai.png" alt="ai" />
            <p>Apple Intelligence. </p>

            
          </div>
          <div>
            <img src="/battery.png" alt="Battery" />
            <p> up to <span className='green-gradient'> {''}14 more hours{''} </span> of battery life. <span className='text-dark-100'>{' '}(Up to 22 hours on the M4 Max).</span></p>
          </div>

        </div>
      </div>
    </section>
    </>
  )
}

export default Highlights