/**
 * Animações
 * Lidia Zaniboni & Advogados Associados
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animações de entrada
    initEntryAnimations();
    
    // Inicializar animações de scroll
    initScrollAnimations();
    
    // Inicializar animações de números
    initCounterAnimations();
    
    // Adicionar estilos de animação
    addAnimationStyles();
});

function initEntryAnimations() {
    // Animação para o hero usando requestAnimationFrame
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                heroContent.classList.add('animate-in');
            });
        });
    }
    
    // Animação para os cards de serviço usando requestAnimationFrame
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    card.classList.add('animate-in');
                });
            }, index * 150);
        });
    });
}

// Função initHoverAnimations removida pois as animações serão feitas via CSS

function initScrollAnimations() {
    // Elementos para animar no scroll
    const animatedElements = document.querySelectorAll(
        '.sobre-content, .stats-grid, .areas-grid > div, ' +
        '.strategy-item, .advogado-card, .depoimento-card, ' +
        '.reason-card, .contato-container > div'
    );
    
    if (!animatedElements.length) return;
    
    // Verificar se o navegador suporta Intersection Observer
    if ('IntersectionObserver' in window) {
        // Configurar um único observer para todos os elementos
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Usar requestAnimationFrame para sincronizar com o ciclo de renderização
                    requestAnimationFrame(() => {
                        entry.target.classList.add('animate-in');
                    });
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
        // Fallback otimizado para navegadores sem suporte a IntersectionObserver
        let scrollHandler = function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let windowHeight = window.innerHeight;
            
            animatedElements.forEach(element => {
                element.classList.add('pre-animation');
                
                let elementTop = element.getBoundingClientRect().top + scrollTop;
                if (scrollTop + windowHeight > elementTop + 100) {
                    requestAnimationFrame(() => {
                        element.classList.add('animate-in');
                    });
                    
                    // Remover elemento da lista após animar
                    animatedElements = Array.from(animatedElements).filter(el => el !== element);
                    
                    // Remover o listener quando todos os elementos forem animados
                    if (animatedElements.length === 0) {
                        window.removeEventListener('scroll', scrollHandler, { passive: true });
                    }
                }
            });
        };
        
        // Usar passive: true para melhorar performance
        window.addEventListener('scroll', scrollHandler, { passive: true });
        // Executar uma vez para animar elementos já visíveis
        scrollHandler();
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
                
                // Animar até o valor final usando método otimizado
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
    
    let currentValue = 0;
    const startTime = performance.now();
    
    // Usar requestAnimationFrame com throttling para melhor performance
    let lastFrameTime = 0;
    const frameThrottle = 1000 / 30; // Limitar a 30fps para contadores
    
    function updateCounter(currentTime) {
        // Throttle para evitar atualizações muito frequentes
        if (currentTime - lastFrameTime < frameThrottle) {
            requestAnimationFrame(updateCounter);
            return;
        }
        
        lastFrameTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Usar easeOutQuad para suavizar a animação
        const easedProgress = 1 - (1 - progress) * (1 - progress);
        
        currentValue = Math.floor(easedProgress * finalValue);
        
        // Atualizar apenas se o valor mudou
        if (parseInt(element.textContent, 10) !== currentValue) {
            element.textContent = currentValue;
        }
        
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
            will-change: opacity, transform;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Animação de pulse para botões - movida para CSS */
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
        
        /* Animações de hover para cards e botões - movidas para CSS */
        .service-card, .area-card, .reason-card, .strategy-item {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            will-change: transform, box-shadow;
        }
        
        .service-card:hover, .area-card:hover, .reason-card:hover, .strategy-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .btn, .btn-contato {
            transition: transform 0.3s ease;
            will-change: transform;
        }
        
        .btn:hover, .btn-contato:hover {
            animation: pulse 0.6s ease-in-out;
        }
    `;
    
    document.head.appendChild(styleElement);
}