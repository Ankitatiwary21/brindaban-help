// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9jnncTc6Z2pcj8gnVngxcv_QYv8tXz6g",
  authDomain: "brindaban-helper.firebaseapp.com",
  projectId: "brindaban-helper",
  storageBucket: "brindaban-helper.firebasestorage.app",
  messagingSenderId: "887378660636",
  appId: "1:887378660636:web:1fd58d8f30c44e3e073ed9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app); // ✅ MUST be here

export { db, auth };
