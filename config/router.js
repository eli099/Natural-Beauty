import express from 'express'

// Import controllers
import { getSinglePark, showParks } from '../controllers/parks.js'

// Router
const router = express.Router()

// ? Routes

// Generic
router.route('/parks')
  .get(showParks)

// Individual
router.route('/parks')
  .get(getSinglePark)

export default router