// Configurações Iniciais
let currentLang = localStorage.getItem('lang') || 'en';
const body = document.body;

// Função de Tradução
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    const t = translations[lang];
    const currentLangEl = document.getElementById('current-lang');
    const flagIconEl = document.getElementById('flag-icon');

    if (currentLangEl) currentLangEl.textContent = lang.toUpperCase();
    if (flagIconEl) flagIconEl.textContent = lang === 'en' ? '🇺🇸' : '🇧🇷';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
}

// Alternar Tema
const themeToggle = document.getElementById('theme-toggle');
const themeIconDark = document.getElementById('theme-icon-dark');
const themeIconLight = document.getElementById('theme-icon-light');

function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-theme');
        themeIconDark?.classList.remove('hidden');
        themeIconLight?.classList.add('hidden');
    } else {
        body.classList.remove('light-theme');
        themeIconDark?.classList.add('hidden');
        themeIconLight?.classList.remove('hidden');
    }
}

themeToggle?.addEventListener('click', () => {
    const isLight = body.classList.contains('light-theme');
    const newTheme = isLight ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});

// Menu Mobile
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
});

// Efeito de Scroll no Navbar
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar?.classList.add('bg-[#0A0E17]/95', 'py-2');
    } else {
        navbar?.classList.remove('bg-[#0A0E17]/95', 'py-2');
    }
});

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    applyTheme(localStorage.getItem('theme') || 'dark');
});

// Smooth scroll apenas para links internos (que começam com #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId !== "#") {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});