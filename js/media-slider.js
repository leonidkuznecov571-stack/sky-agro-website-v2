(() => {
  const initialised = new WeakSet();

  function init(scope) {
    var root = scope && typeof scope.querySelectorAll === 'function' ? scope : document;
    var sliders = root.querySelectorAll('[data-media-slider]');
    if (!sliders.length) return;

    sliders.forEach(function (slider) {
      if (initialised.has(slider)) {
        return;
      }

      initialised.add(slider);

    var track = slider.querySelector('.media-slider__track');
    var slides = Array.from(slider.querySelectorAll('.media-slider__slide'));
    var prevBtn = slider.querySelector('[data-media-slider-prev]');
    var nextBtn = slider.querySelector('[data-media-slider-next]');
    var dotsWrap = slider.querySelector('[data-media-slider-dots]');
    var controls = slider.querySelector('.media-slider__controls');

    if (!track || slides.length <= 1 || !prevBtn || !nextBtn || !dotsWrap || !controls) return;

    var current = 0;
    var touchStartX = 0;

    controls.hidden = false;

    slides.forEach(function (slide, index) {
      slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');

      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero-slider__dot' + (index === 0 ? ' hero-slider__dot--active' : '');
      dot.setAttribute('aria-label', 'Go to image ' + (index + 1));
      dot.setAttribute('role', 'listitem');
      dot.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
      dot.addEventListener('click', function () {
        goTo(index);
      });
      dotsWrap.appendChild(dot);
    });

    var dots = Array.from(dotsWrap.querySelectorAll('.hero-slider__dot'));

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';

      slides.forEach(function (slide, slideIndex) {
        slide.setAttribute('aria-hidden', slideIndex === current ? 'false' : 'true');
      });

      dots.forEach(function (dot, dotIndex) {
        var isActive = dotIndex === current;
        dot.classList.toggle('hero-slider__dot--active', isActive);
        dot.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }

    prevBtn.addEventListener('click', function () {
      goTo(current - 1);
    });

    nextBtn.addEventListener('click', function () {
      goTo(current + 1);
    });

    slider.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(current - 1);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(current + 1);
      }
    });

    slider.addEventListener('touchstart', function (event) {
      touchStartX = event.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', function (event) {
      var delta = touchStartX - event.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) {
        goTo(delta > 0 ? current + 1 : current - 1);
      }
    }, { passive: true });

      goTo(0);
    });
  }

  window.SkyAgroMediaSlider = {
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
