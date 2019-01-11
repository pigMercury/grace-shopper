const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const Destination = db.model('destination')
const Trip = db.model('trip')
const User = db.model('user')

describe.only('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // make destinations
  const bigBang = {
    name: 'Big Bang',
    imageURL: null,
    cost: 500,
    timePeriod: 'Prehistoric',
    description: 'REALLY LOUD',
    id: 1
  }

  const frenchRev = {
    name: 'French Revolution',
    imageURL: null,
    cost: 100,
    timePeriod: '19th Century',
    description: 'Really bloody... watch your head...',
    id: 2
  }

  //make an order
  const testOrder = {
    completed: false,
    userId: 1,
    id: 1
  }

  //make trips
  const bigBangTrip = {
    numPassengers: 4,
    destinationId: bigBang.id,
    // orderId: 1,
    id: 1
  }

  const frenchRevTrip = {
    numPassengers: 2,
    destinationId: frenchRev.id,
    // orderId: 1,
    id: 2
  }

  //make users
  const serena = {
    userName: 'Serena Williams',
    email: 'tennispro@gmail.com',
    password: 'tennistrip',
    salt: '4fas7gg6ic5127v6rov8own',
    stripeToken: '',
    id: 1
  }

  const anon = {
    email: '123@aol.com',
    password: 'abcde',
    salt: 'e5hlmexlquc0du9tj6f5y3',
    stripeToken: '',
    id: 2
  }

  beforeEach(() => {
    return Destination.bulkCreate([bigBang, frenchRev])
  })

  beforeEach(() => {
    return Trip.bulkCreate([bigBangTrip, frenchRevTrip])
  })

  beforeEach(() => {
    return User.bulkCreate([serena, anon])
  })

  beforeEach(() => {
    return Order.create(testOrder)
  })
  describe('/api/user/:id', () => {
    //sends an object with two keys: userInfo (object) and user's orders (array of orders)

    it('GET /api/order/:id', async () => {
      const res = await request(app)
        .get(`/api/user/1`)
        .expect(200)

      expect(res.body).to.be.an('object') //with two keys: userInfo and arrOfOrders
      expect(res.body.userInfo.id).to.be.equal(1)
      expect(res.body.userInfo.userName).to.be.equal('Serena Williams')
      expect(res.body.orders[0].completed).to.be.equal(false)
    })
  }) // end describe('/api/user')
}) // end describe('user routes')
