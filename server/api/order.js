const router = require('express').Router()
const {Destination, Order, Trip, User} = require('../db/models')

module.exports = router

//GET route /api/order/:id to serve up one order by OrderId
router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const order = await Trip.findAll({
      where: {orderId: req.params.id},
      include: [{model: Destination}]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

//POST route /api/order to create a new order
router.post('/', async (req, res, next) => {
  try {
    const {userId} = req.body
    const order = await Order.create({userId})
    if (order) res.json(order).status(201)
    else res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

//PUT route /api/orderId to complete an order
router.put('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id
    const order = req.body
    const currentOrder = await Order.findById(id)
    const updatedOrder = await currentOrder.update(order)
    res.json({message: 'order complete', order: updatedOrder}).status(200)
  } catch (err) {
    next(err)
  }
})

async function isAuthenticated(req, res, next) {
  try {
    const order = await Order.findById(req.params.id)
    if (order.userId && req.user) {
      if (order.userId === req.user.id) {
        return next()
      } else res.redirect('/')
    } else if (!order.userId) {
      return next()
    } else if (order.userId && !req.user) {
      res.redirect('/')
    }
  } catch (err) {
    next(err)
  }
}
