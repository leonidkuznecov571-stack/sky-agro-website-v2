(() => {
  const initialised = new WeakSet();

  function init(scope) {
    var root = scope && typeof scope.querySelectorAll === 'function' ? scope : document;
    var sliders = Array.from(root.querySelectorAll('.hero-slider'));

    sliders.forEach(function (slider) {
      if (initialised.has(slider)) {
        return;
      }

      initialised.add(slider);

      var track = slider.querySelector('.hero-slider__track');
      var slides = Array.from(slider.querySelectorAll('.hero-slide'));
      var prevBtn = slider.querySelector('.hero-slider__prev');
      var nextBtn = slider.querySelector('.hero-slider__next');
      var dotsWrap = slider.querySelector('.hero-slider__dots');

      if (!track || !slides.length || !prevBtn || !nextBtn || !dotsWrap) {
        return;
      }

      var total = slides.length;
      var current = 0;
      var timer;
      var delay = 5000;

      slides.forEach(function (slide) {
        slide.style.display = '';
      });

      dotsWrap.innerHTML = '';

      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'hero-slider__dot' + (i === 0 ? ' hero-slider__dot--active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.setAttribute('role', 'listitem');
        dot.addEventListener('click', function () {
          goTo(i);
          resetTimer();
        });
        dotsWrap.appendChild(dot);
      });

      var dots = Array.from(dotsWrap.querySelectorAll('.hero-slider__dot'));

      function goTo(index) {
        slides[current].setAttribute('aria-hidden', 'true');
        dots[current].classList.remove('hero-slider__dot--active');

        current = ((index % total) + total) % total;

        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dots[current].classList.add('hero-slider__dot--active');
        slides[current].setAttribute('aria-hidden', 'false');
      }

      function startTimer() {
        timer = window.setInterval(function () {
          goTo(current + 1);
        }, delay);
      }

      function resetTimer() {
        window.clearInterval(timer);
        startTimer();
      }

      prevBtn.addEventListener('click', function () {
        goTo(current - 1);
        resetTimer();
      });

      nextBtn.addEventListener('click', function () {
        goTo(current + 1);
        resetTimer();
      });

      slider.addEventListener('mouseenter', function () {
        window.clearInterval(timer);
      });
      slider.addEventListener('mouseleave', startTimer);

      slider.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
          goTo(current - 1);
          resetTimer();
        }
        if (e.key === 'ArrowRight') {
          goTo(current + 1);
          resetTimer();
        }
      });

      var touchStartX = 0;

      slider.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });

      slider.addEventListener('touchend', function (e) {
        var delta = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 50) {
          goTo(delta > 0 ? current + 1 : current - 1);
          resetTimer();
        }
      }, { passive: true });

      slides.forEach(function (slide, i) {
        slide.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
      });
      startTimer();
    });
  }

  window.SkyAgroHeroSlider = {
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
