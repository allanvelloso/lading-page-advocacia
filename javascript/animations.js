/**
 * Animações
 * Lidia Zaniboni & Advogados Associados
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animações de entrada
    initEntryAnimations();
    
    // Inicializar animações de hover
    initHoverAnimations();
    
    // Inicializar animações de scroll
    initScrollAnimations();
    
    // Inicializar animações de números
    initCounterAnimations();
});

function initEntryAnimations() {
    // Animação para o hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('animate-in');
        }, 300);
    }
    
    // Animação para os cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, 500 + (index * 200));
    });
}

function initHoverAnimations() {
    // Adicionar animações de hover para cards
    const cards = document.querySelectorAll('.service-card, .area-card, .reason-card, .strategy-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
    
    // Adicionar animações para botões
    const buttons = document.querySelectorAll('.btn, .btn-contato');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });
}

function initScrollAnimations() {
    // Verificar se o navegador suporta Intersection Observer
    if ('IntersectionObserver' in window) {
        // Elementos para animar no scroll
        const animatedElements = document.querySelectorAll(
            '.sobre-content, .stats-grid, .areas-grid > div, ' +
            '.strategy-item, .advogado-card, .depoimento-card, ' +
            '.reason-card, .contato-container > div'
        );
        
        // Configurar o observer
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observar elementos
        animatedElements.forEach(element => {
            element.classList.add('pre-animation');
            animationObserver.observe(element);
        });
    } else {
        // Fallback para navegadores sem suporte a IntersectionObserver
        document.querySelectorAll('.pre-animation').forEach(element => {
            element.classList.remove('pre-animation');
            element.classList.add('animate-in');
        });
    }
}

function initCounterAnimations() {
    // Animar os números nas estatísticas
    const statItems = document.querySelectorAll('.stat-item h3');
    
    if (!statItems.length) return;
    
    // Usar Intersection Observer para iniciar a animação quando visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent, 10);
                
                // Armazenar o valor final como atributo
                target.setAttribute('data-final', finalValue);
                
                // Iniciar a contagem a partir de zero
                target.textContent = '0';
                
                // Animar até o valor final
                animateCounter(target, finalValue);
                
                // Parar de observar após iniciar a animação
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observar cada item de estatística
    statItems.forEach(item => {
        observer.observe(item);
    });
}

function animateCounter(element, finalValue) {
    // Determinar a duração com base no valor final
    const duration = Math.min(2000, Math.max(1000, finalValue * 10));
    
    // Determinar o incremento com base no valor final
    const increment = finalValue > 100 ? 5 : 1;
    
    let currentValue = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Usar easeOutQuad para suavizar a animação
        const easedProgress = 1 - (1 - progress) * (1 - progress);
        
        currentValue = Math.floor(easedProgress * finalValue);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Garantir que o valor final seja exato
            element.textContent = finalValue;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Adicionar estilos CSS para as animações
function addAnimationStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Animações de entrada */
        .pre-animation {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Animação de pulse para botões */
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .pulse {
            animation: pulse 0.6s ease-in-out;
        }
        
        /* Animação de hover para cards */
        .hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Adicionar estilos de animação
addAnimationStyles();