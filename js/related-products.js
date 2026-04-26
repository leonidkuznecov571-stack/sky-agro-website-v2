(() => {
  document.querySelectorAll('.related-products').forEach((section) => {
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
})();
