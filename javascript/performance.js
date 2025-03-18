document.addEventListener('DOMContentLoaded', function() {
    // Implementar lazy loading para imagens
    setupLazyLoading();
    
    // Otimizar carregamento de recursos
    optimizeResourceLoading();
});

function setupLazyLoading() {
    // Verificar se o navegador suporta lazy loading nativo
    if ('loading' in HTMLImageElement.prototype) {
        // Aplicar lazy loading nativo a todas as imagens
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback para navegadores que não suportam lazy loading nativo
        const lazyImages = document.querySelectorAll('img:not([src^="data:"])');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        // Armazenar o src original em data-src
                        if (!image.dataset.src && image.src) {
                            image.dataset.src = image.src;
                            // Usar uma imagem de placeholder até que a imagem seja carregada
                            image.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                        }
                        
                        // Quando a imagem estiver visível, carregar a imagem real
                        if (image.dataset.src) {
                            image.src = image.dataset.src;
                            image.removeAttribute('data-src');
                        }
                        
                        imageObserver.unobserve(image);
                    }
                });
            });
            
            lazyImages.forEach(image => {
                imageObserver.observe(image);
            });
        }
    }
}

function optimizeResourceLoading() {
    // Adicionar preconnect para recursos externos
    const preconnectUrls = [
        'https://cdnjs.cloudflare.com',
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ];
    
    preconnectUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
    
    // Adicionar prefetch para páginas comuns
    const prefetchUrls = [
        'contato.html',
        'sobre.html'
    ];
    
    prefetchUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    });
}