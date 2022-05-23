import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ImageGallery from 'react-image-gallery'

const NationalPark = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [park, setPark] = useState()
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    // console.log('HELLO??')
    const getPark = async () => {
      try {
        const { data } = await axios.get(`/api/parks/${id}`)
        // console.log(data.name)
        // console.log('Park data from get -> ', data)
        setPark(data)
        // console.log('park data->', park)
        console.log(park.parkImg[0])
      } catch (error) {
        console.log('🧭 There was a problem finding your park ->', error)
        setErrors(true)
      }
    }
    getPark()


  }, [id])




  return (
    <>
      {park ?
        <section className='np-page-container'>
          <section className='np-carousel-container'>
            <img src={park.parkImg[0]} alt={park.name} className='np-img' />
            <div className='park-text'>
              <div className='park-desc'>
                <p>{park.description}</p>
              </div>
              <h1>{park.name}</h1>
            </div>
          </section>
          <section className='np-bottom-container'>
            <div className='np-attractions'>
              <div className='np-attractions-title'>
                <h2>{park.attractions[0].category}</h2>
                <img src={park.attractions[0].localImg[0]} alt={park.attractions[0].name} className='attractions-img' />
              </div>
              <div className='np-attractions-info'>
                <h2>{park.attractions[0].name}</h2>
                <p>{park.attractions[0].description}</p>
              </div>
              <a href={park.attractions[0].moreInfo}>More info</a>
            </div>
            <div className='np-reviews'>
              <h2>Reviews</h2>
              <p>Scenery</p>
              <p>Wildlife</p>
              <p>Walks</p>
              <p>Camping</p>
              <button>Submit a review</button>
            </div>
          </section>
        </section>
        :
        <p>Something went wrong</p>
      }
    </>
  )

}


// const imageCarousel = [
//   {
//     original: park.parkImg[0],
//     thumbnail: park.parkImg[0]
//   },
//   {
//     original: park.parkImg[1],
//     thumbnail: park.parkImg[1]
//   },
//   {
//     original: park.parkImg[1],
//     thumbnail: park.parkImg[1]
//   }
// ]

// class MyGallery extends React.Component{
//   render() {
//     return <ImageGallery items={imageCarousel} />
//   }
// }

export default NationalPark