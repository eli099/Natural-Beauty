import React from 'react'

import { useNavigate, Link } from 'react-router-dom'

const NavBarPage = () => {

  const navigate = useNavigate()

  // Funtion to remove token and navigate to login page
  const handleLogout = () => {
    // Remove token from local storage
    window.localStorage.removeItem('proj-3')
    // Navigate to login page
    navigate('/login')
  }

  // ? Funtion to get payload off of token
  const getPayload = () => {
    const token = window.localStorage.getItem('natural-beauty')
    console.log('token ->', token)
    if (!token) return
    // Split token and return index 1
    const payload = token.split('.')[1]
    console.log('payload ->', payload)
    console.log(JSON.parse(atob(payload)))
    return JSON.parse(atob(payload))
  }
  getPayload()

  // ? Checking to see if user is autheticated
  const userIsAuthenticated = () => {
    // Get payload for localStorage
    const payload = getPayload()
    console.log('payload ->', payload)
    // Get today's date (in seconds)
    // Compare token expiry -> expiry needs to be in future to be authenticated
    // Return boolean
  }
  userIsAuthenticated()

  return (
    <header>
      <nav id="nav-bar">
        <div className="nav-left">
          <Link to="/" className="logo">🏔</Link>
        </div>
        <div className="nav-right">
          <Link to="/parkmaptest">National Parks</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link onClick={handleLogout} to="">Logout</Link>
        </div>
      </nav>
    </header>
  )
}

export default NavBarPage