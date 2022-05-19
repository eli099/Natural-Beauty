import mongoose from 'mongoose'

const parkSchema = new mongoose.Schema({
  code: { type: Number, required: false },
  name: { type: String, required: true },
  location: { type: Array, required: false },
  postcode: { type: String, required: false },
  description: { type: String, required: true },
  parkImg: { type: Array, required: false },
  website: { type: String, required: true },
  iconicWildlife: { type: Array, required: false },
  keyWildlife: { type: Array, required: false },
  trails: { type: Array, required: false },
  activities: { type: Array, required: false },
  reviews: { type: Object, required: false },
  attractions: { type: Array, required: false },
})

export default mongoose.model('Park', parkSchema)