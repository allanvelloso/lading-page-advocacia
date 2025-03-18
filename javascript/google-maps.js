document.addEventListener('DOMContentLoaded', function() {
    // Adicionar mapa na seção de contato
    addGoogleMap();
});

function addGoogleMap() {
    // Verificar se a seção de contato existe
    const contatoSection = document.getElementById('contato');
    if (!contatoSection) return;
    
    // Criar container para o mapa
    const mapContainer = document.createElement('div');
    mapContainer.id = 'map-container';
    mapContainer.style.width = '100%';
    mapContainer.style.height = '300px';
    mapContainer.style.marginTop = '30px';
    mapContainer.style.borderRadius = '8px';
    mapContainer.style.overflow = 'hidden';
    
    // Encontrar onde inserir o mapa (após as informações de contato)
    const contatoInfo = contatoSection.querySelector('.contato-info');
    if (contatoInfo) {
        contatoInfo.appendChild(mapContainer);
    } else {
        // Fallback: adicionar ao final da seção de contato
        const container = contatoSection.querySelector('.container');
        if (container) {
            container.appendChild(mapContainer);
        }
    }
    
    // Carregar o mapa usando uma solução alternativa (sem API key)
    loadStaticMap();
    
    function loadStaticMap() {
        // Criar iframe com Google Maps usando o código de incorporação fornecido
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.scrolling = 'no';
        iframe.marginHeight = '0';
        iframe.marginWidth = '0';
        iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3494.1128979290525!2d-42.3397759!3d-22.8765239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x976970d5010053%3A0x9d22bee2d0c9a073!2sLidia%20Zaniboni%20%26%20Advogados%20Associados!5e1!3m2!1spt-PT!2sbr!4v1742328246696!5m2!1spt-PT!2sbr";
        iframe.style.border = 'none';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
        
        // Adicionar iframe ao container
        mapContainer.appendChild(iframe);
        
        // Adicionar link para visualização em tela cheia
        const viewLink = document.createElement('a');
        viewLink.href = "https://www.google.com/maps/place/Lidia+Zaniboni+%26+Advogados+Associados/@-22.8765239,-42.3397759,17z/";
        viewLink.target = '_blank';
        viewLink.textContent = 'Ver no Google Maps';
        viewLink.style.display = 'block';
        viewLink.style.textAlign = 'right';
        viewLink.style.marginTop = '5px';
        viewLink.style.fontSize = '14px';
        viewLink.style.color = '#2b3a5c';
        
        mapContainer.after(viewLink);
        
        // Adicionar título para o mapa
        const mapTitle = document.createElement('h4');
        mapTitle.textContent = 'Nossa Localização';
        mapTitle.style.marginTop = '20px';
        mapTitle.style.marginBottom = '10px';
        
        mapContainer.before(mapTitle);
    }
}
    