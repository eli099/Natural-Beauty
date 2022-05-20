import { useRef, useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'
import axios from 'axios'

import { useParams } from 'react-router-dom'

const ParkMap = () => {  

  mapboxgl.accessToken = 'pk.eyJ1IjoibXJicmVhZCIsImEiOiJjbDM4bHV0Z3UwMTRmM2tueTY1Mm41NTZnIn0.92r4wGEn7bywx1dmpYCe-w'

  const [ park, setPark ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const parkMapContainer = useRef(null);
  const map = useRef(null);
  const [ mapObject, setMapObject ] = useState(null)
  // eslint-disable-next-line
  const [lng, setLng] = useState(-3.9323); //set these to coordinates of centre of park (will have to calculate)
  // eslint-disable-next-line
  const [lat, setLat] = useState(54.6165); //same
  // eslint-disable-next-line
  const [zoom, setZoom] = useState(4.6); // set to zoom level so that park fills map frame (will have to calculate)
  const { id } = useParams()


  useEffect(() => {
    const getPark = async () => {
      try {
        const { data } = await axios.get(`/api/parks/${id}`)
        console.log('🏆 Got the Park data')
        setPark(data)
      } catch (error) {
        console.log('error getting Park data ->', error)
        setErrors(true)
      }
    }
    getPark()
  }, [id])
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: parkMapContainer.current,
      style: 'mapbox://styles/mrbread/cl3bpcmjx000a14muue539u5n',
      center: [lng, lat],
      zoom: zoom
    })
    setMapObject(map.current)
  },[lat, lng, zoom])


  // const changeCoords = () => {
  //   mapObject.setLat(park.location[1])
  //   mapObject.setLng(park.location[0])
  //   // mapObject.setZoom(data.location[2])
  //   mapObject.setZoom(7)
  // }

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
      map.current.addLayer({
        'id' : 'park-centres',
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'properties': {},
              'geometry': {
              'type': 'Point',
              'coordinates': [ park.location[1], park.location[0] ]
              }
            },
            // {
            //   'type': 'Feature',
            //   'properties': {},
            //   'geometry': {
            //   'type': 'Point',
            //   'coordinates': [-90.3295, -0.6344]
            // }
            // },
            // {
            //   'type': 'Feature',
            //   'properties': {},
            //   'geometry': {
            //   'type': 'Point',
            //   'coordinates': [-91.3403, 0.0164]
            // }
            // }
          ]
        }
      })
    })
  }, [park])

  useEffect(() => {
    if(!map.current) return
    let hoveredStateId = null
    map.current.on('mousemove', 'national-parks', (e) => {
      map.current.style.cursor = 'pointer'
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

  useEffect(() => {
    if(!map.current) return
    map.current.on('click', 'national-parks', (e) => {
      map.current.flyTo({
        center: e.features[0].geometry.coordinates
      })
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