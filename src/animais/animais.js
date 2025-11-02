document.addEventListener('DOMContentLoaded', function () {
    
    // --- Funcionalidade dos Filtros de Categoria ---
    const filterContainer = document.getElementById('filter-buttons');
    const petGrid = document.getElementById('pet-grid');
    const petCards = petGrid.querySelectorAll('.pet-card');
    
    if (filterContainer) {
        filterContainer.addEventListener('click', function (e) {
            // Alvo do clique deve ser um BOTÃO com data-filter
            const clickedButton = e.target.closest('button[data-filter]');
            
            if (!clickedButton) return;
            
            const filterValue = clickedButton.dataset.filter;
            
            // 1. Atualizar aparência dos botões
            filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active', 'bg-brand-orange-100', 'text-brand-orange-600');
                btn.classList.add('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
            });
            
            clickedButton.classList.add('active', 'bg-brand-orange-100', 'text-brand-orange-600');
            clickedButton.classList.remove('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');

            // 2. Filtrar os cards de pets
            petCards.forEach(card => {
                const cardCategory = card.dataset.category;
                
                if (filterValue === 'todos' || filterValue === cardCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // --- Funcionalidade do Botão de Favoritar ---
    petGrid.addEventListener('click', function (e) {
        const favoriteButton = e.target.closest('.favorite-btn');
        
        if (favoriteButton) {
            favoriteButton.classList.toggle('favorited');
        }
    });

    // --- Aciona o filtro 'gato' por padrão ao carregar a página ---
    const defaultFilterButton = document.querySelector('button[data-filter="gato"]');
    if (defaultFilterButton) {
        defaultFilterButton.click();
    }

});