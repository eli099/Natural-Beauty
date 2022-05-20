import { useRef, useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'

const ParkMap = () => {  

  mapboxgl.accessToken = 'pk.eyJ1IjoibXJicmVhZCIsImEiOiJjbDM4bHV0Z3UwMTRmM2tueTY1Mm41NTZnIn0.92r4wGEn7bywx1dmpYCe-w'

  const parkMapContainer = useRef(null);
  const map = useRef(null);
  // eslint-disable-next-line
  const [lng, setLng] = useState(-3.9323); //set these to coordinates of centre of park (will have to calculate)
  // eslint-disable-next-line
  const [lat, setLat] = useState(54.6165); //same
  // eslint-disable-next-line
  const [zoom, setZoom] = useState(4.6); // set to zoom level so that park fills map frame (will have to calculate)

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: parkMapContainer.current,
      style: 'mapbox://styles/mrbread/cl3bpcmjx000a14muue539u5n',
      center: [lng, lat],
      zoom: zoom
    })
  })

  useEffect(() => {
    if(!map.current) return
    map.current.on('load', () => {
      map.current.addSource('parks', {
        'type': 'geojson',
        'data': 'https://skgrange.github.io/www/data/uk_national_parks_boundaries.json'
      })
  
      // map.addSource('attractions', {
      //   type: 'vector',
      //   url : 'mapbox://mrbread.cl3auux8y045120nr3exgxepi-9a7pc'
      // })
  
  
      map.current.addLayer({
        'id': 'national-parks',
        'source': 'parks',
        'type': 'fill',
        'filter': ['all', ['==', 'type', 'national_park']],
        'layout': {},
        'paint': {
          'fill-color': '#70c32c', //#70c32c
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.5,
            1
          ]
        }
      })
      map.current.addLayer({
        'id': 'park-borders',
        'type': 'line',
        'source': 'parks',
        'filter': ['all', ['==', 'type', 'national_park']],
        'layout': {},
        'paint': {
            'line-color': '#70d32f', //#70d32d
            'line-width': 2
        }
      })
    })
  })

  useEffect(() => {
    if(!map.current) return
    let hoveredStateId = null
    map.current.on('mousemove', 'national-parks', (e) => {
      if (e.features.length > 0) {
          if (hoveredStateId !== null) {
              map.current.setFeatureState(
                  { source: 'parks', id: hoveredStateId },
                  { hover: false }
              )
          }
          hoveredStateId = e.features[0].id;
          map.current.setFeatureState(
              { source: 'parks', id: hoveredStateId },
              { hover: true }
          )
      }
    })
    map.current.on('mouseleave', 'national-parks', () => {
        if (hoveredStateId !== null) {
            map.current.setFeatureState(
                { source: 'parks', id: hoveredStateId },
                { hover: false }
            )
        }
        hoveredStateId = null
    })
  })

  // useEffect(() => {
  //   if (!map.current) return
  //   map.current.on('click', (e) => {
  //     if (e.features.length > 0) {

  //     }
  //   })
  // })
  
  return (
    <>
      <h1>Park Map Test</h1>
      <div ref={parkMapContainer} className="park-map-container" />
    </>
  )
}

export default ParkMap

// ? WORKING CODE FROM CODEPEN
// mapboxgl.accessToken = 'pk.eyJ1IjoibXJicmVhZCIsImEiOiJjbDM4bHV0Z3UwMTRmM2tueTY1Mm41NTZnIn0.92r4wGEn7bywx1dmpYCe-w';
//     const map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mrbread/cl3bpcmjx000a14muue539u5n',
//         center: [-3.9323, 54.6165],
//         zoom: 4.6
//     });
//     let hoveredStateId = null;

//     map.on('load', () => {
//         map.addSource('parks', {
//             'type': 'geojson',
//             'data': 'https://skgrange.github.io/www/data/uk_national_parks_boundaries.json'
//         });
//         map.addLayer({
//             'id': 'park-fills',
//             'type': 'fill',
//             'source': 'parks',
//             'filter': ['all', ['==', 'type', 'national_park']],
//             'layout': {},
//             'paint': {
//                 'fill-color': '#70c32c',
//                 'fill-opacity': [
//                     'case',
//                     ['boolean', ['feature-state', 'hover'], false],
//                     0.5,
//                     1
//                 ]
//             }
//         });
//         map.addLayer({
//             'id': 'park-borders',
//             'type': 'line',
//             'source': 'parks',
//             'filter': ['all', ['==', 'type', 'national_park']],
//             'layout': {},
//             'paint': {
//                 'line-color': '#70d32d',
//                 'line-width': 2
//             }
//         });
//         map.on('mousemove', 'park-fills', (e) => {
//             if (e.features.length > 0) {
//                 if (hoveredStateId !== null) {
//                     map.setFeatureState(
//                         { source: 'parks', id: hoveredStateId },
//                         { hover: false }
//                     );
//                 }
//                 hoveredStateId = e.features[0].id;
//                 map.setFeatureState(
//                     { source: 'parks', id: hoveredStateId },
//                     { hover: true }
//                 );
//             }
//         });
//         map.on('mouseleave', 'park-fills', () => {
//             if (hoveredStateId !== null) {
//                 map.setFeatureState(
//                     { source: 'parks', id: hoveredStateId },
//                     { hover: false }
//                 );
//             }
//             hoveredStateId = null;
//         });
//     });
// ?