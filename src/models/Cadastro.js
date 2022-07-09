import { Api } from "../controller/Requisicoes.js";

class Cadastro {
    static async cadastrar (data) {
        return Api.cadastrarUsuario(data)
    }
}

export { Cadastro }