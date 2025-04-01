document.addEventListener('DOMContentLoaded', function() {
    // Adicionar mapa na seção de contato
    addGoogleMap();
});

function addGoogleMap() {
    // Verificar se a seção de contato existe
    const contatoSection = document.getElementById('contato');
    if (!contatoSection) return;
    
    // Função auxiliar para criar elementos com atributos e estilos
    function createElement(tag, attributes = {}, styles = {}) {
        const element = document.createElement(tag);
        
        // Aplicar atributos
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'textContent') {
                element.textContent = value;
            } else {
                element[key] = value;
            }
        });
        
        // Aplicar estilos
        Object.entries(styles).forEach(([key, value]) => {
            element.style[key] = value;
        });
        
        return element;
    }
    
    // Criar título para o mapa
    const mapTitle = createElement('h4', 
        { textContent: 'Nossa Localização' },
        { marginTop: '20px', marginBottom: '10px' }
    );
    
    // Criar container para o mapa
    const mapContainer = createElement('div', 
        { id: 'map-container' },
        { 
            width: '100%', 
            height: '300px', 
            marginTop: '30px', 
            borderRadius: '8px', 
            overflow: 'hidden' 
        }
    );
    
    // Criar iframe com Google Maps
    const iframe = createElement('iframe', 
        {
            width: '100%',
            height: '100%',
            frameBorder: '0',
            scrolling: 'no',
            marginHeight: '0',
            marginWidth: '0',
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3494.1128979290525!2d-42.3397759!3d-22.8765239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x976970d5010053%3A0x9d22bee2d0c9a073!2sLidia%20Zaniboni%20%26%20Advogados%20Associados!5e1!3m2!1spt-PT!2sbr!4v1742328246696!5m2!1spt-PT!2sbr",
            allowFullscreen: true,
            loading: 'lazy',
            referrerPolicy: 'no-referrer-when-downgrade'
        },
        { border: 'none' }
    );
    
    // Criar link para visualização em tela cheia
    const viewLink = createElement('a', 
        {
            href: "https://www.google.com/maps/place/Lidia+Zaniboni+%26+Advogados+Associados/@-22.8765239,-42.3397759,17z/",
            target: '_blank',
            textContent: 'Ver no Google Maps'
        },
        {
            display: 'block',
            textAlign: 'right',
            marginTop: '5px',
            fontSize: '14px',
            color: '#2b3a5c'
        }
    );
    
    // Adicionar iframe ao container
    mapContainer.appendChild(iframe);
    
    // Encontrar onde inserir o mapa e adicionar os elementos
    const contatoInfo = contatoSection.querySelector('.contato-info');
    const container = contatoInfo || contatoSection.querySelector('.container');
    
    if (container) {
        container.appendChild(mapTitle);
        container.appendChild(mapContainer);
        container.appendChild(viewLink);
    }
}
    