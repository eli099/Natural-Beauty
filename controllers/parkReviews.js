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
    // console.log('parkToUpdate ->', parkToUpdate)
    // Review with an owner
    const reviewWithOwner = { ...req.body, owner: req.verifiedUser._id }
    console.log('reviewWithOwner ->', reviewWithOwner)
    // Add review to the park document
    parkToUpdate.reviews.push(reviewWithOwner)
    console.log('parkToUpdate ->', parkToUpdate)
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

// Method: DELETE
// Endpoint: /parks/:id/reviews/:reviewId
// Description: Delete a review
export const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params
  try {
    // Find park that has specific review
    const park = await Park.findById(id)
    if (!park) throw new Error('Not found')
    console.log('reviewId ->', reviewId)
    // Find review to delete in reviews array
    const reviewToDelete = park.reviews.id(reviewId) // throw error if not found
    if (!reviewToDelete) throw new Error('Review not found')
    // Check if logged in user is owner of the review
    if (!reviewToDelete.owner.equals(req.verifiedUser._id)) throw new Error('Unauthorised')
    // Remove subdocument from document's reviews array
    await reviewToDelete.remove()
    // Save the updated document
    await park.save()
    // Return sendStatus (no body returned)
    return res.sendStatus(204) // 'No Content' status
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorised' })
  }
}