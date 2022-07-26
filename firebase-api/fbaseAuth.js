// ==========================================================================
// CONFIGURAÇÕES DO AUTH

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBh4SudfWMF_9IeYzT_-oDIR-LOPk2dgAE",
    authDomain: "hackathon-tech-academy.firebaseapp.com",
    projectId: "hackathon-tech-academy",
    storageBucket: "hackathon-tech-academy.appspot.com",
    messagingSenderId: "533354707961",
    appId: "1:533354707961:web:2cc8e914d89b1512c75b28",
    measurementId: "G-XN3EN4XBN4"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();


// ==========================================================================
// UTILIZANDO E-MAIL E SENHA 

// CADASTRO
export function fCreateUserWithEmailAndPassword(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode}: ${errorMessage}`);
            // ..
        });
}

//LOGIN
export function fsignInWithEmailAndPassword(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode}: ${errorMessage}`);
        });
}