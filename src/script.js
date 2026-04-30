let input = document.querySelector('input[name=tarefa]');
let btn = document.querySelector('#botao');
let lista = document.querySelector('#lista');
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Função 1: Limpa a tela antes de renderizar
function renderizarTarefas() {
    lista.innerHTML = ''; 

    tarefas.forEach((tarefa, posicao) => {
        let itemLista = document.createElement('li');
        itemLista.classList.add('list-group-item');
        
        let textoTarefa = document.createTextNode(tarefa);
        itemLista.appendChild(textoTarefa);

        // Adiciona o evento de clique para deletar
        // Passamos a 'posicao' para saber qual deletar
        itemLista.setAttribute('onclick', `deletarTarefa(${posicao})`);

        lista.appendChild(itemLista);
    });
}

// Função 2: Adiciona  tarefa
function adicionarTarefa() {
    let novaTarefa = input.value.trim(); //  trim remove espaços vazios e sem uso

    if (novaTarefa !== "") {
        tarefas.push(novaTarefa);
        input.value = '';
        renderizarTarefas();
        salvarNoStorage();
    }
}

// Função 3: Deleta tarefa 
function deletarTarefa(posicao) {
    // .splice remove o item do array baseado na posição
    tarefas.splice(posicao, 1);
    
    renderizarTarefas(); // Re-desenha a lista sem o item
    salvarNoStorage();   // Atualiza o banco de dados
}

function salvarNoStorage() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Eventos
btn.onclick = adicionarTarefa;

// Adicionar com a tecla Enter
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') adicionarTarefa();
});

// Renderizar assim que abrir a página
renderizarTarefas();