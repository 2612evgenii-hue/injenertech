// appeal.js — логика формы обращения
// Валидация, mailto, показ сообщения об успехе

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appealForm');
    const success = document.getElementById('appealSuccess');
    if (!form) return;
    const requiredFields = Array.from(form.querySelectorAll('input, textarea'));

    function checkValid() {
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
        // The submit button is disabled by default, so we don't need to re-enable it here
        // unless the form is submitted successfully, in which case it will be re-enabled
        // by the success message display.
    }
    form.addEventListener('input', checkValid);
    form.addEventListener('change', checkValid);
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                form.style.display = 'none';
                success.style.display = 'block';
            } else {
                response.json().then(data => {
                    alert(data.errors ? data.errors.map(e => e.message).join(', ') : 'Ошибка отправки.');
                });
            }
        })
        .catch(() => {
            alert('Ошибка сети. Попробуйте позже.');
        });
    });
    checkValid();
});
