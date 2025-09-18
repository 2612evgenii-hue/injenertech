// main.js — основной файл скриптов сайта УК «Соколиная гора»
// Здесь реализованы бургер-меню, кнопка "вверх" и плавный скролл
// Все функции снабжены подробными комментариями

// ========== Бургер-меню для мобильной версии ==========
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const phone = document.querySelector('.header__phone');
const navClose = document.querySelector('.nav__close');

if (burger && nav) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
        // Центрируем телефон внутри меню
        if (nav.classList.contains('open') && phone) {
            phone.classList.add('header__phone--inmenu');
        } else if (phone) {
            phone.classList.remove('header__phone--inmenu');
        }
    });
    // Крестик закрывает меню
    if (navClose) {
        navClose.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
            if (phone) phone.classList.remove('header__phone--inmenu');
        });
    }
    // При клике по пункту меню — закрыть меню
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
            if (phone) phone.classList.remove('header__phone--inmenu');
        });
    });
    // Закрытие по клику вне меню
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) {
            burger.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
            if (phone) phone.classList.remove('header__phone--inmenu');
        }
    });
    // Закрытие по Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
            burger.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
            if (phone) phone.classList.remove('header__phone--inmenu');
        }
    });
}

// ========== Кнопка "вверх" ==========
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
    let scrollTimeout;
    // Показать кнопку при прокрутке вниз (с throttling)
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
            scrollTimeout = null;
        }, 10);
    });
    // Плавный скролл наверх
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== Упрощенный параллакс-эффект ==========
const hero = document.querySelector('.hero');
if (hero) {
    let parallaxTimeout;
    window.addEventListener('scroll', () => {
        if (parallaxTimeout) return;
        parallaxTimeout = setTimeout(() => {
            const scrolled = window.scrollY;
            if (scrolled < 500) { // Ограничиваем параллакс только для верхней части
                hero.style.backgroundPosition = `center ${scrolled * 0.1}px`;
            }
            parallaxTimeout = null;
        }, 16); // ~60fps
    });
}

// ========== Подсветка активного пункта меню ==========
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav__list a');
    const path = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if ((path === '' && href === 'index.html') || (href === path)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    // Телефон внутрь меню при открытии бургера на мобиле
    const nav = document.querySelector('.nav');
    const phone = document.querySelector('.header__phone');
    if (nav && phone) {
        const phoneClone = phone.cloneNode(true);
        phoneClone.classList.add('header__phone--inmenu');
        nav.appendChild(phoneClone);
        function togglePhoneInMenu() {
            if (nav.classList.contains('open')) {
                phoneClone.style.display = 'block';
            } else {
                phoneClone.style.display = 'none';
            }
        }
        togglePhoneInMenu();
        document.querySelector('.burger').addEventListener('click', togglePhoneInMenu);
    }
});

// ========== АНИМАЦИИ ПРИ ПРОКРУТКЕ (оптимизированные) ==========
let animationTimeout;
let isAnimating = false;

function animateOnScroll() {
    if (animationTimeout || isAnimating) return;
    
    animationTimeout = setTimeout(() => {
        isAnimating = true;
        
        const elements = document.querySelectorAll('.fade-in:not(.visible), .slide-in-left:not(.visible), .slide-in-right:not(.visible), .scale-in:not(.visible)');
        
        if (elements.length === 0) {
            isAnimating = false;
            animationTimeout = null;
            return;
        }
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementVisible = 80; // Расстояние для активации
            
            if (rect.top < window.innerHeight - elementVisible && rect.bottom > 0) {
                // Добавляем небольшую задержку для более интересного эффекта
                setTimeout(() => {
                    element.classList.add('visible');
                }, Math.random() * 100);
            }
        });
        
        isAnimating = false;
        animationTimeout = null;
    }, 16); // ~60fps
}

// Запускаем анимации при загрузке и прокрутке
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ========== Дополнительные скрипты можно добавлять ниже ==========
