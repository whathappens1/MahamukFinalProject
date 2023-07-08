// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTajgK-UuzmWjZYMnbpn3LMl-8GxcKVSs",
  authDomain: "mahamuk-sahli.firebaseapp.com",
  projectId: "mahamuk-sahli",
  storageBucket: "mahamuk-sahli.appspot.com",
  messagingSenderId: "596979508592",
  appId: "1:596979508592:web:d45735e3131adb41da1bb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);