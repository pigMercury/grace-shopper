/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Trip = db.model('trip')

///////WHHHHYYYYY is it only running the first half of my tests?????

describe('Trip model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Applies numPassengers', () => {
    let myTrip
    beforeEach(async () => {
      myTrip = await Trip.create({
        numPassengers: 5
      })
    })

    describe('valid number', () => {
      it('trips have passengers', () => {
        expect(myTrip.numPassengers).to.be.equal(5)
      })
    })
  })

  describe('prevents invalid numPassengers', () => {
    let badTrip

    beforeEach(async () => {
      badTrip = await Trip.create({
        numPassengers: -1
      })

      describe('invalid number', () => {
        it('does not populate numPassengers', () => {
          expect(badTrip.numPassengers).to.be.equal(undefined)
        })
      })
    })
  })
})
