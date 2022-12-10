import { useEffect, useState } from "react";
import NavBar from "./components/NavBar"
import FBXCardContainer from "./components/FBXCardContainer";
import ModelViewerPopup from "./components/ModelViewerPopup";
import CopyAlert from "./components/CopyAlert";
import { useSearchParams } from "react-router-dom";

import './App.css';

import { RealtimeDBManager, getFBX } from './backend/FirebaseManager.jsx'

function App() {
  const [realtimeDBData, setRealtimeDB] = useState();
  const [fbxVisible, setFbxVisible] = useState(false);
  const [fbxReference, setFbxReference] = useState();
  const [fbxFile, setFbxFile] = useState();
  const [alertOpen, setAlertOpen] = useState(false);
  const [copiedContent, setCopiedContent] = useState();

  const [itemSearch, setItemSearch] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();


  RealtimeDBManager({setRealtimeDB:setRealtimeDB});

  useEffect(() => {
    if (fbxReference) {
      getFBX(fbxReference)
        .then(result => {
          setFbxFile(result);
        })
    }
  }, [fbxReference, fbxVisible]);

  useEffect(() => {
    const searchParamsReference = searchParams.get("ref");
    if (fbxReference == null) {
      setFbxReference(searchParamsReference);
    }
    if (searchParamsReference != null) {
      setFbxVisible(true);
    }
    console.log(searchParamsReference);
  }, [searchParams]);
  

  return (
    <div className="App">
      <header className='App-header'>
        <NavBar itemSearch={itemSearch} setItemSearch={setItemSearch} />
        <CopyAlert alertOpen={alertOpen} setAlertOpen={setAlertOpen} copiedContent={copiedContent} />

        <FBXCardContainer 
          dbInformation={realtimeDBData} 
          setFbxVisible={setFbxVisible} 
          setFbxReference={setFbxReference} 
          fbxFile={fbxFile} 
          setSearchParams={setSearchParams} 
          setAlertOpen={setAlertOpen} 
          setCopiedContent={setCopiedContent}
          itemSearch={itemSearch} />

        <ModelViewerPopup 
          fbxVisible={fbxVisible} 
          setFbxVisible={setFbxVisible} 
          setFbxReference={setFbxReference} 
          fbxFile={fbxFile} 
          setSearchParams={setSearchParams} />
      </header>
    </div>
  );
}

export default App;
