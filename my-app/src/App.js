import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Box, Light, GroundPlane, BackDrop, FillLight, RimLight, KeyLight, Numbers, Text } from './Fiber';
import { Canvas } from 'react-three-fiber';
import './App.css';

function App() {

  
  return (
    <div className="App">
        <Canvas style={{ height: '100vh', width: '100vw' }}>
          {/* <ambientLight intensity={0.01} /> */}
          {/* <spotLight position={[0, 1, 25]} angle={0.3} penumbra={.5} /> */}
          <pointLight position={[0, 1000, 0]} args={['white', 2, 10, 5]} />
          {/* <Light brightness={25} /> */}
          <Numbers />
          {/* <Text /> */}
          <Box position={[0,0,0]}/>
          <KeyLight brightness={25} color="#ffbdf4" />
          <FillLight brightness={50} color="#ffbdf4" />
          <RimLight brightness={10} color="#FFE484" />
          <BackDrop />
          <Suspense fallback={null}>
            <GroundPlane />
          </Suspense>
        </Canvas>
    </div>
  );
}

export default App;
