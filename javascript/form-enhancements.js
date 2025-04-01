document.addEventListener('DOMContentLoaded', function() {
    // Melhorar formulários com validação em tempo real
    enhanceForms();
    // Adicionar estilos CSS globais para formulários
    addFormStyles();
});

function enhanceForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Configurar o formulário para enviar para o email
        setupFormSubmission(form);
        
        const inputs = form.querySelectorAll('input, select, textarea');
        
        // Configurar validação e máscaras para todos os inputs
        setupInputValidation(form, inputs);
        
        // Adicionar indicadores visuais para campos obrigatórios
        addRequiredFieldIndicators(form);
        
        // Adicionar contador de caracteres para campos de texto longos
        addCharacterCounter(form);
    });
}

// Função para configurar validação de inputs
function setupInputValidation(form, inputs) {
    inputs.forEach(input => {
        // Adicionar validação em tempo real
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', function() {
            // Só validar durante digitação se já estiver marcado como erro
            if (this.classList.contains('error')) {
                validateInput.call(this);
            }
            
            // Aplicar máscara para telefone
            if ((this.id === 'telefone' || this.name === 'telefone')) {
                applyPhoneMask.call(this);
            }
        });
    });
    
    // Validar formulário no envio
    form.addEventListener('submit', function(e) {
        const isValid = validateForm(form, inputs);
        
        if (!isValid) {
            e.preventDefault();
            // Focar no primeiro campo com erro
            const firstError = form.querySelector('.error');
            if (firstError) firstError.focus();
        } else {
            // O formulário é válido, mostrar indicador de carregamento
            showLoadingIndicator(form);
        }
    });
}

// Função para validar todo o formulário
function validateForm(form, inputs) {
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !validateInput.call(input)) {
            isValid = false;
        }
    });
    
    return isValid;
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
    
    // Mostrar erro se necessário ou marcar como válido
    if (!isValid) {
        showInputError(this, errorMessage);
    } else if (this.value.trim()) {
        this.classList.add('valid');
    }
    
    return isValid;
}

// Função para mostrar erro de input
function showInputError(input, errorMessage) {
    input.classList.add('error');
    
    // Criar ou atualizar mensagem de erro
    let errorDiv = input.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    
    errorDiv.textContent = errorMessage;
    errorDiv.style.color = '#ffa8a8';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
}

// Função para aplicar máscara de telefone (otimizada)
function applyPhoneMask() {
    let value = this.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        // Aplicar formatação em uma única operação
        if (value.length <= 2) {
            value = '(' + value;
        } else if (value.length <= 7) {
            value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        } else {
            value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
        }
    }
    
    this.value = value;
}

// Função para adicionar indicadores de campos obrigatórios
function addRequiredFieldIndicators(form) {
    const requiredInputs = form.querySelectorAll('[required]');
    const indicator = document.createElement('span');
    indicator.className = 'required-indicator';
    indicator.textContent = ' *';
    indicator.style.color = '#ffa8a8';
    
    requiredInputs.forEach(input => {
        const label = form.querySelector(`label[for="${input.id}"]`);
        
        if (label && !label.querySelector('.required-indicator')) {
            label.appendChild(indicator.cloneNode(true));
        }
    });
}

// Função para adicionar contador de caracteres
function addCharacterCounter(form) {
    const textareas = form.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        // Definir limite de caracteres
        const maxLength = textarea.getAttribute('maxlength') || 500;
        textarea.setAttribute('maxlength', maxLength);
        
        // Criar contador
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.fontSize = '12px';
        counter.style.textAlign = 'right';
        counter.style.marginTop = '5px';
        counter.style.color = '#666';
        
        // Inserir após o textarea
        textarea.parentNode.insertBefore(counter, textarea.nextSibling);
        
        // Função para atualizar contador
        const updateCounter = function() {
            const count = this.value.length;
            counter.textContent = `${count}/${maxLength} caracteres`;
            counter.style.color = count > maxLength * 0.9 ? 'orange' : '#666';
        };
        
        // Inicializar contador e adicionar evento
        updateCounter.call(textarea);
        textarea.addEventListener('input', updateCounter);
    });
}

// Função para mostrar feedback de envio
function showSubmissionFeedback(form) {
    // Criar elementos usando fragment para melhor performance
    const fragment = document.createDocumentFragment();
    
    // Criar overlay de feedback
    const overlay = document.createElement('div');
    overlay.className = 'form-feedback-overlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '9999'
    });
    
    // Criar conteúdo do feedback
    const content = document.createElement('div');
    content.className = 'form-feedback-content';
    Object.assign(content.style, {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%'
    });
    
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
    Object.assign(closeButton.style, {
        padding: '10px 20px',
        backgroundColor: '#25d366',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    });
    
    // Montar estrutura
    content.append(icon, message, subMessage, closeButton);
    overlay.appendChild(content);
    fragment.appendChild(overlay);
    
    // Adicionar ao DOM
    document.body.appendChild(fragment);
    
    // Função para fechar e resetar
    const closeOverlay = function() {
        document.body.removeChild(overlay);
        form.reset();
    };
    
    // Adicionar eventos de fechar
    closeButton.addEventListener('click', closeOverlay);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeOverlay();
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
    
    // Criar e adicionar campos ocultos em uma única operação
    const hiddenFields = [
        { name: '_next', value: window.location.href },
        { name: '_captcha', value: 'false' },
        { name: '_subject', value: 'Novo contato do site - Lidia Zaniboni Advogados' }
    ];
    
    // Usar fragment para melhor performance
    const fragment = document.createDocumentFragment();
    
    hiddenFields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field.name;
        input.value = field.value;
        fragment.appendChild(input);
    });
    
    form.appendChild(fragment);
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