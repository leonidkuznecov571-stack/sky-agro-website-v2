(() => {
  function escapeHtml(value = '') {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalise(value = '') {
    return value
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function getRoot() {
    return window.SKY_AGRO_ROOT || '';
  }

  let preparedIndex = [];
  let preparedIndexSource = null;

  function getPreparedIndex() {
    const source = Array.isArray(window.SKY_AGRO_PRODUCT_INDEX) ? window.SKY_AGRO_PRODUCT_INDEX : [];

    if (preparedIndexSource === source) {
      return preparedIndex;
    }

    preparedIndexSource = source;
    preparedIndex = source.map(item => {
      const title = item.title || '';
      const description = item.description || '';
      const section = item.section || '';
      const keywords = item.keywords || '';

      return {
        ...item,
        _title: normalise(title),
        _description: normalise(description),
        _section: normalise(section),
        _keywords: normalise(keywords),
        _haystack: normalise([title, description, section, keywords].join(' '))
      };
    });

    return preparedIndex;
  }

  function scoreItem(item, normalisedQuery, terms) {
    if (!normalisedQuery || !terms.every(term => item._haystack.includes(term))) {
      return -1;
    }

    let score = item.type === 'product' ? 20 : 10;

    if (item._title === normalisedQuery) {
      score += 400;
    } else if (item._title.startsWith(normalisedQuery)) {
      score += 260;
    } else if (item._title.includes(normalisedQuery)) {
      score += 180;
    }

    terms.forEach(term => {
      if (item._title.includes(term)) {
        score += 60;
      }

      if (item._keywords.includes(term)) {
        score += 30;
      }

      if (item._section.includes(term)) {
        score += 16;
      }

      if (item._description.includes(term)) {
        score += 8;
      }
    });

    return score;
  }

  function searchCatalogue(query, options = {}) {
    const trimmedQuery = query.trim();
    const normalisedQuery = normalise(trimmedQuery);

    if (!normalisedQuery) {
      return [];
    }

    const terms = normalisedQuery.split(/\s+/);
    const results = getPreparedIndex()
      .map(item => ({ item, score: scoreItem(item, normalisedQuery, terms) }))
      .filter(entry => entry.score >= 0)
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score;
        }

        return left.item.title.localeCompare(right.item.title, 'en-GB');
      })
      .map(entry => entry.item);

    return typeof options.limit === 'number' ? results.slice(0, options.limit) : results;
  }

  function getQuickLinks() {
    const preferredOrder = [
      'Brewing Ingredients',
      'Chemical Products',
      'Brewing & Beverage Equipment',
      'Kegs & Packaging'
    ];

    return getPreparedIndex()
      .filter(item => item.type === 'category' && !item.section)
      .sort((left, right) => preferredOrder.indexOf(left.title) - preferredOrder.indexOf(right.title));
  }

  function renderQuickLinks() {
    const links = getQuickLinks();

    if (!links.length) {
      return '';
    }

    return `
      <div class="search-page__quick-links">
        ${links.map(link => `
          <a href="${escapeHtml(link.href)}" class="search-page__quick-link">${escapeHtml(link.title)}</a>
        `).join('')}
      </div>
    `;
  }

  function renderHeaderResults(panel, results, query) {
    const resultsMarkup = results.length
      ? `
        <ul class="search-bar__results" role="list">
          ${results.map(result => `
            <li>
              <a href="${escapeHtml(result.href)}" class="search-bar__result-link">
                <span class="search-bar__result-kind">${result.type === 'product' ? 'Product' : 'Category'}</span>
                <span class="search-bar__result-title">${escapeHtml(result.title)}</span>
                <span class="search-bar__result-section">${escapeHtml(result.section || 'Catalogue overview')}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      `
      : `<p class="search-bar__empty">No matching products found for “${escapeHtml(query.trim())}”.</p>`;

    panel.innerHTML = resultsMarkup;
  }

  function initHeaderSearch(header) {
    const form = header.querySelector('[data-product-search-form]');
    const input = header.querySelector('[data-product-search-input]');
    const panel = header.querySelector('[data-product-search-panel]');

    if (!form || !input || !panel) {
      return;
    }

    const currentQuery = new URLSearchParams(window.location.search).get('q');

    if (currentQuery) {
      input.value = currentQuery;
    }

    function closePanel() {
      panel.hidden = true;
      panel.innerHTML = '';
    }

    function openPanel() {
      panel.hidden = false;
    }

    function renderSuggestions() {
      const query = input.value.trim();

      if (query.length < 2) {
        closePanel();
        return;
      }

      renderHeaderResults(panel, searchCatalogue(query, { limit: 6 }), query);
      openPanel();
    }

    input.addEventListener('input', renderSuggestions);

    input.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closePanel();
        return;
      }

      if (event.key === 'ArrowDown' && !panel.hidden) {
        const firstLink = panel.querySelector('a');
        if (firstLink) {
          event.preventDefault();
          firstLink.focus();
        }
      }
    });

    panel.addEventListener('keydown', event => {
      if (!['ArrowDown', 'ArrowUp'].includes(event.key)) {
        return;
      }

      const links = Array.from(panel.querySelectorAll('a'));
      const currentIndex = links.indexOf(document.activeElement);

      if (currentIndex === -1) {
        return;
      }

      event.preventDefault();

      if (event.key === 'ArrowDown') {
        const next = links[currentIndex + 1] || links[0];
        next.focus();
      } else if (event.key === 'ArrowUp') {
        if (currentIndex === 0) {
          input.focus();
        } else {
          links[currentIndex - 1].focus();
        }
      }
    });

    document.addEventListener('click', event => {
      if (!form.contains(event.target)) {
        closePanel();
      }
    });

    form.addEventListener('submit', event => {
      const query = input.value.trim();
      const bestMatch = searchCatalogue(query, { limit: 1 })[0];

      if (bestMatch) {
        event.preventDefault();
        window.location.href = bestMatch.href;
      }

      closePanel();
    });
  }

  function renderResultCard(result) {
    const section = result.section || 'Catalogue overview';
    const description = result.description || 'Open this page to browse more details from the SKY AGRO catalogue.';

    return `
      <li class="search-result">
        <article>
          <p class="search-result__meta">${result.type === 'product' ? 'Product' : 'Category'} • ${escapeHtml(section)}</p>
          <h2 class="search-result__title">
            <a href="${escapeHtml(result.href)}">${escapeHtml(result.title)}</a>
          </h2>
          <p class="search-result__description">${escapeHtml(description)}</p>
        </article>
      </li>
    `;
  }

  function initSearchPage() {
    const page = document.querySelector('[data-search-page]');

    if (!page) {
      return;
    }

    const form = page.querySelector('[data-search-page-form]');
    const input = page.querySelector('[data-search-page-input]');
    const summary = page.querySelector('[data-search-summary]');
    const state = page.querySelector('[data-search-state]');
    const resultsList = page.querySelector('[data-search-results]');

    if (!form || !input || !summary || !state || !resultsList) {
      return;
    }

    const render = query => {
      const trimmedQuery = query.trim();
      const results = searchCatalogue(trimmedQuery);

      if (!trimmedQuery) {
        summary.textContent = 'Search for a product name, category, process, or packaging format.';
        state.innerHTML = `
          <p>Start with a product name if you know it, or jump into one of the main catalogue areas below.</p>
          ${renderQuickLinks()}
        `;
        resultsList.innerHTML = '';
        document.title = 'Search the catalogue — SKY AGRO';
        return;
      }

      const resultLabel = `${results.length} result${results.length === 1 ? '' : 's'}`;
      summary.textContent = `${resultLabel} for “${trimmedQuery}”`;
      document.title = `Search: ${trimmedQuery} — SKY AGRO`;

      if (!results.length) {
        state.innerHTML = `
          <p>No results matched that search. Try a product family, chemical type, or equipment category instead.</p>
          ${renderQuickLinks()}
        `;
        resultsList.innerHTML = '';
        return;
      }

      state.innerHTML = '';
      resultsList.innerHTML = results.map(renderResultCard).join('');
    };

    const updateUrl = query => {
      window.history.replaceState({}, '', getSearchUrl(query));
    };

    const initialQuery = new URLSearchParams(window.location.search).get('q') || '';
    input.value = initialQuery;
    render(initialQuery);

    form.addEventListener('submit', event => {
      event.preventDefault();
      updateUrl(input.value);
      render(input.value);
    });

    input.addEventListener('input', () => {
      updateUrl(input.value);
      render(input.value);
    });
  }

  window.SkyAgroSearch = {
    initHeaderSearch,
    normalise,
    searchCatalogue
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchPage, { once: true });
  } else {
    initSearchPage();
  }
})();
