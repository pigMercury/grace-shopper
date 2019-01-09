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
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return Destination.create({
        email: codysEmail
      })
    })

    xit('GET /api/destination', async () => {
      const res = await request(app)
        .get('/api/destination')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/destination')
}) // end describe('Destination routes')
