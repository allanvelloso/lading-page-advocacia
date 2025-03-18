document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário já aceitou os cookies
    if (!localStorage.getItem('cookieConsent')) {
        createCookieConsentBanner();
    }
});

function createCookieConsentBanner() {
    // Criar o banner
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
    
    // Adicionar estilos
    banner.style.position = 'fixed';
    banner.style.bottom = '0';
    banner.style.left = '0';
    banner.style.width = '100%';
    banner.style.padding = '15px';
    banner.style.backgroundColor = '#f8f8f8';
    banner.style.boxShadow = '0 -2px 10px rgba(0, 0, 0, 0.1)';
    banner.style.zIndex = '1000';
    banner.style.display = 'flex';
    banner.style.justifyContent = 'center';
    banner.style.alignItems = 'center';
    
    const cookieContent = banner.querySelector('.cookie-content');
    cookieContent.style.maxWidth = '1200px';
    cookieContent.style.width = '100%';
    cookieContent.style.display = 'flex';
    cookieContent.style.flexDirection = 'column';
    cookieContent.style.padding = '10px';
    
    const cookieButtons = banner.querySelector('.cookie-buttons');
    cookieButtons.style.display = 'flex';
    cookieButtons.style.gap = '10px';
    cookieButtons.style.marginTop = '10px';
    
    const buttons = banner.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.padding = '8px 16px';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
        button.style.fontWeight = 'bold';
    });
    
    const acceptButton = banner.querySelector('.cookie-accept');
    acceptButton.style.backgroundColor = '#25d366';
    acceptButton.style.color = 'white';
    
    const settingsButton = banner.querySelector('.cookie-settings');
    settingsButton.style.backgroundColor = '#f1f1f1';
    settingsButton.style.color = '#333';
    
    // Adicionar ao DOM
    document.body.appendChild(banner);
    
    // Adicionar eventos
    acceptButton.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.style.display = 'none';
    });
    
    settingsButton.addEventListener('click', function() {
        showCookieSettings();
    });
    
    // Responsividade para dispositivos móveis
    window.addEventListener('resize', adjustForMobile);
    adjustForMobile();
    
    function adjustForMobile() {
        if (window.innerWidth < 768) {
            cookieContent.style.flexDirection = 'column';
            cookieButtons.style.flexDirection = 'column';
            cookieButtons.style.width = '100%';
        } else {
            cookieContent.style.flexDirection = 'row';
            cookieContent.style.justifyContent = 'space-between';
            cookieContent.style.alignItems = 'center';
            cookieButtons.style.flexDirection = 'row';
            cookieButtons.style.marginTop = '0';
        }
    }
}

function showCookieSettings() {
    // Criar modal de configurações
    const modal = document.createElement('div');
    modal.className = 'cookie-settings-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Configurações de Cookies</h3>
                <button class="close-modal">&times;</button>
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
    
    // Adicionar estilos
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1001';
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.borderRadius = '8px';
    modalContent.style.maxWidth = '500px';
    modalContent.style.width = '90%';
    modalContent.style.maxHeight = '80vh';
    modalContent.style.overflowY = 'auto';
    
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.display = 'flex';
    modalHeader.style.justifyContent = 'space-between';
    modalHeader.style.alignItems = 'center';
    modalHeader.style.padding = '15px 20px';
    modalHeader.style.borderBottom = '1px solid #eee';
    
    const closeButton = modal.querySelector('.close-modal');
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    
    const modalBody = modal.querySelector('.modal-body');
    modalBody.style.padding = '20px';
    
    const cookieOptions = modal.querySelectorAll('.cookie-option');
    cookieOptions.forEach(option => {
        option.style.marginBottom = '15px';
    });
    
    const modalFooter = modal.querySelector('.modal-footer');
    modalFooter.style.padding = '15px 20px';
    modalFooter.style.borderTop = '1px solid #eee';
    modalFooter.style.textAlign = 'right';
    
    const saveButton = modal.querySelector('.save-preferences');
    saveButton.style.padding = '8px 16px';
    saveButton.style.backgroundColor = '#25d366';
    saveButton.style.color = 'white';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '4px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.fontWeight = 'bold';
    
    // Adicionar ao DOM
    document.body.appendChild(modal);
    
    // Adicionar eventos
    closeButton.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    saveButton.addEventListener('click', function() {
        const analytics = modal.querySelector('input[name="analytics"]').checked;
        const marketing = modal.querySelector('input[name="marketing"]').checked;
        
        // Salvar preferências
        localStorage.setItem('cookieConsent', 'custom');
        localStorage.setItem('cookieAnalytics', analytics);
        localStorage.setItem('cookieMarketing', marketing);
        
        // Remover banner e modal
        const banner = document.querySelector('.cookie-banner');
        if (banner) {
            banner.style.display = 'none';
        }
        document.body.removeChild(modal);
    });
}