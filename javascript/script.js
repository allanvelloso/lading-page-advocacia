/**
 * Script principal
 * Lidia Zaniboni & Advogados Associados
 */

// Função para controlar o efeito de scroll no navbar
function handleNavbarScroll() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Função auxiliar para inicializar módulos com segurança
function initializeModule(moduleName, moduleObject) {
    try {
        if (typeof moduleObject !== 'undefined') {
            moduleObject.init();
            console.log(`Módulo ${moduleName} inicializado com sucesso`);
        }
    } catch (error) {
        console.error(`Erro ao inicializar módulo ${moduleName}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Adicionar evento de scroll para o navbar
    window.addEventListener('scroll', handleNavbarScroll);
    // Chamar a função uma vez para verificar a posição inicial
    handleNavbarScroll();

    // Inicializar todos os módulos com tratamento de erros
    const modules = {
        'Navigation': Navigation,
        'Testimonials': Testimonials,
        'Forms': Forms,
        'Animations': Animations,
        'WhatsApp': WhatsApp,
        'CookieConsent': CookieConsent,
        'ExitIntent': ExitIntent,
        'Performance': Performance,
        'GoogleMaps': GoogleMaps,
        'Accessibility': Accessibility
    };
    
    // Inicializar módulos usando um loop
    Object.entries(modules).forEach(([name, module]) => {
        initializeModule(name, module);
    });

    // Inicializar funcionalidades com tratamento de erros
    const features = [
        { name: 'rolagem suave', fn: implementSmoothScrolling },
        { name: 'botão voltar ao topo', fn: createBackToTopButton },
        { name: 'validação de formulário', fn: setupFormValidation },
        { name: 'carrossel de depoimentos', fn: setupTestimonialCarousel },
        { name: 'carregamento preguiçoso', fn: setupLazyLoading }
    ];
    
    features.forEach(feature => {
        try {
            feature.fn();
        } catch (error) {
            console.error(`Erro ao configurar ${feature.name}:`, error);
        }
    });
});

// Implementação de rolagem suave
function implementSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Criar botão voltar ao topo
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.display = 'none';
    document.body.appendChild(backToTopBtn);
    
    // Função única para atualizar visibilidade do botão
    const updateButtonVisibility = () => {
        backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    };
    
    // Mostrar/ocultar botão com base na posição de rolagem
    window.addEventListener('scroll', updateButtonVisibility);
    
    // Ação de clique no botão
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Configurar validação de formulário
function setupFormValidation() {
    const contactForm = document.getElementById('form-contato');
    if (!contactForm) return;
    
    // Validadores específicos para cada tipo de campo
    const validators = {
        email: (value) => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(value) ? '' : 'Por favor, insira um email válido';
        },
        telefone: (value) => {
            const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
            return phonePattern.test(value) ? '' : 'Formato: (99) 99999-9999';
        },
        required: (value) => {
            return value.trim() ? '' : 'Este campo é obrigatório';
        }
    };
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formElements = contactForm.elements;
        
        // Remover mensagens de erro anteriores
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validar cada campo
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            let errorMessage = '';
            
            // Verificar campo obrigatório
            if (element.hasAttribute('required') && !element.value.trim()) {
                errorMessage = validators.required(element.value);
                isValid = false;
            } 
            // Verificar email
            else if (element.type === 'email' && element.value) {
                errorMessage = validators.email(element.value);
                if (errorMessage) isValid = false;
            } 
            // Verificar telefone
            else if (element.id === 'telefone' && element.value) {
                errorMessage = validators.telefone(element.value);
                if (errorMessage) isValid = false;
            }
            
            if (errorMessage) {
                showError(element, errorMessage);
            }
        }
        
        if (isValid) {
            // Aqui você pode adicionar o código para enviar o formulário
            alert('Formulário enviado com sucesso!');
            contactForm.reset();
        }
    });
    
    // Máscara para o campo de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = '(' + value;
                if (value.length > 3) {
                    value = value.substring(0, 3) + ') ' + value.substring(3);
                }
                if (value.length > 10) {
                    value = value.substring(0, 10) + '-' + value.substring(10, 14);
                }
            }
            e.target.value = value;
        });
    }
}

// Função auxiliar para mostrar mensagens de erro
function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    
    element.parentNode.appendChild(errorDiv);
    element.style.borderColor = 'red';
    
    element.addEventListener('input', function() {
        errorDiv.remove();
        element.style.borderColor = '';
    }, { once: true });
}

// Configurar carrossel de depoimentos
function setupTestimonialCarousel() {
    const slider = document.querySelector('.depoimentos-slider');
    const prevBtn = document.querySelector('.slider-controls .prev');
    const nextBtn = document.querySelector('.slider-controls .next');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    const slides = slider.querySelectorAll('.depoimento-card');
    const totalSlides = slides.length;
    let slideInterval;
    
    // Função para atualizar slides
    function updateSlides() {
        slides.forEach((slide, index) => {
            const isActive = index === currentSlide;
            slide.style.opacity = isActive ? '1' : '0';
            slide.style.transform = isActive ? 'translateX(0)' : 
                                    (index < currentSlide ? 'translateX(-100%)' : 'translateX(100%)');
        });
    }
    
    // Função para avançar para o próximo slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlides();
    }
    
    // Função para voltar ao slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlides();
    }
    
    // Função para iniciar o intervalo automático
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Função para parar o intervalo automático
    function stopInterval() {
        clearInterval(slideInterval);
    }
    
    // Configurar slides iniciais
    updateSlides();
    
    // Controles manuais
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Automação do carrossel
    startInterval();
    
    // Pausar automação ao passar o mouse
    slider.addEventListener('mouseenter', stopInterval);
    slider.addEventListener('mouseleave', startInterval);
}

// Configurar carregamento preguiçoso para imagens
function setupLazyLoading() {
    const hasNativeLazyLoad = 'loading' in HTMLImageElement.prototype;
    const hasIntersectionObserver = 'IntersectionObserver' in window;
    
    // Selecionar todas as imagens com atributo data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (!lazyImages.length) return;
    
    if (hasNativeLazyLoad) {
        // Navegador suporta lazy loading nativo
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.loading = 'lazy';
        });
    } else if (hasIntersectionObserver) {
        // Usar IntersectionObserver como fallback
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    observer.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Fallback para navegadores sem suporte a IntersectionObserver
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset;
                const viewportHeight = window.innerHeight;
                
                // Verificar cada imagem apenas uma vez
                Array.from(lazyImages).forEach(function(img) {
                    if (img.offsetTop < (viewportHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        // Remover da lista após carregar
                        lazyImages.splice(lazyImages.indexOf(img), 1);
                    }
                });
                
                // Remover listeners quando todas as imagens forem carregadas
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        }
        
        // Adicionar eventos para verificar imagens
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
        
        // Verificar imagens inicialmente visíveis
        lazyLoad();
    }
}