(() => {
  const initialisedForms = new WeakSet();
  const initialisedButtons = new WeakSet();

  function ensureStatusNode(form, className) {
    let status = form.querySelector('[data-form-status]');

    if (!status) {
      status = document.createElement('p');
      status.className = className;
      status.setAttribute('data-form-status', '');
      status.setAttribute('aria-live', 'polite');
      form.appendChild(status);
    }

    return status;
  }

  function handleStubSubmit(form, message, className) {
    if (initialisedForms.has(form)) {
      return;
    }

    initialisedForms.add(form);

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const status = ensureStatusNode(form, className);
      status.textContent = message;
      form.reset();
    });
  }

  function setPasswordButtonState(button, input, hidden) {
    const icons = button.querySelectorAll('svg');

    if (icons[0]) {
      icons[0].style.display = hidden ? '' : 'none';
    }

    if (icons[1]) {
      icons[1].style.display = hidden ? 'none' : '';
    }

    button.setAttribute('aria-label', hidden ? 'Show password' : 'Hide password');
    button.setAttribute('aria-pressed', String(!hidden));
    input.type = hidden ? 'password' : 'text';
  }

  function initPasswordToggle(button) {
    if (initialisedButtons.has(button)) {
      return;
    }

    const input = button.parentElement ? button.parentElement.querySelector('input') : null;
    if (!input) {
      return;
    }

    initialisedButtons.add(button);
    setPasswordButtonState(button, input, input.type === 'password');

    button.addEventListener('click', () => {
      setPasswordButtonState(button, input, input.type !== 'password');
    });
  }

  function showFieldError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    const input = field ? field.querySelector('input') : null;

    if (input) {
      input.classList.add('is-error');
      input.setAttribute('aria-invalid', 'true');
    }

    if (error) {
      error.textContent = message;
      error.classList.add('is-visible');
      error.style.display = '';
    }
  }

  function clearFieldError(input, errorId) {
    if (input) {
      input.classList.remove('is-error');
      input.removeAttribute('aria-invalid');
    }

    const error = document.getElementById(errorId);
    if (error) {
      error.textContent = '';
      error.classList.remove('is-visible');
      if (error.hasAttribute('style')) {
        error.style.display = '';
      }
    }
  }

  function initLoginForm(form) {
    if (!form || initialisedForms.has(form)) {
      return;
    }

    initialisedForms.add(form);

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    form.querySelectorAll('.field__toggle').forEach(initPasswordToggle);

    if (email) {
      email.addEventListener('input', () => clearFieldError(email, 'email-error'));
    }

    if (password) {
      password.addEventListener('input', () => clearFieldError(password, 'password-error'));
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;

      if (!email || !email.value.trim()) {
        showFieldError('field-email', 'email-error', 'Please enter your email address.');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showFieldError('field-email', 'email-error', 'Please enter a valid email address.');
        valid = false;
      }

      if (!password || !password.value) {
        showFieldError('field-password', 'password-error', 'Please enter your password.');
        valid = false;
      }

      if (!valid) {
        return;
      }

      const status = ensureStatusNode(form, 'field__error is-visible');
      status.textContent = 'Login flow is ready to wire to the backend.';
    });
  }

  function scorePassword(value) {
    if (!value) {
      return 0;
    }

    let score = 0;
    if (value.length >= 8) score++;
    if (value.length >= 12) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return Math.min(4, score);
  }

  function updatePasswordStrength() {
    const password = document.getElementById('password');
    const label = document.getElementById('password-strength-label');
    const segments = Array.from(document.querySelectorAll('.pw-strength__seg'));
    const levels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colours = ['', 'active-1', 'active-2', 'active-3', 'active-4'];

    if (!password || !label || !segments.length) {
      return;
    }

    const score = scorePassword(password.value);
    segments.forEach((segment, index) => {
      segment.className = 'pw-strength__seg';
      if (index < score) {
        segment.classList.add(colours[score]);
      }
    });
    label.textContent = password.value ? levels[score] : '';
  }

  function initSignupForm(form) {
    if (!form || initialisedForms.has(form)) {
      return;
    }

    initialisedForms.add(form);
    form.querySelectorAll('.field__toggle').forEach(initPasswordToggle);

    ['first-name', 'last-name', 'email', 'company', 'password', 'confirm-password'].forEach((id) => {
      const input = document.getElementById(id);
      if (!input) {
        return;
      }

      input.addEventListener('input', () => {
        clearFieldError(input, `${id}-error`);
        if (id === 'password') {
          updatePasswordStrength();
        }
      });
    });

    updatePasswordStrength();

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const firstName = document.getElementById('first-name');
      const lastName = document.getElementById('last-name');
      const email = document.getElementById('email');
      const company = document.getElementById('company');
      const password = document.getElementById('password');
      const confirm = document.getElementById('confirm-password');
      const terms = document.getElementById('terms');
      let valid = true;

      if (!firstName || !firstName.value.trim()) {
        showFieldError('field-first-name', 'first-name-error', 'Please enter your first name.');
        valid = false;
      }

      if (!lastName || !lastName.value.trim()) {
        showFieldError('field-last-name', 'last-name-error', 'Please enter your last name.');
        valid = false;
      }

      if (!email || !email.value.trim()) {
        showFieldError('field-email', 'email-error', 'Please enter your work email.');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showFieldError('field-email', 'email-error', 'Please enter a valid email address.');
        valid = false;
      }

      if (!company || !company.value.trim()) {
        showFieldError('field-company', 'company-error', 'Please enter your company name.');
        valid = false;
      }

      if (!password || password.value.length < 8) {
        showFieldError('field-password', 'password-error', 'Use at least 8 characters for your password.');
        valid = false;
      }

      if (!confirm || confirm.value !== password.value) {
        showFieldError('field-confirm', 'confirm-error', 'Passwords must match.');
        valid = false;
      }

      if (!terms || !terms.checked) {
        const error = document.getElementById('terms-error');
        if (error) {
          error.textContent = 'Please accept the terms and privacy policy.';
          error.classList.add('is-visible');
          error.style.display = '';
        }
        valid = false;
      } else {
        const error = document.getElementById('terms-error');
        if (error) {
          error.textContent = '';
          error.classList.remove('is-visible');
          error.style.display = 'none';
        }
      }

      if (!valid) {
        return;
      }

      const status = ensureStatusNode(form, 'field__error is-visible');
      status.textContent = 'Signup flow is ready to wire to the backend.';
      form.reset();
      updatePasswordStrength();
    });
  }

  function init(scope = document) {
    const root = scope && typeof scope.querySelectorAll === 'function' ? scope : document;

    root.querySelectorAll('.footer-subscribe').forEach((form) => {
      handleStubSubmit(form, 'Thanks. We will keep you posted with trade updates.', 'footer-col__description');
    });

    root.querySelectorAll('.contact-form').forEach((form) => {
      handleStubSubmit(form, 'Thanks. Your message has been captured for backend wiring.', 'contact-form__required-note');
    });

    root.querySelectorAll('.quote-request__form').forEach((form) => {
      handleStubSubmit(form, 'Thanks. Your quote request has been captured for backend wiring.', 'quote-request__label-note');
    });

    initLoginForm(root.querySelector('#login-form'));
    initSignupForm(root.querySelector('#signup-form'));
  }

  window.SkyAgroForms = {
    init
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init(document), { once: true });
  } else {
    init(document);
  }
})();
