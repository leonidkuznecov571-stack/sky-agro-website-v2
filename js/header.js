(() => {
  const scriptEl = document.querySelector('script[src$="header.js"]');
  const root = scriptEl ? scriptEl.src.replace(/\/js\/header\.js.*$/, '') : '';
  const sharedScriptLoads = new Map();

  window.SKY_AGRO_ROOT = root || '';

  function loadScript(src, test) {
    if (test()) {
      return Promise.resolve();
    }

    if (sharedScriptLoads.has(src)) {
      return sharedScriptLoads.get(src);
    }

    const absoluteSrc = new URL(src, window.location.href).href;
    let script = Array.from(document.scripts).find((entry) => entry.src === absoluteSrc);

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

  const header = document.querySelector('header.site-header');
  if (!header) {
    return;
  }

  Promise.all([
    loadScript(`${root}/js/header-markup.js`, () => typeof window.SkyAgroHeaderMarkup?.render === 'function'),
    loadScript(`${root}/js/header-search.js`, () => typeof window.SkyAgroHeaderSearch?.init === 'function'),
    loadScript(`${root}/js/header-ui.js`, () => typeof window.SkyAgroHeaderUI?.init === 'function')
  ]).then(() => {
    header.innerHTML = window.SkyAgroHeaderMarkup.render(root);
    window.SkyAgroHeaderUI.init(header, { root, loadScript });
    window.SkyAgroHeaderSearch.init(header, { root, loadScript });
  }).catch(() => {
    // Keep the page usable without the injected header if a shared script fails to load.
  });
})();
