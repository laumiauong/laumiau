const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const form = document.getElementById('adminForm');
const submitBtn = document.querySelector('.btn-submit');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verificando...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
        // Redireciona para o dashboard
        window.location.href = '../dashboard/dashboard.html'; 
    }, 1500);
});