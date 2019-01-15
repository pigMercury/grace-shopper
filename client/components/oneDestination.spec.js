/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {OneDestination} from './oneDestination'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('<OneDestination /> component', () => {
  let dest
  let renderedDest
  beforeEach(() => {
    dest = {
      name: 'The First Olympics',
      imageURL:
        'https://www.historyonthenet.com/wp-content/uploads/2014/07/anicent-olympics-games.jpg',
      cost: 9000,
      timePeriod: '8th century BCE',
      description:
        'Watch ancient athletes compete in the first sporting competition of the human race!'
    }
    renderedDest = shallow(<OneDestination dest={dest} key={dest.id} />)
  })

  it('contains a break', () => {
    expect(renderedDest.contains(<br />)).to.be.equal(true)
  })

  it('renders the destination as a div', () => {
    expect(renderedDest.find('div')).to.have.length(1)
  })

  it('renders the destination with a NavLink', () => {
    expect(renderedDest.find('NavLink')).to.have.length(1)
  })

  it('renders the destination with an "add to cart" button', () => {
    expect(renderedDest.find('button').text()).to.be.equal('Add to Cart')
  })

  it('renders the destination with the correct cost', () => {
    expect(renderedDest.find('h5').text()).to.be.equal('$' + dest.cost)
  })
})
