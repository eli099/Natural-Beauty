import { useRef, useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'

const ParkMap = () => {  

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
    })
  })
  map.on('load', () => {
    map.addSource('parks', {
      'type': 'geojson',
      'data': 'https://skgrange.github.io/www/data/uk_national_parks_boundaries.json'
    })

    let hoveredStateId = null

    map.addLayer({
      'id': 'national-parks',
      'source': 'parks',
      'type': 'fill',
      'filter': ['all', ['==', 'type', 'national_park']],
      'layout': {},
      'paint': {
        'fill-colour': '#70c32c',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.5,
          1
        ]
      }
    })
    map.addLayer({
      'id': 'park-borders',
      'type': 'line',
      'source': 'parks',
      'filter': ['all', ['==', 'type', 'national_park']],
      'layout': {},
      'paint': {
          'line-color': '#70d32d',
          'line-width': 2
      }
    })
    map.on('mousemove', 'park-fills', (e) => {
      if (e.features.length > 0) {
          if (hoveredStateId !== null) {
              map.setFeatureState(
                  { source: 'parks', id: hoveredStateId },
                  { hover: false }
              )
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
              { source: 'parks', id: hoveredStateId },
              { hover: true }
          )
      }
    })
    map.on('mouseleave', 'park-fills', () => {
        if (hoveredStateId !== null) {
            map.setFeatureState(
                { source: 'parks', id: hoveredStateId },
                { hover: false }
            )
        }
        hoveredStateId = null
    })
  })
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