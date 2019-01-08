const Destination = require('./destination');
const User = require('./user');
const Order = require('./order');

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Destination);
Destination.belongsToMany(Order);

//Users have orders which have destinations, but users cannot directly have destinations

module.exports = {
  Destination,
  User,
  Order,
  PaymentInfo
}
