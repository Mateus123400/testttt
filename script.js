// Inicializar o armazenamento local se não existir
if (!localStorage.getItem('eggCollections')) {
    localStorage.setItem('eggCollections', JSON.stringify([]));
}

// Elementos do DOM
const eggForm = document.getElementById('eggForm');
const quantityInput = document.getElementById('quantity');
const dateInput = document.getElementById('date');
const historyBody = document.getElementById('historyBody');
const totalEggsElement = document.getElementById('totalEggs');
const todayEggsElement = document.getElementById('todayEggs');
const averageEggsElement = document.getElementById('averageEggs');

// Definir a data de hoje como padrão no input de data
dateInput.valueAsDate = new Date();

// Função para atualizar o dashboard
function updateDashboard() {
    const collections = JSON.parse(localStorage.getItem('eggCollections'));
    
    // Calcular total de ovos
    const totalEggs = collections.reduce((sum, collection) => sum + parseInt(collection.quantity), 0);
    totalEggsElement.textContent = totalEggs;

    // Calcular ovos coletados hoje
    const today = new Date().toISOString().split('T')[0];
    const todayEggs = collections
        .filter(collection => collection.date === today)
        .reduce((sum, collection) => sum + parseInt(collection.quantity), 0);
    todayEggsElement.textContent = todayEggs;

    // Calcular média diária
    const uniqueDates = new Set(collections.map(collection => collection.date));
    const averageEggs = totalEggs / Math.max(uniqueDates.size, 1);
    averageEggsElement.textContent = averageEggs.toFixed(1);
}

// Função para atualizar a tabela de histórico
function updateHistoryTable() {
    const collections = JSON.parse(localStorage.getItem('eggCollections'));
    historyBody.innerHTML = '';

    collections.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach((collection, index) => {
        const row = document.createElement('tr');
        const formattedDate = new Date(collection.date).toLocaleDateString('pt-BR');
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${collection.quantity}</td>
            <td>
                <button onclick="deleteCollection(${index})" class="delete-btn">Excluir</button>
            </td>
        `;
        historyBody.appendChild(row);
    });
}

// Função para adicionar nova coleta
function addCollection(quantity, date) {
    const collections = JSON.parse(localStorage.getItem('eggCollections'));
    collections.push({ quantity, date });
    localStorage.setItem('eggCollections', JSON.stringify(collections));
    updateDashboard();
    updateHistoryTable();
}

// Função para deletar uma coleta
function deleteCollection(index) {
    const collections = JSON.parse(localStorage.getItem('eggCollections'));
    collections.splice(index, 1);
    localStorage.setItem('eggCollections', JSON.stringify(collections));
    updateDashboard();
    updateHistoryTable();
}

// Event listener para o formulário
eggForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const quantity = quantityInput.value;
    const date = dateInput.value;
    addCollection(quantity, date);
    eggForm.reset();
    dateInput.valueAsDate = new Date();
});

// Inicializar o dashboard e a tabela de histórico
updateDashboard();
updateHistoryTable();
