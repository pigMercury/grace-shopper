const Destinations = require('./destinations');
const Users = require('./users');
const Orders = require('./orders');

Users.hasMany(Orders);
Orders.belongsTo(Users);

Orders.hasMany(Destinations);
Destinations.belongsToMany(Orders);

//Users have orders which have destinations, but users cannot directly have destinations

module.exports = {
  Destinations,
  Users,
  Orders,
  PaymentInfo
}
