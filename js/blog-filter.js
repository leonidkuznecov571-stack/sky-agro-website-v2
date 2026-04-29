(function () {
  'use strict';

  var filterButtons = Array.from(document.querySelectorAll('[data-blog-filter]'));
  var cards = Array.from(document.querySelectorAll('[data-blog-category]'));

  if (!filterButtons.length || !cards.length) {
    return;
  }

  function setFilter(filter) {
    filterButtons.forEach(function (button) {
      var isActive = button.getAttribute('data-blog-filter') === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    cards.forEach(function (card) {
      var matches = filter === 'all' || card.getAttribute('data-blog-category') === filter;
      card.hidden = !matches;
    });
  }

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      setFilter(button.getAttribute('data-blog-filter'));
    });
  });
}());
