/**
 * contact.js — client-side validation, submit states, and the fetch()
 * call to api/contact.php. No credentials or secrets ever live here.
 */

export function initContact(siteState) {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const statusEl = form.querySelector('[data-form-status]');
  const submitBtn = form.querySelector('[type="submit"]');

  const fields = {
    name: form.querySelector('#contact-name'),
    email: form.querySelector('#contact-email'),
    message: form.querySelector('#contact-message')
  };

  Object.values(fields).forEach((field) => {
    if (!field) return;
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => clearFieldError(field));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const valid = Object.values(fields).every((field) => validateField(field));
    if (!valid) {
      setStatus('Please fix the highlighted fields.', 'error');
      return;
    }

    setLoading(true);
    setStatus('Sending…', 'pending');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name.value.trim(),
          email: fields.email.value.trim(),
          phone: (form.querySelector('#contact-phone')?.value || '').trim(),
          message: fields.message.value.trim(),
          // Honeypot — real users never fill this; bots often do.
          website: form.querySelector('[name="website"]')?.value || ''
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus(data.message || 'Message sent — thanks, I\u2019ll reply soon.', 'success');
        form.reset();
      } else {
        setStatus(data.message || 'Something went wrong. Please try again or email directly.', 'error');
      }
    } catch (err) {
      setStatus('Network error. Please try again or email directly.', 'error');
    } finally {
      setLoading(false);
    }
  });

  function validateField(field) {
    if (!field) return true;
    let valid = true;
    let message = '';

    if (!field.value.trim()) {
      valid = false;
      message = 'This field is required.';
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      valid = false;
      message = 'Enter a valid email address.';
    }

    field.setAttribute('aria-invalid', String(!valid));
    const errorEl = field.parentElement.querySelector('[data-field-error]');
    if (errorEl) errorEl.textContent = valid ? '' : message;

    return valid;
  }

  function clearFieldError(field) {
    field.removeAttribute('aria-invalid');
    const errorEl = field.parentElement.querySelector('[data-field-error]');
    if (errorEl) errorEl.textContent = '';
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? 'Sending…' : 'Send';
  }

  function setStatus(message, state) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.dataset.state = state;
  }
}
