import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseUniqueValidator from 'mongoose-unique-validator'

// Fields Required:
// username
// email
// password
// passwordConfirmation

// ? Fields to save to database
const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true, maxLength: 30 },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  favourites: [{
    parkId: { type: String, required: false },
    name: { type: String, required: false },
    image: { type: String, required: false }
  }]
})

// ? Virtual Fields - not added to database
// passwordConfirmation virtual field
userSchema
  .virtual('passwordConfirmation')
  .set(function(value){ // set value to virtual field
    // underscore -> setter only executes once
    this._passwordConfirmation =  value // value of virtual field is whatever the user inputs
  })


// ? Pre Validation
// Check password matches passwordConfirmation
userSchema
  .pre('validate', function(next){
    if ( this.isModified('password') && this.password !== this._passwordConfirmation ){
      this.invalidate('passwordConfirmation', 'does not match password field')
      // ^ if the password is modified (i.e. will only execute then) && the passwords don't match
      // ^ then invalidate and show error message
    }
    // Otherwise, validate and move on
    next()
  })


// ? Pre Save
// Hash the password before saving 
userSchema
  .pre('save', function(next){
    if (this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12))
      // ^ if the password is modified, then hash it using bcrypt
    }
    // When password is hashed, move on
    next()
  })

  // At this point the document is saved to the database


// ? Remove password from json object when sending back to user
// transform method (predefined by mongoose) transforms data to json (with 'toJSON')
userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json){
    delete json.password
    return json
  }
})


// ? Create a validatePassword method
// The method will check a plain text password against a hashed password
userSchema
  .methods.validatePassword = function(plainPassword){
    return bcrypt.compareSync(plainPassword, this.password)
    // ^ compares the entered password(plainPassword) to the saved/hashed password
  }

userSchema.plugin(mongooseUniqueValidator)
// ^ mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema
// This makes error handling much easier: you will get a Mongoose validation error when you attempt to violate a unique constraint, rather than an E11000 error from MongoDB



// Export as model for use in app or seeds
export default mongoose.model('User', userSchema)