import Park from "../models/parks.js"

// Method: GET
// Endpoint: /parks
// Description: Return all national park documents
export const showParks = async (req, res, next) => {
  console.log('hello')
  const park = await Park.find()
  console.log({ park })
  return res.status(200).json(park)
}

// Method: GET
// Endpoint: /parks/:id
// Description: Get specific national park by its ID
export const getSinglePark = async (req, res) => {
  const { id } = req.params
  console.log('id ->', id)
  try {
    const park = await Park.findById(id)
    if (!park) {
      return res.status(404).json({ message: 'National park not found' })
    }
    console.log({ park })
    return res.status(200).json(park)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}