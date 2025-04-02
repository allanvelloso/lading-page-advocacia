document.addEventListener('DOMContentLoaded', function() {
    // Selecionar elementos relevantes
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const menu = document.querySelector('.menu');
    
    // Verificar se os elementos existem
    if (!hamburgerIcon || !menu) {
        console.error('Elementos necessários não encontrados');
        return;
    }
    
    // Função para alternar o menu
    function toggleMenu() {
        hamburgerIcon.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Adicionar evento de clique ao ícone do hamburguer
    hamburgerIcon.addEventListener('click', toggleMenu);
    
    // Fechar o menu ao clicar em um item do menu
    const menuItems = menu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Verificar se estamos em modo mobile (menu hamburguer visível)
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
    
    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnHamburger = hamburgerIcon.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && menu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Ajustar o menu ao redimensionar a janela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menu.classList.contains('active')) {
            hamburgerIcon.classList.remove('active');
            menu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});