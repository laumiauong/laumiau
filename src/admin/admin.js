let isAuthReady = true; 

function saveUserProfile(email) {
    localStorage.setItem('adminEmail', email);
    const greeting = document.getElementById('greeting-message');
    greeting.textContent = `Acesso concedido para: ${email}`;
}

function loadUserProfile() {
    const email = localStorage.getItem('adminEmail');
    const emailInput = document.getElementById('email-input');
    const greeting = document.getElementById('greeting-message');

    if (email) {
        emailInput.value = email;
        greeting.textContent = `Entre com suas credenciais para acessar o painel administrativo. Último email usado: ${email}`;
    }
}

window.onload = () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }

    loadUserProfile();
    
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailInput = document.getElementById('email-input').value.trim();
            const passwordInput = document.getElementById('password-input').value.trim();

            if (!emailInput || !passwordInput) {
                document.getElementById('greeting-message').textContent = 'Por favor, preencha o email e a senha.';
                return;
            }

            const button = document.getElementById('login-button');
            button.textContent = 'Verificando...';
            button.disabled = true;

            setTimeout(() => {
                saveUserProfile(emailInput);

                button.textContent = 'Entrar';
                button.disabled = false;

                const loginCard = document.getElementById('login-card');
                loginCard.classList.add('animate-pulse-once');
                setTimeout(() => loginCard.classList.remove('animate-pulse-once'), 500);
                
                document.getElementById('password-input').value = '';
            }, 1000);
        });
    }
};
