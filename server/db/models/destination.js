const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Destination = db.define('destination', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://r.hswstatic.com/w_907/gif/big-bang-sound-1jpg.jpg',
    validate: {
      isUrl: true
    }
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  timePeriod: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image2: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  image3: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  image4: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  image5: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  image6: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  image7: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

module.exports = Destination
