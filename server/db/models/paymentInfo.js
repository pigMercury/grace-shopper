const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const paymentInfo = db.define('paymentInfo', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isCreditCard: true
    }
  },
  ccv: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  expirationMonth: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      len: [2, 2],
      max: 12,
      min: 1
    }
  },
  expirationYear: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      len: [2, 2],
      min: 19
    }
  },
  billingZipcode: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      len: [5, 5]
    }
  }
})

module.exports = PaymentInfo
