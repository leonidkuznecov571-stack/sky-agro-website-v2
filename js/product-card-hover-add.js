(() => {
  const TARGET_PREFIXES = [
    '/products/brewing-ingredients',
    '/products/chemical-products',
    '/products/kegs-packaging'
  ];

  function normalisePath(pathname) {
    const cleaned = pathname.replace(/index\.html$/, '').replace(/\/+$/, '');
    return cleaned || '/';
  }

  function isSupportedPage() {
    const currentPath = normalisePath(window.location.pathname);

    return TARGET_PREFIXES.some((prefix) => (
      currentPath === prefix || currentPath.startsWith(`${prefix}/`)
    ));
  }

  function enhanceCard(card) {
    if (card.classList.contains('prod-card--hover-add') || card.querySelector('.prod-card__media')) {
      return;
    }

    const contentLink = card.querySelector('.prod-card__content-link');
    const imgWrap = contentLink ? contentLink.querySelector('.prod-card__img-wrap') : null;
    const body = contentLink ? contentLink.querySelector('.prod-card__body') : null;

    if (!contentLink || !imgWrap || !body) {
      return;
    }

    const footerActions = card.querySelector('.prod-card__actions');
    if (footerActions) {
      footerActions.querySelectorAll('button.prod-card__action').forEach((button) => {
        button.remove();
      });
    }

    const href = contentLink.getAttribute('href') || '#';
    const productName = card.querySelector('.prod-card__name');
    const productLabel = productName ? productName.textContent.replace(/\s+/g, ' ').trim() : 'product';

    const media = document.createElement('div');
    media.className = 'prod-card__media';

    const imageLink = document.createElement('a');
    imageLink.className = 'prod-card__image-link';
    imageLink.href = href;
    imageLink.setAttribute('aria-label', `View ${productLabel}`);
    imageLink.appendChild(imgWrap);

    const quickAdd = document.createElement('div');
    quickAdd.className = 'prod-card__quick-add';
    quickAdd.innerHTML =
      '<div class="prod-card__quick-add-controls">' +
        '<button type="button" class="prod-card__quick-add-step" data-qty-step="-1" aria-label="Decrease quantity">-</button>' +
        '<span class="prod-card__quick-add-value" aria-live="polite">1</span>' +
        '<button type="button" class="prod-card__quick-add-step" data-qty-step="1" aria-label="Increase quantity">+</button>' +
      '</div>' +
      '<button type="button" class="prod-card__quick-add-btn">Add to Cart</button>';

    const valueEl = quickAdd.querySelector('.prod-card__quick-add-value');

    quickAdd.querySelectorAll('[data-qty-step]').forEach((button) => {
      button.addEventListener('click', () => {
        const current = parseInt(valueEl.textContent, 10) || 1;
        const next = current + parseInt(button.getAttribute('data-qty-step'), 10);
        valueEl.textContent = String(Math.max(1, next));
      });
    });

    quickAdd.querySelector('.prod-card__quick-add-btn').addEventListener('click', () => {
      quickAdd.classList.add('prod-card__quick-add--pressed');
      window.setTimeout(() => {
        quickAdd.classList.remove('prod-card__quick-add--pressed');
      }, 180);
    });

    media.appendChild(imageLink);
    media.appendChild(quickAdd);

    contentLink.parentNode.insertBefore(media, contentLink);
    card.classList.add('prod-card--hover-add');

    media.addEventListener('mouseleave', () => {
      const active = document.activeElement;

      if (active && media.contains(active) && typeof active.blur === 'function') {
        active.blur();
      }
    });
  }

  function init() {
    if (!isSupportedPage()) {
      return;
    }

    document.querySelectorAll('.prod-results .prod-card').forEach(enhanceCard);
  }

  window.SkyAgroProductCardHoverAdd = { init };
})();
