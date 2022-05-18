import mongoose from 'mongoose'

// Example Schema
// const parkSchema = new mongoose.Schema({
//   NAME: { type: String, required: true },
//   MEASURE: { type: Number, required: false },
//   DESIG_DATE: { type: Number, required: false },
//   HOTLINK: { type: String, required: false },
//   STATUS: { type: String, required: false },
//   Shape__Area: { type: Number, required: false },
//   Shape__Length: { type: Number, required: false }
// })

const parkSchema = new mongoose.Schema({
  code: { type: Number, required: false },
  name: { type: String, required: true },
  location: { type: Array, required: false },
  postcode: { type: String, required: false },
  description: { type: String, required: true },
  parkImg: { type: Array, required: false },
  iconicWildlife: { type: Array, required: false },
  keyWildlife: { type: Array, required: false },
  trails: { type: Array, required: false },
  activities: { type: Array, required: false },
  reviews: { type: Object, required: false },
  attractions: { type: Array, required: false },
})

export default mongoose.model('Park', parkSchema)