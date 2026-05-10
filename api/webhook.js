// =============================================
// api/webhook.js — Stripe Webhook Handler
//
// This runs AUTOMATICALLY after every payment.
// It receives the order from Stripe and sends
// it straight to Printful for printing + shipping.
//
// SETUP:
// 1. In Stripe Dashboard → Developers → Webhooks
//    Add endpoint: https://voxclunibus.com/api/webhook
//    Select event: checkout.session.completed
//    Copy the "Signing secret" → add to Vercel env as:
//    STRIPE_WEBHOOK_SECRET=whsec_xxx
// =============================================

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Required for Stripe webhook signature verification
module.exports.config = {
  api: { bodyParser: false }
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true });
  }

  const session = event.data.object;

  try {
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items', 'shipping_details']
    });

    const cartItems = JSON.parse(fullSession.metadata.cart_items);
    const shipping = fullSession.shipping_details;

    const printfulItems = cartItems.map(item => ({
      variant_id: item.variant_id,
      quantity: item.qty,
      name: `${item.name} - Size ${item.size}`,
    }));

    const printfulOrder = {
      recipient: {
        name: shipping.name,
        address1: shipping.address.line1,
        address2: shipping.address.line2 || '',
        city: shipping.address.city,
        state_code: shipping.address.state || '',
        country_code: shipping.address.country,
        zip: shipping.address.postal_code,
        email: fullSession.customer_email || '',
      },
      items: printfulItems,
      retail_costs: {
        currency: 'USD',
        subtotal: (fullSession.amount_subtotal / 100).toFixed(2),
        shipping: (fullSession.total_details.amount_shipping / 100).toFixed(2),
        total: (fullSession.amount_total / 100).toFixed(2),
      }
    };

    const pfResponse = await fetch('https://api.printful.com/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(printfulOrder),
    });

    const pfData = await pfResponse.json();

    if (!pfResponse.ok) {
      console.error('Printful error:', pfData);
      return res.status(500).json({ error: 'Printful order failed', details: pfData });
    }

    console.log('Printful order created:', pfData.result?.id);

    await fetch(`https://api.printful.com/orders/${pfData.result.id}/confirm`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
    });

    return res.status(200).json({ received: true, printful_order: pfData.result?.id });

  } catch (err) {
    console.error('Order processing error:', err);
    return res.status(500).json({ error: err.message });
  }
};
