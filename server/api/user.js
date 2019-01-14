const router = require('express').Router()
const {Order, User} = require('../db/models')
module.exports = router

//GET route /api/user/:id to serve all a user's orders (not eager loaded)
router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    //returns array of orders, use orderId to load trips later
    const orders = await Order.findAll({
      where: {
        userId: req.params.id
      }
    })
    //returns specified user
    const userInfo = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    //sends an object with two keys: userInfo (object) and user's orders (array of orders)
    res.json({userInfo, orders})
  } catch (err) {
    next(err)
  }
})

function isAuthenticated(req, res, next) {
  if (req.user) {
    try {
      if (req.user.id === Number(req.params.id)) {
        return next()
      }
    } catch (err) {
      next(err)
    }
    res.redirect('/')
  } else res.redirect('/')
}
