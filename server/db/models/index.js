const Destination = require('./destination');
const User = require('./user');
const Order = require('./order');
const PaymentInfo = require('./paymentInfo')

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Destination, {through: 'cart'});
Destination.belongsToMany(Order, {through: 'cart'});

//Users have orders which have destinations, but users cannot directly have destinations

module.exports = {
  Destination,
  User,
  Order,
  PaymentInfo
}
