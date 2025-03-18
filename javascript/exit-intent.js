/**
 * Módulo de Exit Intent
 * Lidia Zaniboni & Advogados Associados
 */
const ExitIntent = {
    init: function() {
        this.setupExitIntent();
    },
    
    setupExitIntent: function() {
        // Verificar se já foi mostrado
        if (sessionStorage.getItem('exitIntentShown')) {
            return;
        }
        
        // Detectar quando o usuário está prestes a sair da página
        document.addEventListener('mouseleave', (e) => {
            // Só ativar se o mouse sair pela parte superior da página
            if (e.clientY < 5 && !sessionStorage.getItem('exitIntentShown')) {
                this.showExitIntentPopup();
                sessionStorage.setItem('exitIntentShown', 'true');
            }
        });
    },
    
    showExitIntentPopup: function() {
        // Criar o popup
        const popup = document.createElement('div');
        popup.className = 'exit-intent-popup';
        popup.style.position = 'fixed';
        popup.style.top = '0';
        popup.style.left = '0';
        popup.style.width = '100%';
        popup.style.height = '100%';
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        popup.style.display = 'flex';
        popup.style.justifyContent = 'center';
        popup.style.alignItems = 'center';
        popup.style.zIndex = '10000';
        
        // Conteúdo do popup
        const content = document.createElement('div');
        content.className = 'exit-popup-content';
        content.style.backgroundColor = 'white';
        content.style.borderRadius = '8px';
        content.style.padding = '30px';
        content.style.maxWidth = '500px';
        content.style.width = '90%';
        content.style.textAlign = 'center';
        content.style.position = 'relative';
        content.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        
        // Botão de fechar
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.border = 'none';
        closeButton.style.background = 'none';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#333';
        
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
        
        // Adicionar evento de fechar
        closeButton.addEventListener('click', () => {
            popup.remove();
        });
        
        // Fechar ao clicar fora
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.remove();
            }
        });
        
        // Processar formulário
        const form = document.getElementById('exit-intent-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Aqui você pode adicionar o código para processar o formulário
                // Por exemplo, enviar os dados para um servidor
                
                // Mostrar mensagem de sucesso