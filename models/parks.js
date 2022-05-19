import mongoose from 'mongoose'

const parkSchema = new mongoose.Schema({
  code: { type: String, required: false },
  name: { type: String, required: true },
  location: { type: Array, required: false },
  postcode: { type: String, required: false },
  description: { type: String, required: true },
  parkImg: { type: Array, required: false },
  website: { type: String, required: true },
  iconicWildlife: { type: Array, required: false },
  keyWildlife: { type: String, required: false },
  trails: [{
    name: { type: String, required: false },
    link: { type: String, required: false }
  }],
  activities: { type: Array, required: false },
  reviews: { type: Object, required: false },
  attractions: [{
    code: { type: String, required: false },
    name: { type: String, required: true },
    location: { type: Array, required: false },
    category: { type: String, required: false },
    description: { type: String, required: false },
    keyFeature: { type: String, required: false },
    localImg: { type: Array, required: false },
    moreInfo: { type: String, required: false }
  }]
})

export default mongoose.model('Park', parkSchema)