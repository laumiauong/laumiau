function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function setActiveNav(selectedPage) {
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.page === selectedPage) {
            link.classList.add('active');
            link.classList.remove('text-gray-500', 'hover:border-gray-300', 'hover:text-gray-700');
            if (link.parentElement.parentElement.id === 'admin-nav') {
                 link.classList.add('border-primary', 'text-primary');
                 link.classList.remove('border-transparent');
            } else {
                 link.classList.add('text-primary', 'bg-primary/10');
            }
        } else {
            link.classList.remove('active', 'text-primary', 'bg-primary/10');
            link.classList.add('text-gray-500', 'hover:border-gray-300', 'hover:text-gray-700');
            if (link.parentElement.parentElement.id === 'admin-nav') {
                link.classList.add('border-transparent');
                link.classList.remove('border-primary');
            }
        }
    });
    console.log(`Página atual: ${selectedPage}`);
}

window.onload = () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.currentTarget.dataset.page;
            setActiveNav(page);
            if (!document.getElementById('mobile-menu').classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });

    setActiveNav('dashboard');
};
