// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref as refDB, onValue } from "firebase/database";
import { getStorage, ref as refStorage, getDownloadURL, getBlob } from "firebase/storage";


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
const backendDatabase = getDatabase(backendApp);
const backendStorage = getStorage(backendApp);

function RealtimeDBManager({setRealtimeDB}) {
    // Create reference and listener to realtime db
    const entriesRef = refDB(backendDatabase, 'fbxEntries');
    onValue(entriesRef, (snapshot) => {
        const data = snapshot.val();
        // add some update function here
        setRealtimeDB(data);
    }, {
        onlyOnce: true
    });
    
}

function StorageDBManager({fbxFileReference, setFbxFile}) {
    const fbxRef = refStorage(backendStorage, 'fbxfiles');
    
    async function getFBX(reference) {
        const url = await getDownloadURL(refStorage(fbxRef, reference));
        const fbxfile = await fetch(url, {mode: 'no-cors'});
        return fbxfile;
    }
    
    if (fbxFileReference) {
        setFbxFile(getFBX(fbxFileReference));
    }
}

const fbxRef = refStorage(backendStorage);
    
async function getFBX(reference) {
    const blob_data = await getBlob(refStorage(fbxRef, reference));
    const url = window.URL.createObjectURL(blob_data);
    return url;
}

async function getFBXURL(reference) {
    const url = await getDownloadURL(refStorage(fbxRef, reference));
    return url;
}

export { RealtimeDBManager, StorageDBManager, getFBX, getFBXURL };

