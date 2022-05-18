const parksRec = [
  {
    code: 'SDNP',
    name: 'South Down National Park',
    location: [50.9893, -0.7381],
    postcode: 'GU29 9DH',
    description: 'Not only have the centuries of human habitation shaped the National Park but the landscape has and still does, dictate where people have chosen to live and work the land. This is a landscape rich in folklore and legend that has inspired generations of writers, artists and storytellers who have flocked to witness the beauty of the rolling chalk downland and the wooded heaths of the National Park.',
    parkImg: ['../../assets/parkImgs/SDNP/SDNP1.png', '../../assets/parkImgs/SDNP/SDNP2.jpeg', '../../assets/parkImgs/SDNP/SDNP3.jpeg'],
    website: 'https://www.southdowns.gov.uk/', 
    iconicWildlife: ['burnt orchid', 'round-headed rampion', 'otter', 'skylark', 'barn owl', 'brown trout', 'barbastelle bat', 'chalk carpet moth', 'sundew (carnivorous plant)'],
    keyWildlife: ['butterflies'],
    trails: [{
      name: 'South Downs Way',
      link: 'https://www.nationaltrail.co.uk/en_GB/trails/south-downs-way/'}, 
      {
        name: 'Kingley Vale Trail',
        link: 'https://www.thegreatsussexway.org/things-to-do/kingley-vale-trail/'
      },
      {
        name: 'The Serpent Trail',
        link: 'https://www.southdowns.gov.uk/get-active/on-foot/serpent-trail/'
      }
    ],
    activities: ['Walking', 'Hiking', 'Cycling', 'Kayaking', 'Paddleboarding', 'Foraging', 'Stargazing'],
    reviews: {
      beauty: 5,
      wildlife: 3,
      trails: 5,
      camping: 2,
      // foodDrink: 4,
    },
    // usersSay: [SELECT],
    attractions: [
      {
        name: 'Stargazing at SDNP International Dark Skies Reserve',
        code: 'IDSR',
        location: [50.977683, -0.980305],
        description: 'As one of 10 Dark Skies Discovery Sites within the National Park, Seven Sisters Country Park is one of the best places to view the night sky. On a clear night from October through to March, it\'s possible to catch glimpses of the Milky Way as it rises above the famous chalk cliffs.',
        keyFeature: 'Stargazing',
        localImg: ['../../assets/parkImgs/SDNP/IDSR1.jpeg', '../../assets/parkImgs/SDNP/IDSR2.jpeg', '../../assets/parkImgs/SDNP/IDSR3.jpeg'],
        moreInfo: 'https://www.southdowns.gov.uk/dark-night-skies/where-to-stargaze/',
        // usersSay: [SELECT]
      },
      {
        name: 'Seven Sisters Experience',
        code: 'SSE',
        location: [50.776146, 0.152066],
        description: 'Globally-important habitats, unique wildlife and heritage secrets make Seven Sisters a truly special place. Your route will take you through an area popular with smugglers, folklore and a diverse natural wildlife habitat ranging from forest, chalk downland and the seashore.',
        keyFeature: 'Spectacular coastal views',
        localImg: ['../../assets/parkImgs/SDNP/SSE1.jpeg', '../../assets/parkImgs/SDNP/SSE2.jpeg', '../../assets/parkImgs/SDNP/SSE3.jpeg'],
        moreInfo: 'https://www.sevensisters.org.uk/',
        // usersSay: [SELECT]
      },
      {
        name: 'Arundel Wetland Centre',
        code: 'AWC',
        location: [50.864231, -0.550414],
        description: 'A gorgeous nature reserve, home to incredible wetland birds. With wide-open spaces and wetlands full of the sights and sounds of nature, there\'s plenty to see and do at Arundel Wetland Centre.',
        keyFeature: 'Bird-watching',
        localImg: ['../../assets/parkImgs/SDNP/AWC1.jpeg', '../../assets/parkImgs/SDNP/AWC2.jpeg', '../../assets/parkImgs/SDNP/AWC4.jpeg'],
        moreInfo: 'https://www.visitarundel.co.uk/listing/arundel-wetland-centre/',
        // usersSay: [SELECT]
      }
    ]
  },
  {
    code: 'EXNP',
    name: 'Exmoor National Park',
    location: [51.1346, -3.6462],
    postcode: 'TA22 9HL',
    description: 'Famous for its wild deer and ponies, dramatic coastline and rugged heather moorland, there\’s plenty to see and do at Exmoor NP.  Large areas of open moorland provide a sense of remoteness and tranquillity rare in southern Britain. Spectacular coastal views, deep wooded valleys, high sea cliffs and fast flowing streams all combine to form a rich and distinct mosaic.',
    parkImg: ['../../assets/parkImgs/EMNP/EMNP1.jpeg', '../../assets/parkImgs/EMNP/EMNP1.jpeg', '../../assets/parkImgs/EMNP/EMNP1.png'],
    website: 'https://www.exmoor-nationalpark.gov.uk/', 
    iconicWildlife: ['wild red deer', 'Exmoor ponies', 'otters', 'butterflies', ],
    keyWildlife: ['wild red deer'],
    trails: [{
      name: 'The South West Coastal Path',
      link: 'https://www.southwestcoastpath.org.uk/walk-coast-path/south-west-coast-path-national-trail/day-walks/#'
      }, 
      {
        name: 'The Tarr Steps',
        link: 'https://www.thebestofexmoor.co.uk/blog/tarr-steps/'
      },
      {
        name: 'Valley of the Rocks',
        link: 'https://www.alltrails.com/trail/england/devon/valley-of-the-rocks-and-lynton-outer-loop'
      }
    ],
    activities: ['Walking', 'Hiking', 'Cycling', 'Horse-riding', 'Wild Swmming', 'Sea-Kayaking', 'Stargazing'],
    reviews: {
      beauty: 5,
      wildlife: 3,
      trails: 5,
      camping: 2,
      // foodDrink: 4,
    },
    // usersSay: [SELECT],
    attractions: [
      {
        name: 'Lynton & Lynmouth Cliff Railway',
        code: 'LCR',
        location: [51.1353, -3.5004],
        description: 'The Lynton and Lynmouth Cliff Railway is the highest and steepest water powered railway in the world. Who would have thought it, quiet little Exmoor has it\'s very own World Number 1. If you\'re after a great spot for a view of the coast with a cream tea to finish, this will be hard to beat',
        keyFeature: 'Spectacular views',
        localImg: ['../../assets/parkImgs/EMNP/LCR1.jpeg', '../../assets/parkImgs/EMNP/LCR2.jpeg', '../../assets/parkImgs/EMNP/LCR3.jpeg'],
        moreInfo: 'https://www.thebestofexmoor.co.uk/blog/lynton-lynmouth-cliff-railway/',
        // usersSay: [SELECT]
      },
      {
        name: 'Visit Dunster Castle',
        code: 'DC',
        location: [51.1859, -3.4389],
        description: 'Dunster Castle is steeped in history, well yes, it\'s a castle, but this building is so wonderfully preserved with the efforts of the National Trust, keeping this castle authentic and true to history. Great views of castle on approach, sitting majestically high, with Fabulous gardens, fascinating house and relaxed atmosphere.',
        keyFeature: 'Historically preserved castle',
        localImg: ['../../assets/parkImgs/EMNP/DC1.jpeg', '../../assets/parkImgs/EMNP/DC2.jpeg', '../../assets/parkImgs/EMNP/DC3.jpeg'],
        moreInfo: 'https://www.thebestofexmoor.co.uk/blog/dunster-castle/',
        // usersSay: [SELECT]
      },
      {
        name: 'Wild-swmming at Watersmeet',
        code: 'WSW',
        location: [50.864231, -0.550414],
        description: 'The East Lyn River and Hoar Oak Water come together at Watersmeet to create a glorious waterfall. It\'s a fantastic spot for wild swimming, with small plunge pools by the waterfall, or, a little further along the river from there, you will find Long Pool which stretches further and goes deeper…',
        keyFeature: 'Wild-swmming',
        localImg: ['../../assets/parkImgs/EMNP/WSW1.jpeg', '../../assets/parkImgs/EMNP/WSW2.jpeg', '../../assets/parkImgs/SDNP/EMNP/WSW3.jpeg'],
        moreInfo: 'https://www.visitarundel.co.uk/listing/arundel-wetland-centre/',
        // usersSay: [SELECT]
      }
    ]
  },
  {
    code: 'YDNP',
    name: 'Yorkshire Dales National Park',
    location: [54.1963, -2.1632],
    postcode: 'DL8 3EL',
    description: 'The Yorkshire Dales has many moods; it can be wild and windswept or quietly tranquil with valleys full of hay meadows, drystone walls and barns. Spectacular waterfalls and ancient woodlands contrast with the scattered remains of rural industries.',
    parkImg: ['../../assets/parkImgs/YDNP/YDNP1.jpeg', '../../assets/parkImgs/YDNP/YDNP2.jpeg', '../../assets/parkImgs/YDNP/YDNP3.png'],
    website: 'https://www.yorkshiredales.org.uk/', 
    iconicWildlife: ['curlews', 'lapwings', 'black grouse', 'skylarks', 'peregrine falcons','red squirrels'],
    keyWildlife: ['peregrine falcons'],
    trails: [{
      name: 'Yorkshire Three Peak Challenge',
      link: 'https://www.threepeakschallenge.uk/yorkshire-three-peaks-challenge/'
      }, 
      {
        name: 'Janet\'s Foss, Gordale Scar & Malham Cove',
        link: 'https://www.alltrails.com/trail/england/north-yorkshire/janet-s-foss-gordale-scar-and-malham-cove?ref=result-card'
      },
      {
        name: 'Aysgarth Falls & Freeholder\'s Wood',
        link: 'https://www.alltrails.com/trail/england/north-yorkshire/aysgarth-woods-and-waterfalls-circular'
      }
    ],
    activities: ['Walking', 'Hiking', 'Cycling', 'Horse-riding', 'Bird-watching', 'Wild Swmming', 'Waterfalls', 'Stargazing'],
    reviews: {
      beauty: 5,
      wildlife: 2,
      trails: 5,
      camping: 2,
      // foodDrink: 4,
    },
    // usersSay: [SELECT],
    attractions: [
      {
        name: 'The 3 Peaks Challenge',
        code: '3PC',
        location: [54.227730, -2.402498],
        description: 'The Yorkshire Dales has some of the most spectacular peaks in England, and the famous Yorkshire Three Peaks of Whernside, Ingleborough and Pen-y-Ghent are amongst the highest in the county, providing an inspiring challenge to walkers from around the world.',
        keyFeature: 'Hiking',
        localImg: ['../../assets/parkImgs/YDNP/3PC1.jpeg', '../../assets/parkImgs/YDNP/3PC2.jpeg', '../../assets/parkImgs/YDNP/3PC3.png'],
        moreInfo: 'https://www.threepeakschallenge.uk/yorkshire-three-peaks-challenge/',
        // usersSay: [SELECT]
      },
      {
        name: 'Stump Cross Caverns',
        code: 'SCC',
        location: [54.067506, -2.0054333],
        description: 'An ancient natural cave formation deep underneath the Yorkshire Dales',
        keyFeature: 'Underground caves',
        localImg: ['../../assets/parkImgs/YDNP/SCC1.jpeg', '../../assets/parkImgs/YDNP/SCC2.jpeg', '../../assets/parkImgs/YDNP/SCC3.jpeg'],
        moreInfo: 'https://www.stumpcrosscaverns.co.uk/',
        // usersSay: [SELECT]
      },
      {
        name: 'Jump in at Loup Scar',
        code: 'JLC',
        location: [54.3695, -1.572196],
        description: 'A fantastic stretch of grassy riverside incorporating river, meadow and beaches, with the limestone cliffs and the gorges of Loup Scar. There\'s a terrifying jump at Loup Scar, from the path on river R, into a small very deep plunge pool.',
        keyFeature: 'Wild-swmming',
        localImg: ['../../assets/parkImgs/YDNP/JLC1.jpeg', '../../assets/parkImgs/YDNP/JLC2.jpeg', '../../assets/parkImgs/SDNP/YDNP/JLC3.jpeg'],
        moreInfo: 'https://www.wildswimming.co.uk/adventures-yorkshire-dales/',
        // usersSay: [SELECT]
      }
    ]
  }
]

export default parksRec