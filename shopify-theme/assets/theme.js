/* Voxclunibus theme: cart drawer, product form and variant picker. */

(() => {
  const theme = window.theme || {};
  const drawer = document.getElementById('CartDrawer');
  const drawerContent = document.getElementById('CartDrawerContent');
  const overlay = document.querySelector('.drawer-overlay');
  const useDrawer = theme.cartType !== 'page' && drawer && drawerContent;
  let lastFocus = null;

  /* Cart drawer */

  function openDrawer() {
    if (!useDrawer) return;
    lastFocus = document.activeElement;
    drawer.hidden = false;
    overlay.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    drawer.focus();
  }

  function closeDrawer() {
    if (!useDrawer || drawer.hidden) return;
    drawer.classList.remove('is-open');
    overlay.hidden = true;
    document.body.style.overflow = '';
    setTimeout(() => { drawer.hidden = true; }, 250);
    if (lastFocus) lastFocus.focus();
  }

  function renderDrawer(sections) {
    const html = sections && sections['cart-drawer'];
    if (!html) return;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const fresh = doc.querySelector('.cart-drawer__inner');
    const current = drawerContent.querySelector('.cart-drawer__inner');
    if (fresh && current) current.replaceWith(fresh);
    const count = fresh ? fresh.dataset.cartCountValue : null;
    if (count !== null) {
      document.querySelectorAll('[data-cart-count]').forEach((el) => { el.textContent = count; });
    }
  }

  async function postJSON(url, body) {
    const response = await fetch(`${url}.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.description || data.message || theme.strings.error);
    return data;
  }

  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-cart-open]');
    if (opener && useDrawer) {
      event.preventDefault();
      openDrawer();
      return;
    }
    if (event.target.closest('[data-cart-close]')) {
      closeDrawer();
      return;
    }
    const change = event.target.closest('[data-line-change]');
    if (change && useDrawer) {
      drawer.classList.add('is-busy');
      postJSON(theme.routes.cartChange, {
        line: Number(change.dataset.line),
        quantity: Number(change.dataset.quantity),
        sections: 'cart-drawer',
        sections_url: window.location.pathname,
      })
        .then((cart) => renderDrawer(cart.sections))
        .catch(() => window.location.assign(theme.routes.cart))
        .finally(() => drawer.classList.remove('is-busy'));
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDrawer();
  });

  /* Product form */

  document.querySelectorAll('[data-product-form]').forEach((form) => {
    if (!useDrawer) return;
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const button = form.querySelector('[data-add-button]');
      const error = form.querySelector('[data-form-error]');
      const id = Number(form.querySelector('[name="id"]').value);
      error.hidden = true;
      button.classList.add('is-loading');
      try {
        const result = await postJSON(theme.routes.cartAdd, {
          items: [{ id, quantity: 1 }],
          sections: 'cart-drawer',
          sections_url: window.location.pathname,
        });
        renderDrawer(result.sections);
        openDrawer();
      } catch (err) {
        error.textContent = err.message;
        error.hidden = false;
      } finally {
        button.classList.remove('is-loading');
      }
    });
  });

  /* Variant picker and gallery */

  document.querySelectorAll('[data-product]').forEach((product) => {
    const picker = product.querySelector('[data-variant-picker]');
    const showMedia = (mediaId) => {
      if (!mediaId) return;
      product.querySelectorAll('[data-media-id]').forEach((slide) => {
        slide.classList.toggle('is-active', slide.dataset.mediaId === String(mediaId));
      });
      product.querySelectorAll('[data-thumb]').forEach((thumb) => {
        thumb.classList.toggle('is-active', thumb.dataset.thumb === String(mediaId));
      });
    };

    product.querySelectorAll('[data-thumb]').forEach((thumb) => {
      thumb.addEventListener('click', () => showMedia(thumb.dataset.thumb));
    });

    if (!picker) return;
    const variants = JSON.parse(picker.querySelector('[data-variant-json]').textContent);
    const fieldsets = [...picker.querySelectorAll('fieldset[data-option-index]')];
    const idInput = product.querySelector('[data-variant-id]');
    const button = product.querySelector('[data-add-button]');
    const price = product.querySelector('[data-price]');

    const selected = () => fieldsets.map((fs) => {
      const checked = fs.querySelector('input:checked');
      return checked ? checked.value : null;
    });

    const markAvailability = (values) => {
      fieldsets.forEach((fs, index) => {
        fs.querySelectorAll('input').forEach((input) => {
          const candidate = values.slice();
          candidate[index] = input.value;
          const available = variants.some((v) => v.available && v.options.every((o, i) => o === candidate[i]));
          input.classList.toggle('is-unavailable', !available);
        });
      });
    };

    const update = () => {
      const values = selected();
      fieldsets.forEach((fs, index) => {
        const label = fs.querySelector('[data-selected-value]');
        if (label) label.textContent = values[index];
      });
      markAvailability(values);

      const variant = variants.find((v) => v.options.every((o, i) => o === values[i]));
      if (!variant) {
        if (button) { button.disabled = true; button.textContent = theme.strings.unavailable; }
        return;
      }
      if (idInput) idInput.value = variant.id;
      if (price) price.innerHTML = variant.priceHtml;
      if (button) {
        button.disabled = !variant.available;
        button.textContent = variant.available ? theme.strings.addToCart : theme.strings.soldOut;
      }
      showMedia(variant.media);
      const url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', url.toString());
    };

    picker.addEventListener('change', update);
    markAvailability(selected());
  });

  /* Collection sorting and footer localization */

  document.querySelectorAll('[data-sort-select]').forEach((select) => {
    select.addEventListener('change', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', select.value);
      url.searchParams.delete('page');
      window.location.assign(url.toString());
    });
  });

  document.querySelectorAll('[data-autosubmit]').forEach((select) => {
    select.addEventListener('change', () => select.form.submit());
  });
})();
