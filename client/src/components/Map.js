import React, { useRef, useEffect, useState } from 'react'

import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax

const Map = () => {

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

  return (
    <>
      <h1>Map Test</h1>
      <div ref={mapContainer} className="map-container" />
    </>
  )
}

export default Map