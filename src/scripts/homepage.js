import { Posts } from "../models/Posts.js"
import { Api } from "../controller/Requisicoes.js"

class Homepage { 

    static userId      = localStorage.getItem("@kenzie-blog:userId")
    static token       = localStorage.getItem("@kenzie-blog:token")
    static url         = (window.location.href).split("/")
    static filteredUrl = this.url.slice(0, 3).join("/")

    static async verifyLogin () {

        if (this.token === undefined || this.userId === undefined) {
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

    static async main () {

        await Homepage.verifyLogin()
        Posts.renderizarPosts()
        Homepage.showUser()
        Homepage.logout()
        Homepage.addPost()
        Homepage.editPost()

    }
    
}

Homepage.main()
