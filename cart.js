// ===== CART STATE =====
let cart = [];
let selectedSize = null;
let currentProduct = null;

// ===== CART FUNCTIONS =====
function addToCart(product, size) {
  const existing = cart.find(i => i.id === product.id && i.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, size, qty: 1 });
  }
  saveCart();
  renderCart();
  updateBadge();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
  updateBadge();
}

function saveCart() {
  try { localStorage.setItem('vox_cart', JSON.stringify(cart)); } catch(e) {}
}

function loadCart() {
  try {
    const saved = localStorage.getItem('vox_cart');
    if (saved) cart = JSON.parse(saved);
  } catch(e) {}
}

function updateBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartBadge').textContent = total;
}

function getCartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

// ===== RENDER CART =====
function renderCart() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Your bag is empty.<br>Go fill it with chaos.</div>';
    totalEl.textContent = '$0.00';
    return;
  }

  container.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-size">Size: ${item.size} · Qty: ${item.qty}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})">×</button>
    </div>
  `).join('');

  totalEl.textContent = '$' + getCartTotal().toFixed(2);
}

// ===== CART DRAWER =====
function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('active');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('active');
}

// ===== SIZE MODAL =====
function openModal(product) {
  currentProduct = product;
  selectedSize = null;

  document.getElementById('modalImg').textContent = product.emoji;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalPrice').textContent = '$' + product.price.toFixed(2);
  document.getElementById('modalDesc').textContent = product.description;

  const sizes = Object.keys(product.printful_variant_ids);
  document.getElementById('sizeOptions').innerHTML = sizes.map(s => `
    <button class="size-btn" onclick="selectSize('${s}')">${s}</button>
  `).join('');

  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById('sizeModal').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.getElementById('sizeModal').classList.remove('active');
  currentProduct = null;
  selectedSize = null;
}

function selectSize(size) {
  selectedSize = size;
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.textContent === size);
  });
}

function addFromModal() {
  if (!selectedSize) {
    showToast('Please select a size!');
    return;
  }
  addToCart(currentProduct, selectedSize);
  closeModal();
  showToast('Added to bag!');
  openCart();
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ===== INIT =====
loadCart();
