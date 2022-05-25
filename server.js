import express from "express"
import cors from "cors"

import database from "./firebase.js"
import { ref, get, set } from "firebase/database"

// iniciando o express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

idFilme = 3;
let filmes = [
    {
        idFilme: 1,
        "nome": "O vento levou",
        "ano": 1960,
        "genero": "romance"
    },

    {
         idFilme: 2,
        "nome": "Titanic",
        "ano": 1998,
        "genero": "romance"


    },

    {
        idFilme: 3,
        "nome": "Lagoa azul",
        "ano": 1980,
        "genero": "romance"
    }
]



app.get('/filmes', function (req, res) {
    // Pega uma referência para o caminho /filmes
    let filmes = ref(database, "/filmes")
    get(filmes).then((snap) => {
        let listafilmes = snap.val()
        console.log("listafilmes", listafilmes);
        return res.status(200).json(listafilmes)
    })
})

app.post('/filmes', function (req, res) {
    console.log("recebi requisição POST com body: ",req.body);
    //pega os dados enviados na requisição
    let dados = req.body
    let idFilme = dados.id
    // Pega uma referência para o caminho /filmes/<ID>
    let novofilmesRef = ref(database, "/filmes/" + idFilme)
    // Adiciona dados no firebase no caminho /filmes/<ID>
    set(novofilmesRef, dados).then(() => {
        console.log("Adicionado")
        return res.status(200).json(dados)
    })
})

app.put('/filmes/:id', function (req, res) {
    console.log("recebi requisição PUT com body: ",req.body);
    //pega os dados enviados na requisição
    let dados = req.body
    let idFilme = req.params.id
    // Pega uma referência para o caminho /bandas/<ID>
    let novofilmesRef = ref(database, "/filmes/" + idFilme)
    // Adiciona dados no firebase no caminho /bandas/<ID>
    set(novofilmesRef, dados).then(() => {
        console.log("Adicionado")
        return res.status(200).json(dados)
    })
})

app.delete('/filmes/:id', function (req, res) {
    console.log("recebi requisição POST com body: ",req.body);
    //pega os dados enviados na requisição
    let dados = req.body
    let idFilme = req.params.id
    // Pega uma referência para o caminho /bandas/<ID>
    let novofilmesRef = ref(database, "/filmes/" + idFilme)
    // Remove /bandas/<ID>
    set(novofilmesRef, null).then(() => {
        console.log("Excluido")
        return res.status(200).json(dados)
    })
})

app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000 ...");
})