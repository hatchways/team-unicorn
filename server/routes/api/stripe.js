const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPESECRET);

router.post('/pay', async (req, res) => {
  const {email} = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
      amount: 500,
      currency: 'usd',
      metadata: {integration_check: 'accept_a_payment'},
      receipt_email: email,
    });

    res.json({'client_secret': paymentIntent['client_secret']})
})

router.post('/subscribe', async (req, res) => {
  const {email, payment_method} = req.body;

  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: 'price_1HX6TzD9AsNutHPovtPPJ9yY' }],
    expand: ['latest_invoice.payment_intent']
  });
  
  const status = subscription['latest_invoice']['payment_intent']['status'] 
  const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

  res.json({'client_secret': client_secret, 'status': status});
})

module.exports = router;