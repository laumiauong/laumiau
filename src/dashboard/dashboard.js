function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function setActiveNav(selectedPage) {
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.page === selectedPage) {
            link.classList.add('active');
            link.classList.remove('text-gray-500', 'hover:border-gray-300', 'hover:text-gray-700');
            if (link.parentElement.parentElement.id === 'admin-nav') {
                 link.classList.add('border-primary', 'text-primary');
                 link.classList.remove('border-transparent');
            } else {
                 link.classList.add('text-primary', 'bg-primary/10');
            }
        } else {
            link.classList.remove('active', 'text-primary', 'bg-primary/10');
            link.classList.add('text-gray-500', 'hover:border-gray-300', 'hover:text-gray-700');
            if (link.parentElement.parentElement.id === 'admin-nav') {
                link.classList.add('border-transparent');
                link.classList.remove('border-primary');
            }
        }
    });
    console.log(`Página atual: ${selectedPage}`);
}

window.onload = () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.currentTarget.dataset.page;
            setActiveNav(page);
            if (!document.getElementById('mobile-menu').classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });

    setActiveNav('dashboard');
};
// --- 1. ESTRUTURA DE DADOS & ESTADO ---

const defaultState = {
    stats: {
        disponiveis: { value: 44, label: "Pets Disponíveis", trend: "+5 este mês", icon: "heart", color: "text-orange-500" },
        pendentes: { value: 12, label: "Solicitações Pendentes", trend: "+2 este mês", icon: "clock", color: "text-yellow-500" },
        adocoes: { value: 12, label: "Adoções este Mês", trend: "+3 este mês", icon: "check-circle", color: "text-green-500" },
        novos: { value: 8, label: "Novos Pets Cadastrados", trend: "+1 este mês", icon: "plus-circle", color: "text-blue-500" }
    },
    requests: [
        { id: 1, petName: "Mel", status: "Pendente", requester: "Maria Silva", date: "12/07/2025", image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=64&h=64" },
        { id: 2, petName: "Bello", status: "Aprovado", requester: "João Santos", date: "25/06/2025", image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=64&h=64" }
    ],
    activities: [
        { text: 'Pet "Bella" foi adotado', time: 'Há 2 horas', type: 'success' },
        { text: 'Nova Solicitação Recebida', time: 'Há 4 horas', type: 'info' },
        { text: 'Pet "Lau" Cadastrado', time: 'Há 2 dias', type: 'action' }
    ]
};

let appState = {};

// --- LOCALSTORAGE ---

function loadState() {
    const stored = localStorage.getItem('lauMiauState');
    if (stored) {
        appState = JSON.parse(stored);
    } else {
        appState = JSON.parse(JSON.stringify(defaultState));
        saveState();
    }
    renderAll();
}

function saveState() {
    localStorage.setItem('lauMiauState', JSON.stringify(appState));
    renderAll();
}

function resetApp() {
    if (confirm('Tem certeza que deseja resetar todos os dados para o padrão?')) {
        localStorage.removeItem('lauMiauState');
        loadState();
        createNotification("Dados resetados com sucesso!", "info");
    }
}

// --- RENDERIZAÇÃO ---

function renderStats() {
    const container = document.getElementById('stats-container');
    container.innerHTML = '';

    Object.values(appState.stats).forEach(stat => {
        const card = document.createElement('article');
        card.className = 'bg-white p-6 rounded-2xl shadow-sm border border-gray-100 card-hover flex flex-col justify-between h-32';
        
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <h3 class="font-bold text-gray-500 text-sm">${stat.label}</h3>
                <i data-lucide="${stat.icon}" class="${stat.color} w-5 h-5"></i>
            </div>
            <div>
                <p class="text-4xl font-bold text-gray-800">${stat.value}</p>
                <p class="text-xs font-medium text-green-500 mt-1 bg-green-50 inline-block px-2 py-0.5 rounded-full">${stat.trend}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderRequests() {
    const container = document.getElementById('requests-container');
    container.innerHTML = '';

    appState.requests.forEach(req => {
        const item = document.createElement('div');
        item.className = 'flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group';
        
        const statusClass = req.status === 'Pendente' 
            ? 'bg-yellow-100 text-yellow-700' 
            : 'bg-green-100 text-green-700';

        item.innerHTML = `
            <div class="flex items-center gap-4">
                <img src="${req.image}" alt="${req.petName}" class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <h4 class="font-bold text-gray-900">${req.petName}</h4>
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${statusClass}">${req.status}</span>
                    </div>
                    <p class="text-sm text-gray-500">Solicitante: <span class="font-medium text-gray-700">${req.requester}</span></p>
                </div>
            </div>
            <div class="text-right hidden sm:block">
                <div class="text-xs text-gray-400 mb-2 flex items-center justify-end gap-1">
                    <i data-lucide="calendar" class="w-3 h-3"></i> ${req.date}
                </div>
                <button onclick="toggleStatus(${req.id})" class="text-sm text-gray-500 border border-gray-200 bg-white px-3 py-1 rounded-lg hover:border-brand-orange hover:text-brand-orange transition shadow-sm">
                    Ver Detalhes
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

function renderActivities() {
    const container = document.getElementById('activities-container');
    container.innerHTML = '';

    appState.activities.forEach(act => {
        const li = document.createElement('li');
        li.className = 'mb-4 ml-2';
        
        let bulletColor = 'bg-gray-300';
        if (act.type === 'success') bulletColor = 'bg-green-500';
        if (act.type === 'action') bulletColor = 'bg-brand-orange';

        li.innerHTML = `
            <span class="absolute -left-[29px] flex items-center justify-center w-3 h-3 rounded-full ring-4 ring-white ${bulletColor}"></span>
            <p class="text-sm font-medium text-gray-800">${act.text}</p>
            <time class="text-xs text-gray-400">${act.time}</time>
        `;
        container.appendChild(li);
    });
}

function renderAll() {
    renderStats();
    renderRequests();
    renderActivities();
    lucide.createIcons();
}

// --- LÓGICA DE NEGÓCIO ---

function addNewPet() {
    appState.stats.disponiveis.value += 1;
    appState.stats.novos.value += 1;

    const petNames = ["Thor", "Luna", "Nina", "Simba", "Paçoca"];
    const randomName = petNames[Math.floor(Math.random() * petNames.length)];

    appState.activities.unshift({
        text: `Pet "${randomName}" Cadastrado`,
        time: 'Agora mesmo',
        type: 'action'
    });

    if (appState.activities.length > 5) appState.activities.pop();

    saveState();
    createNotification(`Pet ${randomName} cadastrado com sucesso!`, 'success');
}

function toggleStatus(id) {
    const req = appState.requests.find(r => r.id === id);
    if (req) {
        req.status = req.status === 'Pendente' ? 'Aprovado' : 'Pendente';

        if (req.status === 'Aprovado') {
            appState.stats.disponiveis.value -= 1;
            appState.stats.adocoes.value += 1;
            createNotification(`Solicitação de ${req.requester} Aprovada!`, 'success');
        } else {
            appState.stats.disponiveis.value += 1;
            appState.stats.adocoes.value -= 1;
            createNotification(`Status revertido para Pendente`, 'info');
        }
        saveState();
    }
}

// Sistema simples de notificação
function createNotification(msg, type) {
    const toast = document.createElement('div');
    const color = type === 'success' ? 'bg-green-500' : 'bg-gray-800';
    
    toast.className = `fixed bottom-4 right-4 ${color} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-10 opacity-0 z-50 flex items-center gap-2`;
    toast.innerHTML = `<i data-lucide="${type === 'success' ? 'check' : 'info'}" class="w-4 h-4"></i> ${msg}`;
    
    document.body.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Inicialização ---
window.addEventListener('DOMContentLoaded', loadState);
