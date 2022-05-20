// eslint-disable-next-line
import React, { useState, useEffect } from 'react'

// Import axios
import axios from 'axios'

// Import useNavigate
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  // User form data
  // eslint-disable-next-line
  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  })

  // Errors
  const [ errors, setErrors ] = useState(false)

  // Store token to local storage
  const saveTokenToLocalStorage = (token) => {
    window.localStorage.setItem('natural-beauty', token)
  }

  // Update form data
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(false)
  }

  // Submit user info to /login endpoint
  const handleSubmit = async (e) => {
    // Prevent page from reloading
    e.preventDefault()
    try {
      // Make post request to /login endpoint
      const { data } = await axios.post('api/login', formData) // formData = request body
      console.log(data)
      saveTokenToLocalStorage(data.token)
      // Navigate to index page if successful
      navigate('/') // index link here
    } catch (error) {
      console.log(error.response.data.errors)
      // Parse in error messages
      setErrors(true)
    }
  }

  return (
    <>
    <section className="form-page">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p>Continue your journey...</p>
          {/* Email */}
          <input type="text" name="email" placeholder="Email" aria-label="Email" required value={formData.email} onChange={handleChange} />
          {/* Password */}
          <input type="password" name="password" placeholder="Password" aria-label="Password" required value={formData.password} onChange={handleChange} />
          
          {/* Error Message */}
          {errors && <p className="auth-error cent">Unauthorised</p>}
          <button type="submit">Login</button>
        </form>
      </section>
    </>
  )
}

export default Login