import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.js'
import { addReview } from '../controllers/parkReviews.js'

// Import controllers
import { getSinglePark, showParks } from '../controllers/parks.js'
import { addFavourite, showAllUsers, showUser } from '../controllers/users.js'
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
  .post(secureRoute, addFavourite) // Add a park to user's favourites key

// ? Reviews
// Add a review
router.route('/parks/:id/reviews')
  .post(secureRoute, addReview) // Add review to park document

// Authentication
router.route('/register') // POST
  .post(registerUser)

router.route('/login') // POST
  .post(loginUser)

// ? User Related

// Get Single User Profile
router.route('/profile') // GET
.get(secureRoute, showUser)

// ! For Testing Only 
router.route('/allprofiles') // GET
.get(showAllUsers)
// !

export default router