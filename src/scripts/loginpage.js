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

        if (userId && token) {
           window.location.href = "https://kenzie-academy-brasil-developers.github.io/m2-entrega-blog-m2-alvseven/src/pages/homepage.html"
        }

    })
}

fazerLogin()