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

const ImageSlider = () => {

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
            <img src={park.parkImg[0]} alt={park.name} className='np-img' />
            <img src={park.parkImg[1]} alt={park.name} className='np-img' />
            <img src={park.parkImg[2]} alt={park.name} className='np-img' />
          </Slider>
        </div>
        :
        <p>Something went wrong</p>
      }
    </>
  )
}


export default ImageSlider