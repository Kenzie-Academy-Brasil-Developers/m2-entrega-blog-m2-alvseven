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
        const url = (window.location.href).split("/")
        const filteredUrl = url.slice(0, 3).join("/")

        if (cadastro.id) {
           window.location.href = `${filteredUrl}/m2-entrega-blog-m2-alvseven/src/pages/login.html`
        }
    })

}

listenerCadastro()