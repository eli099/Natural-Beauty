import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax

// Import components
// import Map from './components.js/Map'
import Register from './components.js/auth/Register'
import Home from './Home'

const App = () => {


  mapboxgl.accessToken = 'pk.eyJ1IjoibXJicmVhZCIsImEiOiJjbDM4bHV0Z3UwMTRmM2tueTY1Mm41NTZnIn0.92r4wGEn7bywx1dmpYCe-w'

  const mapContainer = useRef(null);
  const map = useRef(null);
  // eslint-disable-next-line
  const [lng, setLng] = useState(-3.9323);
  // eslint-disable-next-line
  const [lat, setLat] = useState(54.6165);
  // eslint-disable-next-line
  const [zoom, setZoom] = useState(4.6);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mrbread/cl3bpcmjx000a14muue539u5n',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/parks') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return (
    <>
      <h1>Natural Beauty</h1>
      {/* Components with link components */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      {/* <div ref={mapContainer} className="map-container" /> */}
    </>
  )
}

export default App
