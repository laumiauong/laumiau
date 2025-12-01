document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form');
    const submitBtn = document.getElementById('submit-btn');
    const passwordInput = document.getElementById('password');
    const togglePasswordIcon = document.getElementById('toggle-password');
    const feedbackMessage = document.getElementById('feedback-message');
    const usernameInput = document.getElementById('username');

    // Função de Feedback Visual
    function showMessage(msg, type) {
        feedbackMessage.textContent = msg;
        feedbackMessage.className = ''; 
        feedbackMessage.style.display = 'block';
        
        if (type === 'success') {
            feedbackMessage.classList.add('msg-success');
        } else {
            feedbackMessage.classList.add('msg-error');
        }
        
        setTimeout(() => {
            feedbackMessage.style.display = 'none';
        }, 3000);
    }

    // Toggle Senha (Olhinho)
    togglePasswordIcon.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        togglePasswordIcon.classList.toggle('fa-eye');
        togglePasswordIcon.classList.toggle('fa-eye-slash');
    });

    // Submit APENAS DO LOGIN
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            showMessage("Por favor, preencha todos os campos.", "error");
            return;
        }

        // Busca os usuários salvos no cadastro
        const storedUsers = JSON.parse(localStorage.getItem('lauMiauUsers')) || [];

        // Verifica se existe alguém com esse nome e senha
        const userFound = storedUsers.find(u => u.username === username && u.password === password);

        if (userFound) {
            showMessage(`Bem-vindo de volta, ${username}!`, "success");
            
            // Salva a sessão do usuário
            localStorage.setItem('currentUser', JSON.stringify(userFound));
            
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Entrando...';
            
            // Redireciona para a home
            setTimeout(() => {
                window.location.href = "index.html"; 
            }, 2000);
            
        } else {
            showMessage("Usuário ou senha incorretos.", "error");
        }
    });
});