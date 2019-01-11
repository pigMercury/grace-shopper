const Sequelize = require('sequelize')
const db = require('../db')

const Trip = db.define('trip', {
  numPassengers: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 1}
  }
})

module.exports = Trip
