document.addEventListener('DOMContentLoaded', function() {
    // Verificar se já mostrou a mensagem nesta sessão
    if (!sessionStorage.getItem('exitIntentShown')) {
        setupExitIntent();
    }
});

function setupExitIntent() {
    let showModal = true;
    let mouseY = 0;
    const sensitivity = 30; // Distância do topo para acionar

    // Detectar movimento do mouse para fora da janela
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Detectar movimento do mouse para o topo da janela
    document.addEventListener('mousemove', function(e) {
        mouseY = e.clientY;
    });

    function handleMouseLeave(e) {
        // Se o mouse estiver próximo ao topo da janela
        if (mouseY < sensitivity && showModal) {
            showExitIntentModal();
        }
    }

    function showExitIntentModal() {
        // Evitar mostrar o modal mais de uma vez
        if (!showModal) return;
        showModal = false;
        
        // Marcar como mostrado nesta sessão
        sessionStorage.setItem('exitIntentShown', 'true');
        
        // Criar o modal
        const modal = document.createElement('div');
        modal.className = 'exit-intent-modal';
        modal.innerHTML = `
            <div class="exit-modal-content">
                <button class="close-exit-modal">&times;</button>
                <div class="exit-modal-body">
                    <h2>Espere um momento!</h2>
                    <p>Antes de sair, que tal uma consulta inicial gratuita?</p>
                    <p>Nossos advogados estão prontos para ajudar com seu caso.</p>
                    <form class="exit-form">
                        <input type="text" placeholder="Seu nome" required>
                        <input type="email" placeholder="Seu e-mail" required>
                        <input type="tel" placeholder="Seu telefone" required>
                        <button type="submit" class="exit-submit-btn">Quero uma consulta gratuita</button>
                    </form>
                    <p class="exit-no-thanks">Não, obrigado. Quero sair do site.</p>
                </div>
            </div>
        `;
        
        // Estilizar o modal
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '9999';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s ease';
        
        const modalContent = modal.querySelector('.exit-modal-content');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.borderRadius = '8px';
        modalContent.style.maxWidth = '500px';
        modalContent.style.width = '90%';
        modalContent.style.position = 'relative';
        modalContent.style.padding = '30px';
        modalContent.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        modalContent.style.transform = 'translateY(20px)';
        modalContent.style.transition = 'transform 0.3s ease';
        
        const closeButton = modal.querySelector('.close-exit-modal');
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '15px';
        closeButton.style.fontSize = '24px';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.cursor = 'pointer';
        
        const modalBody = modal.querySelector('.exit-modal-body');
        modalBody.style.textAlign = 'center';
        
        const heading = modal.querySelector('h2');
        heading.style.color = '#333';
        heading.style.marginBottom = '15px';
        
        const paragraphs = modal.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.marginBottom = '15px';
            p.style.color = '#555';
        });
        
        const form = modal.querySelector('.exit-form');
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        form.style.gap = '10px';
        form.style.marginTop = '20px';
        form.style.marginBottom = '20px';
        
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.padding = '12px';
            input.style.borderRadius = '4px';
            input.style.border = '1px solid #ddd';
            input.style.fontSize = '14px';
        });
        
        const submitButton = form.querySelector('.exit-submit-btn');
        submitButton.style.padding = '12px';
        submitButton.style.backgroundColor = '#25d366';
        submitButton.style.color = 'white';
        submitButton.style.border = 'none';
        submitButton.style.borderRadius = '4px';
        submitButton.style.cursor = 'pointer';
        submitButton.style.fontWeight = 'bold';
        submitButton.style.fontSize = '16px';
        submitButton.style.marginTop = '10px';
        
        const noThanks = modal.querySelector('.exit-no-thanks');
        noThanks.style.cursor = 'pointer';
        noThanks.style.textDecoration = 'underline';
        noThanks.style.fontSize = '14px';
        noThanks.style.color = '#777';
        
        // Adicionar ao DOM
        document.body.appendChild(modal);
        
        // Animar entrada
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        }, 10);
        
        // Adicionar eventos
        closeButton.addEventListener('click', closeModal);
        noThanks.addEventListener('click', closeModal);
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar código para enviar os dados do formulário
            alert('Obrigado! Entraremos em contato em breve.');
            
            closeModal();
        });
        
        // Fechar ao clicar fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        function closeModal() {
            modal.style.opacity = '0';
            modalContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    }
}