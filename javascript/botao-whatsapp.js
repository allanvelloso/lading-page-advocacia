document.addEventListener('DOMContentLoaded', function() {
    // Criar botão de WhatsApp flutuante
    createWhatsAppButton();
});

// Função para criar o botão de WhatsApp flutuante
function createWhatsAppButton() {
    // Criar o elemento do botão
    const whatsappButton = document.createElement('a');
    whatsappButton.className = 'whatsapp-float';
    whatsappButton.href = 'https://wa.me/5522997449858'; // Substitua pelo seu número com código do país
    whatsappButton.target = '_blank';
    whatsappButton.rel = 'noopener noreferrer';
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappButton.title = 'Fale conosco pelo WhatsApp';
    
    // Adicionar estilos CSS inline para o botão
    whatsappButton.style.position = 'fixed';
    whatsappButton.style.width = '60px';
    whatsappButton.style.height = '60px';
    whatsappButton.style.bottom = '40px';
    whatsappButton.style.right = '40px';
    whatsappButton.style.backgroundColor = '#25d366';
    whatsappButton.style.color = '#FFF';
    whatsappButton.style.borderRadius = '50px';
    whatsappButton.style.textAlign = 'center';
    whatsappButton.style.fontSize = '30px';
    whatsappButton.style.boxShadow = '2px 2px 3px #999';
    whatsappButton.style.zIndex = '100';
    whatsappButton.style.display = 'flex';
    whatsappButton.style.justifyContent = 'center';
    whatsappButton.style.alignItems = 'center';
    whatsappButton.style.textDecoration = 'none';
    
    // Adicionar efeito de hover
    whatsappButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#1da851';
    });
    
    whatsappButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#25d366';
    });
    
    // Adicionar o botão ao corpo do documento
    document.body.appendChild(whatsappButton);
}