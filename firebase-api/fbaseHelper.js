// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh4SudfWMF_9IeYzT_-oDIR-LOPk2dgAE",
  authDomain: "hackathon-tech-academy.firebaseapp.com",
  projectId: "hackathon-tech-academy",
  storageBucket: "hackathon-tech-academy.appspot.com",
  messagingSenderId: "533354707961",
  appId: "1:533354707961:web:2cc8e914d89b1512c75b28",
  measurementId: "G-XN3EN4XBN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);