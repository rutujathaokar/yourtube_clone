// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKW02_NNd6Oxcfq8T_bjd97WVU93PcCy4",
  authDomain: "yourtube-c3d8a.firebaseapp.com",
  projectId: "yourtube-c3d8a",
  storageBucket: "yourtube-c3d8a.firebasestorage.app",
  messagingSenderId: "148484268328",
  appId: "1:148484268328:web:c923b5e7c551be6725f01d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
