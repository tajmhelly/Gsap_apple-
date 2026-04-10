import { useMediaQuery } from "react-responsive"
import { useGSAP } from "@gsap/react"
import gsap from "gsap";

const ShowCase = () => {
    const isTablet = useMediaQuery({ maxWidth: 1024 }) ;
    useGSAP(() => {
        if (!isTablet) {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#showcase",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                }}
            );
            timeline.to('.mask img',{
                transform: 'scale(1.1)'
            }).to('.content' , {opacity:1 , y:0, ease:'power1.in'});


    }},  [isTablet] )
  return (
    <>
       <section id = "showcase" >
          <div className="media">
            <video src="/videos/game.mp4" loop muted autoPlay playsInline/>
            <div className="mask">
                <img src="/mask-logo.svg" alt="" />
            </div>
          </div>
            <div className="content">
                <div className="wrapper">
                    <div className="lg:max-w-md">
                        <h2>Rocket Chip</h2>

                        <div className="space-y-5 mt-7">
                            <p>
                                Introducing {" "}
                                <span className="text-white">
                                    M4, the next generation of Apple Silicon
                                </span>
                                . M4 powers
                            </p>
                            <p>
                                it drives Apple Intelligence  on ipad pro, so you can do more than ever before. With up to 18 cores, M4 delivers up to 15% faster CPU performance and up to 35% faster GPU performance than M3 Pro, while using up to 30% less power. And with a new 16-core Neural Engine, M4 is up to 40% faster at machine learning tasks than M3 Pro.
                            </p>
                            <p>
                                A brand-new diplay engine enables up to 4 external displays, and the new media engine supports hardware-accelerated encoding and decoding of ProRes video. M4 is the most powerful chip we’ve ever made, and it’s designed to take your creativity to new heights.
                            </p>
                            <p className="text-primary">
                                Learn more about Apple Intelligence
                            </p>


                        </div>

                    </div>
                    <div className="max-w-3xs space-y-14">
                        <div className="space-y-2"> 
                            <p>Up to</p>
                            <h3>4x faster</h3>
                            <p>pro rendering performance than M2</p>

                        </div>
                        <div className="space-y-2"> 
                            <p>Up to</p>
                            <h3>1.5 faster</h3>
                            <p>CPU performance than M2</p>

                        </div>

                    </div>

                </div>
            </div>
       </section>
    
    </>
  )
}

export default ShowCase