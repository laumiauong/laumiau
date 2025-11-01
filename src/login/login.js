// Importações do Firebase via CDN
import { initializeApp, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Configurações do app
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

setLogLevel('Debug');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let isAuthReady = false;

// Carrega o perfil do usuário do Firestore
async function loadUserProfile() {
    const userId = auth.currentUser?.uid;
    const greetingElement = document.getElementById('greeting-message');
    const loginCard = document.getElementById('login-card');
    const loadingIndicator = document.getElementById('loading-indicator');

    if (!userId) {
        if (loadingIndicator) loadingIndicator.classList.add('hidden');
        if (loginCard) loginCard.classList.remove('hidden');
        return;
    }

    const profileRef = doc(db, `artifacts/${appId}/users/${userId}/profiles`, 'userProfile');

    try {
        const profileSnap = await getDoc(profileRef);
        const nameInput = document.getElementById('name-input');
        const emailInput = document.getElementById('email-input');

        if (profileSnap.exists()) {
            const data = profileSnap.data();
            if (data.nome && greetingElement) {
                greetingElement.textContent = `Bem-vindo de volta, ${data.nome}!`;
                if (nameInput) nameInput.value = data.nome;
            }
            if (data.email && emailInput) {
                emailInput.value = data.email;
            }
        }
    } catch (e) {
        console.error("Erro ao carregar o perfil do Firestore:", e);
    } finally {
        if (loadingIndicator) loadingIndicator.classList.add('hidden');
        if (loginCard) loginCard.classList.remove('hidden');
    }
}

// Salva/atualiza o perfil do usuário no Firestore
async function saveUserProfile(nome, email) {
    const userId = auth.currentUser?.uid;
    const greetingElement = document.getElementById('greeting-message');

    if (!userId) {
        if (greetingElement) greetingElement.textContent = 'Erro de autenticação! Recarregue a página.';
        return;
    }

    const profileRef = doc(db, `artifacts/${appId}/users/${userId}/profiles`, 'userProfile');

    const profileData = {
        nome: nome,
        email: email,
        lastUpdate: new Date().toISOString()
    };

    try {
        await setDoc(profileRef, profileData, { merge: true });
        if (greetingElement) {
            greetingElement.textContent = `Olá, ${nome}! Perfil salvo com sucesso!`;
        }
        document.getElementById('email-input').value = '';
    } catch (e) {
        console.error("Erro ao salvar o documento no Firestore:", e);
        if (greetingElement) {
            greetingElement.textContent = 'Erro ao salvar o perfil. Tente novamente.';
        }
    }
}

// Observa mudanças na autenticação do Firebase
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        try {
            if (initialAuthToken) {
                await signInWithCustomToken(auth, initialAuthToken);
            } else {
                await signInAnonymously(auth);
            }
        } catch (e) {
            console.error("Erro no login automático:", e);
        }
    }

    isAuthReady = true;
    loadUserProfile();
});

// Manipulação do formulário de login
window.onload = () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            if (!isAuthReady) {
                document.getElementById('greeting-message').textContent = 'Aguarde a autenticação...';
                return;
            }

            const nameInput = document.getElementById('name-input');
            const emailInput = document.getElementById('email-input');

            const nome = nameInput.value.trim();
            const email = emailInput.value.trim();

            if (!nome || !email) {
                document.getElementById('greeting-message').textContent = 'Por favor, preencha todos os campos.';
                return;
            }

            const button = document.getElementById('login-button');
            button.textContent = 'Salvando...';
            button.disabled = true;

            await saveUserProfile(nome, email);

            button.textContent = 'Entrar';
            button.disabled = false;

            const loginCard = document.getElementById('login-card');
            loginCard.classList.add('animate-pulse-once');
            setTimeout(() => loginCard.classList.remove('animate-pulse-once'), 500);
        });
    }
};
