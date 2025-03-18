document.addEventListener('DOMContentLoaded', function() {
    // Melhorar formulários com validação em tempo real
    enhanceForms();
});

function enhanceForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Configurar o formulário para enviar para o email
        setupFormSubmission(form);
        
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Adicionar validação em tempo real
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateInput.call(this);
                }
            });
            
            // Adicionar máscara para campos específicos
            if (input.id === 'telefone' || input.name === 'telefone') {
                input.addEventListener('input', applyPhoneMask);
            }
        });
        
        // Validar formulário no envio
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !validateInput.call(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Focar no primeiro campo com erro
                const firstError = form.querySelector('.error');
                if (firstError) firstError.focus();
            } else {
                // O formulário é válido, permitir o envio normal
                // Mostrar feedback visual após envio bem-sucedido
                showLoadingIndicator(form);
            }
        });
        
        // Adicionar indicadores visuais para campos obrigatórios
        addRequiredFieldIndicators(form);
        
        // Adicionar contador de caracteres para campos de texto longos
        addCharacterCounter(form);
    });
}

// Função para validar campos de entrada
function validateInput() {
    let isValid = true;
    let errorMessage = '';
    
    // Remover estado de erro anterior
    this.classList.remove('error');
    const errorElement = this.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = '';
    }
    
    // Validar campo vazio
    if (this.hasAttribute('required') && !this.value.trim()) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    } 
    // Validar email
    else if (this.type === 'email' && this.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(this.value)) {
            isValid = false;
            errorMessage = 'Por favor, insira um email válido';
        }
    }
    // Validar telefone
    else if ((this.id === 'telefone' || this.name === 'telefone') && this.value) {
        const phonePattern = /^\(\d{2}\)\s\d{5}-\d{4}$/;
        if (!phonePattern.test(this.value)) {
            isValid = false;
            errorMessage = 'Formato: (99) 99999-9999';
        }
    }
    
    // Mostrar erro se necessário
    if (!isValid) {
        this.classList.add('error');
        
        // Criar ou atualizar mensagem de erro
        let errorDiv = this.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            this.parentNode.insertBefore(errorDiv, this.nextSibling);
        }
        
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = '#ffa8a8'; // Alterado de 'red' para '#ffa8a8' (cor secundária)
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
    } else {
        // Adicionar indicador visual de campo válido
        if (this.value.trim()) {
            this.classList.add('valid');
        }
    }
    
    return isValid;
}

// Função para aplicar máscara de telefone
function applyPhoneMask(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        value = '(' + value;
        
        if (value.length > 3) {
            value = value.substring(0, 3) + ') ' + value.substring(3);
        }
        
        if (value.length > 10) {
            value = value.substring(0, 10) + '-' + value.substring(10, 14);
        }
    }
    
    e.target.value = value;
}

// Função para adicionar indicadores de campos obrigatórios
function addRequiredFieldIndicators(form) {
    const requiredInputs = form.querySelectorAll('[required]');
    
    requiredInputs.forEach(input => {
        const label = form.querySelector(`label[for="${input.id}"]`);
        
        if (label && !label.querySelector('.required-indicator')) {
            const indicator = document.createElement('span');
            indicator.className = 'required-indicator';
            indicator.textContent = ' *';
            indicator.style.color = '#ffa8a8'; // Mudando a cor para rosa/salmão (var(--secondary-color))
            label.appendChild(indicator);
        }
    });
}

// Função para adicionar contador de caracteres
function addCharacterCounter(form) {
    const textareas = form.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        // Definir limite de caracteres (pode ser personalizado por atributo)
        const maxLength = textarea.getAttribute('maxlength') || 500;
        textarea.setAttribute('maxlength', maxLength);
        
        // Criar contador
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.textContent = `0/${maxLength} caracteres`;
        counter.style.fontSize = '12px';
        counter.style.textAlign = 'right';
        counter.style.marginTop = '5px';
        counter.style.color = '#666';
        
        // Inserir após o textarea
        textarea.parentNode.insertBefore(counter, textarea.nextSibling);
        
        // Atualizar contador ao digitar
        textarea.addEventListener('input', function() {
            const count = this.value.length;
            counter.textContent = `${count}/${maxLength} caracteres`;
            
            // Mudar cor quando estiver próximo do limite
            if (count > maxLength * 0.9) {
                counter.style.color = 'orange';
            } else {
                counter.style.color = '#666';
            }
        });
    });
}

// Função para mostrar feedback de envio
function showSubmissionFeedback(form) {
    // Criar overlay de feedback
    const overlay = document.createElement('div');
    overlay.className = 'form-feedback-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';
    
    // Criar conteúdo do feedback
    const content = document.createElement('div');
    content.className = 'form-feedback-content';
    content.style.backgroundColor = 'white';
    content.style.padding = '30px';
    content.style.borderRadius = '8px';
    content.style.textAlign = 'center';
    content.style.maxWidth = '400px';
    content.style.width = '90%';
    
    // Ícone de sucesso
    const icon = document.createElement('div');
    icon.innerHTML = '<i class="fas fa-check-circle"></i>';
    icon.style.fontSize = '48px';
    icon.style.color = '#25d366';
    icon.style.marginBottom = '20px';
    
    // Mensagem de sucesso
    const message = document.createElement('h3');
    message.textContent = 'Mensagem enviada com sucesso!';
    message.style.marginBottom = '15px';
    
    // Submensagem
    const subMessage = document.createElement('p');
    subMessage.textContent = 'Entraremos em contato em breve.';
    subMessage.style.marginBottom = '20px';
    
    // Botão de fechar
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Fechar';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#25d366';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    
    // Montar estrutura
    content.appendChild(icon);
    content.appendChild(message);
    content.appendChild(subMessage);
    content.appendChild(closeButton);
    overlay.appendChild(content);
    
    // Adicionar ao DOM
    document.body.appendChild(overlay);
    
    // Adicionar evento de fechar
    closeButton.addEventListener('click', function() {
        document.body.removeChild(overlay);
        form.reset();
    });
    
    // Fechar ao clicar fora
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
            form.reset();
        }
    });
}

// Função para adicionar estilos CSS
function addFormStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .form-group {
            margin-bottom: 20px;
            position: relative;
        }
        
        input, select, textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        input:focus, select:focus, textarea:focus {
            border-color: #25d366;
            box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.1);
            outline: none;
        }
        
        input.error, select.error, textarea.error {
            border-color: red;
        }
        
        input.valid, select.valid, textarea.valid {
            border-color: #25d366;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        .btn, button[type="submit"] {
            background-color: #25d366;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        
        .btn:hover, button[type="submit"]:hover {
            background-color: #1faa54;
        }
    `;
    document.head.appendChild(styleElement);
}

// Função para configurar o envio do formulário
function setupFormSubmission(form) {
    // Configurar o formulário para usar o serviço FormSubmit
    form.setAttribute('action', 'https://formsubmit.co/advlidiazaniboni@gmail.com');
    form.setAttribute('method', 'POST');
    
    // Adicionar campos ocultos para configuração do FormSubmit
    
    // Campo para URL de redirecionamento após envio
    const redirectInput = document.createElement('input');
    redirectInput.type = 'hidden';
    redirectInput.name = '_next';
    redirectInput.value = window.location.href;
    form.appendChild(redirectInput);
    
    // Desativar captcha (opcional)
    const captchaInput = document.createElement('input');
    captchaInput.type = 'hidden';
    captchaInput.name = '_captcha';
    captchaInput.value = 'false';
    form.appendChild(captchaInput);
    
    // Nome do formulário para identificação no email
    const formNameInput = document.createElement('input');
    formNameInput.type = 'hidden';
    formNameInput.name = '_subject';
    formNameInput.value = 'Novo contato do site - Lidia Zaniboni Advogados';
    form.appendChild(formNameInput);
}

// Função para mostrar indicador de carregamento
function showLoadingIndicator(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Restaurar o botão se o envio falhar
        setTimeout(() => {
            if (document.contains(submitButton)) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }, 10000); // Timeout de 10 segundos
    }
}