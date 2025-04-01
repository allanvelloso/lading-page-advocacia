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
    } else if ('IntersectionObserver' in window) {
        // Fallback para navegadores que não suportam lazy loading nativo
        const lazyImages = document.querySelectorAll('img:not([src^="data:"])');
        
        // Criar um único observer para todas as imagens
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    
                    // Processar a imagem apenas uma vez
                    if (image.src && !image.dataset.src) {
                        // Armazenar o src original e usar placeholder
                        image.dataset.src = image.src;
                        image.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                    } else if (image.dataset.src) {
                        // Carregar a imagem real
                        image.src = image.dataset.src;
                        image.removeAttribute('data-src');
                    }
                    
                    // Parar de observar após processar
                    observer.unobserve(image);
                }
            });
        });
        
        // Observar todas as imagens de uma vez
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
    // Caso não haja suporte para IntersectionObserver, as imagens carregarão normalmente
}

function optimizeResourceLoading() {
    // Criar fragmentos para minimizar manipulações do DOM
    const headFragment = document.createDocumentFragment();
    
    // Adicionar preconnect para recursos externos
    const preconnectUrls = [
        'https://cdnjs.cloudflare.com',
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ];
    
    // Adicionar prefetch para páginas comuns
    const prefetchUrls = [
        'contato.html',
        'sobre.html'
    ];
    
    // Criar todos os elementos link em um único fragmento
    preconnectUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = 'anonymous';
        headFragment.appendChild(link);
    });
    
    prefetchUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        headFragment.appendChild(link);
    });
    
    // Adicionar todos os links ao head de uma só vez
    document.head.appendChild(headFragment);
}