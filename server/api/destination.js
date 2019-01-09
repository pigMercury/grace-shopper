const router = require('express').Router()
const {Destination} = require('../db/models')
module.exports = router

//GET route to serve up all destinations
router.get('/', async (req, res, next) => {
  try {
    const destinations = await Destination.findAll()
    res.json(destinations)
  } catch (err) {
    next(err)
  }
})
