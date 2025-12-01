// --- LÓGICA DE INTERFACE ---

// Alternar visibilidade da senha (funciona para ambos os campos)
function togglePass(inputId, iconElement) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    
    iconElement.classList.toggle('fa-eye');
    iconElement.classList.toggle('fa-eye-slash');
}

// Máscara simples para Telefone (XX) XXXXX-XXXX
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    
    if (value.length > 11) value = value.slice(0, 11); // Limita tamanho

    // Aplica a formatação
    if (value.length > 2) {
        value = `(${value.substring(0,2)}) ${value.substring(2)}`;
    }
    if (value.length > 7) {
        value = `${value.substring(0,10)}-${value.substring(10)}`;
    }
    
    e.target.value = value;
});

// Lógica de Cadastro
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Pegar valores dos inputs
    const fullName = document.getElementById('fullname').value;
    const email = document.getElementById('email').value; // Usaremos como username
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;

    // Validação simples de senha
    if (pass !== confirm) {
        alert('As senhas não coincidem!');
        return;
    }

    const btn = document.querySelector('.btn-submit');
    const originalText = btn.textContent;
    
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Criando conta...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    setTimeout(() => {
        // --- SALVAR NO LOCALSTORAGE (Para o login funcionar) ---
        const storedUsers = JSON.parse(localStorage.getItem('lauMiauUsers')) || [];
        
        // Verifica se o email já existe
        const userExists = storedUsers.some(u => u.username === email);

        if (userExists) {
            alert('Este email já está cadastrado!');
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            btn.disabled = false;
        } else {
            // Cria o novo objeto de usuário
            const newUser = {
                id: Date.now(),
                username: email, // O email será o login
                password: pass,
                fullName: fullName
            };

            // Salva na lista
            storedUsers.push(newUser);
            localStorage.setItem('lauMiauUsers', JSON.stringify(storedUsers));

            alert('Conta criada com sucesso! Redirecionando para o login...');
            
            // Redireciona para a tela de login
            window.location.href = "index.html";
        }

    }, 1500);
});