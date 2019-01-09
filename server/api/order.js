const router = require('express').Router()
const {Trip} = require('../db/models')
const {Destination} = require('../db/models')

module.exports = router

//GET route to serve up one order by id
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Trip.findAll({
      where: {
        orderId: req.params.id
      },
      include: [{model: Destination}]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})
