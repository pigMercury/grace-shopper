/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Destination = db.model('destination')

describe('Destination routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/destination/', () => {
    const bigBang = {
      name: 'Big Bang',
      imageUrl: null,
      cost: 500,
      timePeriod: 'Prehistoric',
      description: 'REALLY LOUD'
    }

    const frenchRev = {
      name: 'French Revolution',
      imageUrl: null,
      cost: 100,
      timePeriod: '19th Century',
      description: 'Really bloody... watch your head...'
    }

    beforeEach(() => {
      return Destination.bulkCreate([bigBang, frenchRev])
    })

    // xit('GET /api/destination', async () => {
    //   const res = await request(app)
    //     .get('/api/destination')
    //     .expect(200)

    //   expect(res.body).to.be.an('object')
    //   expect(res.body.name).to.be.equal('Big Bang')
    // })

    it('GET /api/destination/:id', async () => {
      const res = await request(app)
        .get(`/api/destination/2`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('French Revolution')
    })
  }) // end describe('/api/destination')
}) // end describe('Destination routes')
