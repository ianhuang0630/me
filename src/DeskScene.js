import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { LoadingManager } from 'three'

import MetaSphere from './Bwob'
import { useRef, useState } from 'react'


function CustomDeskScene(props) {
    const obj = useLoader(GLTFLoader, 'assets/desk_scene.glb')
    return <primitive {...props} object={obj.scene} scale={[1, 1, 1]} dispose={null} />
}

function LoadingScreen(props) {
    return (
        <div className="loading-screen">
            <img className="loading-animation" src="assets/spinning_purplehat.gif" />
            <p className="loading-message">
                Loading...
            </p>
        </div> 
    )
}

function SceneObjectsLoading(props) {
    const [scene_obj, set_scene_obj] = useState(null);

    const manager = new LoadingManager();
    manager.onStart = function (url, itemsLoaded, itemsTotal) {
        console.log('Loading!');
    }
    manager.onLoad = function () {
        console.log('Finished loading!');
    }

    const gloader = new GLTFLoader(manager)

    // const obj = useLoader(GLTFLoader, 'assets/desk_scene.glb')
    if (!scene_obj) {
        gloader.load('assets/desk_scene.glb', function (object) {
            set_scene_obj(object);
            props.isLoaded();
        });
    }

    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        // ref.current.rotation.x = Math.cos(t / 4) / 8
        if (ref && ref.current) {
            ref.current.rotation.y = Math.sin(t / 3) / 8
        }
        // ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
        // ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    }); 

    return (scene_obj?  
            <group ref={ref} dispose={null}>
                <MetaSphere position={[-0.8, 2.15, -0.8]} castShadow={true} />
                < primitive {...props} position={[0, -1, 0]} object = {scene_obj.scene } scale = { [1, 1, 1]} dispose = { null } /> 
                {/* <CustomDeskScene position={[0, -1, 0]} /> */}
                {/* <CustomDeskSceneLoading position={[0, -1, 0]} /> */}
            </group>
            : null)
}


function SceneObjects(props) { 
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        // ref.current.rotation.x = Math.cos(t / 4) / 8
        ref.current.rotation.y = Math.sin(t / 3) / 8
        // ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
        // ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    }); 

    return (<group ref={ref} dispose={null}>
        <MetaSphere position={[-0.8, 2.15, -0.8]} castShadow={true} />
        <CustomDeskScene position={[0, -1, 0]} isLoaded={props.isLoaded} />
        {/* <CustomDeskSceneLoading position={[0, -1, 0]} /> */}
    </group>);

}

function DeskScene(props) {
    const [loaded, set_loaded] = useState(false)    
    function isLoaded() {
        console.log('telling main scene that it is loaded!');
        set_loaded(true);
    }

    return (
        <div style={{ width: "100%", height: "100%", position:"relative"} }>
            <Canvas camera={{ fov: 48, near: 0.1, far: 1000, position: [-5, 1.7, -5] }}>
                <ambientLight intensity={1.0} />
                <pointLight position={[10, 10, -10]} />
                <SceneObjectsLoading isLoaded={isLoaded} />
                {props.orbit ? <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={1.5} minPolarAngle={-2.0} /> : null}
            </Canvas>
            {!loaded ? <LoadingScreen />: null}
        </div>
    )
}

export default DeskScene;