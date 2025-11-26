// perfil.js

const PROFILE_KEY = 'lauMiauProfileV2';

const defaultProfile = {
    fullName: "Bruna Souza",
    username: "BrunaD001",
    email: "bruna2001@gmail.com",
    adopted: "Pandora e 9",
    preferences: "Gatos"
};

// --- CARREGAR DADOS ---
function loadProfile() {
    const savedData = localStorage.getItem(PROFILE_KEY);
    const data = savedData ? JSON.parse(savedData) : defaultProfile;

    // Preenche os Inputs
    document.getElementById('fullName').value = data.fullName;
    document.getElementById('username').value = data.username;
    document.getElementById('email').value = data.email;
    document.getElementById('adopted').value = data.adopted;
    document.getElementById('preferences').value = data.preferences;
    
    // Atualiza o Cabeçalho
    updateHeaderDisplay(data);
}

function updateHeaderDisplay(data) {
    document.getElementById('header-name').innerText = data.fullName.split(' ')[0] + '!';
    document.getElementById('profile-name-display').innerText = data.username;
    document.getElementById('profile-email-display').innerText = data.email;
}

// --- MODO DE EDIÇÃO ---
function enableEdit() {
    // Esconde botão editar, mostra ações de salvar
    document.getElementById('btn-edit-mode').classList.add('hidden');
    document.getElementById('edit-actions').classList.remove('hidden');
    document.getElementById('edit-actions').classList.add('flex');

    // Transforma inputs em editáveis
    const inputs = document.querySelectorAll('.profile-input');
    inputs.forEach(input => {
        input.removeAttribute('readonly');
        input.classList.add('editable');
    });

    // Foca no primeiro campo
    document.getElementById('fullName').focus();
}

function cancelEdit() {
    // Recarrega os dados originais (desfazendo alterações não salvas)
    loadProfile();
    exitEditMode();
}

function exitEditMode() {
    // Volta botões ao normal
    document.getElementById('btn-edit-mode').classList.remove('hidden');
    document.getElementById('edit-actions').classList.add('hidden');
    document.getElementById('edit-actions').classList.remove('flex');

    // Tranca os inputs
    const inputs = document.querySelectorAll('.profile-input');
    inputs.forEach(input => {
        input.setAttribute('readonly', true);
        input.classList.remove('editable');
    });
}

// --- SALVAR DADOS ---
function saveProfile(event) {
    event.preventDefault();

    const profileData = {
        fullName: document.getElementById('fullName').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        adopted: document.getElementById('adopted').value,
        preferences: document.getElementById('preferences').value
    };

    localStorage.setItem(PROFILE_KEY, JSON.stringify(profileData));
    updateHeaderDisplay(profileData);
    
    // Sai do modo de edição
    exitEditMode();

    alert("Perfil atualizado com sucesso!");
}

// Inicializa
document.addEventListener('DOMContentLoaded', loadProfile);