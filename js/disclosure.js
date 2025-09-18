// disclosure.js — аккордеон для страницы 'Раскрытие информации'
// Позволяет раскрывать и сворачивать блоки, а также анимировать стрелку и плавно раздвигать

document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.accordion__header');
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            // Сворачиваем все
            headers.forEach(h => {
                h.setAttribute('aria-expanded', 'false');
                const body = h.nextElementSibling;
                if (body) {
                    body.style.maxHeight = null;
                }
            });
            // Если не был раскрыт — раскрываем
            if (!expanded) {
                this.setAttribute('aria-expanded', 'true');
                const body = this.nextElementSibling;
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
