// Cache de elementos do DOM e constantes
const DOM = {
    menuToggle: document.querySelector('.menu-toggle'),
    nav: document.querySelector('nav'),
    menuLinks: document.querySelectorAll('.menu a')
};

// Constantes
const LIMIAR_DESLIZE = 50;
const ATRASO_REDIMENSIONAMENTO = 250;
const PONTO_QUIEBRA_DESKTOP = 1024;

// Funcionalidade do menu
function criarOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    return overlay;
}

function alternarMenu(overlay, estaAberto) {
    if (!DOM.nav || !DOM.menuToggle || !overlay) return;
    
    DOM.nav.classList.toggle('active', estaAberto);
    DOM.menuToggle.classList.toggle('active', estaAberto);
    overlay.classList.toggle('active', estaAberto);
    document.body.classList.toggle('menu-open', estaAberto);
}

function manipularCliqueMenu(e, overlay) {
    e.stopPropagation();
    const estaAberto = !DOM.nav.classList.contains('active');
    alternarMenu(overlay, estaAberto);
}

function manipularCliqueOverlay(overlay) {
    alternarMenu(overlay, false);
}

function manipularCliqueLinkMenu(overlay) {
    alternarMenu(overlay, false);
}

function manipularTeclaEscape(e, overlay) {
    if (e.key === 'Escape' && DOM.nav.classList.contains('active')) {
        alternarMenu(overlay, false);
    }
}

function manipularCliqueNav(e) {
    e.stopPropagation();
}

function manipularRedimensionamento(overlay) {
    let temporizadorRedimensionamento;
    window.addEventListener('resize', () => {
        clearTimeout(temporizadorRedimensionamento);
        temporizadorRedimensionamento = setTimeout(() => {
            if (window.innerWidth > PONTO_QUIEBRA_DESKTOP && DOM.nav.classList.contains('active')) {
                alternarMenu(overlay, false);
            }
        }, ATRASO_REDIMENSIONAMENTO);
    });
}

// Eventos de toque para mobile
class ManipuladorToque {
    constructor(overlay) {
        this.toqueInicialX = 0;
        this.toqueFinalX = 0;
        this.overlay = overlay;
        this.inicializar();
    }

    inicializar() {
        document.addEventListener('touchstart', e => this.manipularToqueInicial(e), false);
        document.addEventListener('touchend', e => this.manipularToqueFinal(e), false);
    }

    manipularToqueInicial(e) {
        this.toqueInicialX = e.changedTouches[0].screenX;
    }

    manipularToqueFinal(e) {
        this.toqueFinalX = e.changedTouches[0].screenX;
        this.manipularDeslize();
    }

    manipularDeslize() {
        const distanciaDeslize = this.toqueFinalX - this.toqueInicialX;

        if (Math.abs(distanciaDeslize) > LIMIAR_DESLIZE) {
            if (distanciaDeslize > 0 && !DOM.nav.classList.contains('active')) {
                alternarMenu(this.overlay, true);
            } else if (distanciaDeslize < 0 && DOM.nav.classList.contains('active')) {
                alternarMenu(this.overlay, false);
            }
        }
    }
}

// Inicializar tudo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Criar e armazenar overlay
    const overlay = criarOverlay();

    // Eventos do menu
    if (DOM.menuToggle) {
        DOM.menuToggle.addEventListener('click', e => manipularCliqueMenu(e, overlay));
    }

    overlay.addEventListener('click', () => manipularCliqueOverlay(overlay));
    DOM.menuLinks.forEach(link => {
        link.addEventListener('click', () => manipularCliqueLinkMenu(overlay));
    });

    // Eventos de teclado
    document.addEventListener('keydown', e => manipularTeclaEscape(e, overlay));

    // Prevenir fechamento do menu ao clicar dentro
    if (DOM.nav) {
        DOM.nav.addEventListener('click', manipularCliqueNav);
    }

    // Manipular redimensionamento da janela
    manipularRedimensionamento(overlay);

    // Inicializar manipulador de toque
    new ManipuladorToque(overlay);
}); 