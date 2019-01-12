/* global describe beforeEach it */

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
      imageURL: null,
      cost: 500,
      timePeriod: 'Prehistoric',
      description: 'REALLY LOUD'
    }

    const frenchRev = {
      name: 'French Revolution',
      imageURL: null,
      cost: 100,
      timePeriod: '19th Century',
      description: 'Really bloody... watch your head...'
    }

    //make an order
    const testOrder = {
      completed: false
      //userId: 1
    }

    //make trips
    const bigBangTrip = {
      numPassengers: 4,
      destinationId: 1,
      orderId: 1,
      id: 1
    }

    const frenchRevTrip = {
      numPassengers: 2,
      destinationId: 2,
      orderId: 1,
      id: 2
    }

    beforeEach(() => {
      return Destination.bulkCreate([bigBang, frenchRev])
    })

    beforeEach(() => {
      return Order.create(testOrder)
    })

    beforeEach(() => {
      return Trip.bulkCreate([bigBangTrip, frenchRevTrip])
    })

    it('Gets trips, eager loads destinations', async () => {
      //should return array of trips
      const res = await request(app)
        .get(`/api/order/1`)
        .expect(200)

      expect(res.body).to.be.an('array') //array of trips
      console.log(res.body)
      expect(res.body[0].destination).to.be.an('object')
      expect(res.body[0].id).to.be.equal(bigBangTrip.id)
      expect(res.body[1].id).to.be.equal(frenchRevTrip.id)
      expect(res.body[0].destination.name).to.be.equal('Big Bang')
      expect(res.body[1].destination.cost).to.be.equal(100)
    })
  }) // end describe('/api/order')
}) // end describe('order routes')
