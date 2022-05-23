import User from '../models/users.js'

// ! For Dev Use only
// Method: GET All Users
// Endpoint: /allprofiles
// Description: Show all user profile
export const showAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    console.log('all users ->', { users })
    return res.status(200).json(users)
  } catch (error) {
    console.log(error)
  }
}
// !

// Method: GET User profile
// Endpoint: /profile
// Description: Show logged in user's profile based on token
export const showUser = async (req, res) => {
  console.log('verfifiedUser ->', req.verifiedUser)
  try {
    // Get profile info
    const profile = await User.findById(req.verifiedUser._id)
    return res.status(200).json(profile)
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorised' })
  }
}