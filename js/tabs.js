(function () {
  'use strict';

  function animatePanel(panel) {
    if (!panel || !panel.classList || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    panel.classList.remove('featured-products__panel--entering');
    void panel.offsetWidth;
    panel.classList.add('featured-products__panel--entering');
  }

  /* Activate a tab and its panel, deactivate the rest.
     Updates sibling prev/next arrow disabled state if provided. */
  function activateTab(tabs, panels, target, prevBtn, nextBtn, shouldAnimate) {
    var previous = tabs.find(function (tab) {
      return tab.getAttribute('aria-selected') === 'true';
    });

    tabs.forEach(function (tab) {
      var isTarget = tab === target;
      tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      tab.setAttribute('tabindex', isTarget ? '0' : '-1');
      tab.classList.toggle('featured-products__tab--active', isTarget);
    });

    var targetPanelId = target.getAttribute('aria-controls');
    var targetPanel = null;

    panels.forEach(function (panel) {
      var isTargetPanel = panel.id === targetPanelId;
      panel.hidden = !isTargetPanel;

      if (isTargetPanel) {
        targetPanel = panel;
      }
    });

    if (shouldAnimate && previous !== target) {
      animatePanel(targetPanel);
    }

    if (prevBtn && nextBtn) {
      var idx = tabs.indexOf(target);
      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx === tabs.length - 1;
    }
  }

  /* Wire up every tablist on the page. */
  var tablists = Array.from(document.querySelectorAll('[role="tablist"]'));

  tablists.forEach(function (tablist) {
    var tabs   = Array.from(tablist.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (tab) {
      return document.getElementById(tab.getAttribute('aria-controls'));
    }).filter(Boolean);
    var shouldAnimate = tablist.classList.contains('featured-products__tabs');

    /* Look for sibling prev/next arrow buttons (.new-offers__arrows). */
    var arrowsWrap = tablist.parentElement
      ? tablist.parentElement.querySelector('.new-offers__arrows')
      : null;
    var arrows  = arrowsWrap ? Array.from(arrowsWrap.querySelectorAll('.new-offers__arrow')) : [];
    var prevBtn = arrows[0] || null;
    var nextBtn = arrows[1] || null;

    function activeTab() {
      return tabs.find(function (t) {
        return t.getAttribute('aria-selected') === 'true';
      }) || tabs[0];
    }

    /* Tab click */
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tabs, panels, tab, prevBtn, nextBtn, shouldAnimate);
      });
    });

    /* Arrow-key navigation per ARIA tabs pattern */
    tabs.forEach(function (tab, i) {
      tab.addEventListener('keydown', function (e) {
        var next;
        if (e.key === 'ArrowRight') {
          next = tabs[(i + 1) % tabs.length];
        } else if (e.key === 'ArrowLeft') {
          next = tabs[(i - 1 + tabs.length) % tabs.length];
        } else if (e.key === 'Home') {
          next = tabs[0];
        } else if (e.key === 'End') {
          next = tabs[tabs.length - 1];
        }

        if (next) {
          e.preventDefault();
          activateTab(tabs, panels, next, prevBtn, nextBtn, shouldAnimate);
          next.focus();
        }
      });
    });

    /* Prev / Next arrow buttons */
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        var idx = tabs.indexOf(activeTab());
        if (idx > 0) {
          activateTab(tabs, panels, tabs[idx - 1], prevBtn, nextBtn, shouldAnimate);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        var idx = tabs.indexOf(activeTab());
        if (idx < tabs.length - 1) {
          activateTab(tabs, panels, tabs[idx + 1], prevBtn, nextBtn, shouldAnimate);
        }
      });
    }

    /* Set initial arrow state */
    if (prevBtn && nextBtn) {
      prevBtn.disabled = true;
      nextBtn.disabled = tabs.length <= 1;
    }
  });
}());
