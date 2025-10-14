import axios from "axios";

// APENAS ESTA LINHA MUDA - substitua pela sua URL do Railway
const BASE_URL = "https://backend-biblioteca-production.up.railway.app/api";

export class LivrosService{
    static getLivros(){
        return axios.get(BASE_URL + '/livros');
    }

    static getLivro(id){
        return axios.get(`${BASE_URL}/livros/${id}`);
    }

    static createLivro(body){
        return axios.post(`${BASE_URL}/livros`, body);
    }

    static updateLivro(id, body){
        return axios.put(`${BASE_URL}/livros/${id}`, body);
    }

    static deleteLivro(id){
        return axios.delete(`${BASE_URL}/livros/${id}`);
    }
}