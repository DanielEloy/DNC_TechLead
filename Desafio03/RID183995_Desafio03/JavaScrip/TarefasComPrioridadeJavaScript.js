// Criar a Lista de Tarefas (array de objetos)
let listaDeTarefas = [ // Declara um array com objetos representando tarefas
  { descricao: "Estudar JavaScript", prioridade: 1, status: "pendente" }, // Tarefa 1
  { descricao: "Fazer exercício", prioridade: 2, status: "pendente" },    // Tarefa 2
  { descricao: "Ler um livro", prioridade: 3, status: "concluída" }       // Tarefa 3
];

// Função para ordenar tarefas por prioridade
function ordenarPorPrioridade() {
  listaDeTarefas.sort((a, b) => a.prioridade - b.prioridade);
}

// Conta quantas tarefas estão pendentes utilizando filter
// Esta função percorre o array e conta quantas tarefas têm status "pendente"

/* function contarpendentes() {
//   return listadetarefas.filter(tarefa => tarefa.status === "pendente").length;
 }*/

// Conta quantas tarefas estão pendentes
function contarPendentes() {
  return listaDeTarefas.reduce((total, tarefa) => tarefa.status === "pendente" ? total + 1 : total, 0);
}

// Encontrar uma tarefa pela descrição
function encontrarTarefa(descricao) {
  return listaDeTarefas.find(tarefa => tarefa.descricao === descricao);
}

// Adicionar Nova Tarefa
function adicionarTarefa(descricao, prioridade) { // Função para adicionar uma nova tarefa
  listaDeTarefas.push({ descricao, prioridade, status: "pendente" }); // Adiciona um novo objeto ao array com status "pendente"
  ordenarPorPrioridade(); // Ordena após adicionar
}

// Remover Tarefas Concluídas
function removerConcluidas() { // Função para remover tarefas concluídas
  listaDeTarefas = listaDeTarefas.filter(tarefa => tarefa.status !== "concluída"); // Filtra o array, removendo as tarefas com status "concluída"
  ordenarPorPrioridade(); // Ordena após remover
}

// Marcar Tarefa como Concluída (por descrição)
function marcarComoConcluida(descricao) { // Função para marcar uma tarefa como concluída, buscando pela descrição
  listaDeTarefas = listaDeTarefas.map(tarefa => { // Percorre todas as tarefas
    if (tarefa.descricao === descricao) { // Se a descrição for igual à informada
      return { ...tarefa, status: "concluída" }; // Retorna uma nova tarefa com status "concluída"
    }
    return tarefa; // Caso contrário, retorna a tarefa original
  });
}

// Verifica se todas as tarefas estão concluídas
function todasConcluidas() {
  return listaDeTarefas.every(tarefa => tarefa.status === "concluída");
}

//Marcar todas as tarefas como concluídas
const marcarTodasConcluidas = () => {
  listaDeTarefas = listaDeTarefas
    .map(tarefa => ({ ...tarefa, status: "concluída" }))
    .sort((a, b) => a.prioridade - b.prioridade); // Ordena por prioridade 1, 2, 3...
};

// const marcarTodasConcluidas = listaDeTarefas.map(tarefa => ({ ...tarefa, status: "concluída" }));

//Contar Tarefas Pendentes
const tarefasPendentes = listaDeTarefas.filter(tarefa => tarefa.status === "pendente").length;
console.log(`Tarefas pendentes: ${tarefasPendentes}`);

function encontrarTarefa(nome) {
  return listaDeTarefas.find(tarefa => tarefa.nome === nome);
}

// Verifica se todas as tarefas estão concluídas
function todasConcluidas() {
  return listaDeTarefas.every(tarefa => tarefa.status === "concluída");
}



// Exemplo de uso:
console.log("Lista Inicial:", listaDeTarefas); // Exibe a lista inicial de tarefas

const tarefa = encontrarTarefa("Comprar pão");
console.log(tarefa);

adicionarTarefa("Fazer compras", 2); // Adiciona uma nova tarefa à lista
console.log("Após adicionar nova tarefa:", listaDeTarefas); // Exibe a lista após adicionar

marcarComoConcluida("Fazer exercício"); // Marca a tarefa "Fazer exercício" como concluída
console.log("Após marcar como concluída:", listaDeTarefas); // Exibe a lista após marcar como concluída

removerConcluidas(); // Remove todas as tarefas concluídas da lista
console.log("Após remover concluídas:", listaDeTarefas); // Exibe a lista final

contarPendentes = () // Função para contar tarefas pendentes

console.log("Conta quantas tarefas estão pendentes:", listaDeTarefas); // Exibe a lista após a contagem final

console.log("Total de tarefas pendentes:", contarPendentes()); // Exibe o total de tarefas pendentes

console.log("Lista ordenada por prioridade:"); // Exibe a lista ordenada por prioridade

console.log(encontrarTarefa("Fazer compras")); // Exibe a tarefa encontrada pela descrição

todasConcluidas(); // Verifica se todas as tarefas estão concluídas
console.log("Todas as tarefas estão concluídas?", todasConcluidas());
