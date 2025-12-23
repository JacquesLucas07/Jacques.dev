// ===== Configuration et initialisation =====
let currentLang = 'fr';
let translations = {};

// ===== Chargement des traductions =====
async function loadTranslations(lang) {
    try {
        const response = await fetch(`translation/${lang}.json`);
        if (!response.ok) throw new Error('Traduction non trouvée');
        translations = await response.json();
        applyTranslations();
    } catch (error) {
        console.error('Erreur de chargement des traductions:', error);
    }
}

// ===== Application des traductions =====
function applyTranslations() {
    // Traduction des textes
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(key);
        if (translation) {
            element.textContent = translation;
        }
    });

    // Traduction des placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const translation = getNestedTranslation(key);
        if (translation) {
            element.placeholder = translation;
        }
    });
}

// Fonction helper pour accéder aux traductions imbriquées
function getNestedTranslation(key) {
    return key.split('.').reduce((obj, k) => obj?.[k], translations);
}

// ===== Gestion du mode sombre =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
}

// Toggle du thème
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
});

function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== Gestion de la traduction =====
const langToggle = document.getElementById('langToggle');
const langMenu = document.getElementById('langMenu');
const currentLangDisplay = document.getElementById('currentLang');
const langOptions = document.querySelectorAll('.lang-option');

// Charger la langue sauvegardée
const savedLang = localStorage.getItem('language') || 'fr';
currentLang = savedLang;
currentLangDisplay.textContent = savedLang.toUpperCase();
loadTranslations(savedLang);

// Toggle du menu de langues
langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.classList.toggle('active');
});

// Sélection d'une langue
langOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedLang = option.dataset.lang;
        currentLang = selectedLang;
        currentLangDisplay.textContent = selectedLang.toUpperCase();
        localStorage.setItem('language', selectedLang);
        loadTranslations(selectedLang);
        langMenu.classList.remove('active');
    });
});

// Fermer le menu si on clique ailleurs
document.addEventListener('click', () => {
    langMenu.classList.remove('active');
});

// ===== Menu burger pour mobile =====
const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Fermer le menu si on clique en dehors
document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ===== Animation de la barre de compétences =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ===== Scroll reveal animation =====
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}

// ===== Gestion du formulaire de contact =====
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;

    // Simulation d'envoi (à remplacer par votre logique d'envoi réelle)
    console.log('Formulaire soumis:', { name, email, subject, message });
    
    // Afficher un message de confirmation
    alert(currentLang === 'fr' 
        ? 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.' 
        : 'Thank you for your message! I will get back to you as soon as possible.');
    
    // Réinitialiser le formulaire
    contactForm.reset();
});

// ===== Smooth scroll pour les liens de navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Header scroll effect =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'var(--shadow)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll vers le bas
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll vers le haut
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = 'var(--shadow-lg)';
    }
    
    lastScroll = currentScroll;
});

// ===== Initialisation au chargement de la page =====
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    initScrollReveal();
    
    // Ajouter une classe "loaded" au body pour les animations
    setTimeout(() => {
        body.classList.add('loaded');
    }, 100);
});

// ===== Gestion du redimensionnement de la fenêtre =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Réinitialiser le menu burger sur desktop
        if (window.innerWidth > 768) {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }, 250);
});

// ===== Animation des cartes au survol =====
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Initialiser les effets de survol
initCardHoverEffects();

// ===== Typing effect pour le titre (optionnel) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== Particles background (optionnel - léger effet de particules) =====
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        z-index: -1;
    `;
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = 2 + Math.random() * 3;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    particle.animate([
        { opacity: 0, transform: 'translateY(0px)' },
        { opacity: 0.5, transform: 'translateY(-50px)' },
        { opacity: 0, transform: 'translateY(-100px)' }
    ], {
        duration: duration * 1000,
        easing: 'ease-out'
    }).onfinish = () => particle.remove();
}

// Créer des particules de temps en temps (désactivé par défaut)
// setInterval(createParticle, 300);

// ===== Performance: Lazy loading des images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Logs de développement =====
console.log('%c🚀 Portfolio Jacques.dev', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cDéveloppé avec ❤️', 'color: #f59e0b; font-size: 14px;');