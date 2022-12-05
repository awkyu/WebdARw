// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";
import { getStorage } from "firebase/storage";


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
const backendAnalytics = getAnalytics(app);
const backendDatabase = getDatabase(app);
const backendStorage = getStorage(app);

// Stuff for Firebase Realtime DB

