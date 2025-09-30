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

// Marcar todas as tarefas como concluídas
function marcarTodasConcluidas() {
  listaDeTarefas = listaDeTarefas
    .map(tarefa => ({ ...tarefa, status: "concluída" }))
    .sort((a, b) => a.prioridade - b.prioridade); // Ordena por prioridade 1, 2, 3...
}

// Exemplo de uso de Promises para buscar dados
// Esta função simula uma operação assíncrona que busca dados e retorna uma Promise
function buscarDados() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sucesso = true;
      if (sucesso) {
        resolve("Dados recebidos com sucesso!");
      } else {
        reject("Erro ao buscar dados.");
      }
    }, 2000); // 2 segundos de espera para simular uma operação assíncrona
  });
}

// Exemplo de uso:
console.log("=== LISTA DE TAREFAS ===");
console.log("Lista Inicial:", listaDeTarefas);

console.log("\n=== BUSCAR TAREFA ===");
const tarefaEncontrada = encontrarTarefa("Estudar JavaScript");
console.log("Tarefa encontrada:", tarefaEncontrada);

console.log("\n=== ADICIONAR TAREFA ===");
adicionarTarefa("Fazer compras", 2);
console.log("Após adicionar nova tarefa:", listaDeTarefas);

console.log("\n=== MARCAR TAREFA COMO CONCLUÍDA ===");
marcarComoConcluida("Fazer exercício");
console.log("Após marcar 'Fazer exercício' como concluída:", listaDeTarefas);

console.log("\n=== CONTAR PENDENTES ===");
console.log("Total de tarefas pendentes:", contarPendentes());

console.log("\n=== REMOVER TAREFAS CONCLUÍDAS ===");
removerConcluidas();
console.log("Após remover concluídas:", listaDeTarefas);

console.log("\n=== VERIFICAR SE TODAS ESTÃO CONCLUÍDAS ===");
console.log("Todas as tarefas estão concluídas?", todasConcluidas());

console.log("\n=== MARCAR TODAS COMO CONCLUÍDAS ===");
marcarTodasConcluidas();
console.log("Após marcar todas como concluídas:", listaDeTarefas);
console.log("Todas as tarefas estão concluídas?", todasConcluidas());

console.log("\n=== BUSCA ASSÍNCRONA ===");
// Usando a Promise
buscarDados()
  .then(resultado => {
    console.log(resultado);
  })
  .catch(erro => {
    console.error(erro);
  });

console.log("\n=== ESTADO FINAL ===");
console.log("Lista final ordenada por prioridade:", listaDeTarefas);
console.log("Total de tarefas pendentes:", contarPendentes());