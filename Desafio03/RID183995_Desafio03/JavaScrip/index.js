// Função para obter as tarefas salvas no Local Storage
const getTarefasDoLocalStorage = () => {
    const tarefasDoLocalStorage = window.localStorage.getItem('tarefas');
    return tarefasDoLocalStorage ? JSON.parse(tarefasDoLocalStorage) : [];
};

// Função para salvar o array de tarefas no Local Storage
const definirTarefaNoLocalStorage = (tarefas) => {
    window.localStorage.setItem('tarefas', JSON.stringify(tarefas));
};

// Função que cria e adiciona um item de tarefa (li) na lista de tarefas (ul)
const criarTarefaListaItem = (tarefa, checada) => {
    const lista = document.getElementById('todaLista');
    const toDo = document.createElement('li');
    toDo.id = tarefa.id;
    toDo.appendChild(checada);

    // Cria um container para etiqueta e data
    const infoDiv = document.createElement('div');
    infoDiv.className = 'info-tarefa';

    // Adiciona a etiqueta, se existir
    if (tarefa.etiqueta) {
        const spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'etiqueta-tarefa';
        spanEtiqueta.textContent = tarefa.etiqueta;
        infoDiv.appendChild(spanEtiqueta);
    }

    // Adiciona a data de criação, se existir
    if (tarefa.criadoEm) {
        const spanData = document.createElement('span');
        spanData.className = 'data-criada';
        spanData.textContent = `Criado em: ${tarefa.criadoEm}`;
        infoDiv.appendChild(spanData);
    }

    // Só adiciona o infoDiv se houver conteúdo
    if (infoDiv.childNodes.length > 0) {
        toDo.appendChild(infoDiv);
    }

    // Cria o botão de concluir/remover tarefa
    const removerTarefaBtn = document.createElement('button');
    removerTarefaBtn.textContent = 'Concluir';
    removerTarefaBtn.ariaLabel = 'Remover tarefa';
    removerTarefaBtn.onclick = () => removerTarefa(tarefa.id);

    toDo.appendChild(removerTarefaBtn);

    // Adiciona classe visual se a tarefa estiver marcada como concluída
    if (tarefa.checada) {
        toDo.classList.add('tarefa-concluida');
    }

    lista.appendChild(toDo);
    return toDo;
};

// Função chamada quando o checkbox de uma tarefa é clicado
const quandoCheckboxClicado = (event) => {
    const [id] = event.target.id.split('-');
    const tarefas = getTarefasDoLocalStorage();

    const tarefasAtualizadas = tarefas.map((tarefa) =>
        parseInt(tarefa.id) === parseInt(id)
            ? { ...tarefa, checada: event.target.checked }
            : tarefa
    );
    definirTarefaNoLocalStorage(tarefasAtualizadas);

    // Atualiza visualmente a tarefa
    const item = document.getElementById(id);
    if (item) {
        if (event.target.checked) {
            item.classList.add('tarefa-concluida');
        } else {
            item.classList.remove('tarefa-concluida');
        }
    }

    atualizarContadorTarefas();
};

// Função que cria o checkbox e o label para cada tarefa
const getCheckboxInputs = ({ id, descricao, checada }) => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkboxId = `${id}-checkbox`;

    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = checada || false;
    checkbox.addEventListener('change', quandoCheckboxClicado);

    label.textContent = descricao;
    label.htmlFor = checkboxId;

    wrapper.className = 'checkbox-label-container';
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper;
};

// Função para gerar um novo ID único para cada tarefa
const getNovaTarefaId = () => {
    const tarefas = getTarefasDoLocalStorage();
    const ultimoId = tarefas.length > 0 ? Math.max(...tarefas.map(t => Number(t.id))) : 0;
    return ultimoId + 1;
};

// Função que pega os dados do formulário e retorna um objeto com os dados da nova tarefa
const getNovaTarefaData = (event) => {
    const descricao = event.target.elements.descricaoDeTarefa.value;
    const etiqueta = event.target.elements.etiquetaDeTarefa.value;
    const id = getNovaTarefaId();
    const criadoEm = new Date().toLocaleDateString('pt-BR');
    return { id, descricao, etiqueta, criadoEm };
};

// Função chamada ao enviar o formulário para criar uma nova tarefa
const criandotarefa = (event) => {
    event.preventDefault();
    document.getElementById('salvarTarefaBtn').setAttribute('disabled', true);

    const novaTarefaData = getNovaTarefaData(event);
    const checada = getCheckboxInputs({ ...novaTarefaData, checada: false });
    criarTarefaListaItem(novaTarefaData, checada);

    const tarefas = getTarefasDoLocalStorage();
    const tarefasAtualizadas = [
        ...tarefas,
        { ...novaTarefaData, checada: false }
    ];
    definirTarefaNoLocalStorage(tarefasAtualizadas);

    // Limpa o formulário
    document.getElementById('descricaoDeTarefa').value = '';
    document.getElementById('etiquetaDeTarefa').value = '';
    document.getElementById('salvarTarefaBtn').removeAttribute('disabled');
    event.target.reset();

    atualizarContadorTarefas();
};

// Função para remover uma tarefa individualmente
const removerTarefa = (tarefaId) => {
    const tarefas = getTarefasDoLocalStorage();
    const tarefasAtualizadas = tarefas.filter(({ id }) => parseInt(id) !== parseInt(tarefaId));
    definirTarefaNoLocalStorage(tarefasAtualizadas);

    const item = document.getElementById(tarefaId);
    if (item) {
        document.getElementById("todaLista").removeChild(item);
    }

    atualizarContadorTarefas();
};

// Função para remover todas as tarefas marcadas como concluídas
const removerTarefasConcluidas = () => {
    const tarefas = getTarefasDoLocalStorage();
    const tarefaARemover = tarefas.filter(({ checada }) => checada).map(({ id }) => id);
    const tarefasAtualizadas = tarefas.filter(({ checada }) => !checada);
    definirTarefaNoLocalStorage(tarefasAtualizadas);

    tarefaARemover.forEach((id) => {
        const item = document.getElementById(id);
        if (item) {
            document.getElementById("todaLista").removeChild(item);
        }
    });

    atualizarContadorTarefas();
};

// Atualiza o contador de tarefas concluídas
function atualizarContadorTarefas() {
    const tarefas = getTarefasDoLocalStorage();
    const concluidas = tarefas.filter(tarefa => tarefa.checada).length;
    const total = tarefas.length;
    document.getElementById('contadorTarefas').textContent = `${concluidas}/${total} tarefas concluídas`;
}

// Ao carregar a página
window.onload = function () {
    if (document.getElementById('tela1') && document.getElementById('tela2')) {
        document.getElementById('tela1').style.display = 'block';
        document.getElementById('tela2').style.display = 'none';
    }

    const form = document.getElementById('criandoTodoFormulario');
    form.addEventListener('submit', criandotarefa);

    const tarefasDoLocalStorage = getTarefasDoLocalStorage();
    tarefasDoLocalStorage.forEach((tarefa) => {
        const checagemTarefa = getCheckboxInputs(tarefa);
        criarTarefaListaItem(tarefa, checagemTarefa);
    });

    atualizarContadorTarefas();
};

// Controle de telas
document.addEventListener('DOMContentLoaded', function () {
    const btnEntrar = document.getElementById('btn-entrar');
    const btnVoltar = document.getElementById('btn-voltar');
    const tela1 = document.getElementById('tela1');
    const tela2 = document.getElementById('tela2');

    if (btnEntrar && btnVoltar && tela1 && tela2) {
        btnEntrar.onclick = function () {
            tela1.style.display = 'none';
            tela2.style.display = 'block';
        };

        btnVoltar.onclick = function () {
            tela2.style.display = 'none';
            tela1.style.display = 'block';
        };
    }
});
