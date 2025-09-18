// appeal.js — логика формы обращения через EmailJS
// Валидация, отправка через EmailJS, состояния загрузки/успеха/ошибки

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appealForm');
    const success = document.getElementById('appealSuccess');
    const errorBox = document.getElementById('appealError');
    const submitBtn = document.getElementById('submitBtn');
    if (!form) return;

    // Устанавливаем текущую дату в скрытое поле
    const dateField = document.getElementById('currentDate');
    if (dateField) {
        dateField.value = new Date().toLocaleString('ru-RU');
    }

    const requiredFields = Array.from(form.querySelectorAll('input, textarea'));

    function isFormValid() {
        let valid = true;
        requiredFields.forEach(field => {
            if (!field.value.trim()) valid = false;
            if (field.type === 'email' && field.value) {
                valid = valid && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.value);
            }
            if (field.type === 'tel' && field.value) {
                valid = valid && field.value.replace(/\D/g, '').length >= 7;
            }
        });
        return valid;
    }

    function setLoading(isLoading) {
        if (!submitBtn) return;
        submitBtn.disabled = isLoading;
        submitBtn.textContent = isLoading ? 'Отправляем…' : 'Отправить';
        
        if (isLoading) {
            submitBtn.classList.add('loading');
            submitBtn.style.opacity = '1';
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.style.opacity = '1';
        }
    }

    // Инициализация EmailJS
    const publicKey = form.getAttribute('data-emailjs-public-key');
    if (window.emailjs && publicKey) {
        emailjs.init(publicKey);
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!isFormValid()) {
            if (errorBox) {
                errorBox.textContent = 'Проверьте корректность заполнения полей.';
                errorBox.style.display = 'block';
                errorBox.classList.add('appeal-error');
                // Убираем класс анимации через время
                setTimeout(() => errorBox.classList.remove('appeal-error'), 500);
            }
            return;
        }

        const serviceId = form.getAttribute('data-emailjs-service-id');
        const templateId = form.getAttribute('data-emailjs-template-id');
        if (!serviceId || !templateId || !window.emailjs) {
            if (errorBox) {
                errorBox.textContent = 'Форма временно недоступна. Попробуйте позже.';
                errorBox.style.display = 'block';
                errorBox.classList.add('appeal-error');
                setTimeout(() => errorBox.classList.remove('appeal-error'), 500);
            }
            return;
        }

        setLoading(true);
        if (errorBox) errorBox.style.display = 'none';

        try {
            // Используем sendForm: EmailJS сам возьмет значения из инпутов по name
            await emailjs.sendForm(serviceId, templateId, form);

            // Анимация исчезновения формы
            form.classList.add('appeal-form-disappearing');
            
            setTimeout(() => {
                form.style.display = 'none';
                if (success) {
                    success.style.display = 'block';
                    success.classList.add('appeal-success', 'appeal-message-appearing');
                }
            }, 400); // Ждем завершения анимации исчезновения
            
        } catch (err) {
            if (errorBox) {
                const details = (err && (err.text || err.message)) ? ` (${err.text || err.message})` : '';
                errorBox.textContent = 'Не удалось отправить. Попробуйте позже.' + details;
                errorBox.style.display = 'block';
                errorBox.classList.add('appeal-error', 'appeal-message-appearing');
                setTimeout(() => errorBox.classList.remove('appeal-error'), 500);
            }
        } finally {
            setLoading(false);
        }
    });
});
