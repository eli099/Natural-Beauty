import { useRef, useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'
import axios from 'axios'

import { useParams } from 'react-router-dom'

const MainMap = () => {  

  mapboxgl.accessToken = 'pk.eyJ1IjoibXJicmVhZCIsImEiOiJjbDM4bHV0Z3UwMTRmM2tueTY1Mm41NTZnIn0.92r4wGEn7bywx1dmpYCe-w'

  const [ parks, setParks ] = useState([])
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
  const clickedPark = useRef(null)
  const targetPark = useRef([])
  const [ cp, setCP ] = useState(null)


  useEffect(() => {
    const getPark = async () => {
      try {
        const { data } = await axios.get(`/api/parks`)
        console.log('🏆 Got all Park data')
        setParks(data)
      } catch (error) {
        console.log('error getting Park data ->', error)
        setErrors(true)
      }
    }
    // setLng(parks.location[0])
    // setLat(parks.location[1])
    // setZoom(10)
    getPark()
  }, [])
  
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

// ! On load effects; load the national park boundaries
  useEffect(() => {
    if(!map.current) return
    map.current.on('load', () => {
      map.current.addSource('national-parks-geojson', {
        'type': 'geojson',
        'data': 'https://skgrange.github.io/www/data/uk_national_parks_boundaries.json'
      })
  
      map.current.addLayer({
        'id': 'national-parks',
        'source': 'national-parks-geojson',
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
        'source': 'national-parks-geojson',
        'filter': ['all', ['==', 'type', 'national_park']],
        'layout': {},
        'paint': {
            'line-color': '#70d32d', //#70d32d
            'line-width': 2
        }
      })
      map.current.addLayer({
        'id': 'area-beauty',
        'source': 'national-parks-geojson',
        'type': 'fill',
        'filter': ['all', ['==', 'type', 'area_of_outstanding_natural_beauty']],
        'layout': {},
        'paint': {
          'fill-color': '#3FBA4C', //#70c32c
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.5,
            1
          ]
        }
      })
      map.current.addLayer({
        'id': 'area-beauty-borders',
        'type': 'line',
        'source': 'national-parks-geojson',
        'filter': ['all', ['==', 'type', 'area_of_outstanding_natural_beauty']],
        'layout': {},
        'paint': {
            'line-color': '#246B2C', //#70d32d
            'line-width': 2
        }
      })
    })
  }, [parks])

  // ! On hover effects; change transparency of park fill colour
  useEffect(() => {
    if(!map.current) return
    let hoveredStateId = null
    map.current.on('mousemove', ['national-parks', 'area-beauty'], (e) => {
      map.current.style.cursor = 'pointer'
      if (e.features.length > 0) {
          if (hoveredStateId !== null) {
              map.current.setFeatureState(
                  { source: 'national-parks-geojson', id: hoveredStateId },
                  { hover: false }
              )
          }
          hoveredStateId = e.features[0].id;
          map.current.setFeatureState(
              { source: 'national-parks-geojson', id: hoveredStateId },
              { hover: true }
          )
      }
    })
    map.current.on('mouseleave', ['national-parks', 'area-beauty'], () => {
        if (hoveredStateId !== null) {
            map.current.setFeatureState(
                { source: 'national-parks-geojson', id: hoveredStateId },
                { hover: false }
            )
        }
        hoveredStateId = null
    })
  })

  // ! On click effects; zoom to park centered on screen and add attractions markers
  useEffect(() => {
    if(!map.current) return
    map.current.on('click', ['national-parks', 'area-beauty'], (e) => {
      clickedPark.current = e.features[0].properties.name
      // console.log(clickedPark.current)
      targetPark.current = parks.filter((park) => park.name === clickedPark.current)// our park name must match the geojson park name
      console.log(targetPark)
      targetPark.current.map(park => {
        const { name, location, attractions } = park
        map.current.flyTo({
          center: [park.location[1],park.location[0]],
          zoom: 8.5 // add a zoom level to our data object i.e. park.location[2] or park.zoom 
                  //- we will calculate it from researching the right zoom level
        })
        for (let i = 0; i < 3; i++){
        const marker = new mapboxgl.Marker({
            'color' : '#D6C423',
            'anchor' : 'bottom',
          })
          .setLngLat([park.attractions[i].location[1],park.attractions[i].location[0]])
          .setPopup(new mapboxgl.Popup().setHTML(`<div>${park.attractions[i].name}</div><div><img id='marker-img' src=${park.attractions[i].localImg[0]}></div>`))
          .addTo(map.current)
        }
      })
      setCP(clickedPark.current)
    })
  },[clickedPark, parks, targetPark])

  const handleClick = () => {
    if(!map.current) return
    map.current.flyTo({
      center: [lng, lat],
      zoom: zoom
    })
  }
  
  return (
    <>
      <h1>Main Map Test</h1>
      <div ref={parkMapContainer} className="park-map-container" />
      <div>
        <h2>{clickedPark.current}</h2>
        <>
        {clickedPark.current ?
          <button onClick={handleClick}>Back to full map</button>
        : ''
        }
        </>
      </div>
    </>
  )
}

export default MainMap

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