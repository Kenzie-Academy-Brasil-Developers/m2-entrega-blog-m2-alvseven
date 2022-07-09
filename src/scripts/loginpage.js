import { Login } from "../models/Login.js"; 

function fazerLogin () {
    const btn = document.querySelector(".btn-login")
    btn.addEventListener("click", async (event) => {
        event.preventDefault()

        const email = document.querySelector(".input-email").value
        const password = document.querySelector(".input-senha").value
        await Login.logar(email, password)

        const userId = localStorage.getItem("@kenzie-blog:userId")
        const token  = localStorage.getItem("@kenzie-blog:token")
        const url = (window.location.href).split("/")
        const filteredUrl = url.slice(0, 3).join("/")

        if (userId && token) {
           window.location.href = `${filteredUrl}/src/pages/homepage.html`
        }

    })
}

fazerLogin()