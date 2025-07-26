import { useEffect, useState } from 'react'
import { useTheme } from './ThemeContext.tsx'
import './App.css'

interface TodoItem {
  id: string,
  texto: string,
  completado: boolean
}

function App() {
  const chaveTarefasMemoria = "tarefas"

  const {theme, toggleTheme} = useTheme()
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [novoTodo, setnovoTodo] = useState<string>("")
  const [estaCarregado, setEstaCarregando] = useState<boolean>(false)

  const adicionarTarefa = (): void => {
    if (novoTodo !== "") {
      const newId = crypto.randomUUID()
      const novoTodoItem: TodoItem = {
        id: newId,
        texto: novoTodo,
        completado: false
      }
      setTodos([...todos, novoTodoItem])
      setnovoTodo("")
    }
  }

  const removerTarefa = (id: string): void => {
    const todosAtualizados = todos.filter((todo) => todo.id !== id)
    setTodos(todosAtualizados)
  }

  const marcarCompleto = (id: string): void => {
    const todosAtualizados = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completado: !todo.completado }
      }
      return todo
    })
    setTodos(todosAtualizados)
  }

  const obterTarefasCompletas = (): TodoItem[] => {
    return todos.filter((todo) => todo.completado)
  }

  useEffect(() => {
    if (estaCarregado) {
      setEstaCarregando(true)
      localStorage.setItem(chaveTarefasMemoria, JSON.stringify(todos))
    }
  }, [todos, estaCarregado])


  useEffect(() => {
    const tarefasDaMemoria = localStorage.getItem(chaveTarefasMemoria)
    if (tarefasDaMemoria) {
      setTodos(JSON.parse(tarefasDaMemoria))
    }
    setEstaCarregando(true)
  }, [])

  return (
    <div className= {`app ${theme}`}>
      <div className={`container ${theme}`}>
        <h1>Lista de Tarefas - {obterTarefasCompletas().length} / {todos.length}</h1>
        <div className='input-container'>
          <input type="text" value={novoTodo} onChange={(e) => setnovoTodo(e.target.value)} />
          <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
        </div>
        <ol>
          {
            todos.map((todo) => (
              <li key={todo.id}>
                <input type="checkbox" checked={todo.completado} onChange={() => marcarCompleto(todo.id)} />
                <span style={{ textDecoration: todo.completado ? 'line-through' : 'none'}}> {todo.texto} </span>
                <button onClick={() => removerTarefa(todo.id)}>Remover</button>
              </li>
            ))
          }
        </ol>
        <button onClick={toggleTheme}>
          Alterar para o tema {theme === 'light' ? 'Escuro' : 'Claro'}
        </button>
      </div>
    </div>
  )
}

export default App
