const router = require('express').Router()
const {Destination, Order, Trip, User} = require('../db/models')

module.exports = router

//POST route /api/trip to create a new trip
router.post('/', async (req, res, next) => {
  try {
    const {orderId, destinationId, numPassengers} = req.body
    const tripInfo = await Trip.create({
      orderId,
      destinationId,
      numPassengers
    })
    const dest = await Destination.findById(tripInfo.destinationId)
    const tripResponse = {
      ...tripInfo.dataValues,
      cost: dest.cost,
      name: dest.name
    }
    //include the destination cost & name for cart component
    if (tripResponse) res.status(201).json(tripResponse)
    else res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

//PUT route /api/trip to update num passengers
router.put('/:tripId', isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.tripId
    const {numPassengers} = req.body
    const currentTrip = await Trip.findById(id)
    const updatedTrip = await currentTrip.update({numPassengers})
    res
      .json({
        message: 'trip passengers updated',
        trip: updatedTrip
      })
      .status(200)
  } catch (err) {
    next(err)
  }
})

//DELETE route route /api/trip/:id to delete trip
router.delete('/:tripId', isAuthenticatedFromId, async (req, res, next) => {
  try {
    const id = req.params.tripId
    await Trip.destroy({where: {id}})
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

async function isAuthenticated(req, res, next) {
  try {
    const order = await Order.findById(req.body.orderId)
    if (order.userId) {
      if (req.user.id === order.userId) next()
      else res.redirect('/')
    } else return next()
  } catch (err) {
    next(err)
  }
}

async function isAuthenticatedFromId(req, res, next) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    const order = await Order.findById(trip.orderId)
    if (order.userId) {
      if (req.user.id === order.userId) next()
      else res.redirect('/')
    } else return next()
  } catch (err) {
    next(err)
  }
}
