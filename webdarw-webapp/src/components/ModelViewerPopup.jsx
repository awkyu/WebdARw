import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX } from "@react-three/drei";
import { Suspense } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Scene = (fbxFileURL) => {
    const fbx = useFBX(fbxFileURL['fbxFile']);

    return <primitive object={fbx} scale={2} style={{backgroundColor: "#111111"}} />;
};

function ModelViewerPopup({fbxVisible, setFbxVisible, setFbxReference, fbxFile, setSearchParams}) {


  const handleClose = () => {
    setFbxVisible(false);
    setFbxReference(null);
    setSearchParams({});
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={fbxVisible}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} style={{backgroundColor: "#661111"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Canvas >
          <color attach="background" args={["#222222"]} />
            <Suspense fallback={null}>
                {fbxFile ? <Scene fbxFile={fbxFile} /> : null }
                <OrbitControls />
                <ambientLight intensity={0.9} />
            </Suspense>
        </Canvas>
      </Dialog>
    </div>
  );
}


export default ModelViewerPopup;