import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'

import { Mesh, Vector3, MeshBasicMaterial } from 'three'
import SimplexNoise from 'simplex-noise'

// function MetaSphereContinuous(props) {
//     const ref = useRef();
//     const radius = 0.6;
//     let nPos = []; 
//     const noiseGenerator = new SimplexNoise(12231);
//     const default_noisemagntiude = 0.1*radius; // lower
//     const default_timeconstant = 0.5; // lower
//     const max_noisemagnitude = 0.8*radius; // upper
//     const max_timeconstant = 0.5; // upper

//     const [hover, set_hover] = useState(false);

//     // const [prev_noisemagnitude, set_prev_nm] = useState(default_noisemagntiude)
//     const [noisemagnitude, set_noisemagnitude] = useState(default_noisemagntiude); 
//     const [timeconstant, set_timeconstant] = useState(default_timeconstant);

//     const timewraparound = 10000000;
//     let direction = 1


//     useEffect(() => { 
//         // getting the normals, assuming that the sphere is centered at 0.
//         const currentPos = ref.current.geometry.getAttribute('position'); //.array;
//         let v3 = new Vector3();
//         for (let i = 0; i < currentPos.count; i++){
//             v3.fromBufferAttribute(currentPos, i).normalize();
//             nPos.push(v3.clone());
//         }
//     })

//     useFrame((state, delta) => {
//         if (elapsed_time >= timewraparound || elapsed_time < 0) {
//             console.log('switch'); 
//             direction *= -1;
//         }

//         if (hover) {
//             console.log('IN hovering handling per froame');
//             // then we increment to a max magnitude
//             set_noisemagnitude(Math.min(noisemagnitude + 0.05, max_noisemagnitude));
//             // set_timeconstant(Math.min(timeconstant + 0.01), max_timeconstant)
//         }
//         else {
//             set_noisemagnitude(Math.max(noisemagnitude - 0.05, default_noisemagntiude));
//             // set_timeconstant(Math.max(timeconstant - 0.01), default_timeconstant)
//         }

//         // transitioning time magnitude
//         // (prev_noisemagnitude + noisemagnitude)/2
//         console.log(elapsed_time)
//         // ref.current.geometry.setAttribute('position', ref.current.geometry.getAttribute('position') + 0.01)
//         const currentPos = ref.current.geometry.getAttribute('position'); //.array;
//         let v3 = new Vector3();
//         nPos.forEach((p, idx) => {
//             let ns = noisemagnitude * noiseGenerator.noise4D(p.x, p.y, p.z, elapsed_time);
//             v3.copy(p).multiplyScalar(radius).addScaledVector(p, ns); // gives a displacement vector
//             currentPos.setXYZ(idx, v3.x, v3.y, v3.z);
//         })
//         ref.current.geometry.computeVertexNormals(); 
//         currentPos.needsUpdate = true;
//     })


//     return (
//         <mesh  {...props}
//             onPointerOver={() => set_hover(true)}
//             onPointerOut={() => set_hover(false)}
//             ref={ref}>
//             <sphereGeometry args={[radius,  8, 8 ]} />
//             <meshStandardMaterial color={"#9370db"} /> 
//         </mesh>
//     )
// }

function MetaSphere(props) {
    const ref = useRef();
    const radius = 0.4;
    let nPos = []; 
    const noiseGenerator = new SimplexNoise(12231);
    const default_noisemagntiude = 0.1*radius; // lower
    const default_timeconstant = 0.5; // lower
    const max_noisemagnitude = 0.2*radius; // upper
    const max_timeconstant = 0.5; // upper


    // const [prev_noisemagnitude, set_prev_nm] = useState(default_noisemagntiude)
    const [noisemagnitude, set_noisemagnitude] = useState(default_noisemagntiude); 
    const [noise2max, set_noise2max] = useState(false);

    useEffect(() => { 
        // getting the normals, assuming that the sphere is centered at 0.
        const currentPos = ref.current.geometry.getAttribute('position'); //.array;
        let v3 = new Vector3();
        for (let i = 0; i < currentPos.count; i++){
            v3.fromBufferAttribute(currentPos, i).normalize();
            nPos.push(v3.clone());
        }
        // control_magnitude(0.01*radius, 50 );
        // console.log(timer);
    })

    useFrame(({ clock }) => {
        const elapsed_time = clock.getElapsedTime();
        // transitioning time magnitude
        // (prev_noisemagnitude + noisemagnitude)/2
        // ref.current.geometry.setAttribute('position', ref.current.geometry.getAttribute('position') + 0.01)
        const currentPos = ref.current.geometry.getAttribute('position'); //.array;
        let v3 = new Vector3();
        nPos.forEach((p, idx) => {
            let ns = noisemagnitude * noiseGenerator.noise4D(p.x, p.y, p.z, elapsed_time);
            v3.copy(p).multiplyScalar(radius).addScaledVector(p, ns); // gives a displacement vector
            currentPos.setXYZ(idx, v3.x, v3.y, v3.z);
        })
        ref.current.geometry.computeVertexNormals(); 
        currentPos.needsUpdate = true;
    })

    
    function control_magnitude(delta, wait) {
        setInterval(() => {
            // console.log('checking magnitude!')
            console.log(noise2max);
            if (noise2max && noisemagnitude < max_noisemagnitude) {
                set_noisemagnitude(noisemagnitude + delta);
            }
            else if (!noise2max && noisemagnitude > default_noisemagntiude) {
                set_noisemagnitude(noisemagnitude - delta);
            }
            else {
                // console.log('nothing to do!');
            }
            // console.log(noisemagnitude);
 
        }, wait);
    }

    function set_increased_magnitude() {
        set_noisemagnitude(max_noisemagnitude);
    }

    function set_decreased_magnitude() {
        set_noisemagnitude(default_noisemagntiude);
    }

    return (
        <mesh  {...props}
            onPointerOver={() => set_increased_magnitude()}
            onPointerOut={() => set_decreased_magnitude()}
            ref={ref}>
            <sphereGeometry args={[radius,  20, 20]} />
            <meshPhongMaterial color={"#9370db"} /> 
        </mesh>
    )
}

export default MetaSphere;
