// =============================================
// checkout.js — connects the cart to Stripe
// This file is loaded in index.html
// =============================================

async function startCheckout() {
  if (cart.length === 0) {
    showToast('Your bag is empty!');
    return;
  }

  const btn = document.getElementById('checkoutBtn');
  btn.disabled = true;
  btn.textContent = 'Loading...';

  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems: cart }),
    });

    const data = await response.json();

    if (data.url) {
      // Redirect to Stripe's secure checkout page
      window.location.href = data.url;
    } else {
      throw new Error(data.error || 'Something went wrong');
    }

  } catch (err) {
    console.error('Checkout error:', err);
    showToast('Checkout failed. Please try again.');
    btn.disabled = false;
    btn.textContent = 'Checkout →';
  }
}
