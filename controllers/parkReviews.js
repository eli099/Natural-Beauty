import Park from "../models/parks.js"

// Method: POST
// Endpoint: /parks/:id/reviews
// Description: Add review to a park
export const addReview = async (req, res) => {
  const { id } = req.params
  console.log('review req.body ->', req.body)
  console.log('req.verifiedUser ->', req.verifiedUser)
  try {
    const parkToUpdate = await Park.findById(id)
    if (!parkToUpdate) throw new Error('Park not found')
    console.log('parkToUpdate ->', parkToUpdate)
    // Review with an owner
    const reviewWithOwner = { ...req.body, owner: req.verifiedUser._id }
    console.log('reviewWithOwner ->', reviewWithOwner)
    // Add review to the park document
    parkToUpdate.reviews.push(reviewWithOwner)
    console.log('reviews ->', parkToUpdate.reviews)
    // Save the updated document
    await parkToUpdate.save()
    // Send back to user
    return res.status(200).json(reviewWithOwner)
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
}