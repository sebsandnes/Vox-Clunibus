const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const FREE_SHIPPING_THRESHOLD = 50; // USD

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${item.name} - ${item.color || 'Black'} / ${item.size}`,
          metadata: {
            product_id: item.id,
            size: item.size,
            color: item.color || 'Black',
            variant_id: String(item.variantId || '')
          }
        },
        unit_amount: Math.round((item.price || 20) * 100),
      },
      quantity: item.qty || 1,
    }));

    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price || 20) * (item.qty || 1), 0);
    const qualifiesForFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;

    const shippingOptions = qualifiesForFreeShipping
      ? [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 0, currency: 'usd' },
              display_name: '🎉 Free Shipping',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 7 },
                maximum: { unit: 'business_day', value: 14 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 599, currency: 'usd' },
              display_name: 'Standard Shipping',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 5 },
                maximum: { unit: 'business_day', value: 10 },
              },
            },
          },
        ]
      : [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: 599, currency: 'usd' },
              display_name: 'Standard Shipping',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 5 },
                maximum: { unit: 'business_day', value: 10 },
              },
            },
          },
        ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'NO', 'SE', 'DK', 'FI', 'DE', 'FR', 'AU', 'NZ'],
      },
      shipping_options: shippingOptions,
      metadata: {
        cart_items: JSON.stringify(cartItems.map(i => ({
          id: i.id,
          name: i.name,
          size: i.size,
          color: i.color || 'Black',
          qty: i.qty || 1,
          variant_id: i.variantId || ''
        })))
      },
      success_url: `${process.env.YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.YOUR_DOMAIN}/`,
    });

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: err.message });
  }
};
