/**
 * Script principal
 * Lidia Zaniboni & Advogados Associados
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos os módulos
    if (typeof Navigation !== 'undefined') Navigation.init();
    if (typeof Testimonials !== 'undefined') Testimonials.init();
    if (typeof Forms !== 'undefined') Forms.init();
    if (typeof Animations !== 'undefined') Animations.init();
    if (typeof WhatsApp !== 'undefined') WhatsApp.init();
    if (typeof CookieConsent !== 'undefined') CookieConsent.init();
    if (typeof ExitIntent !== 'undefined') ExitIntent.init();
    if (typeof Performance !== 'undefined') Performance.init();
    if (typeof GoogleMaps !== 'undefined') GoogleMaps.init();
    if (typeof Accessibility !== 'undefined') Accessibility.init();
});

// Menu toggle para dispositivos móveis
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        menu.classList.remove('active');
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Rolagem suave para links de navegação
implementSmoothScrolling();

// Botão voltar ao topo
createBackToTopButton();

// Validação de formulário
setupFormValidation();

// Automação do carrossel de depoimentos
setupTestimonialCarousel();

// Implementar carregamento preguiçoso para imagens
setupLazyLoading();
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
    
    // Mostrar/ocultar botão com base na posição de rolagem
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Ação de clique no botão
    backToTopBtn.addEventListener('click', function() {
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
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formElements = contactForm.elements;
        
        // Remover mensagens de erro anteriores
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validar cada campo
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            
            if (element.hasAttribute('required') && !element.value.trim()) {
                isValid = false;
                showError(element, 'Este campo é obrigatório');
            } else if (element.type === 'email' && element.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(element.value)) {
                    isValid = false;
                    showError(element, 'Por favor, insira um email válido');
                }
            } else if (element.id === 'telefone' && element.value) {
                const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
                if (!phonePattern.test(element.value)) {
                    isValid = false;
                    showError(element, 'Formato: (99) 99999-9999');
                }
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
    
    // Configurar slides iniciais
    updateSlides();
    
    // Controles manuais
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlides();
    });
    
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlides();
    });
    
    // Automação do carrossel
    let slideInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlides();
    }, 5000);
    
    // Pausar automação ao passar o mouse
    slider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        slideInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlides();
        }, 5000);
    });
    
    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.opacity = '1';
                slide.style.transform = 'translateX(0)';
            } else {
                slide.style.opacity = '0';
                slide.style.transform = index < currentSlide ? 'translateX(-100%)' : 'translateX(100%)';
            }
        });
    }
}

// Configurar carregamento preguiçoso para imagens
function setupLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Navegador suporta lazy loading nativo
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que não suportam
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        imageObserver.unobserve(image);
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
                    lazyImages.forEach(function(img) {
                        if (img.offsetTop < (window.innerHeight + scrollTop)) {
                            img.src = img.dataset.src;
                        }
                    });
                    if (lazyImages.length === 0) {
                        document.removeEventListener('scroll', lazyLoad);
                        window.removeEventListener('resize', lazyLoad);
                        window.removeEventListener('orientationChange', lazyLoad);
                    }
                }, 20);
            }
            
            document.addEventListener('scroll', lazyLoad);
            window.addEventListener('resize', lazyLoad);
            window.addEventListener('orientationChange', lazyLoad);
        }
    }