// ====================================================================
// FIREBASE CONFIG

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

import {
    getDatabase,
    ref,
    set
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBh4SudfWMF_9IeYzT_-oDIR-LOPk2dgAE",
    authDomain: "hackathon-tech-academy.firebaseapp.com",
    projectId: "hackathon-tech-academy",
    storageBucket: "hackathon-tech-academy.appspot.com",
    messagingSenderId: "533354707961",
    appId: "1:533354707961:web:2cc8e914d89b1512c75b28",
    measurementId: "G-XN3EN4XBN4",
    databaseURL: "https://hackathon-tech-academy-default-rtdb.firebaseio.com/"
});

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

// ====================================================================
// LOG IN WITH EMAIL AND PASSWORD

const loginEmailPassword = async () => {
    const email = txtEmail.value;
    const pwd = txtPwd.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pwd);
        console.log(userCredential.user);
        window.location.assign('../html/cadastro.html');
    } catch (error) {
        switch (error.code) {
            case 'auth/user-not-found': alert('Usuário não cadastrado'); break;
            case 'auth/wrong-password': alert('Credenciais incorretas.'); break;
            default: console.log(error); alert('Desculpe, tivemos um problema.'); break;
        }
    }
}

// ====================================================================
// CREATE ACCOUNT WITH EMAIL AND PASSWORD

const createAccountEmailPassword = async () => {
    const email = 'duh.scaranari@gmail.com';
    const pwd = 'password';

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
        console.log(userCredential.user);

        const userId = btoa(email);

        set(ref(database, 'users/' + userId), {
            name: 'Eduardo',
            email: email,
            estado: 'SP',
            cidade: 'Guararema',
            bairro: 'Itaoca',
            atividade: 'Desenvolvimento de Sistemas e Aplicações',
            descricao: 'Isso aqui é um teste.'
        });

    } catch (error) {
        console.log(error.code);
        switch (error.code) {
            case 'auth/email-already-in-use': alert('E-mail já cadastrado.'); break;
            default: console.log(error); break;
        }
    }
}

// ====================================================================
// HTML ELEMENTS ASSIGNMENTS

const botaoCadastrar = document.getElementById('cadastrar');
const botaoEntrar = document.getElementById('botaoEntrar');
const txtEmail = document.getElementById('txtEmail');
const txtPwd = document.getElementById('txtPassword');

// ====================================================================
// LISTENERS

botaoCadastrar.addEventListener("click", () => {
    window.location.assign('../html/cadastro.html');
});
botaoEntrar.addEventListener("click", loginEmailPassword);

// if (auth !== 0) {
//     window.location.assign('../html/cadastro.html');
// }