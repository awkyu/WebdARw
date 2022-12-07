import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useFBX, ambientLight } from "@react-three/drei";
import { Suspense } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Scene = (fbxFileURL) => {
    const fbx = useFBX(fbxFileURL['fbxFile']);

    return <primitive object={fbx} scale={2} style={{backgroundColor: "#111111"}} />;
};

function ModelViewerPopup({fbxVisible, setFbxVisible, setFbxReference, fbxFile}) {


  const handleClose = () => {
    setFbxVisible(false);
    setFbxReference(null);
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

// import "./styles.css";
// import { Canvas } from "@react-three/fiber";
// import { Environment, OrbitControls, useFBX } from "@react-three/drei";
// import { Suspense } from "react";

// const Scene = () => {
//   const fbx = useFBX("Poimandres.fbx");

//   return <primitive object={fbx} scale={0.005} />;
// };

// export default function App() {
//   return (
//     <div className="App">
    //   <Canvas>
    //     <Suspense fallback={null}>
    //       <Scene />
    //       <OrbitControls />
    //       <Environment preset="sunset" background />
    //     </Suspense>
    //   </Canvas>
//     </div>
//   );
// }

export default ModelViewerPopup;