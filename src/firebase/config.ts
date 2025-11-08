// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSNMDyq68f7sn7-CNVdlmsI79nHduDQtg",
  authDomain: "sms-app-384b0.firebaseapp.com",
  projectId: "sms-app-384b0",
  storageBucket: "sms-app-384b0.firebasestorage.app",
  messagingSenderId: "716731099212",
  appId: "1:716731099212:web:26cf5b2c9368bd6bceace9",
  measurementId: "G-WWKRQCY52L"
};

// Initialize Firebase
function initializeFirebase(): FirebaseApp {
    if (!getApps().length) {
        return initializeApp(firebaseConfig);
    } else {
        return getApp();
    }
}

export const app = initializeFirebase();
