// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwwy_gbAR0siukDCRZSe6QBmUSAPnehVI",
  authDomain: "regform-dd8c9.firebaseapp.com",
  projectId: "regform-dd8c9",
  storageBucket: "regform-dd8c9.appspot.com",
  messagingSenderId: "284523327784",
  appId: "1:284523327784:web:de88fca458e91d9df3601d",
  measurementId: "G-SL7WRY4XCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app , auth} ;
