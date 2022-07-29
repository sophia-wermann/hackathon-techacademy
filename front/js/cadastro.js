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

import { readTextFile } from './jsonHelper.js'

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
    if (!validateForm()) {
        return;
    }

    let myEmail = txtEmail.value;
    let myName = txtNome.value;
    let myEstado = txtEstado.value;
    let myCidade = txtCidade.value;
    let myAtividade = txtAtividade.value;
    let pwd = txtSenha1.value;
    let myTelefone = txtTelefone.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, myEmail, pwd);
        console.log(userCredential.user);

        const userId = btoa(myEmail);

        async function redirect() {
            set(ref(database, 'users/' + userId), {
                name: myName,
                email: myEmail,
                estado: myEstado,
                cidade: myCidade,
                atividade: myAtividade,
                telefone: myTelefone
            });
        }

        redirect().then(alert('Anunciante cadastrado com sucesso!'));

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

const botaoCadastrar = document.getElementById('botaoEnviar');
const txtEmail = document.getElementById('email');
const txtNome = document.getElementById('nome');
const txtEstado = document.getElementById('estado');
const txtCidade = document.getElementById('cidade');
const txtAtividade = document.getElementById('profissao_atividade');
const txtTelefone = document.getElementById('telefone');
const txtSenha1 = document.getElementById('senha');
const txtSenha2 = document.getElementById('repete_senha');

// ====================================================================
// LISTENERS

botaoCadastrar.addEventListener("click", createAccountEmailPassword);

function validateForm() {
    let email = txtEmail.value;
    let nome = txtNome.value;
    let estado = txtEstado.value;
    let cidade = txtCidade.value;
    let atividade = txtAtividade.value;
    let senha = txtSenha1.value;
    let rSenha = txtSenha2.value;

    if (senha !== rSenha) {
        alert('Senhas digitadas não conferem');
        return false;
    }

    if (
        email === '' ||
        nome === '' ||
        // estado === '' ||
        cidade === '' ||
        atividade === '' ||
        rSenha === '' ||
        email === ''
    ) {
        alert('Por favor, preencha todos os campos antes de prosseguir');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Por favor, insira um endereço de e-mail válido');
        return false;
    }

    return true;
}

function validateEmail(email_value) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email_value);
}

let listaEstados = '';
readTextFile('../../model/estados.json', function (text) {
    listaEstados = JSON.parse(text);

    for (let estado of listaEstados) {
        txtEstado.innerHTML =
            `${txtEstado.innerHTML}<option value='${estado.sigla}'>${estado.sigla}</option>`
    }
});

// if (auth !== 0) {
//     window.location.assign('../html/cadastro.html');
// }