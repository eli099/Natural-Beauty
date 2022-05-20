import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

// Add userIsAuthenticated here once this is made (do we need frontend and back??)

// This is the component function for App.js to show all Parks
const ParksIndex = () => {

  const navigate = useNavigate()

  const [parks, setParks] = useState([])
  const [errors, setErrors] = useState(false)

  useEffect(() => {

    const getParks = async () => {
      try {
        const { data } = await axios.get('/api/parks/')
        console.log('🏆 Got the ParksIndex data')

        setParks(data)

      } catch (error) {
        console.log('error getting ParksIndex data ->', error)
        setErrors(true)
      }
    }

    getParks()

  }, [navigate])

  return (
    <section>
      <Container className='parks-container'>
        <Row>
          {parks.map(park => {
            const { _id, code, name, parkImg, iconicWildlife, activities } = park
            return (
              <Col key={_id} md='6' lg='4' className='park mb-4'>
                <Link to={`parks/${_id}`}>
                  <Card>
                    <Card.Img className='park-img' variant="top" src={`../${parkImg[0]}`} />
                    <Card.Body>
                      <Card.Title className='text-center mb-0' >{name}</Card.Title>
                      <Card.Text>{`Here you can find: ${iconicWildlife}`}</Card.Text>
                      {/* <Card.Text>{`Here you can enjoy: ${activities}`}</Card.Text> */}
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>

  )
}

export default ParksIndex
