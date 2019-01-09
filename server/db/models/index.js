const Destination = require('./destination')
const User = require('./user')
const Order = require('./order')
const Trip = require('./trip')

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(Trip)
Trip.belongsTo(Order)

Destination.hasMany(Trip)
Trip.belongsTo(Destination)

//Users have orders which have trips which have one destination each

module.exports = {
  Destination,
  User,
  Order,
  Trip
}
