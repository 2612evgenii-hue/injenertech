// contacts.js — аккордеон для страницы 'Контакты'
// Позволяет раскрывать и сворачивать блоки, а также анимировать стрелку и плавно раздвигать

document.addEventListener('DOMContentLoaded', function() {
    // Аккордеон для графиков работы
    document.querySelectorAll('.accordion__header').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            // Закрыть все
            document.querySelectorAll('.accordion__header').forEach(function(otherBtn) {
                otherBtn.setAttribute('aria-expanded', 'false');
                if (otherBtn.nextElementSibling) {
                    otherBtn.nextElementSibling.style.maxHeight = null;
                }
            });
            // Открыть выбранный
            if (!expanded) {
                btn.setAttribute('aria-expanded', 'true');
                const body = btn.nextElementSibling;
                if (body) {
                    body.style.maxHeight = body.scrollHeight + 'px';
                }
            }
        });
    });
    // Сброс maxHeight при ресайзе окна
    window.addEventListener('resize', () => {
        document.querySelectorAll('.accordion__header[aria-expanded="true"] + .accordion__body').forEach(body => {
            body.style.maxHeight = body.scrollHeight + 'px';
        });
    });
});
