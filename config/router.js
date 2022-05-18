import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.js'
// import { secureRoute } from './secureRoute.js'

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
  .post(registerUser)

router.route('/login') // POST
  .post(loginUser)

router.route('/profile') // GET

export default router