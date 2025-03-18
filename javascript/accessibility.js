document.addEventListener('DOMContentLoaded', function() {
    // Adicionar atributos ARIA para melhorar a acessibilidade
    enhanceAccessibility();
    
    // Adicionar navegação por teclado
    setupKeyboardNavigation();
});

function enhanceAccessibility() {
    // Adicionar roles e atributos ARIA para elementos importantes
    const header = document.querySelector('header');
    if (header) {
        header.setAttribute('role', 'banner');
    }
    
    const nav = document.querySelector('nav');
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Menu principal');
    }
    
    const main = document.querySelector('main') || document.body;
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (section.id) {
            section.setAttribute('aria-labelledby', `heading-${section.id}`);
        }
        
        const headings = section.querySelectorAll('h1, h2, h3');
        headings.forEach(heading => {
            if (section.id && heading.textContent) {
                heading.id = `heading-${section.id}`;
            }
        });
    });
    
    // Melhorar acessibilidade de formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                if (!input.id) {
                    input.id = `${input.name}-field`;
                }
                label.setAttribute('for', input.id);
            }
            
            // Adicionar mensagens de erro acessíveis
            input.addEventListener('invalid', function() {
                let errorMessage;
                if (this.validity.valueMissing) {
                    errorMessage = 'Este campo é obrigatório';
                } else if (this.validity.typeMismatch) {
                    errorMessage = 'Por favor, insira um valor válido';
                }
                
                if (errorMessage) {
                    this.setAttribute('aria-invalid', 'true');
                    
                    // Verificar se já existe uma mensagem de erro
                    let errorElement = this.nextElementSibling;
                    if (!errorElement || !errorElement.classList.contains('error-message')) {
                        errorElement = document.createElement('div');
                        errorElement.className = 'error-message';
                        errorElement.setAttribute('role', 'alert');
                        this.parentNode.insertBefore(errorElement, this.nextSibling);
                    }
                    
                    errorElement.textContent = errorMessage;
                }
            });
            
            // Limpar mensagens de erro quando o usuário começa a digitar
            input.addEventListener('input', function() {
                this.removeAttribute('aria-invalid');
                const errorElement = this.nextElementSibling;
                if (errorElement && errorElement.classList.contains('error-message')) {
                    errorElement.textContent = '';
                }
            });
        });
    });
}

function setupKeyboardNavigation() {
    // Melhorar navegação por teclado para o menu
    const menuItems = document.querySelectorAll('.menu li a');
    menuItems.forEach((item, index) => {
        item.addEventListener('keydown', function(e) {
            // Teclas de seta para navegar entre itens do menu
            if (e.key === 'ArrowRight' && index < menuItems.length - 1) {
                e.preventDefault();
                menuItems[index + 1].focus();
            } else if (e.key === 'ArrowLeft' && index > 0) {
                e.preventDefault();
                menuItems[index - 1].focus();
            }
        });
    });
    
    // Adicionar skip link para acessibilidade
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '0';
    skipLink.style.padding = '8px';
    skipLink.style.zIndex = '100';
    skipLink.style.backgroundColor = '#fff';
    skipLink.style.transition = 'top 0.3s ease';
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Adicionar id para o conteúdo principal
    const mainContent = document.querySelector('section:first-of-type');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}