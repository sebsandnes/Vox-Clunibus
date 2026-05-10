function renderProducts() {
  if (!PRODUCTS || PRODUCTS.length === 0) return;

  const grid = document.getElementById('productsGrid');
  grid.innerHTML = PRODUCTS.map(p => {
    const priceHTML = p.originalPrice
      ? `<div class="product-price">
           <span class="price-sale">$${p.price.toFixed(2)}</span>
           <span class="price-original">$${p.originalPrice.toFixed(2)}</span>
           <span class="price-badge">SALE</span>
         </div>`
      : `<div class="product-price">$${p.price.toFixed(2)}</div>`;

    return `
    <a class="product-card" href="product.html?id=${p.id}">
      <div class="product-img">
        ${p.image
          ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">`
          : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:72px;">${p.emoji}</div>`}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        ${priceHTML}
      </div>
    </a>`;
  }).join('');
}

renderProducts();
updateBadge();
