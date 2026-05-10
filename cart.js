let cart = [];
let selectedSize = null;
let currentProduct = null;

function addToCart(product, size) {
  const existing = cart.find(i => i.id === product.id && i.size === size);
  if (existing) { existing.qty += 1; }
  else { cart.push({ ...product, size, qty: 1 }); }
  saveCart(); renderCart(); updateBadge();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart(); renderCart(); updateBadge();
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
  document.getElementById('cartCount').textContent = total;
}

function getCartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  if (cart.length === 0) {
    container.innerHTML = `<p class="cart-empty">Your bag is empty.</p>`;
    totalEl.textContent = '$0.00';
    return;
  }

  container.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-img">${item.image ? `<img src="${item.image}" style="width:100%;height:100%;object-fit:cover;">` : item.emoji}</div>
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

function openCart() {
  renderCart();
  document.getElementById('cart').classList.add('open');
  document.getElementById('overlay').classList.add('active');
}

function closeCart() {
  document.getElementById('cart').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

async function startCheckout() {
  if (cart.length === 0) { showToast('Your bag is empty.'); return; }
  // FIX: correct selector - was '.cart-footer .btn', button actually has class '.btn-checkout'
  const btn = document.querySelector('.btn-checkout');
  btn.textContent = '...';
  btn.disabled = true;
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems: cart }),
    });
    const data = await res.json();
    if (data.url) { window.location.href = data.url; }
    else { throw new Error(data.error); }
  } catch(err) {
    showToast('Checkout failed. Please try again.');
    btn.textContent = 'Checkout →';
    btn.disabled = false;
  }
}

function handleNotify() {
  const email = document.getElementById('notifyEmail').value;
  if (!email || !email.includes('@')) { showToast('Please enter a valid email.'); return; }
  showToast("You're on the list!");
  document.getElementById('notifyEmail').value = '';
}

loadCart();
