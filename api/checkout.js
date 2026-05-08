// =============================================
// api/checkout.js — Vercel Serverless Function
// Handles Stripe payment + Printful order
//
// SETUP:
// 1. In Vercel dashboard → Settings → Environment Variables, add:
//    STRIPE_SECRET_KEY=sk_live_xxx
//    PRINTFUL_API_KEY=your_printful_key
//    YOUR_DOMAIN=https://voxclunibus.com
//
// 2. Install dependencies (run in terminal):
//    npm install stripe node-fetch
// =============================================

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.YOUR_DOMAIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cartItems, customerEmail } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Build Stripe line items from cart
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: `Size: ${item.size}`,
          metadata: {
            product_id: item.id,
            size: item.size,
            printful_variant_id: String(item.printful_variant_ids[item.size])
          }
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.qty,
    }));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail || undefined,
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'NO', 'SE', 'DK', 'FI', 'DE', 'FR', 'AU', 'NZ'],
      },
      shipping_options: [
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
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Free Shipping (orders over $60)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 7 },
              maximum: { unit: 'business_day', value: 14 },
            },
          },
        },
      ],
      metadata: {
        cart_items: JSON.stringify(cartItems.map(i => ({
          id: i.id,
          name: i.name,
          size: i.size,
          qty: i.qty,
          variant_id: i.printful_variant_ids[i.size]
        })))
      },
      success_url: `${process.env.YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.YOUR_DOMAIN}/?cancelled=true`,
    });

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: err.message });
  }
};
