(function () {
  'use strict';

  var timeline = document.querySelector('.timeline');
  if (!timeline) return;

  // Bail if the browser doesn't support IntersectionObserver
  if (!('IntersectionObserver' in window)) return;

  // Opt in to animations — items stay visible if JS never runs
  timeline.classList.add('timeline--animated');

  var items = timeline.querySelectorAll('.timeline__item');

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('timeline__item--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  items.forEach(function (item, index) {
    item.style.transitionDelay = (index * 0.18) + 's';
    observer.observe(item);
  });
})();
