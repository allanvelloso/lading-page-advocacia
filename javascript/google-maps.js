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
        // Coordenadas da Av. Paulista, 1000 (exemplo)
        const lat = -23.5632;
        const lng = -46.6544;
        
        // Criar iframe com OpenStreetMap (não requer API key)
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.scrolling = 'no';
        iframe.marginHeight = '0';
        iframe.marginWidth = '0';
        iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.005},${lat-0.005},${lng+0.005},${lat+0.005}&layer=mapnik&marker=${lat},${lng}`;
        iframe.style.border = 'none';
        
        // Adicionar iframe ao container
        mapContainer.appendChild(iframe);
        
        // Adicionar link para visualização em tela cheia
        const viewLink = document.createElement('a');
        viewLink.href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;
        viewLink.target = '_blank';
        viewLink.textContent = 'Ver mapa ampliado';
        viewLink.style.display = 'block';
        viewLink.style.textAlign = 'right';
        viewLink.style.marginTop = '5px';
        viewLink.style.fontSize = '14px';
        viewLink.style.color = '#25d366';
        
        mapContainer.after(viewLink);
        
        // Adicionar título para o mapa
        const mapTitle = document.createElement('h4');
        mapTitle.textContent = 'Nossa Localização';
        mapTitle.style.marginTop = '20px';
        mapTitle.style.marginBottom = '10px';
        
        mapContainer.before(mapTitle);
    }
}
    