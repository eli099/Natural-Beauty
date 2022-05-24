import React from 'react'
import { Link } from 'react-router-dom'
import MainMap from './components/maps/MainMap'

const Home = () => {
  return (
    <>
    <h1>Home</h1>
    <div id='main-map'>
      <MainMap />
    </div>
    <Link to ='/parks' className='btn'>Discover the beauty at your doorstep</Link>
    </>
  )
}

export default Home