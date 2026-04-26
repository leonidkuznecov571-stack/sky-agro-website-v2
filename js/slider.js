(function () {
  'use strict';

  var slider    = document.querySelector('.hero-slider');
  if (!slider) return;

  var track     = slider.querySelector('.hero-slider__track');
  var slides    = Array.from(slider.querySelectorAll('.hero-slide'));
  var prevBtn   = slider.querySelector('.hero-slider__prev');
  var nextBtn   = slider.querySelector('.hero-slider__next');
  var dotsWrap  = slider.querySelector('.hero-slider__dots');

  var total   = slides.length;
  var current = 0;
  var timer;
  var DELAY   = 5000;

  /* ── Re-show all slides (CSS hides non-first when no JS) ── */
  slides.forEach(function (slide) { slide.style.display = ''; });

  /* ── Build dot buttons ── */
  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'hero-slider__dot' + (i === 0 ? ' hero-slider__dot--active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.setAttribute('role', 'listitem');
    dot.addEventListener('click', function () { goTo(i); resetTimer(); });
    dotsWrap.appendChild(dot);
  });

  var dots = Array.from(dotsWrap.querySelectorAll('.hero-slider__dot'));

  /* ── Navigate to a specific slide ── */
  function goTo(index) {
    slides[current].setAttribute('aria-hidden', 'true');
    dots[current].classList.remove('hero-slider__dot--active');

    current = ((index % total) + total) % total;

    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots[current].classList.add('hero-slider__dot--active');
    slides[current].setAttribute('aria-hidden', 'false');
  }

  /* ── Auto-advance ── */
  function startTimer() {
    timer = setInterval(function () { goTo(current + 1); }, DELAY);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  /* ── Arrow controls ── */
  prevBtn.addEventListener('click', function () { goTo(current - 1); resetTimer(); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); resetTimer(); });

  /* ── Pause on hover ── */
  slider.addEventListener('mouseenter', function () { clearInterval(timer); });
  slider.addEventListener('mouseleave', startTimer);

  /* ── Keyboard navigation (when slider has focus) ── */
  slider.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); resetTimer(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetTimer(); }
  });

  /* ── Touch / swipe support ── */
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

  /* ── Init ── */
  slides.forEach(function (slide, i) {
    slide.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
  });
  startTimer();
}());
