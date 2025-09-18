// contacts.js — аккордеон для страницы 'Контакты'
// Позволяет раскрывать и сворачивать блоки, а также анимировать стрелку и плавно раздвигать

document.addEventListener('DOMContentLoaded', function() {
    const headers = Array.from(document.querySelectorAll('.accordion__header'));

    headers.forEach((btn) => {
        btn.addEventListener('click', function() {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            // Закрыть все
            headers.forEach((other) => {
                other.setAttribute('aria-expanded', 'false');
                const body = other.nextElementSibling;
                if (body) body.style.maxHeight = '0px';
            });

            // Открыть выбранный, если был закрыт
            if (!isExpanded) {
                btn.setAttribute('aria-expanded', 'true');
                const body = btn.nextElementSibling;
                if (body) body.style.maxHeight = body.scrollHeight + 'px';
            }
        }, { passive: true });
    });
});
