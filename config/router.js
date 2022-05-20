import express from 'express'
import { loginUser, registerUser, showAllUsers, showUser } from '../controllers/auth.js'
// import { secureRoute } from './secureRoute.js'

// Import controllers
import { getSinglePark, showParks } from '../controllers/parks.js'

// Router
const router = express.Router()

// ? Routes

//? Generic
// All Parks
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

// ? User Related
router.route('/profile') // GET
.get(showAllUsers)

// Get Single Park
router.route('/profile/:id') // GET
.get(showUser)

export default router