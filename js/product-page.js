(() => {
  const initialised = new WeakSet();

  function uniqueRadioNames(root) {
    const names = [];

    root.querySelectorAll('.packaging-options input[type="radio"][name]').forEach((input) => {
      if (!names.includes(input.name)) {
        names.push(input.name);
      }
    });

    return names;
  }

  function parsePricing(page) {
    const main = page.closest('main');
    const script = (main && main.querySelector('script[data-product-pricing]'))
      || document.querySelector('script[data-product-pricing]');

    if (!script) {
      return null;
    }

    try {
      return JSON.parse(script.textContent);
    } catch (error) {
      return null;
    }
  }

  function resolvePricing(pricing, selections) {
    let current = pricing;

    for (const value of selections) {
      if (!current || typeof current !== 'object' || !(value in current)) {
        return null;
      }

      current = current[value];
    }

    return current && typeof current === 'object' ? current : null;
  }

  function renderPrice(page, option) {
    const priceEl = page.querySelector('#selected-price, .product-info__price');
    const unitEl = page.querySelector('#selected-unit, .product-info__price-unit');

    if (!priceEl || !option) {
      return;
    }

    if (Object.prototype.hasOwnProperty.call(option, 'label')) {
      priceEl.textContent = option.label;
    } else if (Object.prototype.hasOwnProperty.call(option, 'price')) {
      const numericPrice = Number(option.price);
      priceEl.textContent = Number.isFinite(numericPrice)
        ? `£${numericPrice.toFixed(2)}`
        : String(option.price);
    }

    if (unitEl) {
      unitEl.textContent = option.unit ? `/ ${option.unit}` : '';
    }
  }

  function initPricing(page) {
    const pricing = parsePricing(page);

    if (!pricing) {
      return;
    }

    const groupNames = uniqueRadioNames(page);
    if (!groupNames.length) {
      return;
    }

    const update = () => {
      const selections = groupNames.map((name) => {
        const selected = page.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : null;
      });

      if (selections.some((value) => value === null)) {
        return;
      }

      const option = resolvePricing(pricing, selections);
      renderPrice(page, option);
    };

    groupNames.forEach((name) => {
      page.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
        input.addEventListener('change', update);
      });
    });

    update();
  }

  function initQuantity(page) {
    const qtyInput = page.querySelector('.qty-control__input');
    if (!qtyInput) {
      return;
    }

    const min = Number(qtyInput.min || 1);
    const max = Number(qtyInput.max || 99);

    const clamp = (value) => {
      const safeValue = Number.isFinite(value) ? value : min;
      return Math.min(max, Math.max(min, safeValue));
    };

    page.querySelectorAll('.qty-control__btn[data-qty]').forEach((button) => {
      button.addEventListener('click', () => {
        const current = parseInt(qtyInput.value, 10);
        const delta = parseInt(button.dataset.qty || '0', 10);
        qtyInput.value = String(clamp((Number.isFinite(current) ? current : min) + delta));
      });
    });

    qtyInput.addEventListener('input', () => {
      const current = parseInt(qtyInput.value, 10);
      if (!qtyInput.value) {
        return;
      }

      qtyInput.value = String(clamp(current));
    });

    qtyInput.addEventListener('blur', () => {
      const current = parseInt(qtyInput.value, 10);
      qtyInput.value = String(clamp(current));
    });
  }

  function initGallery(page) {
    const mainImg = page.querySelector('#gallery-main-img, .product-gallery__main-img');
    const thumbs = Array.from(page.querySelectorAll('.product-gallery__thumb'));

    if (!mainImg || !thumbs.length) {
      return;
    }

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        thumbs.forEach((item) => item.classList.remove('is-active'));
        thumb.classList.add('is-active');

        const nextSrc = thumb.dataset.src || thumb.querySelector('img')?.getAttribute('src');
        if (nextSrc) {
          mainImg.src = nextSrc;
        }

        const nextAlt = thumb.querySelector('img')?.getAttribute('alt');
        if (nextAlt) {
          mainImg.alt = nextAlt;
        }
      });
    });
  }

  function initPage(page) {
    if (initialised.has(page)) {
      return;
    }

    initialised.add(page);
    initPricing(page);
    initQuantity(page);
    initGallery(page);
  }

  function init(scope = document) {
    const root = scope && typeof scope.querySelectorAll === 'function' ? scope : document;
    root.querySelectorAll('.product-page').forEach(initPage);
  }

  window.SkyAgroProductPage = {
    init
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init(document), { once: true });
  } else {
    init(document);
  }
})();
