import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";

// import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

import LeftArrow from "../assets/left-arrow.svg"
import RightArrow from "../assets/right-arrow.svg"



const SimpleSlider = () => {

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );

  const { id } = useParams()

  const [park, setPark] = useState()
  const [errors, setErrors] = useState(false)



  useEffect(() => {
  console.log('HELLO??')
    const getPark = async () => {
      console.log('HELLO??')
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
    initialSlide: 0,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  }

  return (
    <div>
      <h1>Give me a carousel... </h1>
      <Slider {...settings}>
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
  );
}


export default SimpleSlider