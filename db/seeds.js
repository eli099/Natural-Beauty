import mongoose from 'mongoose'

import { MONGODB_CONNECTION_STRING } from '../config/environment.js'

// Import national park model
import Park from '../models/example.js'

// Import seed data
import parkData from './data/parksRec.js'

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(MONGODB_CONNECTION_STRING)
    console.log(`🚀 Database connected`)

    // Remove data
    await mongoose.connection.db.dropDatabase()
    console.log('✅ Database dropped')

    // Add seed data back in
    const parksAdded = await Park.create(parkData)
    console.log(`🌱 Database seeded with ${parksAdded.length} national park/s`)

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