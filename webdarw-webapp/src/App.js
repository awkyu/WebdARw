import { useEffect, useState } from "react";
import NavBar from "./components/NavBar"
import FBXCardContainer from "./components/FBXCardContainer";
import ModelViewerPopup from "./components/ModelViewerPopup";

import './App.css';

import { RealtimeDBManager, StorageDBManager, getFBX } from './backend/FirebaseManager.jsx'

function App() {
  const [realtimeDBData, setRealtimeDB] = useState();
  const [fbxVisible, setFbxVisible] = useState(false);
  const [fbxReference, setFbxReference] = useState();
  const [fbxFile, setFbxFile] = useState();

  RealtimeDBManager({setRealtimeDB:setRealtimeDB});
  // StorageDBManager({fbxReference, setFbxFile});

  useEffect(() => {
    // StorageDBManager({fbxReference, setFbxFile});
    if (fbxReference) {
      getFBX(fbxReference)
        .then(result => {
          setFbxFile(result);
        })
    }
    console.log(fbxReference);
    console.log(fbxFile);
  }, [fbxReference, fbxVisible]);
  

  return (
    <div className="App">
      {/* <FirebaseManager setRealtimeDB={setRealtimeDB} setCurrentFbxReference={null} /> */}
      <header className='App-header'>
        <NavBar />

        <FBXCardContainer dbInformation={realtimeDBData} setFbxVisible={setFbxVisible} setFbxReference={setFbxReference} fbxFile={fbxFile} />
      </header>
      {/* (fbxVisible ? {<ModelViewerPopup fbxVisible={fbxVisible} setFbxVisible={setFbxVisible} setFbxReference={setFbxReference} fbxFile={fbxFile} />} : {}) */}
      <ModelViewerPopup fbxVisible={fbxVisible} setFbxVisible={setFbxVisible} setFbxReference={setFbxReference} fbxFile={fbxFile} />
    </div>
  );
}

export default App;
