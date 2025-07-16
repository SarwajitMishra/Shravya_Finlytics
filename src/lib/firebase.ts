
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDECQuiac9obpasO2BLpf5hIfneqSxvpXw",
  authDomain: "shravya-finlytics.firebaseapp.com",
  projectId: "shravya-finlytics",
  storageBucket: "shravya-finlytics.firebasestorage.app",
  messagingSenderId: "454569345015",
  appId: "1:454569345015:web:08ffd65cabe49b1ea0b8f2",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
