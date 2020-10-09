const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPESECRET);
const mongoose = require("mongoose");
const User = require("../../models/User")
const uri = process.env.MONGOURI 
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,
  useFindAndModify: false})

const assignStripeInfo = async (customer) => {
  try {
    await User.findByIdAndUpdate({_id: customer.id}, {stripeCustomerId: customer.stripeCustomerId})
  } catch (err) {
    console.error('Error assigning Stripe Customer Id: ', err)
  }
}

router.post('/subscribe', async (req, res) => {
  const {_id, name, email, stripeCustomerId, payment_method} = req.body;
  let customer;
  let subscription; 

  // check if user is currently a stripe customer
  if (stripeCustomerId === "free") {

    // create new stripe customer from user
    customer = await stripe.customers.create({
      name: name,
      payment_method: payment_method,
      email: email,
      invoice_settings: {
        default_payment_method: payment_method,
      }
    }); 

    // create new subscription
    subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: 'price_1HX6TzD9AsNutHPovtPPJ9yY' }],
      expand: ['latest_invoice.payment_intent']
    });

    // save new stripe info to user
    try {
      await assignStripeInfo({id: _id, stripeCustomerId: customer.id})
    } catch (err) {
      console.error("Error saving customer subscription id to db: ", err)
    }
  } else {

    // delete customer id in stripe which cancels any active subscriptions connected
    const resp = await stripe.customers.del(stripeCustomerId)
    console.log({resp})
    try {
      customer = {
        id: "free",
        name: name,
        payment_method: payment_method,
        email: email,
        invoice_settings: {
          default_payment_method: payment_method,
        }
      }; 
      await assignStripeInfo({id: _id, stripeCustomerId: "free"})
    } catch (err) {
      console.error("Error deleting customer subscription id in db: ", err)
    }
  }
  
  const updatedStripe = {stripeCustomerId: customer.id}
  
  if (updatedStripe.stripeCustomerId !== "free") {
    const status = subscription['latest_invoice']['payment_intent']['status'] 
    const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
    res.json({client_secret: client_secret, status: status, stripeInfo: updatedStripe });
  } else {
    res.json({stripeInfo: updatedStripe})
  }
})

module.exports = router;