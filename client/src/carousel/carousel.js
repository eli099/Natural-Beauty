import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component, useEffect, useState, useRef, useLayoutEffect } from "react";
import Slider from "react-slick";

// import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

import LeftArrow from "../assets/left-arrow.svg"
import RightArrow from "../assets/right-arrow.svg"


// const useIsMount = () => {
//   const isMountRef = useRef(true);
//   useEffect(() => {
//     isMountRef.current = false;
//   }, []);
//   return isMountRef.current;
// }

const SimpleSlider = () => {

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );

  const { id } = useParams()

  const [park, setPark] = useState(null)
  const [errors, setErrors] = useState(false)

  // const isMount = useIsMount()

  // const firstUpdate = useRef(true)

  // useLayoutEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false
  //   } {

  //   }

  useEffect(() => {

    const getPark = async () => {
      console.log('HELLO?? inside getPark')
      try {
        const { data } = await axios.get(`/api/parks/${id}`)
        // console.log(data.name)
        console.log('Park data from get -> ', data)

        setPark(data)
        console.log('park data->', park)
        // console.log(park.parkImg[0])
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

  return (
    <>
      {park ?
        <div>
          <h1>Give me a carousel... </h1>
          <Slider {...settings} className="slider" >
            <div className='np-attractions'>
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
            <div className='np-attractions'>
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
            <div className='np-attractions'>
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
        :
        <p>Something went wrong</p>
      }
    </>
  )
}


export default SimpleSlider