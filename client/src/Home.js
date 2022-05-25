import React from 'react'
import { Link } from 'react-router-dom'
import MainMap from './components/maps/MainMap'

const Home = () => {
  return (
    <>
    <Link to='/parks' id='home-title'><h1>Discover the beauty at your doorstep</h1></Link>
    <div id='main-map'>
      <MainMap />
    </div>
    </>
  )
}

export default Home