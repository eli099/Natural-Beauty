import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

// Import bearer token
import { getTokenFromLocalStorage } from '../helpers/auth'

// * Import SimpleSlider
// import SimpleSlider from '../../carousel/carousel'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

// React-slick-carousel imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LeftArrow from "../../assets/arrow-greenLeft.png"
import RightArrow from "../../assets/arrow-greenRight.png"

const NationalPark = () => {

  // * For carousel
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    initialSlide: 0,
    // prevArrow: <SlickArrowLeft />,
    // nextArrow: <SlickArrowRight />,
  }
  const settingsAttractions = {
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    initialSlide: 0,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  }


  // * For grabbing data
  const { id } = useParams()

  const [park, setPark] = useState(null)
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    console.log('HELLO??')
    const getPark = async () => {
      try {
        const { data } = await axios.get(`/api/parks/${id}`)
        console.log(data.name)
        // console.log('Park data from get -> ', data)
        setPark(data)
        console.log('park data->', park)
        console.log(park.parkImg[0])

        let array = []
        data.favourites.f()
        array.includes(true) ? setFavIcon(saved) : setFavIcon(notSaved)

      } catch (error) {
        console.log('🧭 There was a problem finding your park ->', error)
        setErrors(true)
      }
    }
    getPark()


  }, [id])

  // ? Sates for added OR not added to favourites
  const [notSaved, setNotSaved] = useState('Add to your favourites ❤️')
  const [saved, setSaved] = useState('Remove from your favourites 💚')

  // ? State for button & icon
  const [favIcon, setFavIcon] = useState('')

  // Check if park has been favourited aready
  useEffect(() => {
    const getProfileFav = async () => {
      try {
        const { data } = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })

        let array = []
        data.favourites.forEach(park => {

          if (park.parkId === id) {
            array.push(true)
          } else {
            array.push(false)
          }
          console.log('array ->', array)
        })
        array.includes(true) ? setFavIcon(saved) : setFavIcon(notSaved)

      } catch (error) {
        console.log(error)
      }
    }
    getProfileFav()
  }, [id, favIcon])

  // ? Function to add Park to user favourites
  const handleAddToFav = async (e) => {
    e.preventDefault()
    console.log('Add to fav')
    try {
      // Post request to /profile endpoint params ID
      const { data } = await axios.post(`/api/parks/${id}`, null, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log('add to fav response ->', data)

      let array = []
      data.favourites.forEach(park => {

        if (park.parkId === id) {
          array.push(true)
        } else {
          array.push(false)
        }
        console.log('array ->', array)
      })
      array.includes(true) ? setFavIcon(saved) : setFavIcon(notSaved)
    } catch (error) {
      console.log(error)
    }
  }

  // Review data parsed by user
  const [ submitData, setSubmitData ] = useState({
    text: ''
  })

  // State to log errors
  const [ submitErrors, setSubmitErrors ] = useState({
    text: ''
  })

  // Update review form data
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setSubmitData({ ...submitData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    console.log(submitData)
  }

  // ? Funtion to submit a review
  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`/api/parks/${id}/reviews`, submitData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log('data ->', data)
    } catch (error) {
      console.log(error)
      setSubmitErrors(error)
    }
  }

  return (
    <>
      {park ?
        <section className='np-page-container'>
          <section className='np-carousel-container'>
            <Slider {...settings} >
              <img src={park.parkImg[0]} alt={park.name} className='np-img' />
              <img src={park.parkImg[1]} alt={park.name} className='np-img' />
              <img src={park.parkImg[2]} alt={park.name} className='np-img' />
            </Slider>
            <div className='park-text'>
              <div className='park-desc'>
                <p>{park.description}</p>
              </div>
              <h1>{park.name}</h1>
            </div>
          </section>
          <section className='np-bottom-container'>
            {/* <SimpleSlider /> */}
            <div className='np-attractions'>
              <Slider {...settingsAttractions} className="slider" >
                <div className='np-attraction'>
                  <div className='np-attractions-title'>
                    <h2>{park.attractions[0].category}</h2>
                    <img src={park.attractions[0].localImg[0]} alt={park.attractions[0].name} className='attractions-img' />
                  </div>
                  <div className='np-attractions-info'>
                    <h2>{park.attractions[0].name}</h2>
                    <p>{park.attractions[0].description}</p>
                    <a href={park.attractions[0].moreInfo} className='np-more-info' target='_blank' rel='noreferrer'>More info</a>
                  </div>
                </div>

                <div className='np-attraction'>
                  <div className='np-attractions-title'>
                    <h2>{park.attractions[1].category}</h2>
                    <img src={park.attractions[1].localImg[0]} alt={park.attractions[1].name} className='attractions-img' />
                  </div>
                  <div className='np-attractions-info'>
                    <h2>{park.attractions[1].name}</h2>
                    <p>{park.attractions[1].description}</p>
                    <a href={park.attractions[1].moreInfo} className='np-more-info' target='_blank' rel='noreferrer'>More info</a>
                  </div>
                </div>

                <div className='np-attraction'>
                  <div className='np-attractions-title'>
                    <h2>{park.attractions[2].category}</h2>
                    <img src={park.attractions[2].localImg[0]} alt={park.attractions[2].name} className='attractions-img' />
                  </div>
                  <div className='np-attractions-info'>
                    <h2>{park.attractions[2].name}</h2>
                    <p>{park.attractions[2].description}</p>
                    <a href={park.attractions[2].moreInfo} className='np-more-info' target='_blank' rel='noreferrer'>More info</a>
                  </div>
                </div>

              </Slider>
            </div>

            {/* <div className='np-attractions'>
              <div className='np-attractions-title'>
                <h2>{park.attractions[0].category}</h2>
                <img src={park.attractions[0].localImg[0]} alt={park.attractions[0].name} className='attractions-img' />
              </div>
              <div className='np-attractions-info'>
                <h4>{park.attractions[0].name}</h4>
                <p>{park.attractions[0].description}</p>
              </div>
              <a href={park.attractions[0].moreInfo} className='np-more-info' target='_blank' rel='noreferrer'>More info</a>
            </div> */}
            <div className='np-stuff'>
              <div className='np-activities'>
                <h4>Wildlife & wild adventures</h4>
                <p><span>🦌</span> <b>Among the incredible scenery, you'll be able to spot:</b> {park.iconicWildlife.map((item) => `${item}, `)}</p>
                <p><span>🧗‍♀️</span> <b>In {park.name} you can enjoy a range of outdoor activities including:</b> {park.activities.map((item) => `${item}, `)}</p>
                <p><span>🥾</span> <b>Why not try out some of the well-trodden paths:</b></p>
                <ul>
                  <li><a href={park.trails[0].link} target='_blank' rel='noreferrer'>{park.trails[0].name}</a></li>
                  <li><a href={park.trails[1].link} target='_blank' rel='noreferrer'>{park.trails[1].name}</a></li>
                  <li><a href={park.trails[2].link} >{park.trails[2].name}</a></li>
                </ul>
              </div>
              <div className='np-reviews'>
                <h4>Reviews</h4>
                <div className='review-container'>
                  <div className='review-index'>
                    <p> Scenery:  <br />
                      Wildlife:   <br />
                      Walks:      <br />
                      Camping:
                    </p>
                  </div>
                  <div className='review-stars'>
                    <p> ★★★★★<br />
                      ★★★★<br />
                      ★★★★★<br />
                      ★★★
                    </p>
                  </div>

                  <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" placeholder="Write a review">
                      <Form.Label>Review</Form.Label>
                      <Form.Control as="textarea" rows={3} value={submitData.text} name="text" onChange={handleChange} />
                    </Form.Group>
                    <button type="submit" onClick={handleReviewSubmit}>Submit a review</button>
                  </Form>

                  <button onClick={handleAddToFav}>{favIcon}</button>
                </div>
              </div>
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