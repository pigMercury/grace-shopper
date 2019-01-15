/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Trip = db.model('trip')

describe('Trip model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('prevents invalid numPassengers', () => {
    let badTrip

    //returns error, as expected
    beforeEach(async () => {
      badTrip = await Trip.create({
        numPassengers: -1
      })
    })

    describe('invalid number', () => {
      xit('does not populate numPassengers', () => {
        expect(badTrip).to.be.equal(undefined)
      })
    })
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
})
