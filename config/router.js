import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.js'
// import { secureRoute } from './secureRoute.js'

// Import controllers
import { getSinglePark, showParks } from '../controllers/parks.js'
import { showAllUsers, showUser } from '../controllers/users.js'
import { secureRoute } from './secureRoute.js'

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

// Get Single User Profile
router.route('/profile') // GET
.get(secureRoute, showUser)

// ! For Dev Only 
router.route('/allprofiles') // GET
.get(showAllUsers)
// !

export default router