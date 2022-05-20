import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const nationalPark = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [park, setPark] = useState(null)
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getPark = async () => {
      try {
        const { data } = await axios.get(`/api/parks/${id}`)
        console.log(data.name)
        console.log('Park data from get -> ', data)
        setPark(data)
      } catch (error) {
        console.log('🧭 There was a problem finding your park ->', error)
        setErrors(true)
      }
    }
    getPark()
  }, [id])

  return (
    <h1>At some point, we'll get a national park in here looking luuuuuuuvely</h1>
  )


}

export default nationalPark