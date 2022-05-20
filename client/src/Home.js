import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <h1>Home</h1>
    <Link to ='/parks' className='btn'>Discover the beauty at your doorstep</Link>
    </>
  )
}

export default Home