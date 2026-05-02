(() => {
  const initialised = new WeakSet();

  function init(scope = document) {
    const root = scope && typeof scope.querySelectorAll === 'function' ? scope : document;

    root.querySelectorAll('.related-products').forEach((section) => {
      if (initialised.has(section)) {
        return;
      }

      initialised.add(section);

      const track = section.querySelector('[data-related-track]');
      const prev = section.querySelector('[data-related-prev]');
      const next = section.querySelector('[data-related-next]');

      if (!track || !prev || !next) return;

      const scrollRelated = (direction) => {
        track.scrollBy({
          left: track.clientWidth * direction,
          behavior: 'smooth'
        });
      };

      prev.addEventListener('click', () => scrollRelated(-1));
      next.addEventListener('click', () => scrollRelated(1));
    });
  }

  window.SkyAgroRelatedProducts = {
    init
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init(document), { once: true });
  } else {
    init(document);
  }
})();
