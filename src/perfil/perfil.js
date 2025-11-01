window.onload = () => {
    // Inicializa ícones Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Botão editar perfil
    document.getElementById('edit-profile-button').addEventListener('click', () => {
        console.log("Navegando para a tela de Edição de Perfil.");
    });

    // Botão adicionar novo animal
    document.getElementById('add-new-animal-profile').addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Navegando para a tela de Cadastro de Novo Animal.");
    });

    // Listener para "Ver Detalhes"
    document.querySelectorAll('.data-card button:not(#edit-profile-button):not(#add-new-animal-profile)').forEach(button => {
        button.addEventListener('click', (e) => {
            const animalName = e.currentTarget.closest('.flex').querySelector('p:first-child').textContent;
            console.log(`Visualizando detalhes do animal: ${animalName}`);
        });
    });
};
