function renderProducts() {
  if (!PRODUCTS || PRODUCTS.length === 0) return;

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

  document.querySelector('.coming-soon').style.display = 'none';
  document.querySelector('.notify-form').style.display = 'none';
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

  document.getElementById('modalImg').innerHTML = product.image
    ? `<img src="${product.image}" style="width:100%;height:100%;object-fit:cover;">`
    : product.emoji;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalPrice').textContent = '$' + product.price.toFixed(2);
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
  showToast('Added to cart!');
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
