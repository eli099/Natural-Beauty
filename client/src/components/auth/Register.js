// eslint-disable-next-line
import React, { useState, useEffect } from 'react'

// Import axios
import axios from 'axios'

// Import useNavigate
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  // User form data
  // eslint-disable-next-line
  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  // Errors
  const [ errors, setErrors ] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  // Update form data
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  // Submit user info to /register endpoint
  const handleSubmit = async (e) => {
    // Prevent page from reloading
    e.preventDefault()
    try {
      // Make post request to /register endpoint
      await axios.post('/api/register', formData) // formData = request body
      // Navigate to login page if successful
      navigate('/login')
    } catch (error) {
      console.log(error.response.data.errors)
      // Parse in error messages
      setErrors(error.response.data.errors)
    }
  }

  return (
    <>
      <section className="form-page">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <p>Start your journey here...</p>
          {/* Username */}
          {/* Error Message */}
          {errors.username && <p className="auth-error">{errors.username.message}</p>}
          <input type="text" name="username" placeholder="Username" aria-label="Username" value={formData.username} onChange={handleChange} />
          {/* Email */}
          {/* Error Message */}
          {errors.email && <p className="auth-error">{errors.email.message}</p>}
          <input type="text" name="email" placeholder="Email" aria-label="Email" value={formData.email} onChange={handleChange} />
          {/* Password */}
          {/* Error Message */}
          
          <input type="text" name="password" placeholder="Password" aria-label="Password" value={formData.password} onChange={handleChange} />
          {/* Password Confirmation */}
          {/* Error Message */}
          
          <input type="text" name="passwordConfirmation" placeholder="Password Confirmation" aria-label="Password Confirmation" value={formData.passwordConfirmation} onChange={handleChange} />
          <button type="submit">Continue</button>
        </form>
      </section>
    </>
  )
}

export default Register