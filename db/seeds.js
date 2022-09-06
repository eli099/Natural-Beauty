import mongoose from 'mongoose'

import { MONGODB_CONNECTION_STRING } from '../config/environment.js'

// Import national park model
import Park from '../models/parks.js'
import User from '../models/users.js'

// Import seed data
import parkData from './data/parksRec.js'
import userData from './data/users.js'

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.DB_URI)
    console.log(`🚀 Database connected`)

    // Remove data
    await mongoose.connection.db.dropDatabase()
    console.log('✅ Database dropped')

    // Add user data
    const usersAdded = await User.create(userData)
    console.log('users added ->', usersAdded)

    // Add seed data back in
    const parksAdded = await Park.create(parkData)
    console.log(`🌱 Database seeded with ${parksAdded.length} national parks and ${usersAdded.length} users.`)
    // console.log(parksAdded[0].attractions)

    // Close connection to database
    await mongoose.connection.close()
    console.log('👋 Bye')

  } catch (error) {
    console.log('💔 Something went wrong')
    console.log(error)

    // Close connection to database
    await mongoose.connection.close()
    console.log('❌ Connection closed due to failure')
  }
}

// Execute seed function
seedDatabase()