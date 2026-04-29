(() => {
  const scriptEl = document.querySelector('script[src$="header.js"]');
  const ROOT = scriptEl ? scriptEl.src.replace(/\/js\/header\.js.*$/, '') : '';

  window.SKY_AGRO_ROOT = ROOT || '';

  const HEADER_HTML = `
    <div class="utility-bar">
      <div class="container utility-bar__inner">
        <nav class="utility-bar__left" aria-label="Secondary navigation">
          <a href="${ROOT}/about.html" class="utility-bar__link" data-nav-match="/about.html">About us</a>
          <a href="${ROOT}/blog.html" class="utility-bar__link" data-nav-match="/blog.html">Blog</a>
          <a href="${ROOT}/catalogues.html" class="utility-bar__link" data-nav-match="/catalogues.html">Catalogues</a>
          <a href="${ROOT}/contact.html" class="utility-bar__link" data-nav-match="/contact.html">Contact us</a>
        </nav>
        <div class="utility-bar__right">
          <a href="mailto:info@sky-agro.com" class="utility-bar__link">
            <img src="${ROOT}/assets/icons/contact-icons/email-icon-white.svg" alt="" class="utility-bar__contact-icon utility-bar__contact-icon--email" width="16" height="16" aria-hidden="true">
            info@sky-agro.com
          </a>
          <span class="utility-bar__divider" aria-hidden="true">|</span>
          <a href="tel:+447460379173" class="utility-bar__link">
            <img src="${ROOT}/assets/icons/contact-icons/phone-icon-white.svg" alt="" class="utility-bar__contact-icon" width="16" height="16" aria-hidden="true">
            07460 379 173
          </a>
          <span class="utility-bar__divider" aria-hidden="true">|</span>
          <a href="${ROOT}/spain.html" class="utility-bar__link" data-nav-match="/spain.html">
            <img src="${ROOT}/assets/icons/flag-icons/spain-icon.svg" alt="Spanish flag" class="utility-bar__flag" width="20" height="14">
            Comprar en España
          </a>
        </div>
      </div>
    </div>

    <div class="main-bar">
      <div class="container main-bar__inner">
        <a href="${ROOT}/index.html" class="main-bar__logo" aria-label="SKY AGRO — go to homepage">
          <img src="${ROOT}/assets/logos/sky-agro-logo.svg" alt="SKY AGRO" width="224" height="78">
        </a>
        <form class="search-bar" role="search" action="${ROOT}/index.html" method="get" data-product-search-form>
          <label for="site-search" class="sr-only">Search for products</label>
          <div class="search-bar__field">
            <input
              type="search"
              id="site-search"
              name="q"
              class="search-bar__input"
              placeholder="Search for products"
              autocomplete="off"
              enterkeyhint="search"
              aria-controls="site-search-results"
              data-product-search-input
            >
            <button type="submit" class="search-bar__btn" aria-label="Search">
              <img src="${ROOT}/assets/icons/utility-icons/lookup-glass.svg" alt="" width="20" height="20" aria-hidden="true">
            </button>
          </div>
          <div
            class="search-bar__panel"
            id="site-search-results"
            aria-label="Matching products"
            hidden
            data-product-search-panel
          ></div>
        </form>
        <div class="main-bar__actions">
          <a href="${ROOT}/login.html" class="main-bar__action" aria-label="My account">
            <svg class="main-bar__action-icon" viewBox="0 0 24 30" aria-hidden="true" focusable="false"><g transform="translate(0 3.178)"><path fill="currentColor" d="M7.267 8.378c0 2.61 2.123 4.733 4.733 4.733s4.733-2.123 4.733-4.733c0-2.611-2.123-4.734-4.733-4.734S7.267 5.767 7.267 8.378Zm8.178 0c0 1.899-1.545 3.445-3.444 3.445S8.556 10.278 8.556 8.378c0-1.9 1.545-3.446 3.445-3.446 1.898-.001 3.444 1.545 3.444 3.446Z"/><path fill="currentColor" d="M21.287 19.636c-.506-4.196-2.405-6.342-5.806-6.561a.637.637 0 0 0-.425.126c-.905.672-1.962 1.027-3.056 1.027-1.093 0-2.151-.355-3.06-1.028a.64.64 0 0 0-.425-.125c-3.399.22-5.297 2.367-5.803 6.561a.647.647 0 0 0 .64.721h17.296a.646.646 0 0 0 .639-.721ZM4.096 19.069c.516-2.991 1.857-4.455 4.279-4.691 1.086.745 2.334 1.137 3.625 1.137 1.292 0 2.539-.392 3.623-1.137 2.423.235 3.765 1.699 4.281 4.691Z"/></g></svg>
            <span>Login</span>
          </a>
          <a href="#" class="main-bar__action" aria-label="Wishlist — 0 items">
            <span class="main-bar__action-icon-wrap">
              <svg class="main-bar__action-icon" viewBox="-5 -10 110 135" aria-hidden="true" focusable="false"><path fill="currentColor" d="M50 96.182a3.11 3.11 0 0 1-2.207-.914L18.625 66.1c-5.898-5.82-9.227-13.754-9.25-22.043.012-5.961 2.387-11.676 6.602-15.895 4.219-4.214 9.934-6.59 15.895-6.602 5.961-.012 11.688 2.34 15.922 6.539L50 30.306l2.207-2.207c4.223-4.227 9.957-6.601 15.93-6.598 5.977.004 11.703 2.383 15.922 6.614 4.219 4.234 6.582 9.968 6.566 15.941.023 8.195-3.23 16.059-9.043 21.836L52.414 95.267a3.38 3.38 0 0 1-2.414.915ZM31.875 27.768a16.12 16.12 0 0 0-11.48 4.797 16.12 16.12 0 0 0-4.77 11.492c.039 6.523 2.626 12.773 7.208 17.418L50 88.643l27.168-27.168c4.582-4.645 7.168-10.895 7.207-17.418.016-4.316-1.687-8.465-4.734-11.524-3.047-3.061-7.188-4.781-11.504-4.785-4.32-.004-8.461 1.711-11.512 4.77l-4.418 4.414a3.12 3.12 0 0 1-4.414 0l-4.418-4.414a16.108 16.108 0 0 0-11.5-4.75Z"/></svg>
              <span class="main-bar__badge" aria-hidden="true">0</span>
            </span>
          </a>
          <a href="${ROOT}/cart.html" class="main-bar__action" aria-label="Shopping cart — 0 items">
            <span class="main-bar__action-icon-wrap">
              <svg class="main-bar__action-icon" viewBox="0 0 100 125" aria-hidden="true" focusable="false"><g transform="translate(-0.53 11.123)"><path fill="currentColor" d="M95.4 23.7C93.6 21.4 90.8 20 87.9 20H27l-1.9-7.4c-1.1-4.3-4.9-7.3-9.3-7.3H5.6a3.1 3.1 0 1 0 0 6.2h10.2c1.5 0 2.8 1 3.2 2.5l12.2 48.6c1.1 4.3 4.9 7.3 9.3 7.3h39.9c4.4 0 8.3-3 9.3-7.3l7.5-30.8c.7-2.8.1-5.8-1.8-8.1Zm-4.3 6.7-7.5 30.8c-.4 1.5-1.7 2.5-3.2 2.5H40.5c-1.5 0-2.8-1-3.2-2.5l-8.7-34.9h59.3c1 0 2 .5 2.6 1.3.6.8.9 1.8.6 2.8Z"/><path fill="currentColor" d="M42.6 73.9c-5.7 0-10.4 4.7-10.4 10.4 0 5.7 4.7 10.4 10.4 10.4C48.3 94.7 53 90 53 84.3c0-5.7-4.7-10.4-10.4-10.4Zm0 14.5c-2.3 0-4.1-1.8-4.1-4.1 0-2.3 1.8-4.1 4.1-4.1 2.3 0 4.1 1.8 4.1 4.1 0 2.2-1.9 4.1-4.1 4.1Z"/><path fill="currentColor" d="M77 73.9c-5.7 0-10.4 4.7-10.4 10.4 0 5.7 4.7 10.4 10.4 10.4 5.7 0 10.4-4.7 10.4-10.4 0-5.7-4.6-10.4-10.4-10.4Zm0 14.5c-2.3 0-4.1-1.8-4.1-4.1 0-2.3 1.8-4.1 4.1-4.1 2.3 0 4.1 1.8 4.1 4.1 0 2.2-1.8 4.1-4.1 4.1Z"/></g></svg>
              <span class="main-bar__badge" aria-hidden="true">0</span>
            </span>
          </a>
        </div>
        <button class="main-bar__hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-nav">
          <span class="main-bar__hamburger-box" aria-hidden="true">
            <span class="main-bar__hamburger-line"></span>
            <span class="main-bar__hamburger-line"></span>
            <span class="main-bar__hamburger-line"></span>
          </span>
        </button>
      </div>
    </div>

    <nav class="category-nav" aria-label="Product categories">
      <div class="container category-nav__inner">
        <a href="${ROOT}/index.html" class="category-nav__link" data-nav-match="/index.html">Home</a>

        <div class="category-nav__item">
          <a href="${ROOT}/products/brewing-ingredients/" class="category-nav__btn" aria-haspopup="true" data-nav-match="/products/brewing-ingredients">
            Brewing Ingredients
            <svg class="category-nav__chevron" viewBox="0 0 169.3 125" aria-hidden="true" focusable="false"><path d="m 167.9,25.430508 -8.5,-8.5 c -2.3,-2.3 -6.2,-2.3 -8.5,0 l -61.9,62.3 c -2.3,2.3 -6.2,2.3 -8.5,0 l -61.8,-62.7 c -2.3,-2.3 -6.2,-2.3 -8.5,0 l -8.5,8.5 c -2.3,2.3 -2.3,6.2 0,8.5 l 78.8,79.600002 c 2.3,2.3 6.2,2.3 8.5,0 l 78.8,-79.600002 c 2,-2.4 2,-5.8 0.1,-8.1 z" fill="currentColor"/></svg>
          </a>
          <ul class="category-nav__dropdown" role="list">
            <li><a href="${ROOT}/products/brewing-ingredients/malts/" class="category-nav__dropdown-link">Base &amp; Speciality Malts</a></li>
            <li><a href="${ROOT}/products/brewing-ingredients/yeast-fermentation/" class="category-nav__dropdown-link">Yeast</a></li>
            <li><a href="${ROOT}/products/brewing-ingredients/sugars-adjuncts/" class="category-nav__dropdown-link">Sugars &amp; Adjuncts</a></li>
          </ul>
        </div>

        <div class="category-nav__item">
          <a href="${ROOT}/products/chemical-products/" class="category-nav__btn" aria-haspopup="true" data-nav-match="/products/chemical-products">
            Chemical Products
            <svg class="category-nav__chevron" viewBox="0 0 169.3 125" aria-hidden="true" focusable="false"><path d="m 167.9,25.430508 -8.5,-8.5 c -2.3,-2.3 -6.2,-2.3 -8.5,0 l -61.9,62.3 c -2.3,2.3 -6.2,2.3 -8.5,0 l -61.8,-62.7 c -2.3,-2.3 -6.2,-2.3 -8.5,0 l -8.5,8.5 c -2.3,2.3 -2.3,6.2 0,8.5 l 78.8,79.600002 c 2.3,2.3 6.2,2.3 8.5,0 l 78.8,-79.600002 c 2,-2.4 2,-5.8 0.1,-8.1 z" fill="currentColor"/></svg>
          </a>
          <ul class="category-nav__dropdown" role="list">
            <li><a href="${ROOT}/products/chemical-products/hygiene-chemicals/" class="category-nav__dropdown-link">Hygiene Chemicals</a></li>
            <li><a href="${ROOT}/products/chemical-products/processing-aids/" class="category-nav__dropdown-link">Processing Aids</a></li>
            <li><a href="${ROOT}/products/chemical-products/finings-clarification/" class="category-nav__dropdown-link">Finings &amp; Clarification</a></li>
            <li><a href="${ROOT}/products/chemical-products/additional-products/" class="category-nav__dropdown-link">Additional Products</a></li>
          </ul>
        </div>

        <div class="category-nav__item">
          <a href="${ROOT}/products/equipment/" class="category-nav__btn" aria-haspopup="true" data-nav-match="/products/equipment">
            Equipment
            <svg class="category-nav__chevron" viewBox="0 0 169.3 125" aria-hidden="true" focusable="false"><path d="m 167.9,25.430508 -8.5,-8.5 c -2.3,-2.3 -6.2,-2.3 -8.5,0 l -61.9,62.3 c -2.3,2.3 -6.2,2.3 -8.5,0 l -61.8,-62.7 c -2.3,-2.3 -6.2,-2.3 -8.5,0 l -8.5,8.5 c -2.3,2.3 -2.3,6.2 0,8.5 l 78.8,79.600002 c 2.3,2.3 6.2,2.3 8.5,0 l 78.8,-79.600002 c 2,-2.4 2,-5.8 0.1,-8.1 z" fill="currentColor"/></svg>
          </a>
          <ul class="category-nav__dropdown" role="list">
            <li class="category-nav__dropdown-item category-nav__dropdown-item--has-sub">
              <a href="${ROOT}/products/equipment/brewhouses/" class="category-nav__dropdown-link category-nav__dropdown-link--parent">Brewhouses<svg class="sub-arrow" width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
              <ul class="category-nav__sub-dropdown" role="list">
                <li><a href="${ROOT}/products/equipment/brewhouses/pilot-brewing-system/" class="category-nav__dropdown-link">Pilot Brewing System</a></li>
                <li><a href="${ROOT}/products/equipment/brewhouses/brewpub-brewhouse/" class="category-nav__dropdown-link">Brewpub Brewhouse</a></li>
                <li><a href="${ROOT}/products/equipment/brewhouses/craft-brewery-brewhouse/" class="category-nav__dropdown-link">Craft Brewery Brewhouse</a></li>
                <li><a href="${ROOT}/products/equipment/brewhouses/industrial-brewery-system/" class="category-nav__dropdown-link">Industrial Brewery System</a></li>
              </ul>
            </li>
            <li class="category-nav__dropdown-item category-nav__dropdown-item--has-sub">
              <a href="${ROOT}/products/equipment/tanks/" class="category-nav__dropdown-link category-nav__dropdown-link--parent">Tanks<svg class="sub-arrow" width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
              <ul class="category-nav__sub-dropdown" role="list">
                <li><a href="${ROOT}/products/equipment/tanks/fermentation-vessels/" class="category-nav__dropdown-link">Fermentation Vessels</a></li>
                <li><a href="${ROOT}/products/equipment/tanks/brite-beer-tanks-bbts/" class="category-nav__dropdown-link">Brite Beer Tanks (BBTs)</a></li>
                <li><a href="${ROOT}/products/equipment/tanks/serving-tanks/" class="category-nav__dropdown-link">Serving Tanks</a></li>
                <li><a href="${ROOT}/products/equipment/tanks/dairy-tanks/" class="category-nav__dropdown-link">Dairy Tanks</a></li>
                <li><a href="${ROOT}/products/equipment/tanks/water-tanks/" class="category-nav__dropdown-link">Water Tanks</a></li>
                <li><a href="${ROOT}/products/equipment/tanks/beverage-tanks/" class="category-nav__dropdown-link">Beverage Tanks</a></li>
                <li><a href="${ROOT}/products/equipment/tanks/yeast-propagation-tank/" class="category-nav__dropdown-link">Yeast Propagation Tank</a></li>
              </ul>
            </li>
            <li class="category-nav__dropdown-item category-nav__dropdown-item--has-sub">
              <a href="${ROOT}/products/equipment/processing/" class="category-nav__dropdown-link category-nav__dropdown-link--parent">Processing<svg class="sub-arrow" width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
              <ul class="category-nav__sub-dropdown" role="list">
                <li><a href="${ROOT}/products/equipment/processing/cip/" class="category-nav__dropdown-link">CIP</a></li>
                <li><a href="${ROOT}/products/equipment/processing/pasteurisation/" class="category-nav__dropdown-link">Pasteurisation</a></li>
                <li><a href="${ROOT}/products/equipment/processing/blending-carbonation/" class="category-nav__dropdown-link">Blending &amp; Carbonation</a></li>
                <li><a href="${ROOT}/products/equipment/processing/dealcoholiser/" class="category-nav__dropdown-link">Dealcoholiser</a></li>
                <li><a href="${ROOT}/products/equipment/processing/water-treatment/" class="category-nav__dropdown-link">Water Treatment</a></li>
                <li><a href="${ROOT}/products/equipment/processing/keg-equipment/" class="category-nav__dropdown-link">Keg Equipment</a></li>
              </ul>
            </li>
            <li class="category-nav__dropdown-item category-nav__dropdown-item--has-sub">
              <a href="${ROOT}/products/equipment/additional-equipment/" class="category-nav__dropdown-link category-nav__dropdown-link--parent">Additional Equipment<svg class="sub-arrow" width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
              <ul class="category-nav__sub-dropdown" role="list">
                <li><a href="${ROOT}/products/equipment/additional-equipment/malt-mill/" class="category-nav__dropdown-link">Malt Mill</a></li>
                <li><a href="${ROOT}/products/equipment/additional-equipment/tubular-conveyor/" class="category-nav__dropdown-link">Tubular Conveyor</a></li>
                <li><a href="${ROOT}/products/equipment/additional-equipment/yeast-propagation-system/" class="category-nav__dropdown-link">Yeast Propagation System</a></li>
                <li><a href="${ROOT}/products/equipment/additional-equipment/dry-hopping-gun/" class="category-nav__dropdown-link">Dry-Hopping Gun</a></li>
              </ul>
            </li>
            <li class="category-nav__dropdown-item category-nav__dropdown-item--has-sub">
              <a href="${ROOT}/products/equipment/other-beverages/" class="category-nav__dropdown-link category-nav__dropdown-link--parent">Other Beverages<svg class="sub-arrow" width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
              <ul class="category-nav__sub-dropdown" role="list">
                <li><a href="${ROOT}/products/equipment/other-beverages/distilling-system/" class="category-nav__dropdown-link">Distilling System</a></li>
                <li><a href="${ROOT}/products/equipment/processing/blending-carbonation/beverage-production-line/" class="category-nav__dropdown-link">Beverage Production Line</a></li>
                <li><a href="${ROOT}/products/equipment/other-beverages/kombucha-brewhouse/" class="category-nav__dropdown-link">Kombucha Brewhouse</a></li>
                <li><a href="${ROOT}/products/equipment/other-beverages/cold-coffee-brewhouse/" class="category-nav__dropdown-link">Cold-Coffee Brewhouse</a></li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="category-nav__item">
          <a href="${ROOT}/products/kegs-packaging/" class="category-nav__btn" aria-haspopup="true" data-nav-match="/products/kegs-packaging">
            Kegs &amp; Packaging
            <svg class="category-nav__chevron" viewBox="0 0 169.3 125" aria-hidden="true" focusable="false"><path d="m 167.9,25.430508 -8.5,-8.5 c -2.3,-2.3 -6.2,-2.3 -8.5,0 l -61.9,62.3 c -2.3,2.3 -6.2,2.3 -8.5,0 l -61.8,-62.7 c -2.3,-2.3 -6.2,-2.3 -8.5,0 l -8.5,8.5 c -2.3,2.3 -2.3,6.2 0,8.5 l 78.8,79.600002 c 2.3,2.3 6.2,2.3 8.5,0 l 78.8,-79.600002 c 2,-2.4 2,-5.8 0.1,-8.1 z" fill="currentColor"/></svg>
          </a>
          <ul class="category-nav__dropdown" role="list">
            <li><a href="${ROOT}/products/kegs-packaging/one-way-kegs/" class="category-nav__dropdown-link">One-way Kegs</a></li>
            <li><a href="${ROOT}/products/kegs-packaging/cask-packaging/" class="category-nav__dropdown-link">Cask Packaging</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
      <div class="mobile-nav__overlay" data-close-nav></div>
      <nav class="mobile-nav__drawer" aria-label="Mobile navigation">
        <button class="mobile-nav__close" aria-label="Close navigation menu" data-close-nav>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="mobile-nav__utility">
          <a href="mailto:info@sky-agro.com" class="mobile-nav__util-link">info@sky-agro.com</a>
          <a href="tel:+447460379173" class="mobile-nav__util-link">07460 379 173</a>
        </div>
        <ul class="mobile-nav__list" role="list">
          <li><a href="${ROOT}/index.html" class="mobile-nav__link">Home</a></li>
          <li><a href="${ROOT}/products/brewing-ingredients/" class="mobile-nav__link">Brewing Ingredients</a></li>
          <li><a href="${ROOT}/products/chemical-products/" class="mobile-nav__link">Chemical Products</a></li>
          <li><a href="${ROOT}/products/equipment/" class="mobile-nav__link">Equipment</a></li>
          <li><a href="${ROOT}/products/kegs-packaging/" class="mobile-nav__link">Kegs &amp; Packaging</a></li>
          <li><a href="${ROOT}/about.html" class="mobile-nav__link">About us</a></li>
          <li><a href="${ROOT}/blog.html" class="mobile-nav__link">Blog</a></li>
          <li><a href="${ROOT}/catalogues.html" class="mobile-nav__link">Catalogues</a></li>
          <li><a href="${ROOT}/contact.html" class="mobile-nav__link">Contact us</a></li>
        </ul>
      </nav>
    </div>
  `;

  const sharedScriptLoads = new Map();

  function normalisePath(path) {
    const cleaned = path.replace(/index\.html$/, '').replace(/\/+$/, '');
    return cleaned || '/';
  }

  function setActiveLinks(header) {
    const currentPath = normalisePath(window.location.pathname);

    header.querySelectorAll('[data-nav-match]').forEach(el => {
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

  function loadScript(src, test) {
    if (test()) {
      return Promise.resolve();
    }

    if (sharedScriptLoads.has(src)) {
      return sharedScriptLoads.get(src);
    }

    const absoluteSrc = new URL(src, window.location.href).href;
    let script = Array.from(document.scripts).find(entry => entry.src === absoluteSrc);

    const promise = new Promise((resolve, reject) => {
      const handleLoad = () => {
        if (test()) {
          resolve();
        } else {
          reject(new Error(`Loaded ${src} but expected global was unavailable.`));
        }
      };

      const handleError = () => reject(new Error(`Unable to load ${src}.`));

      if (!script) {
        script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
      } else if (test()) {
        resolve();
        return;
      }

      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', handleError, { once: true });
    });

    sharedScriptLoads.set(src, promise);
    return promise;
  }

  function initSearch(header) {
    const searchInput = header.querySelector('[data-product-search-input]');
    const currentQuery = new URLSearchParams(window.location.search).get('q');

    if (searchInput && currentQuery) {
      searchInput.value = currentQuery;
    }

    Promise.all([
      loadScript(`${ROOT}/js/search.js`, () => typeof window.SkyAgroSearch?.initHeaderSearch === 'function'),
      loadScript(`${ROOT}/js/product-search-data.js`, () => Array.isArray(window.SKY_AGRO_PRODUCT_INDEX))
    ]).then(() => {
      window.SkyAgroSearch.initHeaderSearch(header, { root: ROOT || '' });
    }).catch(() => {
      // Leave the form as a normal GET search if the enhancement cannot load.
    });
  }

  function initMobileNav(header) {
    const hamburger = header.querySelector('.main-bar__hamburger');
    const drawer = header.querySelector('.mobile-nav');
    const closeEls = header.querySelectorAll('[data-close-nav]');
    const drawerLinks = drawer.querySelectorAll('a');

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
    closeEls.forEach(el => el.addEventListener('click', () => closeNav()));
    drawerLinks.forEach(link => link.addEventListener('click', () => closeNav({ returnFocus: false })));

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeNav();
      }
    });

    drawer.addEventListener('keydown', event => {
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

  function initCatalogueCardHoverAdd() {
    const currentPath = normalisePath(window.location.pathname);
    const isSupportedCataloguePath = (
      currentPath === '/products/brewing-ingredients' ||
      currentPath.startsWith('/products/brewing-ingredients/') ||
      currentPath === '/products/chemical-products' ||
      currentPath.startsWith('/products/chemical-products/') ||
      currentPath === '/products/kegs-packaging' ||
      currentPath.startsWith('/products/kegs-packaging/')
    );

    if (!isSupportedCataloguePath || !document.querySelector('.prod-results .prod-card')) {
      return;
    }

    loadScript(
      `${ROOT}/js/product-card-hover-add.js`,
      () => typeof window.SkyAgroProductCardHoverAdd?.init === 'function'
    ).then(() => {
      window.SkyAgroProductCardHoverAdd.init();
    }).catch(() => {
      // Keep the catalogue cards in their static state if the enhancement fails.
    });
  }

  const header = document.querySelector('header.site-header');
  if (!header) {
    return;
  }

  header.innerHTML = HEADER_HTML;
  setActiveLinks(header);
  initSearch(header);
  initMobileNav(header);
  initCatalogueCardHoverAdd();
})();
