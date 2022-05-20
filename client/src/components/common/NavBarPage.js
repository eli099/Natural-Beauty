import React from 'react'

import { useNavigate, Link } from 'react-router-dom'

// Import authentication
import { userIsAuthenticated } from '../helpers/auth'

const NavBarPage = () => {

  const navigate = useNavigate()

  // Funtion to remove token and navigate to login page
  const handleLogout = () => {
    // Remove token from local storage
    window.localStorage.removeItem('natural-beauty')
    // Navigate to login page
    navigate('/login')
  }

  

  return (
    <header>
      <nav id="nav-bar">
        <div className="nav-left">
          <Link to="/" className="logo">🏔</Link>
        </div>
        <div className="nav-right">
          <Link to="/parkmaptest">Map of National Parks</Link>
          <Link to="/parks">Index</Link>
          {/* Change links displayed depending on if user is logged in or not */}
          {userIsAuthenticated() ?
            <Link onClick={handleLogout} to="">Logout</Link>
            :
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          }
        </div>
      </nav>
    </header>
  )
}

export default NavBarPage