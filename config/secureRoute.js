import jwt from 'jsonwebtoken'
import User from '../models/users.js'
// import { SECRET } from './environment.js'

export const secureRoute = async (req, res, next) => {
  console.log('🚨 YOU\'VE HIT THE SECURE ROUTE 🚨')
  try {
    console.log('HEADERS -->', req.headers)
    console.log('secureRoute req body ->', req.body)
    if (!req.headers.authorization) throw new Error('Missing authorisation header')
    // ^ Check to see if an authorisation header exists 

    const token = req.headers.authorization.replace('Bearer ', '')
    // ^ this removes 'Bearer ' from the beginning of the tokenm which allows straightforward decoding for comparison
    console.log('secureRoute token ->', token)

    const payload = jwt.verify(token, process.env.SECRET)
    // ^ verifies the token using the secure secret key
    console.log('secureRoute payload ->', payload)

    const userToVerify = await User.findById(payload.sub)
    // ^ check the user exists by ssearching for them using the paylload.sub (which should match the user id)
    // if they don't exist then throw error
    if (!userToVerify) throw new Error('User not found')

    req.verifiedUser = userToVerify
    // ^ if they do exist, update the req object with the verified user
    console.log('req.verifiedUser ->', req.verifiedUser)

    // At this point the token AND the user is valid, so pass the request onto the controller using next()
    next()

  } catch (error) {
    console.log('verification error ->', error)
    return res.status(401).json({ message: '❌ Unauthorised!'})
  }
}