const router = require('express').Router()
const {Destination, Order, Trip, User} = require('../db/models')

module.exports = router

//GET route /api/order/:id to serve up one order by id
router.get('/:id', async (req, res, next) => {
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
    const order = await Order.create(userId)
    if (order) res.json(order).status(201)
    else res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

//PUT route /api/orderId to complete an order
router.put('/:orderId', async (req, res, next) => {
  try {
    const id = req.params.orderId
    const order = req.body
    const currentOrder = await Order.findById(id)
    const updatedOrder = await currentOrder.update(order)
    res.json({message: 'order complete', order: updatedOrder}).status(200)
  } catch (err) {
    next(err)
  }
})
