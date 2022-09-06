import express from 'express'
import mongoose from 'mongoose'

// Import environment
import { PORT, MONGODB_CONNECTION_STRING } from './config/environment.js'
// import { getSinglePark, showParks } from './controllers/parks.js'

// Import model
// import Park from './models/parks.js'

// Import router
import router from './config/router.js'

// ! Heroku/Deployment

import 'dotenv/config' // only needs to be added if it doesn't already exist
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Logger
const logger = (req, res, next) => {
  // console.log('req.body ->', req.body)
  console.log(`🚨 - Incoming request on ${req.method} - ${req.url}`)
  next()
}

// Initialise express server
const startServer = async () => {

  const app = express()

  app.use(logger)
  app.use(express.json())


  // app.get('/', (req, res, next) => {
  //   return res.end('Welcome to our API')
  // })

  // Connect to router
  app.use('/api', router)

  // ** New lines **
  // ! Heroku/Deployment
  app.use(express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })

  // Connect to database with mongoose
  await mongoose.connect(process.env.DB_URI)
  console.log('Connected to MongoDB!')

  app.listen(process.env.PORT, () => console.log(`🏔  - Server listening on port ${process.env.PORT}`))
}

startServer()

