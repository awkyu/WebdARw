// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref as refDB, onValue } from "firebase/database";
import { getStorage, ref as refStorage, getDownloadURL, getBlob } from "firebase/storage";
import { useEffect } from "react";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFcBTWB_UqmI-qJLJ63cZyrGyFLTMAcs4",
  authDomain: "webdarw-14bca.firebaseapp.com",
  databaseURL: "https://webdarw-14bca-default-rtdb.firebaseio.com",
  projectId: "webdarw-14bca",
  storageBucket: "webdarw-14bca.appspot.com",
  messagingSenderId: "1031271916610",
  appId: "1:1031271916610:web:17614367e95006ae1bb9db",
  measurementId: "G-1798QPWMEB"
};

// Initialize Firebase
const backendApp = initializeApp(firebaseConfig);
const backendAnalytics = getAnalytics(backendApp);
const backendDatabase = getDatabase(backendApp);
const backendStorage = getStorage(backendApp);

var realtimeDBData; // variable to keep track of firebase realtime db
var currentlySelectedFBXFile; // variable to keep track of current fbx file to download/select

function RealtimeDBManager({setRealtimeDB}) {
    // var realtimeDBData;
    // function updateRealtimeDB(oldData, data) {
    //     oldData = data;
    // };

    // Create reference and listener to realtime db
    const entriesRef = refDB(backendDatabase, 'fbxEntries');
    onValue(entriesRef, (snapshot) => {
        const data = snapshot.val();
        // add some update function here
        setRealtimeDB(data);
    }, {
        onlyOnce: true
    });
    
    // useEffect(() => {
    //     setRealtimeDB(realtimeDBData);
    // }, [realtimeDBData, setRealtimeDB]); 

    
    // const fbxRef = refStorage(backendStorage, 'fbxfiles');
    
    // async function getFBX(reference) {
    //     const url = await getDownloadURL(refStorage(fbxRef, reference));
    //     // console.log(url);
    //     const fbxfile = await fetch(url, {mode: 'no-cors'});
    //     // console.log(fbxfile);
    //     return fbxfile;
    // }
    
    // async function updateCurrentSelectedFBXFile(reference) {
    //     currentlySelectedFBXFile = getFBX(reference);
    // }
    
    // currentlySelectedFBXFile = getFBX('build1/build1_20221205054235.fbx');
    // // console.log("FBX FILE");
    // // console.log(currentlySelectedFBXFile);
}

function StorageDBManager({fbxFileReference, setFbxFile}) {
    const fbxRef = refStorage(backendStorage, 'fbxfiles');
    
    async function getFBX(reference) {
        const url = await getDownloadURL(refStorage(fbxRef, reference));
        // console.log(url);
        const fbxfile = await fetch(url, {mode: 'no-cors'});
        console.log(fbxfile);
        return fbxfile;
    }
    
    if (fbxFileReference) {
        setFbxFile(getFBX(fbxFileReference));
    }
    
    // console.log("FBX FILE");
    // console.log(currentlySelectedFBXFile);
}

const fbxRef = refStorage(backendStorage);
    
async function getFBX(reference) {
    // const url = await getDownloadURL(refStorage(fbxRef, reference));
    // const url = window.URL.createObjectURL(new Blob([url_string]));
    const blob_data = await getBlob(refStorage(fbxRef, reference));
    const url = window.URL.createObjectURL(blob_data);
    // console.log(blob_data);
    // const url = URL.createObjectURL( blob_data )
    console.log(url);
    // const fbxfile = await fetch(url, {mode: 'no-cors'});
    // console.log(fbxfile);
    return url;
}

async function getFBXURL(reference) {
    const url = await getDownloadURL(refStorage(fbxRef, reference));
    // const url = window.URL.createObjectURL(new Blob([url_string]));
    // const blob_data = await getBlob(refStorage(fbxRef, reference));
    // const url = window.URL.createObjectURL(blob_data);
    // console.log(blob_data);
    // const url = URL.createObjectURL( blob_data )
    console.log(url);
    // const fbxfile = await fetch(url, {mode: 'no-cors'});
    // console.log(fbxfile);
    return url;
}

export { RealtimeDBManager, StorageDBManager, getFBX, getFBXURL };

