(function () {
  'use strict';

  var cards = Array.from(document.querySelectorAll('.featured-products .prod-card'));

  cards.forEach(function (card) {
    if (card.querySelector('.prod-card__media')) {
      return;
    }

    var contentLink = card.querySelector('.prod-card__content-link');
    var imgWrap = contentLink ? contentLink.querySelector('.prod-card__img-wrap') : null;
    var body = contentLink ? contentLink.querySelector('.prod-card__body') : null;

    if (!contentLink || !imgWrap || !body) {
      return;
    }

    var href = contentLink.getAttribute('href') || '#';
    var productName = card.querySelector('.prod-card__name');
    var productLabel = productName ? productName.textContent.trim() : 'product';

    var media = document.createElement('div');
    media.className = 'prod-card__media';

    var imageLink = document.createElement('a');
    imageLink.className = 'prod-card__image-link';
    imageLink.href = href;
    imageLink.setAttribute('aria-label', 'View ' + productLabel);
    imageLink.appendChild(imgWrap);

    var quickAdd = document.createElement('div');
    quickAdd.className = 'prod-card__quick-add';
    quickAdd.innerHTML =
      '<div class="prod-card__quick-add-controls">' +
        '<button type="button" class="prod-card__quick-add-step" data-qty-step="-1" aria-label="Decrease quantity">-</button>' +
        '<span class="prod-card__quick-add-value" aria-live="polite">1</span>' +
        '<button type="button" class="prod-card__quick-add-step" data-qty-step="1" aria-label="Increase quantity">+</button>' +
      '</div>' +
      '<button type="button" class="prod-card__quick-add-btn">Add to Cart</button>';

    var valueEl = quickAdd.querySelector('.prod-card__quick-add-value');

    quickAdd.querySelectorAll('[data-qty-step]').forEach(function (button) {
      button.addEventListener('click', function () {
        var current = parseInt(valueEl.textContent, 10) || 1;
        var next = current + parseInt(button.getAttribute('data-qty-step'), 10);
        valueEl.textContent = String(Math.max(1, next));
      });
    });

    quickAdd.querySelector('.prod-card__quick-add-btn').addEventListener('click', function () {
      quickAdd.classList.add('prod-card__quick-add--pressed');
      window.setTimeout(function () {
        quickAdd.classList.remove('prod-card__quick-add--pressed');
      }, 180);
    });

    media.appendChild(imageLink);
    media.appendChild(quickAdd);

    contentLink.parentNode.insertBefore(media, contentLink);

    media.addEventListener('mouseleave', function () {
      var active = document.activeElement;

      if (active && media.contains(active) && active.blur) {
        active.blur();
      }
    });
  });
}());
