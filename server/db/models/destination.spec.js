/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Destination = db.model('destination')

describe('Destination model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validation works', () => {
    let WWI

    beforeEach(async () => {
      WWI = await Destination.create({
        name: 'World War I',
        cost: 1500,
        timePeriod: '20th century',
        description: 'The great war...'
      })
    })

    it('creates a new destination with all the entered properties', () => {
      expect(WWI.name).to.be.equal('World War I')
      expect(WWI.cost).to.be.equal(1500)
      expect(WWI.timePeriod).to.be.equal('20th century')
      expect(WWI.description).to.be.equal('The great war...')
    })

    it('populates a default image URL if none is provided', () => {
      expect(!WWI.imageURL).to.be.equal(false)
    })
  })
})
