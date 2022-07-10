import { Posts } from "../models/Posts.js"
import { Api } from "../controller/Requisicoes.js"

Posts.renderizarPosts()

class Homepage { 

    static userId      = localStorage.getItem("@kenzie-blog:userId")
    static token       = localStorage.getItem("@kenzie-blog:token")
    static url         = (window.location.href).split("/")
    static filteredUrl = this.url.slice(0, 3).join("/")

    static verifyLogin () {

        if (this.token === null || this.userId === null) {
            window.location.href = `${this.filteredUrl}/m2-entrega-blog-m2-alvseven/src/pages/login.html`
        }

    }

    static async showUser () {

        const userProfile = await Api.pegarUsuario(this.userId)
        const img = document.querySelector(".user-img")
        const userName = document.querySelector(".user-name")
    
        userName.innerText = userProfile.username
        img.src = userProfile.avatarUrl
    }

    static logout () {

        const btn = document.querySelector(".btn-logout")
        btn.addEventListener("click", event => {
            localStorage.removeItem("@kenzie-blog:userId")
            localStorage.removeItem("@kenzie-blog:token")
        })

    }

    static addPost () {

        const btn  = document.querySelector(".adicionar-post")

        btn.addEventListener("click", async (event) => {
            event.preventDefault()
        const text = document.querySelector("textarea")
             await Posts.createPost(text.value)
             text.value = ''
             Posts.renderizarPosts()
        })

    }

    static editPost () {

        const section = document.querySelector("section")
        section.addEventListener("click", async (event) => {
            event.preventDefault()

            if (event.target.id == this.userId) {
                const id = (event.target.className).split(" ")[1]
                await Posts.modalEditarPost(id)
                this.modal()
            }
        })
    }

    static modal () {

        const modal = document.querySelector(".modal") 
        modal.addEventListener("click", async (event) => {
            event.preventDefault()
            if (event.target.className == "btn-modal-fechar") {
                this.removeModal()
            }
            else if (event.target.className == "btn-modal-editar") {
                const text = document.querySelector(".textarea-modal").value
                const id = document.querySelector(".modal-container").id
                await Api.editarPost(id, {
                    content: text
                })
                this.removeModal()
                Posts.renderizarPosts()
            }
        })

    }

    static removeModal () {
        const modal = document.querySelector(".modal-container")
        const body = document.querySelector("body")
        body.removeChild(modal)
    }

    static main () {
        Homepage.verifyLogin()
        Homepage.showUser()
        Homepage.logout()
        Homepage.addPost()
        Homepage.editPost()
    }
    
}

Homepage.main()


// function verifyLogin () {
//     const userId = localStorage.getItem("@kenzie-blog:userId")
//     const token  = localStorage.getItem("@kenzie-blog:token")
//     const url = (window.location.href).split("/")
//     const filteredUrl = url.slice(0, 3).join("/")

//     if (token === null || userId === null) {
//         window.location.href = `${filteredUrl}/m2-entrega-blog-m2-alvseven/src/pages/login.html`
//     }
// }

// async function showUser () {

//     const id = localStorage.getItem("@kenzie-blog:userId")
//     const userProfile = await Api.pegarUsuario(id)
//     const img = document.querySelector(".user-img")
//     const userName = document.querySelector(".user-name")

//     userName.innerText = userProfile.username
//     img.src = userProfile.avatarUrl
// }

// function logout () {
//     const btn = document.querySelector(".btn-logout")
//     btn.addEventListener("click", event => {
//         localStorage.removeItem("@kenzie-blog:userId")
//         localStorage.removeItem("@kenzie-blog:token")
//     })
// }

// async function listenerAddPost () {

//     const btn  = document.querySelector(".adicionar-post")

//     btn.addEventListener("click", async (event) => {
//         event.preventDefault()
//     const text = document.querySelector("textarea")
//          await Posts.createPost(text.value)
//          text.value = ''
//          Posts.renderizarPosts()
//     })
// }

// function editPost () {
//     const section = document.querySelector("section")
//     section.addEventListener("click", async (event) => {
//         event.preventDefault()
//         const userId = localStorage.getItem("@kenzie-blog:userId")
//         if (event.target.id == userId) {
//             const id = (event.target.className).split(" ")[1]
//             await Posts.modalEditarPost(id)
//             listenerModal()
//         }
//     })
// }

// function listenerModal () {
//     const modal = document.querySelector(".modal") 
//     modal.addEventListener("click", async (event) => {
//         event.preventDefault()
//         if (event.target.className == "btn-modal-fechar") {
//             removeModal()
//         }
//         else if (event.target.className == "btn-modal-editar") {
//             const text = document.querySelector(".textarea-modal").value
//             const id = document.querySelector(".modal-container").id
//             await Api.editarPost(id, {
//                 content: text
//             })
//             removeModal()
//             Posts.renderizarPosts()
//         }
//     })
// }

// async function removeModal () {
//     const modal = document.querySelector(".modal-container")
//     const body = document.querySelector("body")
//     body.removeChild(modal)
// }