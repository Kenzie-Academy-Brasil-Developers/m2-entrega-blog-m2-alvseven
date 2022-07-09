import { Cadastro } from "../models/Cadastro.js"

async function listenerCadastro () {

    const btn = document.querySelector(".btn-cadastrar")

    btn.addEventListener("click", async (event) => {
        event.preventDefault()

        const nome = document.querySelector(".input-nome").value
        const email = document.querySelector(".input-email").value
        const fotoPerfil = document.querySelector(".input-foto").value
        const senha = document.querySelector(".input-senha").value
    
        const data = {
            username: nome, 
            email: email,
            avatarUrl: fotoPerfil,
            password: senha
        }
    
        const cadastro = await Cadastro.cadastrar(data)
        if (cadastro.id) {
           location.replace("m2-entrega-blog-m2-alvseven/src/pages/login.html")
        }
    })

}

listenerCadastro()