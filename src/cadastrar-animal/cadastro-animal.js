// cadastro.js

// IMPORTANTE: Esta chave deve ser IGUAL a usada no Dashboard
const STORAGE_KEY = 'lauMiauData_v2';

// Função auxiliar para pegar dados
function getStorageData() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        return JSON.parse(data);
    }
    // Estrutura padrão de emergência
    return {
        stats: { available: 44, pending: 12, adoptions: 12, new: 8 },
        requests: [],
        activities: []
    };
}

// Lógica de Preview de Imagem
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            const placeholder = document.getElementById('uploadPlaceholder');
            
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            placeholder.classList.add('opacity-0'); // Esconde o ícone suavemente
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// Lógica de Salvamento do Formulário
function handleRegister(event) {
    event.preventDefault(); // Impede recarregamento da página

    const name = document.getElementById('name').value;
    const species = document.getElementById('species').value;
    
    // Recupera dados atuais
    const currentData = getStorageData();

    // 1. Atualiza Estatísticas
    currentData.stats.available += 1;
    currentData.stats.new += 1;

    // 2. Adiciona Log de Atividade
    currentData.activities.unshift({
        text: `${species} "${name}" cadastrado`,
        time: "Agora mesmo",
        type: "neutral" // Laranja
    });

    // Limita o tamanho do histórico
    if(currentData.activities.length > 5) currentData.activities.pop();

    // 3. Salva no navegador
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));

    // Feedback visual
    const btn = event.submitter;
    const originalText = btn.innerText;
    btn.innerText = "Salvando...";
    btn.disabled = true;
    
    setTimeout(() => {
        alert(`Sucesso! O animal ${name} foi cadastrado.`);
        // Redireciona para o Dashboard
        window.location.href = 'index.html';
    }, 500);
}