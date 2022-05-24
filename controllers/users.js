import Park from '../models/parks.js'
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

// Method: PUT/POST Add To Favourites //! OR remove from favourites
// Endpoint: /profile
// Description: Allow user to add Parks they like to their own list of favourites
// ! ALSO DELETES said park if present in User's profile already <- A Toggle
export const addFavourite = async (req, res) => {
  const { id } = req.params
  console.log('verfifiedUser ->', req.verifiedUser)
  try {
    // Find the user through the request body's verified (logged in) user
    let profile = await User.findById(req.verifiedUser._id)
    console.log('fav user ->', profile)
    // Find the park the user wants to add by its ID
    const parkToAdd = await Park.findById(id)
    console.log('profile ->', profile)
    console.log('parkToAdd ->', parkToAdd._id.toString())
    // Change the ObjectId to a string
    const parkId = parkToAdd._id.toString()
    console.log('current profile favourites ->', profile.favourites)

    const newObject = { parkId: parkId, name: parkToAdd.name, image: parkToAdd.parkImg[0] }
    console.log('newObject ->', newObject)


    profile.favourites.forEach(favPark => {
      if (favPark.parkId === newObject.parkId) {
        const filteredParks = profile.favourites.filter(favPark => favPark.parkId !== newObject.parkId)
        console.log('filteredParks ->', filteredParks)

        profile.favourites = filteredParks
        console.log('updated favourites ->', profile.favourites)
      } else {
        profile.favourites.push(newObject)
      }
    })


    // profile.favourites.push(newObject)

    // console.log('prof fav ->', profile.favourites[currentChoiceIndex])
    // // Stop user from adding multiple of the same IDs
    // if (profile.favourites[currentChoiceIndex].id) {
    //   if (profile.favourites[currentChoiceIndex].id === parkId) {
    //     // Object assign profile with itself minus the current choice
    //     return res.status(401).json('Already added!')
    //   }
    //   if (!profile.favourites[currentChoiceIndex].id) {
    //     // Push the ID to the favourites key
    //     // profile.favourites.push(parkId)
    //     Object.assign(profile.favourites[currentChoiceIndex], newObject)
    //     await profile.save()
    //   }
    // } 
    await profile.save()
    return res.status(200).json(profile)
  } catch (error) {
    console.log(error)
  }
}