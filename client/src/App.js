import React, { useEffect } from 'react'
import axios from 'axios'

import { BrowserRouter, Routes, Route } from 'react-router-dom'



// Import components

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './Home'
import Map from './components/Map'
import ParksIndex from './components/parks/ParksIndex'
import Park from './components/parks/Park'
import NavBarPage from './components/common/NavBarPage'
import ParkMap from './components/maps/ParkMap'
import ProfilePage from './ProfilePage'

const App = () => {

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/parks/') // * <-- replace with your endpoint
      console.log(data)
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
          <Route path="/maptest" element={<Map />}></Route>

          {/* User */}
          <Route path="/profile/:id" element={<ProfilePage />} />
          {/* Park Index */}
          <Route path="/parks" element={<ParksIndex />} />
          {/* Maps */}
          <Route path="/maptest" element={<Map />} />
          <Route path="/park" element={<Park />} />
          <Route path="/maptest" element={<Map />} />
          <Route path="/parkmaptest" element={<ParkMap />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
