// ====================================================================
// FIREBASE CONFIG

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { readTextFile } from './jsonHelper.js'

import {
  getDatabase,
  ref,
  onValue
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

const database = getDatabase(firebaseApp);

const botaoBuscar = document.getElementById('botaoBuscar');
const filtroAtividade = document.getElementById('busca');
const filtroEstado = document.getElementById('estado');
const filtroCidade = document.getElementById('cidade');
const article = document.getElementById('cardsArticle');
let listaEstados = '';

readTextFile('../../model/estados.json', function (text) {
  listaEstados = JSON.parse(text);

  for (let estado of listaEstados) {
    filtroEstado.innerHTML = 
      `${filtroEstado.innerHTML}<option value='${estado.sigla}'>${estado.sigla}</option>`
  }
});

botaoBuscar.addEventListener("click", () => {
  const anunciantes = ref(database, 'users');
  const listaAnunciantes = [];

  onValue(anunciantes, (snapshot) => {
    let content = '';
    article.innerHTML = '';

    snapshot.forEach(element => {
      listaAnunciantes.push(element.val());
    });

    const listaFiltrada = listaAnunciantes.filter(function (obj) {
      return (
        obj.atividade.toLowerCase().includes(filtroAtividade.value.toLowerCase()) && 
        obj.estado.toLowerCase().includes(filtroEstado.value.toLowerCase()) && 
        obj.cidade.toLowerCase().includes(filtroCidade.value.toLowerCase())
        );
    });

    for (let item of listaFiltrada) {
      content = article.innerHTML;
      article.innerHTML =
      `
      ${content}
      <div class="cardAnunciante">
        <div class="legenda">
          <p class="nomeAnunciante">${item.name}</p>
          <p class="atividade">${item.atividade}</p>
          <p class="localizacao">${item.cidade} - ${item.estado}</p>
          <p class="telefone">${item.telefone}</p>
        </div>
      </div>
      `
    }
  })
})