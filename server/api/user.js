const router = require('express').Router()
const {Order} = require('../db/models')

module.exports = router

//GET route /api/user/:id to serve all a user's orders (not eagerly loaded)
router.get('/:id', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.id
      }
    }) //returns array of orders, use orderId to load trips later
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
