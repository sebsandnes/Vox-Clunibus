// ===== RENDER PRODUCTS =====
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card" onclick="openModal(${JSON.stringify(p).replace(/"/g, '&quot;')})">
      <div class="product-img-wrap">
        ${p.tag ? `<div class="product-tag">${p.tag}</div>` : ''}
        <div class="product-emoji">${p.emoji}</div>
        <div class="product-overlay">Quick Add →</div>
      </div>
      <div class="product-name">${p.name}</div>
      <div class="product-price">$${p.price.toFixed(2)}</div>
    </div>
  `).join('');
}

// ===== CART TOGGLE IN HEADER =====
document.getElementById('cartToggle').addEventListener('click', () => {
  renderCart();
  openCart();
});

// ===== INIT =====
renderProducts();
renderCart();
updateBadge();
