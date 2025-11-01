function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const saveButton = document.getElementById('save-button');
    const originalText = saveButton.textContent;

    saveButton.textContent = 'Aguarde...';
    saveButton.disabled = true;

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    console.log("Dados do Animal para Cadastro:", data);

    setTimeout(() => {
        console.log("Animal cadastrado com sucesso!");
        saveButton.textContent = 'Cadastrado!';
        form.reset();
        document.getElementById('image-preview').style.display = 'none';
        setTimeout(() => {
            saveButton.textContent = originalText;
            saveButton.disabled = false;
        }, 1500);
    }, 2000);
}

function handleImageUpload(file) {
    const preview = document.getElementById('image-preview');
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
}

window.onload = () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const form = document.getElementById('register-animal-form');
    if (form) form.addEventListener('submit', handleSubmit);

    const backButton = document.getElementById('back-button');
    if (backButton) backButton.addEventListener('click', e => {
        e.preventDefault();
        console.log("Ação de voltar para a tela de lista de Animais.");
    });

    const cancelButton = document.getElementById('cancel-button');
    if (cancelButton) cancelButton.addEventListener('click', e => {
        e.preventDefault();
        console.log("Cadastro cancelado. Voltando.");
    });

    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('image-upload');

    dropArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', e => handleImageUpload(e.target.files[0]));

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev =>
        dropArea.addEventListener(ev, preventDefaults, false)
    );

    ['dragenter', 'dragover'].forEach(ev =>
        dropArea.addEventListener(ev, () => dropArea.classList.add('border-primary'), false)
    );

    ['dragleave', 'drop'].forEach(ev =>
        dropArea.addEventListener(ev, () => dropArea.classList.remove('border-primary'), false)
    );

    dropArea.addEventListener('drop', handleDrop, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length) {
            fileInput.files = files;
            handleImageUpload(files[0]);
        }
    }
};
