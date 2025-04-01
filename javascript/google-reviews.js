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
    
    // Criar elementos de depoimento para cada review usando DocumentFragment
    const fragment = document.createDocumentFragment();
    
    googleReviews.forEach(review => {
        const depoimentoCard = createReviewCard(review);
        fragment.appendChild(depoimentoCard);
    });
    
    // Adicionar todos os cards ao DOM de uma vez
    depoimentosSlider.appendChild(fragment);
    
    // Configurar controles do slider
    setupSliderControls(depoimentosSlider);
    
    // Adicionar link para ver mais avaliações no Google
    addGoogleReviewsLink(depoimentosSection);
}

// Função auxiliar para criar um card de depoimento
function createReviewCard(review) {
    const depoimentoCard = document.createElement('div');
    depoimentoCard.className = 'depoimento-card';
    
    // Criar estrelas baseadas na avaliação
    const starsHTML = Array(5).fill('').map((_, i) => 
        `<i class="fa${i < review.rating ? 's' : 'r'} fa-star"></i>`
    ).join('');
    
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
    
    return depoimentoCard;
}

function setupSliderControls(slider) {
    const cards = slider.querySelectorAll('.depoimento-card');
    if (cards.length === 0) return;
    
    // Inicialmente, mostrar apenas o primeiro card
    cards.forEach((card, index) => {
        const isActive = index === 0;
        setCardVisibility(card, isActive, isActive ? 0 : 100);
    });
    
    let currentIndex = 0;
    
    // Configurar botões de navegação
    const prevButton = document.querySelector('.slider-controls .prev');
    const nextButton = document.querySelector('.slider-controls .next');
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', showPreviousCard);
        nextButton.addEventListener('click', showNextCard);
    }
    
    // Função para mostrar o próximo card
    function showNextCard() {
        const nextIndex = (currentIndex + 1) % cards.length;
        
        // Esconder o card atual
        setCardVisibility(cards[currentIndex], false, -100);
        
        // Mostrar o próximo card
        setCardVisibility(cards[nextIndex], true, 0);
        
        currentIndex = nextIndex;
    }
    
    // Função para mostrar o card anterior
    function showPreviousCard() {
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        
        // Esconder o card atual
        setCardVisibility(cards[currentIndex], false, 100);
        
        // Mostrar o card anterior
        setCardVisibility(cards[prevIndex], true, 0);
        
        currentIndex = prevIndex;
    }
    
    // Função auxiliar para definir a visibilidade do card
    function setCardVisibility(card, isVisible, translateX) {
        card.style.opacity = isVisible ? '1' : '0';
        card.style.transform = `translateX(${translateX}%)`;
        card.style.zIndex = isVisible ? '1' : '0';
    }
    
    // Configurar rotação automática
    setInterval(showNextCard, 5000);
}

function addGoogleReviewsLink(section) {
    // Adicionar link para ver mais avaliações no Google
    const container = section.querySelector('.container');
    if (!container) return;
    
    const reviewsLink = document.createElement('div');
    reviewsLink.className = 'google-reviews-link';
    
    // Definir o HTML e estilos em uma única operação
    reviewsLink.innerHTML = `
        <a href="https://www.google.com/maps/place/Lidia+Zaniboni+%26+Advogados+Associados/@-22.8765239,-42.3423508,17z/data=!3m1!4b1!4m6!3m5!1s0x976970d5010053:0x9d22bee2d0c9a073!8m2!3d-22.8765239!4d-42.3397759!16s%2Fg%2F11y7c49132?entry=ttu" target="_blank">
            <i class="fab fa-google"></i> Ver mais avaliações no Google
        </a>
    `;
    
    // Aplicar estilos
    Object.assign(reviewsLink.style, {
        textAlign: 'center',
        marginTop: '20px'
    });
    
    const link = reviewsLink.querySelector('a');
    Object.assign(link.style, {
        display: 'inline-flex',
        alignItems: 'center',
        color: '#2b3a5c',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'color 0.3s'
    });
    
    const icon = reviewsLink.querySelector('i');
    Object.assign(icon.style, {
        marginRight: '8px',
        fontSize: '18px'
    });
    
    container.appendChild(reviewsLink);
}