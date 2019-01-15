/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let myOrder

  beforeEach(async () => {
    myOrder = await Order.create()
  })

  it('new orders default to incomplete', () => {
    expect(myOrder.completed).to.be.equal(false)
  })
})
