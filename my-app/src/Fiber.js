import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader, useResource } from 'react-three-fiber';
import * as THREE from '../node_modules/three';
import img from './Heatmap.png';
import Roboto from './fonts/RobotoMono-RegularJSON.json'

export function Numbers() {
    const numbers = useRef();
    let x = window.innerWidth * .25;
    let y = window.innerHeight * .5;
    
    return(
        <mesh>

        </mesh>
    )
}

export function Text() {
    // parse JSON file with Three
    const font = new THREE.FontLoader().parse(Roboto);
    let shapes = font.generateShapes("100", 100, 2);
    // configure font geometry
    const textOptions = {
        font,
        size: 5,
        height: 1
    };
    let textShape = new THREE.BufferGeometry();
        let geometry = new THREE.ShapeGeometry( shapes );
    
    const text = '100';

    return (
        <mesh>
            <textBufferGeometry args={['100', textOptions]} />
            <meshStandardMaterial attach='material' />
        </mesh>
    )
    
}

export function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        mesh.current.rotation.x = mesh.current.rotation.y -= 0.025;
    })

    const convertToScale = (posX, posY, oldX, oldY, mouseX, mouseY, lightZ) => {
        let newX, newY, newZ, newPosition;
        console.log('=================')
        console.log(oldX, oldY, mouseX, mouseY)
        console.log('=================')
        let xBool = oldX > mouseX;
        let yBool = oldY > mouseY;
        newX = xBool ? posX - .05 : posX + .05;
        newY = yBool ? posY + .05 : posY - .05;
        newZ = lightZ;
        newPosition = [newX, newY, newZ];
        return newPosition
    }

    let midX = window.innerWidth / 3;
    let midY = window.innerHeight / 3;

    const [ position, setPosition ] = useState({ x: midX, y: midY });
    const [ last, setLast ] = useState({ x: 0, y: 0 });

    useEffect( () => {
        setLast({x: position.x, y: position.y})
        const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", setFromEvent);
        console.log(mesh.current)
        let l = mesh.current.position;
        let newLightPosition = convertToScale(l.x, l.y, last.x, last.y, position.x, position.y, l.z)
        l.set(...newLightPosition);
        
        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    }, [position])

    return (
        <mesh
            position={[0, 0, 0]} 
            ref={mesh}
            castShadow={true    }
            scale={active ? [1, 1, 1] : [1, 1, 1]}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
            >
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                roughness={.5}
                metalness={1.5}
                color={hovered ? 'slateblue' : 'green'} />
        </mesh>
        )
    }

export function Light({ brightness, color }) {

    const convertToScale = (oldY, mouseX, mouseY, lightZ) => {
        // console.log(mouseX, mouseY);
        let upperWidthBound, upperHeightBound, newX, newY, newZ, newPosition;
        upperWidthBound = window.innerWidth;
        upperHeightBound = window.innerHeight;
        newX = mouseX / upperWidthBound * 100;
        newY = mouseY / upperHeightBound * 100;
        newZ = lightZ;
        oldY < mouseY ? newZ += .05 : newZ -= .05;
        // console.log(newPosition)
        newPosition = [newX, newY, newZ];
        return newPosition
    }

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect( () => {
        const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", setFromEvent);
        let l = light.current.position;
        // console.log('light.current.position ', l);
        // console.log('convert to scale ', convertToScale(l.y, position.x, position.y, l.z));
        let newLightPosition = convertToScale(l.y, position.x, position.y, l.z)
        l.set(...newLightPosition);
        
        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    }, [position])

    const light = useRef();
    return (
      <rectAreaLight
        ref={light}
        width={3}
        height={3}
        color={color}
        intensity={brightness}
        position={[7, 7, 7]}
        lookAt={[10, 0, 10]}
        penumbra={1}
        castShadow
      />
    );
  }


  // Geometry
  export function GroundPlane() {
    console.log(img)
    return (
      <mesh receiveShadow rotation={[5, 0, 10]} position={[0, -2, 0]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshStandardMaterial attach="material" color="red"/>
      </mesh>
    );
  }
export  function BackDrop() {
    return (
      <mesh receiveShadow position={[0, -5, -10]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshStandardMaterial attach="material" color="slateblue"/>
      </mesh>
    );
  }

export function FillLight({ brightness, color }) {
    return (
      <rectAreaLight
        width={3}
        height={3}
        intensity={brightness}
        color={color}
        position={[2, 1, 4]}
        lookAt={[0, 0, 0]}
        penumbra={2}
        castShadow
      />
    );
}

export function RimLight({ brightness, color }) {
    return (
      <rectAreaLight
        width={2}
        height={2}
        intensity={brightness}
        color={color}
        position={[1, 4, -2]}
        rotation={[0, 180, 0]}
        castShadow
      />
    );
}

export function KeyLight({ brightness, color }) {
      

    const convertToScale = (oldY, mouseX, mouseY, lightZ) => {
        // console.log(mouseX, mouseY);
        let upperWidthBound, upperHeightBound, newX, newY, newZ, newPosition;
        upperWidthBound = window.innerWidth;
        upperHeightBound = window.innerHeight;
        newX = mouseX / upperWidthBound * 100;
        newY = mouseY / upperHeightBound * 100;
        newZ = lightZ;
        oldY < mouseY ? newZ += .05 : newZ -= .05;
        // console.log(newPosition)
        newPosition = [newX, newY, newZ];
        return newPosition
    }

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect( () => {
        const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", setFromEvent);
        let l = spot.current.position;
        // console.log('spot.current ', l);
        // console.log('convert to scale ', convertToScale(l.y, position.x, position.y, l.z));
        let newLightPosition = convertToScale(l.y, position.x, position.y, l.z)
        l.set(...newLightPosition);
        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    }, [position])

    const spot = useRef();
    return (
      <rectAreaLight
        ref={spot}
        width={3}
        height={3}
        color={color}
        intensity={brightness}
        position={[-2, 0, 5]}
        lookAt={[0, 0, 0]}
        penumbra={1}
        castShadow
      />
    );
}