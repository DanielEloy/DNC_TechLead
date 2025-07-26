document.addEventListener('DOMContentLoaded', function () {
    // Seletores principais das telas e área de concluídas
    const btnEntrar = document.getElementById('btn-entrar');
    const btnVoltar = document.getElementById('btn-voltar');
    const tela1 = document.getElementById('tela1');
    const tela2 = document.getElementById('tela2');
    const concluidasDiv = document.querySelector('.tarefas-concluidas');

    // Alterna para tela 2 ao clicar em "Entrar"
    btnEntrar.onclick = function () {
        tela1.style.display = 'none';
        tela2.style.display = 'block';
    };

    // Volta para tela 1 ao clicar em "Voltar"
    btnVoltar.onclick = function () {
        tela2.style.display = 'none';
        tela1.style.display = 'block';
    };

    // Evento para botões normais (tarefa-concluida)
    document.querySelectorAll('.btn-concluir').forEach(function (btn) {
        btn.addEventListener('click', function () {
            let cardDiv = btn.closest('div');
            if (!cardDiv.querySelector('.texto-tarefa')) {
                cardDiv = cardDiv.parentElement;
            }
            const textoTarefa = cardDiv.querySelector('.texto-tarefa').textContent.trim();
            const dataSpan = cardDiv.querySelector('.data-criada');

            if (!dataSpan.textContent) {
                const hoje = new Date();
                const dia = String(hoje.getDate()).padStart(2, '0');
                const mes = String(hoje.getMonth() + 1).padStart(2, '0');
                const ano = hoje.getFullYear();
                // Adiciona o botão frontend ao lado da data, se ainda não existe
                if (!dataSpan.nextElementSibling || !dataSpan.nextElementSibling.classList.contains('btn-frontend')) {
                    const btnFrontend = document.createElement('button');
                    btnFrontend.className = 'btn-frontend';
                    btnFrontend.textContent = 'frontend';
                    dataSpan.textContent = `Criado em: ${dia}/${mes}/${ano}`;
                    dataSpan.parentNode.insertBefore(btnFrontend, dataSpan);
                }


            }
            const jaExiste = Array.from(concluidasDiv.querySelectorAll('.texto'))
                .some(span => span.textContent.trim() === textoTarefa);
            if (!jaExiste) {
                const concluida = document.createElement('div');
                concluida.className = 'tarefa-concluida';
                concluida.innerHTML = `
                    <button class="btn-frontend">frontend</button>
                    <span class="texto">${textoTarefa}</span>
                    <span class="data">${dataSpan.textContent}</span>
                    <span class="icone">✔️</span>
                `;
                concluidasDiv.appendChild(concluida);
            }
            btn.disabled = true;
        });
    });

    // Evento para botões com divisórias (tarefa-concluida1)
    document.querySelectorAll('.btn-concluir1').forEach(function (btn) {
        btn.addEventListener('click', function () {
            let cardDiv = btn.closest('div');
            if (!cardDiv.querySelector('.texto-tarefa')) {7
                cardDiv = cardDiv.parentElement;
            }
            const textoTarefa = cardDiv.querySelector('.texto-tarefa').textContent.trim();
            const dataSpan = cardDiv.querySelector('.data-criada');
            if (!dataSpan.textContent) {
                const hoje = new Date();
                const dia = String(hoje.getDate()).padStart(2, '0');
                const mes = String(hoje.getMonth() + 1).padStart(2, '0');
                const ano = hoje.getFullYear();
                dataSpan.textContent = `Criado em: ${dia}/${mes}/${ano}`;
                // Adiciona o botão frontend ao lado da data, se ainda não existe
                if (!dataSpan.previousElementSibling || !dataSpan.previousElementSibling.classList || !dataSpan.previousElementSibling.classList.contains('btn-frontend')) {
                    const btnFrontend = document.createElement('button');
                    btnFrontend.className = 'btn-frontend';
                    btnFrontend.textContent = 'frontend'; 
                    dataSpan.parentNode.insertBefore(btnFrontend, dataSpan);
                }
            }

            const jaExiste = Array.from(concluidasDiv.querySelectorAll('.texto'))
                .some(span => span.textContent.trim() === textoTarefa);
            if (!jaExiste) {
                const concluida1 = document.createElement('div');
                concluida1.className = 'tarefa-concluida1';
                concluida1.innerHTML = `
                    <div><span class="texto">${textoTarefa}</span></div>
                    <div><button class="btn-frontend1">frontend</button></div>
                    <div><span class="data">${dataSpan.textContent}</span></div>
                    <div><span class="icone">✔️</span></div>
                `;
                concluidasDiv.appendChild(concluida1);
            }
            btn.disabled = true;
        });
    });
});