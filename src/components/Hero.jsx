import React, { use, useEffect, useRef } from 'react'

const Hero = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) videoRef.current.playbackRate =0.5;
    }, []);

  return (
    <>
        <section id='hero'>
            <div>
                <h1>Macbook pro</h1>
                <img src="/title.png" alt="Macbook pro" />
            </div>
            <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline/>
            <button>Buy</button>
            <p>From $1,999 or $166.62/mo. for 12 mo.*</p>
        </section>
    </>
  )
}

export default Hero