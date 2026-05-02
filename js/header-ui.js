(() => {
  function normalisePath(path) {
    const cleaned = path.replace(/\/index\.html$|\.html$/, '').replace(/\/+$/, '');
    return cleaned || '/';
  }

  function setActiveLinks(header) {
    const currentPath = normalisePath(window.location.pathname);

    header.querySelectorAll('[data-nav-match]').forEach((el) => {
      const matchPath = normalisePath(el.dataset.navMatch || '');
      const isHome = matchPath === '/';
      const isActive = isHome
        ? currentPath === '/'
        : currentPath === matchPath || currentPath.startsWith(`${matchPath}/`);

      if (!isActive) {
        return;
      }

      el.classList.add('category-nav__link--active');
      el.setAttribute('aria-current', 'page');
    });
  }

  function initMobileNav(header) {
    const hamburger = header.querySelector('.main-bar__hamburger');
    const drawer = header.querySelector('.mobile-nav');

    if (!hamburger || !drawer) {
      return;
    }

    const closeEls = header.querySelectorAll('[data-close-nav]');
    const drawerLinks = drawer.querySelectorAll('a');
    const accordionToggles = drawer.querySelectorAll('[data-mobile-nav-toggle]');

    function setAccordionState(toggle, shouldOpen) {
      const panelId = toggle.getAttribute('aria-controls');
      const panel = panelId ? drawer.querySelector(`#${panelId}`) : null;

      toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');

      if (panel) {
        panel.classList.toggle('is-open', shouldOpen);
      }
    }

    accordionToggles.forEach((toggle) => {
      setAccordionState(toggle, toggle.getAttribute('aria-expanded') === 'true');

      toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        setAccordionState(toggle, !isExpanded);
      });
    });

    function openNav() {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close navigation menu');
      hamburger.classList.add('is-active');
      document.body.classList.add('nav-open');
      drawer.querySelector('.mobile-nav__close').focus();
    }

    function closeNav({ returnFocus = true } = {}) {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open navigation menu');
      hamburger.classList.remove('is-active');
      document.body.classList.remove('nav-open');

      if (returnFocus) {
        hamburger.focus();
      }
    }

    hamburger.addEventListener('click', () => {
      if (drawer.classList.contains('is-open')) {
        closeNav();
        return;
      }

      openNav();
    });

    closeEls.forEach((el) => el.addEventListener('click', () => closeNav()));
    drawerLinks.forEach((link) => link.addEventListener('click', () => closeNav({ returnFocus: false })));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeNav();
      }
    });

    drawer.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab' || !drawer.classList.contains('is-open')) {
        return;
      }

      const focusable = Array.from(drawer.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        return;
      }

      if (event.shiftKey ? document.activeElement === first : document.activeElement === last) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    });
  }

  function initCatalogueCardHoverAdd(root, loadScript) {
    const currentPath = normalisePath(window.location.pathname);
    const isSupportedCataloguePath = (
      currentPath === '/shop/brewing-ingredients' ||
      currentPath.startsWith('/shop/brewing-ingredients/') ||
      currentPath === '/shop/chemical-products' ||
      currentPath.startsWith('/shop/chemical-products/') ||
      currentPath === '/shop/kegs-packaging' ||
      currentPath.startsWith('/shop/kegs-packaging/')
    );

    if (!isSupportedCataloguePath || !document.querySelector('.prod-results .prod-card')) {
      return;
    }

    loadScript(
      `${root}/js/product-card-hover-add.js`,
      () => typeof window.SkyAgroProductCardHoverAdd?.init === 'function'
    ).then(() => {
      window.SkyAgroProductCardHoverAdd.init();
    }).catch(() => {
      // Keep the catalogue cards in their static state if the enhancement fails.
    });
  }

  function initPageEnhancements(root, loadScript) {
    const featureChecks = [
      {
        selector: '.hero-slider',
        src: `${root}/js/slider.js`,
        test: () => typeof window.SkyAgroHeroSlider?.init === 'function',
        init: () => window.SkyAgroHeroSlider.init()
      },
      {
        selector: '[role="tablist"]',
        src: `${root}/js/tabs.js`,
        test: () => typeof window.SkyAgroTabs?.init === 'function',
        init: () => window.SkyAgroTabs.init()
      },
      {
        selector: '.timeline',
        src: `${root}/js/timeline.js`,
        test: () => typeof window.SkyAgroTimeline?.init === 'function',
        init: () => window.SkyAgroTimeline.init()
      },
      {
        selector: '[data-media-slider]',
        src: `${root}/js/media-slider.js`,
        test: () => typeof window.SkyAgroMediaSlider?.init === 'function',
        init: () => window.SkyAgroMediaSlider.init()
      },
      {
        selector: '.related-products',
        src: `${root}/js/related-products.js`,
        test: () => typeof window.SkyAgroRelatedProducts?.init === 'function',
        init: () => window.SkyAgroRelatedProducts.init()
      },
      {
        selector: '.product-page',
        src: `${root}/js/product-page.js`,
        test: () => typeof window.SkyAgroProductPage?.init === 'function',
        init: () => window.SkyAgroProductPage.init()
      },
      {
        selector: 'footer.site-footer, .contact-form, .quote-request__form, #login-form, #signup-form',
        src: `${root}/js/forms.js`,
        test: () => typeof window.SkyAgroForms?.init === 'function',
        init: () => window.SkyAgroForms.init()
      },
      {
        selector: '[data-blog-filter]',
        src: `${root}/js/blog-filter.js`,
        test: () => typeof window.SkyAgroBlogFilter?.init === 'function',
        init: () => window.SkyAgroBlogFilter.init()
      }
    ];

    featureChecks.forEach((feature) => {
      if (!document.querySelector(feature.selector)) {
        return;
      }

      loadScript(feature.src, feature.test)
        .then(feature.init)
        .catch(() => {});
    });
  }

  function init(header, options) {
    const root = options.root || '';
    const loadScript = options.loadScript;

    setActiveLinks(header);
    initMobileNav(header);
    initCatalogueCardHoverAdd(root, loadScript);
    initPageEnhancements(root, loadScript);
  }

  window.SkyAgroHeaderUI = {
    init,
    normalisePath
  };
})();
