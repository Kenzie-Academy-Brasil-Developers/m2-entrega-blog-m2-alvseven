import { Api } from "../controller/Requisicoes.js"

class Login {
    static async logar (email, password) {

        const dados = {
            email,
            password
        }
        await Api.login(dados)
        
    }
}

export { Login }
