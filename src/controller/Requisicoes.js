class Api {

    static base_url = "https://blog-m2.herokuapp.com"
    static token = JSON.parse(localStorage.getItem("@kenzie-blog:token"))

    static async cadastrarUsuario (user_data) {

        return await fetch(`${this.base_url}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user_data)
        })
        .then(res => res.json())
        .catch(err => console.log(err))
        
    }

    static async login (user_data) {
    
        return await fetch(`${this.base_url}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user_data)
        })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            if (res.userId) {
                localStorage.setItem("@kenzie-blog:userId", JSON.stringify(res.userId))
            } 
            if (res.token){
                localStorage.setItem("@kenzie-blog:token", JSON.stringify(res.token))
            }
            console.log(this.token)
            return res
        })
        .catch(err => console.log(err))

    }

    static async pegarUsuario (id) {

        return await fetch(`${this.base_url}/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))

    }

    static async listarPosts () {

        return await fetch(`${this.base_url}/posts?page=1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        })
        .then(res => res.json())
        .then(res => res.data)
        .catch(err => console.log(err))    

    }

    static async mostrarPostEspecifico (id) {
        
        return await fetch(`${this.base_url}/posts/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))

    }

    static async criarPost (data) {

        return await fetch(`${this.base_url}/posts`, {
             method: "POST",
             headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
             },
             body: JSON.stringify(data)
        })
        .then(res => res.json())
        .catch(err => console.log(err))

    }

    static async editarPost (id, data) {

        return await fetch(`${this.base_url}/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .catch(err => console.log(err))

    }

    static async deletarPost (id) {

        return await fetch(`${this.base_url}/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        })
        .catch(err => console.log(err))
        
    }

}

export { Api }