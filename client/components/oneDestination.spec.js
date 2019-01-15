/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {OneDestination} from './OneDestination'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('<OneDestination /> component', () => {
  let oneDestinationList
  const destinationData = [
    {
      name: 'World War II Germany',
      imageURL:
        'https://historia.adhst.ro/img/articles/2017/03/22/hitler_6.jpg',
      cost: 3000,
      timePeriod: '20th century',
      description: 'Everybody wants to kill Hitler!'
    },
    {
      name: 'Prehistoric Times',
      imageURL:
        'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/jurassic-dinosaurs-artwork-richard-bizley.jpg',
      cost: 12000,
      timePeriod: 'Jurassic',
      description: 'Run with the dinosaurs!'
    },
    {
      name: 'Paris World Fair',
      imageURL:
        'https://i1.wp.com/parisbanlieue.blog.lemonde.fr/files/2008/03/construction-de-la-tour-eiffel.1205317476.jpg?zoom=2&resize=400%2C199',
      cost: 2500,
      timePeriod: '19th century',
      description: 'Come see the unveiling of the Eiffel Tower!'
    },
    {
      name: 'The First Olympics',
      imageURL:
        'https://www.historyonthenet.com/wp-content/uploads/2014/07/anicent-olympics-games.jpg',
      cost: 9000,
      timePeriod: '8th century BCE',
      description:
        'Watch ancient athletes compete in the first sporting competition of the human race!'
    }
  ]

  beforeEach(oneDestinationList => {
    // for (let el of oneDestinationList)
    // let oneDestinationList = shallow(
    //   dest => <OneDestination dest={dest} key={dest.id} />)
    // )
  })

  xit('renders each oneDestination in the list as div', () => {
    expect(oneDestinationList.find('div').text()).to.be.equal(4)
  })
})
