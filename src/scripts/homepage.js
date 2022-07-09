import { Posts } from "../models/Posts.js"
import { Api } from "../controller/Requisicoes.js"

Posts.renderizarPosts()


async function listenerAddPost () {

    const btn  = document.querySelector(".adicionar-post")

    btn.addEventListener("click", async (event) => {
        event.preventDefault()
    const text = document.querySelector("textarea")
         await Posts.createPost(text.value)
         text.value = ''
         Posts.renderizarPosts()
    })
}

function logout () {
    const btn = document.querySelector(".btn-logout")
    btn.addEventListener("click", event => {
        localStorage.removeItem("@kenzie-blog:userId")
        localStorage.removeItem("@kenzie-blog:token")
    })
}

async function showUser () {

    const id = localStorage.getItem("@kenzie-blog:userId")
    const userProfile = await Api.pegarUsuario(id)
    const img = document.querySelector(".user-img")
    const userName = document.querySelector(".user-name")

    userName.innerText = userProfile.username
    img.src = userProfile.avatarUrl
}

function listenerModal () {
    const modal = document.querySelector(".modal") 
    modal.addEventListener("click", async (event) => {
        event.preventDefault()
        if (event.target.className == "btn-modal-fechar") {
            removeModal()
        }
        else if (event.target.className == "btn-modal-editar") {
            const text = document.querySelector(".textarea-modal").value
            const id = document.querySelector(".modal-container").id
            await Api.editarPost(id, {
                content: text
            })
            removeModal()
            Posts.renderizarPosts()
        }
    })
}

async function removeModal () {
    const modal = document.querySelector(".modal-container")
    const body = document.querySelector("body")
    body.removeChild(modal)
}

function editPost () {
    const section = document.querySelector("section")
    section.addEventListener("click", async (event) => {
        event.preventDefault()
        const userId = localStorage.getItem("@kenzie-blog:userId")
        if (event.target.id == userId) {
            const id = (event.target.className).split(" ")[1]
            await Posts.modalEditarPost(id)
            listenerModal()
        }
    })
}

listenerAddPost ()
logout()
showUser()
editPost()

