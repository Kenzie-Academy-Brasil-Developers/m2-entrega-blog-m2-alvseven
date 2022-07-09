import { Api } from "../controller/Requisicoes.js"

class Posts {

    static data = Api.listarPosts()

    static async createPostCard (el) {
        
        let idUsuarioLogado = localStorage.getItem("@kenzie-blog:userId")

        let date = el.createdAt
        let ano = date.split("-")[0]
        let mes = date.split("-")[1]
        let dia = `${date.split("-")[2].split("")[0]}${date.split("-")[2].split("")[1]}`

        let newDate = `${dia}/${mes}/${ano}`

        const section = document.querySelector("section")
        const divPrincipal = document.createElement("div")
        const divImg = document.createElement("div")
        const img = document.createElement("img")
        const divUserPost = document.createElement("div")
        const userName = document.createElement("h3")
        const divPostText = document.createElement("div")
        const postText = document.createElement("p")
        const divPostInfo = document.createElement("div")
        const divPostButtons = document.createElement("div")
        const btnEditar = document.createElement("button")
        const btnApagar = document.createElement("button")
        const divDataPost = document.createElement("div")
        const dataPost = document.createElement("span")

        divPrincipal.setAttribute("id", el.id)
        btnEditar.setAttribute("id", el.user.id)
        divPrincipal.classList.add("post")
        divImg.classList.add("img-container")
        divUserPost.classList.add("post-usuario")
        postText.classList.add("post-text")
        divPostInfo.classList.add("post-info")
        divPostButtons.classList.add("post-buttons")
        btnEditar.classList.add("editar-post", el.id)
        btnApagar.classList.add("apagar-post")
        dataPost.classList.add("data-post")

        img.src = el.user.avatarUrl
        userName.innerText  = el.user.username
        postText.innerText  = el.content
        btnEditar.innerText = "Editar"
        btnApagar.innerText = "Apagar"
        dataPost.innerText  = newDate

        btnApagar.addEventListener("click", async (event) => {
            event.preventDefault()
            await Api.deletarPost(el.id)
            this.renderizarPosts()
        })

        divImg.append(img)
        divPostText.append(postText)
        divUserPost.append(userName, divPostText)
        divPostButtons.append(btnEditar, btnApagar)
        divDataPost.append(dataPost)
        divPostInfo.append(divPostButtons, divDataPost)
        divPrincipal.append(divImg, divUserPost, divPostInfo)
        section.append(divPrincipal)

        if (el.user.id != idUsuarioLogado) {
            divPostButtons.style.display = "none"
        }

    }
    
    static async renderizarPosts () {
        document.querySelector("section").innerHTML = ''
        this.data = await Api.listarPosts()
        this.data.forEach((element) => {
            this.createPostCard(element)
        })

    }

    static async createPost (data) {

        const dados = {
            "content": `${data}`
        }
        await Api.criarPost(dados)
        await this.renderizarPosts()
    }

    static async modalEditarPost (id) {

       const body = document.querySelector("body")
       const modalContainer = document.createElement("div")
       const modal = document.createElement("div")   
       const h3 = document.createElement("h3")
       const textarea = document.createElement("textarea")
       const btnModal = document.createElement("div")
       const btnFechar = document.createElement("button")
       const btnEditar = document.createElement("button")

        modalContainer.setAttribute("id",id)
        modalContainer.classList.add("modal-container")
        modal.classList.add("modal")
        textarea.classList.add("textarea-modal")
        btnModal.classList.add("btn-modal")
        btnFechar.classList.add("btn-modal-fechar")
        btnEditar.classList.add("btn-modal-editar")

        h3.innerText = "Edite seu post"
        textarea.placeholder = "Edite seu post aqui"
        btnFechar.innerText = "Cancelar"
        btnEditar.innerText = "Editar"

        btnModal.append(btnFechar, btnEditar)
        modal.append(h3, textarea, btnModal)
        modalContainer.append(modal)
        body.append(modalContainer)
    }

}

export { Posts }