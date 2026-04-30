(function () {
  'use strict';

  var timeline = document.querySelector('.timeline');
  if (!timeline) return;

  // Bail if the browser doesn't support IntersectionObserver
  if (!('IntersectionObserver' in window)) return;

  // Opt in to animations — items stay visible if JS never runs
  timeline.classList.add('timeline--animated');

  var items = timeline.querySelectorAll('.timeline__item');
  var timelineObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          timeline.classList.add('timeline--visible');
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  var itemObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('timeline__item--visible');
          itemObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.25,
      rootMargin: '0px 0px -12% 0px'
    }
  );

  timelineObserver.observe(timeline);

  items.forEach(function (item, index) {
    item.style.setProperty('--timeline-item-delay', ((index * 0.12) + 0.12) + 's');
    itemObserver.observe(item);
  });
})();
