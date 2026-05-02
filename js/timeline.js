(() => {
  const initialised = new WeakSet();

  function init(scope) {
    var root = scope && typeof scope.querySelectorAll === 'function' ? scope : document;
    var timelines = root.querySelectorAll('.timeline');

    if (!timelines.length || !('IntersectionObserver' in window)) {
      return;
    }

    timelines.forEach(function (timeline) {
      if (initialised.has(timeline)) {
        return;
      }

      initialised.add(timeline);
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
    });
  }

  window.SkyAgroTimeline = {
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
