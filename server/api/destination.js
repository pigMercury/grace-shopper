const router = require('express').Router()
const {Destination} = require('../db/models')
module.exports = router

//GET route /api/destination to serve up all destinations
router.get('/', async (req, res, next) => {
  try {
    const destinations = await Destination.findAll()
    res.json(destinations)
  } catch (err) {
    next(err)
  }
})

//GET route /api/destination/:id to serve up one specific destination
router.get('/:id', async (req, res, next) => {
  try {
    const destination = await Destination.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(destination)
  } catch (err) {
    next(err)
  }
})
