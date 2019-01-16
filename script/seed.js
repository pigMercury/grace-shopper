'use strict'

const db = require('../server/db')
const {Destination, User, Order, Trip} = require('../server/db/models')

const destinationData = [
  {
    name: 'World War II Germany',
    imageURL: 'https://historia.adhst.ro/img/articles/2017/03/22/hitler_6.jpg',
    cost: 3000,
    timePeriod: '20th century',
    description: 'Everybody wants to kill Hitler!',
    image2: 'https://i.ytimg.com/vi/VsuK6vNX-NQ/maxresdefault.jpg',
    image3:
      'https://nationalinterest.org/sites/default/files/styles/desktop__1486_x_614/public/main_images/bundesarchiv_bild_183-1987-0703-507_berlin_reichstagssitzung_rede_adolf_hitler.jpg?itok=CUczp6J2',
    image4:
      'https://spectator.imgix.net/content/uploads/2017/08/GettyImages-3355013.jpg?auto=compress,enhance,format&crop=faces,entropy,edges&fit=crop&w=820&h=550',
    image5:
      'https://am23.akamaized.net/tms/cnt/uploads/2018/06/captainamerica-punches-hitler-1200x675.jpg',
    image6:
      'http://skepticism-images.s3-website-us-east-1.amazonaws.com/images/jreviews/Hitler-Speech-Rally-1937.04.jpg'
  },
  {
    name: 'Prehistoric Times',
    imageURL:
      'http://www.peimag.com/wp-content/uploads/2016/05/all-prehistoric-creatures-dinosaurs.jpg',
    cost: 12000,
    timePeriod: 'Jurassic',
    description: 'Run with the dinosaurs!',
    image2:
      'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/jurassic-dinosaurs-artwork-richard-bizley.jpg',
    image3:
      'https://this.deakin.edu.au/wp-content/uploads/2017/01/shutterstock_108683072.jpg',
    image4: 'https://wallpapercave.com/wp/xWlhICf.jpg',
    image5:
      'http://cdn.sci-news.com/images/enlarge/image_2983_1e-Huanansaurus-ganzhouensis.jpg',
    image6:
      'https://wallpapertag.com/wallpaper/full/f/4/7/308997-widescreen-dinosaur-wallpaper-2880x1800-720p.jpg'
  },
  {
    name: 'Paris World Fair',
    imageURL:
      'https://i1.wp.com/parisbanlieue.blog.lemonde.fr/files/2008/03/construction-de-la-tour-eiffel.1205317476.jpg?zoom=2&resize=400%2C199',
    cost: 2500,
    timePeriod: '19th century',
    description: 'Come see the unveiling of the Eiffel Tower!',
    image2:
      'https://www.nga.gov/content/dam/ngaweb/features/slideshows/Exposition-Universelle-de-1889/03fntmonum.jpg',
    image3:
      'https://www.histoires-de-paris.fr/wp-content/uploads/2016/04/vue-g%C3%A9n%C3%A9rale-de-lexposition-universelle-de-1889.jpg',
    image4:
      'https://www.unjourdeplusaparis.com/wp-content/uploads/2016/03/exposition-universelle-1889-pavilon-pastellistes-francais.jpg',
    image5: 'https://i.ebayimg.com/images/i/322328888430-0-1/s-l1000.jpg',
    image6:
      'https://upload.wikimedia.org/wikipedia/commons/c/c8/Eiffel_tower_at_Exposition_Universelle%2C_Paris%2C_1889.jpg'
  },
  {
    name: 'The First Olympics',
    imageURL:
      'https://www.historyonthenet.com/wp-content/uploads/2014/07/anicent-olympics-games.jpg',
    cost: 9000,
    timePeriod: '8th century BCE',
    description:
      'Watch ancient athletes compete in the first sporting competition of the human race!',
    image2:
      'http://medias.photodeck.com/5a1c6d18-3a2e-11e0-8df7-4d92141bcedd/000065_xgaplus.jpg',
    image3:
      'http://www.greece-is.com/wp-content/uploads/2017/01/06_AMFOREAS_BERLIN_VATICANO.jpg',
    image4:
      'http://medias.photodeck.com/557f5dce-3a2e-11e0-a1cf-df64ff53b6b1/000061_xgaplus.jpg',
    image5:
      'http://villahurmuses.com/wp-content/uploads/2017/05/Ancient-Olympics-and-Armenian-Champions.jpg',
    image6:
      'https://astoriatravel.gr/wp-content/uploads/2018/09/The-Pangkration.jpg'
  },
  {
    name: 'Great Wall of China',
    imageURL:
      'https://www.ancient-origins.net/sites/default/files/field/image/The-Great-Wall-of-China.jpg',
    cost: 5000,
    timePeriod: '1st century BCE',
    description:
      "See the Great Wall of China under the newly unified rule of China's first emperor, Qin Shi Huang!",
    image2:
      'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2014/09/18/102013848-china-great-wall.jpg?v=1411063518',
    image3:
      'https://upload.wikimedia.org/wikipedia/commons/e/ec/Allom_-_The_Great_Wall_of_China.jpg',
    image4:
      'https://www.ancient-origins.net/sites/default/files/field/image/The-Great-Wall-of-China.jpg',
    image5:
      'https://cdn.theatlantic.com/assets/media/img/photo/2016/09/thomas-child-images/02_t/main_1500.jpg',
    image6: 'https://www.awesomestories.com/images/user/e0a5f530f9.jpg'
  },
  {
    name: 'Taj Majal',
    imageURL:
      'https://img.purch.com/h/1400/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzAzNi83NTYvb3JpZ2luYWwvc2h1dHRlcnN0b2NrXzEwNzI2MTI0OS5qcGc/MTM2MDg3MTkxMQ==',
    cost: 6000,
    timePeriod: '17th century',
    description:
      'Visit this architectural masterpiece, commissioned by Mughal emperor Shah Jahan to house the tomb of his wife, Mumtaz Mahal, during the week of its unveiling!',
    image2:
      'https://www.thoughtco.com/thmb/1g2-jnNGFo6SMikINMmHOmKsBMI=/3865x2576/filters:fill(auto,1)/sunrise-at-taj-mahal--agra--uttar-pradash--india-583682538-5b91840bc9e77c0050bdc67b.jpg',
    image3:
      'https://cdn.modlar.com/photos/2908/img/s_1920_x/the_taj_mahal_56aa8b2a527e5.jpg',
    image4:
      'https://cdn3.i-scmp.com/sites/default/files/styles/landscape/public/images/methode/2016/06/30/ba318890-39de-11e6-9a6a-3421f730b241_1280x720.JPG?itok=tCjnqhoz',
    image5:
      'https://i.pinimg.com/originals/1f/df/05/1fdf05540dc944fde603b0a562e22a50.jpg',
    image6:
      'https://cdn.fodors.com/wp-content/uploads/2018/01/Taj-Mahal-FAQ-Can-You-Go-Inside-2-1.jpg'
  },
  {
    name: 'Amazon Rainforest',
    imageURL:
      'http://amazonrainforestfirstperiod.weebly.com/uploads/1/4/4/9/14499886/4923961.jpeg?542',
    cost: 4000,
    timePeriod: '16th century',
    description:
      'Enjoy the brilliant biodiversity of the rich rainforests of the Amazon River Basin, long before the current deforestation crisis!',
    image2:
      'https://store-images.s-microsoft.com/image/apps.34318.13906265068838635.fa666570-9215-4663-a751-73919e9039ae.3b073d49-d3b2-4f13-a53e-58ea7e71df88?mode=scale&q=90&h=1080&w=1920',
    image3:
      'https://waylandlibrary.org/wp-content/uploads/2018/04/slides_madagascar_0293.jpg',
    image4:
      'https://storage.googleapis.com/plugbucket/pub/up/6/6e0/6e00798662e94e6a8119f918eda65170/img1.jpg',
    image5:
      'https://i.pinimg.com/originals/43/d8/66/43d86646329a9c280a765b842e1f6faa.jpg',
    image6:
      'http://1.bp.blogspot.com/-Nre9h_T4qok/U2c7PAEq1HI/AAAAAAAAAR8/hrB_JHKg3Zw/s1600/Amazon+Rainforest+Animals+-+The+Three-Toed+Sloth.jpg'
  }
]

const userData = [
  {
    email: 'janelle@wondaland.com',
    password: 'cindimayweather',
    salt: 's71cj1u1sihyix9ejlmda',
    stripeToken: ''
  },
  {
    email: 'awkwafina@awkwafina.nyc',
    password: 'queensrules',
    salt: 'ds938gkyysislpwlhexbel',
    stripeToken: ''
  },
  {
    email: 'beyonce@tidal.com',
    password: 'destinyschild',
    salt: 'he2nbflabo27k7zfnfo6w',
    stripeToken: ''
  },
  {
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
