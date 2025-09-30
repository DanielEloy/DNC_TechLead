// frontend/src/views/Livros/Livros.jsx
import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'
import { Link } from "react-router-dom"

const Livros = () => {
  const [livros, setLivros] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function getLivros(){
    try {
      console.log('Buscando livros...')
      const response = await LivrosService.getLivros()
      console.log('Livros recebidos:', response.data)
      setLivros(response.data)
      setError(null)
    } catch (error) {
      console.error('Erro ao buscar livros:', error)
      setError('Erro ao carregar livros: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  async function deleteLivro(livroId){
    let valida = confirm(`Você realmente deseja remover o livro de ID: ${livroId}`)
    if(valida){
      try {
        await LivrosService.deleteLivro(livroId)
        alert('Livro removido com sucesso!')
        getLivros()
      } catch (error) {
        console.error('Erro ao deletar livro:', error)
        alert('Erro ao remover livro: ' + error.message)
      }
    }
  }

  useEffect(() => {
    getLivros()    
  }, [])  

  if (loading) {
    return (
      <>
        <Header/>    
        <SubmenuLivros/>
        <div className='livros'>
          <h1>Carregando livros...</h1>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header/>    
        <SubmenuLivros/>
        <div className='livros'>
          <h1>Erro</h1>
          <p>{error}</p>
          <button onClick={getLivros}>Tentar Novamente</button>
        </div>
      </>
    )
  }

  return (
    <>
      <Header/>    
      <SubmenuLivros/>
      <div className='livros'>
        <h1>Escolha o seu livro</h1>        
        {livros.length === 0 ? (
          <p>Nenhum livro cadastrado.</p>
        ) : (
          <ul>
            {livros.map((livro) => (
              <li key={livro.id}>
                <strong>{livro.titulo}</strong>
                <span>Editora: {livro.editora}</span>
                <span>Páginas: {livro.num_paginas}</span>
                <span>ISBN: {livro.isbn}</span>
                <div className='botoes'>
                  <Link className='btn edit' to={`/livros/edicao/${livro.id}`}>
                    Editar
                  </Link>
                  <button className='btn delete' onClick={() => deleteLivro(livro.id)}>
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Livros