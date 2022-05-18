import mongoose from 'mongoose'

// Fields Required:
// username
// email
// password
// passwordConfirmation

// ? Fields to save to database
const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true, maxLength: 30 },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true }
})

// ? Virtual Fields - not added to database

// passwordConfirmation virtual field
userSchema
  .virtual('passwordConfirmation')
  .set(function(value){ // set value to virtual field
    // underscore -> setter only executes once
    this._passwordConfirmation =  value // value of virtual field is whatever the user inputs
  })

// Export as model for use in app or seeds
export default mongoose.model('User', userSchema)