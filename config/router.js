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
router.route('/parks/:id')
  .get(getSinglePark)

// Authentication
router.route('/register') // POST

router.route('/login') // POST

router.route('/profile') // GET

export default router