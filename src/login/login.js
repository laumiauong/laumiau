window.onload = () => {
    // Inicializa ícones Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const loginForm = document.getElementById('login-form');
    const usernameEmailInput = document.getElementById('username-email');

    // Recupera o último usuário salvo
    const lastUsedUsernameEmail = localStorage.getItem('lastUsedUsernameEmail');
    if (lastUsedUsernameEmail) {
        usernameEmailInput.value = lastUsedUsernameEmail;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameEmail = usernameEmailInput.value;
        const password = document.getElementById('password').value;

        if (usernameEmail && password) {
            localStorage.setItem('lastUsedUsernameEmail', usernameEmail);
            console.log(`Login com: ${usernameEmail} / ${password}`);
            alert('Login bem-sucedido! (Simulação)');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    document.getElementById('back-button').addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Ação de voltar. (Pode ser para a página inicial ou anterior)");
    });

    document.getElementById('signup-link').addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Navegando para a tela de Cadastro.");
    });

    // Log de clique nos botões sociais
    document.querySelectorAll('.social-button').forEach(button => {
        button.addEventListener('click', () => {
            console.log(`Clicou em ${button.textContent.trim()}`);
        });
    });
};
