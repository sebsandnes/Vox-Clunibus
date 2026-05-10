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
    <div class="product-card" onclick="openModal(${JSON.stringify(p).replace(/"/g, '&quot;')})">
      <div class="product-img">
        ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">` : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:72px;">${p.emoji}</div>`}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        ${priceHTML}
      </div>
    </div>`;
  }).join('');
}

function openModal(product) {
  currentProduct = product;
  selectedSize = null;
  window._selectedColor = product.defaultColor;

  const colors = product.availableColors || [product.defaultColor];
  const colorOptions = colors.map(c =>
    `<button class="size-btn${c === product.defaultColor ? ' selected' : ''}" onclick="selectColor('${c}', this)">${c}</button>`
  ).join('');

  const sizes = Object.keys(product.variants[product.defaultColor]);
  const sizeOptions = sizes.map(s =>
    `<button class="size-btn" onclick="selectSize('${s}', this)">${s}</button>`
  ).join('');

  const modalPriceHTML = product.originalPrice
    ? `<span class="price-sale">$${product.price.toFixed(2)}</span>
       <span class="price-original">$${product.originalPrice.toFixed(2)}</span>`
    : `$${product.price.toFixed(2)}`;

  document.getElementById('modalImg').innerHTML = product.image
    ? `<img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;">`
    : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:80px;">${product.emoji}</div>`;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalPrice').innerHTML = modalPriceHTML;
  document.getElementById('modalDesc').textContent = product.description || '';

  document.getElementById('sizeOptions').innerHTML =
    `<div style="margin-bottom:16px"><p class="size-label">Color</p><div class="sizes">${colorOptions}</div></div>
     <p class="size-label">Size</p><div class="sizes" id="sizeButtons">${sizeOptions}</div>`;

  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById('sizeModal').classList.add('active');
}

function selectColor(color, btn) {
  window._selectedColor = color;
  selectedSize = null;
  btn.closest('.sizes').querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const sizes = Object.keys(currentProduct.variants[color]);
  document.getElementById('sizeButtons').innerHTML = sizes.map(s =>
    `<button class="size-btn" onclick="selectSize('${s}', this)">${s}</button>`
  ).join('');
}

function selectSize(size, btn) {
  selectedSize = size;
  btn.closest('.sizes').querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function addFromModal() {
  if (!selectedSize) { showToast('Please select a size!'); return; }
  const color = window._selectedColor || currentProduct.defaultColor;
  const variantId = currentProduct.variants[color][selectedSize];
  const item = { ...currentProduct, size: selectedSize, color, variantId };
  addToCart(item, selectedSize);
  closeModal();
  showToast('Added to bag!');
  openCart();
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.getElementById('sizeModal').classList.remove('active');
  currentProduct = null;
  selectedSize = null;
}

renderProducts();
updateBadge();
