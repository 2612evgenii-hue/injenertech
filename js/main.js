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
    // Показать кнопку при прокрутке вниз
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    // Плавный скролл наверх
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== Параллакс-анимация для блока hero (по желанию) ==========
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        hero.style.backgroundPosition = `center ${scrolled * 0.2}px`;
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

// ========== АНИМАЦИИ ПРИ ПРОКРУТКЕ ==========
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // Расстояние от верха экрана для активации
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Запускаем анимации при загрузке и прокрутке
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ========== Дополнительные скрипты можно добавлять ниже ==========
