const router = require('express').Router()

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    console.log('IN POST ROUTE', req.body)
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    var stripe = require('stripe')('sk_test_1phjwwi1FhfozWShqJJF50Wh')

    // Token is created using Checkout or Elements!
    // Get the payment token ID submitted by the form:
    const token = req.body.stripeToken // Using Express

    const charge = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      description: 'Example charge',
      source: token
    })
    res.send(charge)
  } catch (err) {
    next(err)
  }
})
