'use strict'

const db = require('../server/db')
const {Destination, User, Order, Trip} = require('../server/db/models')

const destinationData = [
  {
    name: 'World War II Germany',
    imageUrl:
      'https://www.historia.ro/sectiune/general/articol/the-german-resistance-to-hitler-from-protests-to-assassinations',
    cost: 3000,
    timePeriod: '20th century',
    description: 'Everybody wants to kill Hitler!'
  },
  {
    name: 'Prehistoric Times',
    imageUrl:
      'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/jurassic-dinosaurs-artwork-richard-bizley.jpg',
    cost: 12000,
    timePeriod: 'Jurassic',
    description: 'Run with the dinosaurs!'
  },
  {
    name: 'Paris World Fair',
    imageUrl:
      'https://i1.wp.com/parisbanlieue.blog.lemonde.fr/files/2008/03/construction-de-la-tour-eiffel.1205317476.jpg?zoom=2&resize=400%2C199',
    cost: 2500,
    timePeriod: '19th century',
    description: 'Come see the unveiling of the Eiffel Tower!'
  },
  {
    name: 'The First Olympics',
    imageUrl:
      'https://www.historyonthenet.com/wp-content/uploads/2014/07/anicent-olympics-games.jpg',
    cost: 9000,
    timePeriod: '8th century BCE',
    description:
      'Watch ancient athletes compete in the first sporting competition of the human race!'
  },
  {
    name: 'Great Wall of China',
    imageUrl:
      'https://www.ancient-origins.net/sites/default/files/field/image/The-Great-Wall-of-China.jpg',
    cost: 5000,
    timePeriod: '1st century BCE',
    description:
      "See the Great Wall of China under the newly unified rule of China's first emperor, Qin Shi Huang!"
  },
  {
    name: 'Taj Majal',
    imageUrl:
      'https://img.purch.com/h/1400/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzAzNi83NTYvb3JpZ2luYWwvc2h1dHRlcnN0b2NrXzEwNzI2MTI0OS5qcGc/MTM2MDg3MTkxMQ==',
    cost: 6000,
    timePeriod: '17th century',
    description:
      'Visit this architectural masterpiece, commissioned by Mughal emperor Shah Jahan to house the tomb of his wife, Mumtaz Mahal, during the week of its unveiling!'
  },
  {
    name: 'Amazon Rainforest',
    imageUrl:
      'http://amazonrainforestfirstperiod.weebly.com/uploads/1/4/4/9/14499886/4923961.jpeg?542',
    cost: 4000,
    timePeriod: '16th century',
    description:
      'Enjoy the brilliant biodiversity of the rich rainforests of the Amazon River Basin, long before the current deforestation crisis!'
  }
]

const userData = [
  {
    userName: 'Janelle Monae',
    email: 'janelle@wondaland.com',
    password: 'cindimayweather',
    salt: 's71cj1u1sihyix9ejlmda',
    stripeToken: ''
  },
  {
    userName: 'Awkwafina',
    email: 'awkwafina@awkwafina.nyc',
    password: 'queensrules',
    salt: 'ds938gkyysislpwlhexbel',
    stripeToken: ''
  },
  {
    userName: 'Beyonce',
    email: 'beyonce@tidal.com',
    password: 'destinyschild',
    salt: 'he2nbflabo27k7zfnfo6w',
    stripeToken: ''
  },
  {
    userName: 'Laura Dern',
    email: 'holdo@starwars.com',
    password: 'ellie',
    salt: 'd8emabxoxql6vuvlyd40yb',
    stripeToken: ''
  }
]

const orderData = [
  {completed: false},
  {completed: false},
  {completed: false},
  {completed: false},
  {completed: true}
]

const tripData = [
  {numPassengers: 1},
  {numPassengers: 2},
  {numPassengers: 4},
  {numPassengers: 1},
  {numPassengers: 1},
  {numPassengers: 2},
  {numPassengers: 3}
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const destinations = await Promise.all(
    destinationData.map(async destination => {
      const allDestinations = await Destination.create(destination)
      return allDestinations
    })
  )
  console.log(`seeded ${destinations.length} destinations`)

  const users = await Promise.all(
    userData.map(async user => {
      const allUsers = await User.create(user)
      return allUsers
    })
  )
  console.log(`seeded ${users.length} users`)

  const orders = await Promise.all(
    orderData.map(async order => {
      const allOrders = await Order.create(order)
      return allOrders
    })
  )
  console.log(`seeded ${orders.length} orders`)

  const trips = await Promise.all(
    tripData.map(async trip => {
      const allTrips = await Trip.create(trip)
      return allTrips
    })
  )
  console.log(`seeded ${trips.length} trips`)

  // associations here
  const [
    germany,
    prehistoric,
    paris,
    olympics,
    china,
    india,
    amazon
  ] = destinations
  const [janelle, awkwafina, beyonce, laura] = users
  const [first, second, third, fourth, fifth] = orders
  const [trip1, trip2, trip3, trip4, trip5, trip6, trip7] = trips

  await Promise.all([
    first.setUser(janelle),
    second.setUser(awkwafina),
    third.setUser(beyonce),
    fourth.setUser(laura),
    fifth.setUser(janelle),

    trip1.setOrder(first),
    trip2.setOrder(second),
    trip3.setOrder(third),
    trip4.setOrder(fourth),
    trip5.setOrder(fifth),
    trip6.setOrder(first),
    trip7.setOrder(second),

    trip1.setDestination(germany),
    trip2.setDestination(prehistoric),
    trip3.setDestination(paris),
    trip4.setDestination(olympics),
    trip5.setDestination(china),
    trip6.setDestination(india),
    trip7.setDestination(amazon)
  ])
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
