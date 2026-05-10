let cart = [];
let selectedSize = null;
let currentProduct = null;

function addToCart(product, size) {
  const existing = cart.find(i => i.id === product.id && i.size === size && i.color === product.color);
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
  const badge = document.getElementById('cartCount');
  if (badge) badge.textContent = total;
}

function getCartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p class="cart-empty">Your bag is empty.</p>`;
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }

  container.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      ${item.image
        ? `<img class="cart-item-img" src="${item.image}" alt="${item.name}">`
        : `<div class="cart-item-img" style="display:flex;align-items:center;justify-content:center;font-size:28px;">${item.emoji}</div>`
      }
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.color || 'Black'} · Size ${item.size} · Qty ${item.qty}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})">×</button>
    </div>
  `).join('');

  if (totalEl) totalEl.textContent = '$' + getCartTotal().toFixed(2);
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
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

async function startCheckout() {
  if (cart.length === 0) { showToast('Your bag is empty!'); return; }

  const btn = document.querySelector('.btn-checkout');
  if (btn) { btn.textContent = 'Loading...'; btn.disabled = true; }

  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems: cart }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error(data.error || 'Unknown error');
    }
  } catch(err) {
    console.error('Checkout error:', err);
    showToast('Checkout failed. Please try again.');
    if (btn) { btn.textContent = 'Checkout →'; btn.disabled = false; }
  }
}

function handleNotify() {
  const email = document.getElementById('notifyEmail');
  if (!email || !email.value.includes('@')) { showToast('Please enter a valid email.'); return; }
  showToast("You're on the list! 🎉");
  email.value = '';
}

loadCart();
