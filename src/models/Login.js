import { Api } from "../controller/Requisicoes.js"

class Login {
    static async logar (email, password) {

        const dados = {
            email,
            password
        }
        Api.login(dados)
        
    }
}

export { Login }