// Array de dados simulados de animais
const MOCK_ANIMALS = [
    { id: '12345', nome: 'Mia', especie: 'Gato', idade: '2 Anos', status: 'Disponível' },
    { id: '12346', nome: 'Rex', especie: 'Cachorro', idade: '5 Meses', status: 'Em Adoção' },
    { id: '12347', nome: 'Luna', especie: 'Gato', idade: '1 Ano', status: 'Disponível' },
    { id: '12348', nome: 'Thor', especie: 'Cachorro', idade: '3 Anos', status: 'Em Tratamento' },
    { id: '12349', nome: 'Felix', especie: 'Gato', idade: '8 Meses', status: 'Disponível' },
    { id: '12350', nome: 'Bela', especie: 'Cachorro', idade: '4 Anos', status: 'Adotado' },
    { id: '12351', nome: 'Milo', especie: 'Gato', idade: '6 Anos', status: 'Disponível' },
    { id: '12352', nome: 'Kiko', especie: 'Cachorro', idade: '1 Mês', status: 'Em Adoção' },
];

// Função para criar e renderizar os cards
function renderAnimalList(animals) {
    const listContainer = document.getElementById('animal-list');
    const template = document.getElementById('animal-card-template');
    const emptyMessage = document.getElementById('empty-list-message');
    
    listContainer.innerHTML = '';

    if (animals.length === 0) {
        emptyMessage.classList.remove('hidden');
        return;
    } else {
        emptyMessage.classList.add('hidden');
    }

    animals.forEach(animal => {
        const card = template.content.cloneNode(true).querySelector('div');

        card.querySelector('[data-field="nome"]').textContent = animal.nome;
        card.querySelector('[data-field="id"]').textContent = `ID: #${animal.id}`;
        card.querySelector('[data-field="especie"]').textContent = animal.especie;
        card.querySelector('[data-field="idade"]').textContent = animal.idade;
        card.querySelector('[data-field="status"]').textContent = animal.status;

        const statusTag = card.querySelector('[data-field="status"]');
        statusTag.classList.remove('bg-green-100', 'text-green-800', 'bg-yellow-100', 'text-yellow-800', 'bg-gray-100', 'text-gray-500');
        if (animal.status === 'Disponível' || animal.status === 'Em Adoção') {
            statusTag.classList.add('bg-green-100', 'text-green-800');
        } else if (animal.status === 'Em Tratamento') {
            statusTag.classList.add('bg-yellow-100', 'text-yellow-800');
        } else if (animal.status === 'Adotado') {
            statusTag.classList.add('bg-gray-100', 'text-gray-500');
        }

        card.querySelector('[title="Editar"]').addEventListener('click', () => {
            console.log(`Editando animal ID: ${animal.id} (${animal.nome})`);
        });
        card.querySelector('[title="Excluir"]').addEventListener('click', () => {
            console.log(`Excluindo animal ID: ${animal.id} (${animal.nome})`);
        });

        listContainer.appendChild(card);
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Função de busca
function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    const filteredAnimals = MOCK_ANIMALS.filter(animal => 
        animal.nome.toLowerCase().includes(query) || 
        animal.especie.toLowerCase().includes(query) ||
        animal.id.includes(query)
    );
    renderAnimalList(filteredAnimals);
}

// Inicialização
window.onload = () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }

    renderAnimalList(MOCK_ANIMALS);

    document.getElementById('add-new-animal').addEventListener('click', () => {
        console.log("Navegando para a tela de Novo Cadastro de Animal.");
    });

    document.getElementById('back-button').addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Ação de voltar para o Dashboard Administrativo.");
    });

    document.getElementById('search-animal').addEventListener('input', handleSearch);
};
