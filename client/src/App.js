import React, { useEffect } from 'react'
import axios from 'axios'

import { BrowserRouter, Routes, Route } from 'react-router-dom'



// Import components

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './Home'
import Map from './components/Map'
import MainMap from './components/maps/MainMap'
import ParksIndex from './components/parks/ParksIndex'
import NationalPark from './components/parks/ParkF'
import NavBarPage from './components/common/NavBarPage'
import ParkMap from './components/maps/ParkMap'
import ProfilePage from './ProfilePage'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/parks/') // * <-- replace with your endpoint
      // console.log(data)
      // console.log('Are you even trying???')
    }
    getData()
  })

  return (
    <main id="main-wrapper">
      {/* <h1>Natural Beauty</h1> */}
      {/* Components with link components */}
      <BrowserRouter>
        <NavBarPage />
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          {/* Auth routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* User */}
          {/* <Route path="/profile/:id" element={<ProfilePage />} /> */}

          {/* Maps */}
          <Route path="/maptest" element={<Map />} />
          {/* <Route path="/park" element={<Park />} /> */}
          <Route path="/mainmaptest" element={<MainMap />} />
          <Route path="/parkmaptest" element={<ParkMap />} />

          {/* Parks pages */}
          <Route path="/parks" element={<ParksIndex />} />
          <Route path="/parks/:id" element={<NationalPark />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
