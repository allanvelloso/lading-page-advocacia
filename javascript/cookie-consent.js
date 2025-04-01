document.addEventListener('DOMContentLoaded', initCookieConsent);

// Função principal de inicialização
function initCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        createCookieConsentBanner();
    }
}

// Funções de criação de elementos
function createCookieConsentBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa <a href="#">Política de Privacidade</a>.</p>
            <div class="cookie-buttons">
                <button class="cookie-accept">Aceitar</button>
                <button class="cookie-settings">Configurações</button>
            </div>
        </div>
    `;
    
    applyBannerStyles(banner);
    document.body.appendChild(banner);
    
    // Adicionar eventos
    setupBannerEvents(banner);
}

function showCookieSettings() {
    const modal = document.createElement('div');
    modal.className = 'cookie-settings-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Configurações de Cookies</h3>
                <button class="close-modal" aria-label="Fechar">&times;</button>
            </div>
            <div class="modal-body">
                <div class="cookie-option">
                    <label>
                        <input type="checkbox" name="essential" checked disabled>
                        <span>Cookies Essenciais</span>
                    </label>
                    <p>Necessários para o funcionamento básico do site. Não podem ser desativados.</p>
                </div>
                <div class="cookie-option">
                    <label>
                        <input type="checkbox" name="analytics" checked>
                        <span>Cookies Analíticos</span>
                    </label>
                    <p>Nos ajudam a entender como os visitantes interagem com o site.</p>
                </div>
                <div class="cookie-option">
                    <label>
                        <input type="checkbox" name="marketing" checked>
                        <span>Cookies de Marketing</span>
                    </label>
                    <p>Utilizados para exibir anúncios relevantes com base em seus interesses.</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="save-preferences">Salvar Preferências</button>
            </div>
        </div>
    `;
    
    applyModalStyles(modal);
    document.body.appendChild(modal);
    
    // Adicionar eventos
    setupModalEvents(modal);
}

// Funções de aplicação de estilos
function applyBannerStyles(banner) {
    // Estilos do banner
    applyStyles(banner, {
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',
        padding: '15px',
        backgroundColor: '#f8f8f8',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    });
    
    // Estilos do conteúdo
    const cookieContent = banner.querySelector('.cookie-content');
    applyStyles(cookieContent, {
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px'
    });
    
    // Estilos dos botões
    const cookieButtons = banner.querySelector('.cookie-buttons');
    applyStyles(cookieButtons, {
        display: 'flex',
        gap: '10px',
        marginTop: '10px'
    });
    
    // Estilos comuns para todos os botões
    const buttons = banner.querySelectorAll('button');
    buttons.forEach(button => {
        applyStyles(button, {
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
        });
    });
    
    // Estilos específicos para cada botão
    const acceptButton = banner.querySelector('.cookie-accept');
    applyStyles(acceptButton, {
        backgroundColor: '#25d366',
        color: 'white'
    });
    
    const settingsButton = banner.querySelector('.cookie-settings');
    applyStyles(settingsButton, {
        backgroundColor: '#f1f1f1',
        color: '#333'
    });
    
    // Inicializar responsividade
    window.addEventListener('resize', () => adjustForMobile(cookieContent, cookieButtons));
    adjustForMobile(cookieContent, cookieButtons);
}

function applyModalStyles(modal) {
    // Estilos do modal
    applyStyles(modal, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1001'
    });
    
    // Estilos do conteúdo do modal
    const modalContent = modal.querySelector('.modal-content');
    applyStyles(modalContent, {
        backgroundColor: 'white',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto'
    });
    
    // Estilos do cabeçalho do modal
    const modalHeader = modal.querySelector('.modal-header');
    applyStyles(modalHeader, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        borderBottom: '1px solid #eee'
    });
    
    // Estilos do botão de fechar
    const closeButton = modal.querySelector('.close-modal');
    applyStyles(closeButton, {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer'
    });
    
    // Estilos do corpo do modal
    const modalBody = modal.querySelector('.modal-body');
    applyStyles(modalBody, {
        padding: '20px'
    });
    
    // Estilos das opções de cookies
    const cookieOptions = modal.querySelectorAll('.cookie-option');
    cookieOptions.forEach(option => {
        applyStyles(option, {
            marginBottom: '15px'
        });
    });
    
    // Estilos do rodapé do modal
    const modalFooter = modal.querySelector('.modal-footer');
    applyStyles(modalFooter, {
        padding: '15px 20px',
        borderTop: '1px solid #eee',
        textAlign: 'right'
    });
    
    // Estilos do botão de salvar
    const saveButton = modal.querySelector('.save-preferences');
    applyStyles(saveButton, {
        padding: '8px 16px',
        backgroundColor: '#25d366',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
    });
}

// Funções de configuração de eventos
function setupBannerEvents(banner) {
    const acceptButton = banner.querySelector('.cookie-accept');
    const settingsButton = banner.querySelector('.cookie-settings');
    
    acceptButton.addEventListener('click', function() {
        saveCookiePreferences('accepted');
        banner.style.display = 'none';
    });
    
    settingsButton.addEventListener('click', showCookieSettings);
}

function setupModalEvents(modal) {
    const closeButton = modal.querySelector('.close-modal');
    const saveButton = modal.querySelector('.save-preferences');
    
    closeButton.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    saveButton.addEventListener('click', function() {
        const analytics = modal.querySelector('input[name="analytics"]').checked;
        const marketing = modal.querySelector('input[name="marketing"]').checked;
        
        saveCookiePreferences('custom', analytics, marketing);
        
        // Remover banner e modal
        const banner = document.querySelector('.cookie-banner');
        if (banner) {
            banner.style.display = 'none';
        }
        document.body.removeChild(modal);
    });
}

// Funções utilitárias
function applyStyles(element, styles) {
    Object.assign(element.style, styles);
}

function adjustForMobile(cookieContent, cookieButtons) {
    if (window.innerWidth < 768) {
        applyStyles(cookieContent, {
            flexDirection: 'column'
        });
        applyStyles(cookieButtons, {
            flexDirection: 'column',
            width: '100%'
        });
    } else {
        applyStyles(cookieContent, {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        });
        applyStyles(cookieButtons, {
            flexDirection: 'row',
            marginTop: '0'
        });
    }
}

function saveCookiePreferences(consentType, analytics = true, marketing = true) {
    localStorage.setItem('cookieConsent', consentType);
    
    if (consentType === 'custom') {
        localStorage.setItem('cookieAnalytics', analytics);
        localStorage.setItem('cookieMarketing', marketing);
    } else {
        // Se for 'accepted', ativa todos os cookies por padrão
        localStorage.setItem('cookieAnalytics', true);
        localStorage.setItem('cookieMarketing', true);
    }
}