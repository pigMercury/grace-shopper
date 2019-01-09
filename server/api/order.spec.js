/* global describe beforeEach it */

//Needs to be finished!

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const Destination = db.model('destination')
const Trip = db.model('trip')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/order/:id', () => {
    //make destinations
    const bigBang = {
      name: 'Big Bang',
      imageUrl: null,
      cost: 500,
      timePeriod: 'Prehistoric',
      decription: 'REALLY LOUD'
    }

    const frenchRev = {
      name: 'French Revolution',
      imageUrl: null,
      cost: 100,
      timePeriod: '19th Century',
      decription: 'Really bloody... watch your head...'
    }

    //make an order
    const testOrder = {
      completed: false
    }

    //make trips
    const bigBangTrip = {
      numPassengers: 4,
      destinationId: bigBang.id,
      orderId: testOrder.id
    }

    const frenchRevTrip = {
      numPassengers: 2,
      destinationId: frenchRev.id,
      orderId: testOrder.id
    }

    beforeEach(async () => {
      await Destination.bulkCreate([bigBang, frenchRev])
      await Trip.bulkCreate([bigBangTrip, frenchRevTrip])
      await Order.create(testOrder)
    })

    xit('GET /api/order/:id', async () => {
      const res = await request(app)
        .get(`/api/order/:${testOrder.id}`)
        .expect(200)

      expect(res.body).to.be.an('array') //array of trips
      expect(res.body[0].id).to.be.equal(bigBang.id)
      expect(res.body[1].id).to.be.equal(frenchRev.id)
      expect(res.body[0].destination).to.be.an('object')
      expect(res.body[0].destination.name).to.be.equal('Big Bang')
      expect(Math.number(res.body[1].destination.cost)).to.be.equal(100)
    })
  }) // end describe('/api/order')
}) // end describe('order routes')
