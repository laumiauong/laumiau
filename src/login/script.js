document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form');
    const pageTitle = document.getElementById('page-title');
    const submitBtn = document.getElementById('submit-btn');
    const toggleModeBtn = document.getElementById('toggle-mode');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const passwordInput = document.getElementById('password');
    const togglePasswordIcon = document.getElementById('toggle-password');
    const feedbackMessage = document.getElementById('feedback-message');
    const usernameInput = document.getElementById('username');

    let isLoginMode = true;

    // Função de Feedback Visual
    function showMessage(msg, type) {
        feedbackMessage.textContent = msg;
        feedbackMessage.className = ''; // Limpa classes antigas
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

    // Toggle Senha
    togglePasswordIcon.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        togglePasswordIcon.classList.toggle('fa-eye');
        togglePasswordIcon.classList.toggle('fa-eye-slash');
    });

    // Alternar Login/Cadastro
    toggleModeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;

        if (isLoginMode) {
            pageTitle.textContent = "Vamos Começar!";
            submitBtn.textContent = "Entrar";
            toggleModeBtn.textContent = "Cadastrar-se";
            forgotPasswordLink.style.display = "block";
            // Ajuda o navegador a saber que é login
            passwordInput.setAttribute('autocomplete', 'current-password');
        } else {
            pageTitle.textContent = "Crie sua Conta";
            submitBtn.textContent = "Cadastrar";
            toggleModeBtn.textContent = "Já tenho uma conta";
            forgotPasswordLink.style.display = "none";
             // Ajuda o navegador a saber que é nova senha
             passwordInput.setAttribute('autocomplete', 'new-password');
        }

        form.reset();
        feedbackMessage.style.display = 'none';
    });

    // Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            showMessage("Por favor, preencha todos os campos.", "error");
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('lauMiauUsers')) || [];

        if (isLoginMode) {
            const userFound = storedUsers.find(u => u.username === username && u.password === password);

            if (userFound) {
                showMessage(`Bem-vindo de volta, ${username}!`, "success");
                localStorage.setItem('currentUser', JSON.stringify(userFound));
                
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Entrando...';
                
                // REDIRECIONAMENTO AQUI
                setTimeout(() => {
                    // Altere "index.html" para o nome do seu arquivo principal
                    window.location.href = "index.html"; 
                }, 2000);
                
            } else {
                showMessage("Usuário ou senha incorretos.", "error");
            }
        } else {
            const userExists = storedUsers.some(u => u.username === username);

            if (userExists) {
                showMessage("Este usuário já está cadastrado.", "error");
            } else {
                const newUser = {
                    id: Date.now(),
                    username: username,
                    password: password
                };

                storedUsers.push(newUser);
                localStorage.setItem('lauMiauUsers', JSON.stringify(storedUsers));

                showMessage("Conta criada! Faça login.", "success");
                setTimeout(() => {
                    toggleModeBtn.click();
                }, 1500);
            }
        }
    });
});