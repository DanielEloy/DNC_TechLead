// frontend/src/api/LivrosService.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/api"; // ← Alterado para 127.0.0.1

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