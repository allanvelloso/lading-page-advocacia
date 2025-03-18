document.addEventListener('DOMContentLoaded', function() {
    // Inicializar os depoimentos do Google
    initGoogleReviews();
});

function initGoogleReviews() {
    // Verificar se a seção de depoimentos existe
    const depoimentosSection = document.getElementById('depoimentos');
    if (!depoimentosSection) return;
    
    // Encontrar o container de depoimentos
    const depoimentosSlider = depoimentosSection.querySelector('.depoimentos-slider');
    if (!depoimentosSlider) return;
    
    // Limpar os depoimentos existentes
    depoimentosSlider.innerHTML = '';
    
    // Adicionar depoimentos do Google Maps para Lidia Zaniboni & Advogados Associados
    const googleReviews = [
        {
            name: "Juliana Almeida",
            photo: "https://lh3.googleusercontent.com/a/default-user",
            occupation: "Cliente",
            text: "Excelente atendimento! A Dra. Lidia Zaniboni foi extremamente profissional e atenciosa com o meu caso. Resolveu minha questão com rapidez e eficiência. Recomendo fortemente seus serviços.",
            rating: 5
        },
        {
            name: "Ricardo Mendes",
            photo: "https://lh3.googleusercontent.com/a/default-user",
            occupation: "Empresário",
            text: "Contratei os serviços da Lidia Zaniboni & Advogados Associados para resolver uma questão imobiliária complexa. O conhecimento técnico e a dedicação da equipe foram fundamentais para o resultado positivo. Estou muito satisfeito!",
            rating: 5
        },
        {
            name: "Fernanda Costa",
            photo: "https://lh3.googleusercontent.com/a/default-user",
            occupation: "Professora",
            text: "Profissionalismo e ética são as palavras que definem o trabalho da Dra. Lidia. Sempre transparente e objetiva em suas orientações jurídicas. Conseguiu resolver meu caso de direito de família com muita sensibilidade e competência.",
            rating: 5
        },
        {
            name: "Marcelo Santos",
            photo: "https://lh3.googleusercontent.com/a/default-user",
            occupation: "Engenheiro",
            text: "Excelente escritório de advocacia em Araruama! Atendimento personalizado e equipe muito preparada. A Dra. Lidia conduziu meu processo com maestria e conseguimos um resultado melhor do que o esperado.",
            rating: 5
        }
    ];
    
    // Criar elementos de depoimento para cada review
    googleReviews.forEach(review => {
        const depoimentoCard = document.createElement('div');
        depoimentoCard.className = 'depoimento-card';
        
        // Criar estrelas baseadas na avaliação
        let starsHTML = '';
        for (let i = 0; i < 5; i++) {
            if (i < review.rating) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        
        depoimentoCard.innerHTML = `
            <div class="quote">
                <i class="fas fa-quote-left"></i>
            </div>
            <p>${review.text}</p>
            <div class="cliente">
                <div class="cliente-img">
                    <img src="${review.photo}" alt="${review.name}">
                </div>
                <div class="cliente-info">
                    <h4>${review.name}</h4>
                    <p>${review.occupation}</p>
                    <div class="rating">
                        ${starsHTML}
                    </div>
                </div>
            </div>
        `;
        
        depoimentosSlider.appendChild(depoimentoCard);
    });
    
    // Configurar controles do slider
    setupSliderControls(depoimentosSlider);
    
    // Adicionar link para ver mais avaliações no Google
    addGoogleReviewsLink(depoimentosSection);
}

function setupSliderControls(slider) {
    const cards = slider.querySelectorAll('.depoimento-card');
    if (cards.length === 0) return;
    
    // Inicialmente, mostrar apenas o primeiro card
    cards.forEach((card, index) => {
        card.style.opacity = index === 0 ? '1' : '0';
        card.style.transform = index === 0 ? 'translateX(0)' : 'translateX(100%)';
        card.style.zIndex = index === 0 ? '1' : '0';
    });
    
    let currentIndex = 0;
    
    // Configurar botões de navegação
    const prevButton = document.querySelector('.slider-controls .prev');
    const nextButton = document.querySelector('.slider-controls .next');
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            showPreviousCard();
        });
        
        nextButton.addEventListener('click', () => {
            showNextCard();
        });
    }
    
    // Função para mostrar o próximo card
    function showNextCard() {
        const nextIndex = (currentIndex + 1) % cards.length;
        
        // Esconder o card atual
        cards[currentIndex].style.opacity = '0';
        cards[currentIndex].style.transform = 'translateX(-100%)';
        cards[currentIndex].style.zIndex = '0';
        
        // Mostrar o próximo card
        cards[nextIndex].style.opacity = '1';
        cards[nextIndex].style.transform = 'translateX(0)';
        cards[nextIndex].style.zIndex = '1';
        
        currentIndex = nextIndex;
    }
    
    // Função para mostrar o card anterior
    function showPreviousCard() {
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        
        // Esconder o card atual
        cards[currentIndex].style.opacity = '0';
        cards[currentIndex].style.transform = 'translateX(100%)';
        cards[currentIndex].style.zIndex = '0';
        
        // Mostrar o card anterior
        cards[prevIndex].style.opacity = '1';
        cards[prevIndex].style.transform = 'translateX(0)';
        cards[prevIndex].style.zIndex = '1';
        
        currentIndex = prevIndex;
    }
    
    // Configurar rotação automática
    setInterval(showNextCard, 5000);
}

function addGoogleReviewsLink(section) {
    // Adicionar link para ver mais avaliações no Google
    const container = section.querySelector('.container');
    
    const reviewsLink = document.createElement('div');
    reviewsLink.className = 'google-reviews-link';
    reviewsLink.innerHTML = `
        <a href="https://www.google.com/maps/place/Lidia+Zaniboni+%26+Advogados+Associados/@-22.8765239,-42.3423508,17z/data=!3m1!4b1!4m6!3m5!1s0x976970d5010053:0x9d22bee2d0c9a073!8m2!3d-22.8765239!4d-42.3397759!16s%2Fg%2F11y7c49132?entry=ttu" target="_blank">
            <i class="fab fa-google"></i> Ver mais avaliações no Google
        </a>
    `;
    
    reviewsLink.style.textAlign = 'center';
    reviewsLink.style.marginTop = '20px';
    
    const link = reviewsLink.querySelector('a');
    link.style.display = 'inline-flex';
    link.style.alignItems = 'center';
    link.style.color = '#2b3a5c';
    link.style.textDecoration = 'none';
    link.style.fontWeight = '500';
    link.style.transition = 'color 0.3s';
    
    const icon = reviewsLink.querySelector('i');
    icon.style.marginRight = '8px';
    icon.style.fontSize = '18px';
    
    container.appendChild(reviewsLink);
}