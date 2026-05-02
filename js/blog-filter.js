(() => {
  const initialised = new WeakSet();

  function init(scope) {
    var root = scope && typeof scope.querySelectorAll === 'function' ? scope : document;
    var filterButtons = Array.from(root.querySelectorAll('[data-blog-filter]'));
    var cards = Array.from(root.querySelectorAll('[data-blog-category]'));

    if (!filterButtons.length || !cards.length) {
      return;
    }

    filterButtons.forEach(function (button) {
      if (initialised.has(button)) {
        return;
      }

      initialised.add(button);
      button.addEventListener('click', function () {
        var filter = button.getAttribute('data-blog-filter');

        filterButtons.forEach(function (entry) {
          var isActive = entry.getAttribute('data-blog-filter') === filter;
          entry.classList.toggle('is-active', isActive);
          entry.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        cards.forEach(function (card) {
          var matches = filter === 'all' || card.getAttribute('data-blog-category') === filter;
          card.hidden = !matches;
        });
      });
    });
  }

  window.SkyAgroBlogFilter = {
    init: init
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init(document);
    }, { once: true });
  } else {
    init(document);
  }
})();
