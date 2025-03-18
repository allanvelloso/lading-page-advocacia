document.addEventListener('DOMContentLoaded', function() {
    // Configurar animações na rolagem
    setupScrollAnimations();
});

function setupScrollAnimations() {
    // Elementos que serão animados
    const animatedElements = document.querySelectorAll(
        '.hero-content, .service-card, .sobre-content, .stats-item, ' +
        '.areas-grid > div, .advogado-card, .depoimento-card, ' +
        '.contato-container > div, .strategy-item'
    );
    
    // Verificar suporte a IntersectionObserver
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adicionar classe para animar o elemento
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, 150);
                    
                    // Parar de observar após animar
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Adicionar classe inicial e observar elementos
        animatedElements.forEach(element => {
            element.classList.add('pre-animation');
            animationObserver.observe(element);
        });
    } else {
        // Fallback para navegadores sem suporte a IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animate-in');
        });
    }
    
    // Adicionar estilos CSS para animações
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .pre-animation {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        @media (prefers-reduced-motion: reduce) {
            .pre-animation {
                transition: none;
                opacity: 1;
                transform: none;
            }
        }
    `;
    document.head.appendChild(styleElement);
}