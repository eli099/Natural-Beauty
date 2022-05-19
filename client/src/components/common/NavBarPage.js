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

  return (
    <header>
    <nav id="nav-bar">
      <Link to="/" className="logo">🏔</Link>
      <Link to="/login">Login</Link>
      <Link onClick={handleLogout} to="">Logout</Link>
    </nav>
    </header>
  )
}

export default NavBarPage