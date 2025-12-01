// --- DADOS INICIAIS (Dados de Exemplo para quando estiver vazio) ---
const initialData = [
    { id: 12345, name: "Mia", species: "Gato", age: "2 Anos", status: "Disponível" },
    { id: 12346, name: "Rex", species: "Cachorro", age: "5 Meses", status: "Em Adoção" },
    { id: 12347, name: "Luna", species: "Gato", age: "1 Ano", status: "Disponível" },
    { id: 12348, name: "Thor", species: "Cachorro", age: "3 Anos", status: "Disponível" },
    { id: 12349, name: "Felix", species: "Gato", age: "8 Meses", status: "Disponível" },
    { id: 12350, name: "Bela", species: "Cachorro", age: "4 Anos", status: "Adotado" },
    { id: 12351, name: "Milo", species: "Gato", age: "6 Anos", status: "Disponível" },
    { id: 12352, name: "Kiko", species: "Cachorro", age: "1 Mês", status: "Em Adoção" }
];

// --- ESTADO & LOCALSTORAGE ---
// Tenta pegar do localStorage, se não tiver nada, usa os dados iniciais
let animals = JSON.parse(localStorage.getItem('lauMiauAnimals')) || initialData;

// --- MANIPULAÇÃO DO DOM ---
const grid = document.getElementById('animalsGrid');
const searchInput = document.getElementById('searchInput');

// Renderizar Cards
function renderAnimals(filterText = "") {
    grid.innerHTML = "";
    
    // Filtra pelo nome ou pelo ID
    const filtered = animals.filter(animal => 
        animal.name.toLowerCase().includes(filterText.toLowerCase()) || 
        animal.id.toString().includes(filterText)
    );

    // Se não achar nada
    if (filtered.length === 0) {
        grid.innerHTML = `<div class="empty-state"><i class="fa-solid fa-paw fa-3x" style="margin-bottom:1rem; opacity:0.3;"></i><br>Nenhum animal encontrado.</div>`;
        return;
    }

    // Cria os cards para cada animal encontrado
    filtered.forEach(animal => {
        const card = document.createElement('div');
        card.className = "card";
        card.innerHTML = `
            <div class="card-img">
                <i class="fa-solid fa-paw"></i>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h4 class="pet-name">${animal.name}</h4>
                </div>
                <span class="pet-id">ID: #${animal.id}</span>
                <div class="tags-container">
                    <span class="tag tag-species">${animal.species}</span>
                    <span class="tag tag-age">${animal.age}</span>
                    <span class="tag ${getStatusClass(animal.status)}">${animal.status}</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="action-btn btn-edit" title="Editar" onclick="alert('Funcionalidade futura: Editar ${animal.name}')">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="action-btn btn-delete" title="Excluir" onclick="deleteAnimal(${animal.id})">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Helper para escolher a cor da tag de status
function getStatusClass(status) {
    if (status === "Disponível" || status === "Em Adoção") return "tag-available";
    return "tag-adopted";
}

// --- FUNÇÕES DE AÇÃO ---

// Deletar Animal
window.deleteAnimal = (id) => {
    if(confirm("Tem certeza que deseja remover este animal do sistema?")) {
        animals = animals.filter(a => a.id !== id);
        saveAndRender();
    }
};

// Salvar no LocalStorage e atualizar a tela
function saveAndRender() {
    localStorage.setItem('lauMiauAnimals', JSON.stringify(animals));
    renderAnimals(searchInput.value);
}

// Evento de Busca (digitação)
searchInput.addEventListener('input', (e) => {
    renderAnimals(e.target.value);
});

// Inicializar a tela carregando os animais
renderAnimals();