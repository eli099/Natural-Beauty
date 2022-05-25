import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

// React-slick-carousel imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LeftArrow from "../../assets/arrow-greenLeft.png"
import RightArrow from "../../assets/arrow-greenRight.png"


// Add userIsAuthenticated here once this is made (do we need frontend and back??)

// This is the component function for App.js to show all Parks
const ParksIndex = () => {

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
    // autoplay: true,
    // autoplaySpeed: 2000,
    pauseOnHover: true,
    initialSlide: 0,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  }

  // * For grabbing data
  const [parks, setParks] = useState([])
  const [errors, setErrors] = useState(false)

  useEffect(() => {

    const getParks = async () => {
      try {
        const { data } = await axios.get('/api/parks')
        console.log('🏆 Got the ParksIndex data')

        setParks(data)

      } catch (error) {
        console.log('error getting ParksIndex data ->', error)
        setErrors(true)
      }
    }

    getParks()

  }, [])

  return (
    <Container className='parks-container'>
      <Row className="justify-content-center">
        {parks.map(park => {
          const { _id, code, name, parkImg, keyWildlife, activities } = park
          return (
            <Col key={_id} md='6' lg='4' className='park'>
              <Link to={`/parks/${_id}`}>
                <Card>
                  <Slider {...settings} >
                    <Card.Img className='park-img' variant="top" src={`../${parkImg[0]}`} />
                    <Card.Img className='park-img' variant="top" src={`../${parkImg[1]}`} />
                    <Card.Img className='park-img' variant="top" src={`../${parkImg[2]}`} />
                  </Slider>
                  <Card.Body className='card-body'>
                    <Card.Title className='title text-center mb-0' >{name}</Card.Title>
                    <Card.Text className='text'>A great place for: <i>{activities.map((item) => `${item}, `)}</i></Card.Text>
                    <Card.Text>Particularly known for its <b>{keyWildlife}</b></Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default ParksIndex
