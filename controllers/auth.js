import User from '../models/users.js'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config/environment.js'

// METHOD: POST
// Endpoint: /register
// Description: creates newUser using User model req.body (contains username, email, password and passwordConfirmation)
// Description: virtual field model checks password & passwordConfirmation match
export const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    console.log('newUser ->', newUser)
    return res.status(202).json({ message: `Welcome ${newUser.username} to a fresh new look at our humble natural playground` })
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
}

// METHOD: POST
// Endpoint: /login
// Description: Log user in by checking plain text password (entered in form) matches the saved hashed password
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const userToLogin = await User.findOne({ email: email })
    // ^ Finding a user with an email matching the entered email
    if (!userToLogin || !userToLogin.validatePassword(password)) {
      // ^ If email doesn't exist OR the password isn't validated (validatePassword method written in users model)
      // throw error
      throw new Error()
    }

    const token = jwt.sign({ sub: userToLogin._id }, SECRET, { expiresIn: '10d' })
    // ^ generates a token containing relevant info to validate user
    // 1st use payload.sub to validate user; 2nd SECRET makes our token secure; sets expiry

    return res.status(200).json({ message: `Welcome back ${userToLogin.username}, we're pleased to see you again`, token: token })

  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: '❌ Unauthorised!' })
  }
}

// Method: GET All Users
// Endpoint: /profile
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

// Method: GET User profile
// Endpoint: /profile/:id
// Description: Show user profile based on their document ID
export const showUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found'})
    }
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}
