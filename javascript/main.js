/**
 * Arquivo principal que inicializa todos os módulos
 * Lidia Zaniboni & Advogados Associados
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar módulos de UI e navegação
    if (window.Navigation) Navigation.init();
    if (window.Accessibility) Accessibility.init();
    
    // Inicializar módulos de conteúdo
    if (window.Testimonials) Testimonials.init();
    if (window.GoogleMaps) GoogleMaps.init();
    if (window.Forms) Forms.init();
    
    // Inicializar módulos de experiência do usuário
    if (window.CookieConsent) CookieConsent.init();
    if (window.ExitIntent) ExitIntent.init();
    if (window.WhatsApp) WhatsApp.init();
    
    // Inicializar módulos de performance e acessibilidade
    if (window.Performance) Performance.init();
    if (window.Animations) Animations.init();
});