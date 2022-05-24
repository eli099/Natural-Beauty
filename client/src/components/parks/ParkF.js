import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

// * Import SimpleSlider
import SimpleSlider from '../../carousel/carousel'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// React-slick-carousel imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LeftArrow from "../../assets/left-arrow.svg"
import RightArrow from "../../assets/right-arrow.svg"

const NationalPark = () => {

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );

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
      } catch (error) {
        console.log('🧭 There was a problem finding your park ->', error)
        setErrors(true)
      }
    }
    getPark()


  }, [id])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    initialSlide: 0,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  }

  const settingsAttractions = {
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


  return (
    <>
      {park ?
        <section className='np-page-container'>
          <section className='np-carousel-container'>
            <Slider {...settings} className="slider" >
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
                <div className='np-attraction-1'>
                  <div className='np-attractions-title'>
                    <h2>{park.attractions[0].category}</h2>
                    <img src={park.attractions[0].localImg[0]} alt={park.attractions[0].name} className='attractions-img' />
                  </div>
                  <div className='np-attractions-info'>
                    <h2>{park.attractions[0].name}</h2>
                    <p>{park.attractions[0].description}</p>
                  </div>
                  <a href={park.attractions[0].moreInfo} className='np-more-info' target='_blank' rel='noreferrer'>More info</a>
                </div>
                <div className='np-attraction-2'>
                  <div className='np-attractions-title'>
                    <h2>{park.attractions[1].category}</h2>
                    <img src={park.attractions[1].localImg[0]} alt={park.attractions[1].name} className='attractions-img' />
                  </div>
                  <div className='np-attractions-info'>
                    <h2>{park.attractions[1].name}</h2>
                    <p>{park.attractions[1].description}</p>
                  </div>
                  <a href={park.attractions[1].moreInfo} className='np-more-info' target='_blank' rel='noreferrer'>More info</a>
                </div>
                <div className='np-attraction-3'>
                  <div className='np-attractions-title'>
                    <h2>{park.attractions[2].category}</h2>
                    <img src={park.attractions[2].localImg[0]} alt={park.attractions[2].name} className='attractions-img' />
                  </div>
                  <div className='np-attractions-info'>
                    <h2>{park.attractions[2].name}</h2>
                    <p>{park.attractions[2].description}</p>
                  </div>
                  <a href={park.attractions[2].moreInfo} className='np-more-info' target='_blank' rel='noreferrer'>More info</a>
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
                <p> Scenery<br />
                  Wildlife<br />
                  Walks<br />
                  Camping
                </p>
                <button>Submit a review</button>
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