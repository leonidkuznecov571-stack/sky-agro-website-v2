(() => {
  function init(header, options) {
    const root = options.root || '';
    const loadScript = options.loadScript;
    const searchInput = header.querySelector('[data-product-search-input]');
    const currentQuery = new URLSearchParams(window.location.search).get('q');

    if (searchInput && currentQuery) {
      searchInput.value = currentQuery;
    }

    Promise.all([
      loadScript(`${root}/js/search.js`, () => typeof window.SkyAgroSearch?.initHeaderSearch === 'function'),
      loadScript(`${root}/js/product-search-data.js`, () => Array.isArray(window.SKY_AGRO_PRODUCT_INDEX))
    ]).then(() => {
      window.SkyAgroSearch.initHeaderSearch(header, { root: root || '' });
    }).catch(() => {
      // Leave the form as a normal GET search if the enhancement cannot load.
    });
  }

  window.SkyAgroHeaderSearch = {
    init
  };
})();
