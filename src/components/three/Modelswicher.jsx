import { PresentationControls } from '@react-three/drei';
import {React,  useRef} from 'react'
import Macbook16 from '../models/Macbook-16';
import Macbook14 from '../models/Macbook-14';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'


const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 7;

const fadeMeshes = (group, opacity) => {
    if (!group) return;


    group.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent= true;
            gsap.to(child.material, {
                opacity,
                duration: ANIMATION_DURATION,
            });
        }
    });
};

const moveGroup = (group, x) => {
    if (!group) return;
    gsap.to(group.position, {
        x,duration: ANIMATION_DURATION,
    });
};

const Modelswicher = ({ scale, ismobile }) => {
    const smallMacbookRef = useRef();
    const bigMacbookRef = useRef();
    const showLargeMacbook =  scale === 0.08;


    useGSAP(() => {
        if (showLargeMacbook) {
            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            moveGroup(bigMacbookRef.current, 0);

            fadeMeshes(smallMacbookRef.current, 0);
            fadeMeshes(bigMacbookRef.current, 1);
        } else {
            moveGroup(smallMacbookRef.current, 0);
            moveGroup(bigMacbookRef.current, OFFSET_DISTANCE);

            fadeMeshes(smallMacbookRef.current, 1);
            fadeMeshes(bigMacbookRef.current, 0);
        }
    }, [scale]);
    const controlsConfig = {
        snap: true,
        speed: 1,
        zoom : 1,
        azimuth: [-Infinity, Infinity],
        config: { mass: 1, tension: 0, friction: 26 },
    }


  return (
    <>
        <PresentationControls {...controlsConfig}>
            <group ref={smallMacbookRef}>
                <Macbook14 scale={ismobile ?  0.03 :0.06 } />
            </group>
        </PresentationControls>

        <PresentationControls {...controlsConfig}>
            <group ref={bigMacbookRef}>
                <Macbook16 scale={ismobile ?  0.05 :0.08 } />
            </group>
        </PresentationControls>
    </>
  )
}

export default Modelswicher