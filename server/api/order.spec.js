/* global describe beforeEach it */

//Needs to be finished!

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/order/', () => {
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

    const testOrder = {
      completed: false
    }

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

    beforeEach(() => {
      return Destination.create({
        email: codysEmail
      })
    })

    xit('GET /api/order', async () => {
      const res = await request(app)
        .get('/api/order')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/order')
}) // end describe('order routes')
