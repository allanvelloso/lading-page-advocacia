/**
 * Módulo de Exit Intent
 * Lidia Zaniboni & Advogados Associados
 */
const ExitIntent = {
    init: function() {
        // Verificar se já foi mostrado antes de configurar
        if (!sessionStorage.getItem('exitIntentShown')) {
            this.setupExitIntent();
        }
    },
    
    setupExitIntent: function() {
        // Detectar quando o usuário está prestes a sair da página
        document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    },
    
    handleMouseLeave: function(e) {
        // Só ativar se o mouse sair pela parte superior da página
        if (e.clientY < 5 && !sessionStorage.getItem('exitIntentShown')) {
            this.showExitIntentPopup();
            sessionStorage.setItem('exitIntentShown', 'true');
        }
    },
    
    createElementWithStyles: function(tag, className, styles = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        
        Object.entries(styles).forEach(([property, value]) => {
            element.style[property] = value;
        });
        
        return element;
    },
    
    createCloseButton: function() {
        const closeButton = this.createElementWithStyles('button', '', {
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            background: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#333'
        });
        
        closeButton.innerHTML = '&times;';
        return closeButton;
    },
    
    showExitIntentPopup: function() {
        // Criar o popup usando o método auxiliar
        const popup = this.createElementWithStyles('div', 'exit-intent-popup', {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '10000'
        });
        
        // Conteúdo do popup
        const content = this.createElementWithStyles('div', 'exit-popup-content', {
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)'
        });
        
        // Botão de fechar
        const closeButton = this.createCloseButton();
        
        // Conteúdo interno
        content.innerHTML += `
            <h3 style="color: #2b3a5c; margin-top: 0;">Não vá embora ainda!</h3>
            <p>Agende uma consulta gratuita e descubra como podemos ajudar no seu caso.</p>
            <form id="exit-intent-form" style="margin-top: 20px;">
                <div style="margin-bottom: 15px;">
                    <input type="text" placeholder="Seu nome" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <input type="email" placeholder="Seu e-mail" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <input type="tel" placeholder="Seu telefone" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <button type="submit" style="background-color: #25d366; color: white; border: none; padding: 12px 20px; border-radius: 4px; cursor: pointer; width: 100%; font-weight: bold;">Agendar Consulta Gratuita</button>
            </form>
        `;
        
        // Adicionar botão de fechar
        content.appendChild(closeButton);
        
        // Adicionar conteúdo ao popup
        popup.appendChild(content);
        
        // Adicionar ao DOM
        document.body.appendChild(popup);
        
        // Configurar eventos de fechamento
        this.setupCloseEvents(popup, closeButton);
        
        // Configurar processamento do formulário
        this.setupFormProcessing();
    },
    
    setupCloseEvents: function(popup, closeButton) {
        // Função de fechamento reutilizável
        const removePopup = () => popup.remove();
        
        // Adicionar evento de fechar ao botão
        closeButton.addEventListener('click', removePopup);
        
        // Fechar ao clicar fora
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                removePopup();
            }
        });
    },
    
    setupFormProcessing: function() {
        // Processar formulário
        const form = document.getElementById('exit-intent-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Aqui você pode adicionar o código para processar o formulário
                // Por exemplo, enviar os dados para um servidor
                
                // Mostrar mensagem de sucesso
                // TODO: Implementar lógica de processamento do formulário
            });
        }
    }
};