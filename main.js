function renderProducts() {
  if (!PRODUCTS || PRODUCTS.length === 0) return; // Show placeholders instead

  const grid = document.getElementById('productsGrid');
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card" onclick="openModal(${JSON.stringify(p).replace(/"/g, '&quot;')})">
      <div class="product-img">
        ${p.image ? `<img src="${p.image}" style="width:100%;height:100%;object-fit:cover;">` : p.emoji}
      </div>
      <div class="product-name">${p.name}</div>
      <div class="product-price">$${p.price.toFixed(2)}</div>
    </div>
  `).join('');

  // Hide coming soon section if we have products
  document.querySelector('.coming-soon').style.display = 'none';
  document.querySelector('.notify-form').style.display = 'none';
}

function openModal(product) {
  currentProduct = product;
  selectedSize = null;
  // Simple size modal - can be expanded later
  const size = prompt(`Select size for "${product.name}":\nS, M, L, XL, 2XL`);
  if (size && product.printful_variant_ids[size.toUpperCase()]) {
    addToCart(product, size.toUpperCase());
    showToast('Added to cart!');
    openCart();
  }
}

renderProducts();
updateBadge();
