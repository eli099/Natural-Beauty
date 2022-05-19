import React, { useState, useEffect } from 'react'
import axios from 'axios'

// eslint-disable-next-line
// import ParkMap from '../Maps/ParkMap'


// Below we will import useParams - this is a method that returns an object of placeholders as keys
// eslint-disable-next-line
import { useParams, Link, useNavigate } from 'react-router-dom'

// eslint-disable-next-line
// import { owner, getTokenFromLocalStorage } from '../../helpers/authorise'
import userEvent from '@testing-library/user-event'

const Park = () => {
  
  const navigate = useNavigate()

  const { id } = useParams()

  const [ park, setPark ] = useState(null)
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getPark = async () => {
      try {
        const { data } = await axios.get(`/api/parks/${id}`)
        setPark(data)
        console.log(data)
      } catch (err) {
        setErrors(true)
      }
    }
    getPark()
  }, [id])

  return (
    <>
      <div id='park-container'>
        <div id='park-info-container'>
          <img id='park-reel' src={park.parkImg[0]} alt={park.name} img/>
          {/* https://www.npmjs.com/package/react-image-gallery */}
          <h2>${park.name}</h2>
          <img id='favourite' src='../assets/favourite.jpg' onClick={userEvent.favourite.add} alt='Favourite'></img>
          <h4>${park.description}</h4>
          <div id='key-wildlife-container'>
            <p>${park.keyWildlife.name}</p>
            <img src={park.keyWildlife.img} alt={park.keyWildlife.name}></img>
          </div>
        </div>
        <div id='park-map'>
          {/* <ParkMap /> */}
        </div>
      </div>
    </>
  )


}

export default Park