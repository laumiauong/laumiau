// script.js

// --- CONFIGURAÇÃO E DADOS ---
const STORAGE_KEY = 'lauMiauData_v2';

const initialData = {
    stats: { available: 44, pending: 12, adoptions: 12, new: 8 },
    requests: [
        { id: 1, petName: "Mel", status: "Pendente", requester: "Maria Silva", date: "12/07/2025" },
        { id: 2, petName: "Bella", status: "Aprovado", requester: "João Santos", date: "28/06/2025" }
    ],
    activities: [
        { text: "Pet 'Bel' foi adotado", time: "Há 2 horas", type: "success" },
        { text: "Nova Solicitação recebida", time: "Há 4 horas", type: "info" }
    ]
};

// --- GERENCIAMENTO DE DADOS ---
function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialData;
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// --- RENDERIZAÇÃO (UI) ---
function renderDashboard() {
    const data = loadData();
    
    // Stats
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = '';
    
    const cards = [
        { title: "Pets Disponíveis", value: data.stats.available, icon: "ph-heart", color: "text-orange-500" },
        { title: "Solicitações", value: data.stats.pending, icon: "ph-bell-ringing", color: "text-yellow-500", badge: true },
        { title: "Adoções (Mês)", value: data.stats.adoptions, icon: "ph-check-circle", color: "text-green-500" },
        { title: "Novos Pets", value: data.stats.new, icon: "ph-plus-circle", color: "text-blue-500" }
    ];

    cards.forEach(stat => {
        statsContainer.innerHTML += `
            <div class="bg-white p-6 rounded-3xl card-shadow border border-gray-100 flex flex-col justify-between h-32 relative hover:-translate-y-1 transition-transform duration-300">
                <div class="flex justify-between items-start">
                    <span class="text-gray-600 text-sm font-semibold">${stat.title}</span>
                    <i class="ph-fill ${stat.icon} ${stat.color} text-xl ${stat.badge ? 'animate-bounce' : ''}"></i>
                </div>
                <div class="text-4xl font-extrabold text-gray-800">${stat.value}</div>
            </div>`;
    });

    // Requests
    const reqList = document.getElementById('requests-list');
    reqList.innerHTML = '';
    data.requests.forEach(req => {
        const colorClass = req.status === "Pendente" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700";
        reqList.innerHTML += `
            <div class="border border-gray-100 rounded-2xl p-4 flex justify-between items-center hover:bg-orange-50/50 transition-colors">
                <div>
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-gray-800">${req.petName}</span>
                        <span class="text-xs px-2 py-0.5 rounded-md font-bold ${colorClass}">${req.status}</span>
                    </div>
                    <div class="text-sm text-gray-500">Por: ${req.requester}</div>
                </div>
                <button class="text-brand-orange hover:bg-orange-100 p-2 rounded-full transition-colors"><i class="ph-bold ph-caret-right"></i></button>
            </div>`;
    });

    // Activities
    const actList = document.getElementById('activity-list');
    actList.innerHTML = '';
    data.activities.forEach(act => {
        let dotColor = act.type === 'success' ? 'bg-green-400' : (act.type === 'info' ? 'bg-blue-400' : 'bg-orange-400');
        actList.innerHTML += `
            <li class="relative pl-2">
                <span class="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-white ${dotColor}"></span>
                <p class="text-gray-700 font-medium">${act.text}</p>
                <span class="text-xs text-gray-400">${act.time}</span>
            </li>`;
    });
}

// --- CONTROLE DO MODAL ---
function toggleModal(show) {
    const modal = document.getElementById('petModal');
    const panel = document.getElementById('modal-panel');
    
    if (show) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            panel.classList.remove('scale-95');
            panel.classList.add('scale-100');
        }, 10);
        document.getElementById('petNameInput').focus();
    } else {
        modal.classList.add('opacity-0');
        panel.classList.remove('scale-100');
        panel.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    }
}

// --- LÓGICA DO FORMULÁRIO ---
function handleFormSubmit(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('petNameInput');
    const typeInput = document.getElementById('petTypeInput');
    const name = nameInput.value.trim();

    if (!name) return;

    const data = loadData();
    
    data.stats.available++;
    data.stats.new++;

    data.activities.unshift({
        text: `${typeInput.value} '${name}' cadastrado`,
        time: "Agora mesmo",
        type: "neutral"
    });

    if(data.activities.length > 5) data.activities.pop();

    saveData(data);
    
    nameInput.value = '';
    toggleModal(false);
    renderDashboard();
    console.log("Pet salvo com sucesso!");
}

function logout() {
    if(confirm("Sair do sistema Lau Miau?")) {
        localStorage.removeItem(STORAGE_KEY);
        document.body.innerHTML = `
            <div class="h-screen flex items-center justify-center bg-orange-50 flex-col gap-4">
                <i class="ph-duotone ph-spinner animate-spin text-4xl text-brand-orange"></i>
                <p class="text-gray-500 font-nunito">Saindo com segurança...</p>
            </div>`;
        setTimeout(() => {
            location.reload();
        }, 1500);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', renderDashboard);