// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"
    ;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCrpvFFZ1GeS4R-ez7LazTDciJT6VgiAM8",
//   authDomain: "tutorial-8237b.firebaseapp.com",
//   projectId: "tutorial-8237b",
//   storageBucket: "tutorial-8237b.appspot.com",
//   messagingSenderId: "600937112549",
//   appId: "1:600937112549:web:1b7fab51306c3381b7050c",
//   measurementId: "G-YMMWVTSBXB"
// };

export const firebaseConfig = {
    apiKey: "AIzaSyAeRXfVw4eHPT5u-JM9O9Jo__fSvPhxlGI",
    authDomain: "zebra-taxi-e01d6.firebaseapp.com",
    databaseURL: "https://zebra-taxi-e01d6-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "zebra-taxi-e01d6",
    storageBucket: "zebra-taxi-e01d6.appspot.com",
    messagingSenderId: "615500340013",
    appId: "1:615500340013:web:2af8622b91f1f0f39fd1a4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
