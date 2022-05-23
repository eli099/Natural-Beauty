import React, { useState, useEffect } from 'react'
import axios from 'axios'
// react-router-dom components
import { useParams, Link, useNavigate } from 'react-router-dom'
// Bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'

const FruitShow = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [fruit, setFruit] = useState(null)
  const [errors, setErrors] = useState(false)
  const [favMsg, setFavMsg] = useState('❤️')

  useEffect(() => {
    const getFruit = async () => {
      try {
        const { data } = await axios.get(`/api/parks/${id}`)
        console.log('fruit data from get', data)
        console.log(data.name)
        setFruit(data)
      } catch (error) {
        console.log('theres been an error')
        setErrors(true)
      }
    }
    getFruit()
  }, [id])

  useEffect(() => {
    const getFavStatus = () => {
      if (JSON.parse(window.localStorage.getItem('ffav-fruits'))) {
        const favArrayString = JSON.parse(window.localStorage.getItem('fav-fruits')).map(value => JSON.stringify(value))
        favArrayString.indexOf(JSON.stringify(fruit)) !== -1 ? setFavMsg('💔') : setFavMsg('❤️')
      }
    }
    getFavStatus()
  }, [fruit])

  const addFav = () => {
    let favArray = JSON.parse(window.localStorage.getItem('fav-fruits'))
    if (favArray === null) {
      favArray = [{ ...fruit }]
      window.localStorage.setItem('fav-fruits', JSON.stringify(favArray))
    } else {
      const favArrayString = favArray.map(value => JSON.stringify(value))
      if (favArrayString.indexOf(JSON.stringify(fruit)) === -1) {
        favArrayString.push(JSON.stringify(fruit))
      } else {
        favArrayString.splice(favArrayString.indexOf(JSON.stringify(fruit)), 1)
      }
      favArray = favArrayString.map(value => JSON.parse(value))
      window.localStorage.setItem('fav-fruits', JSON.stringify(favArray))
    }
    // navigate('/profile')
  }
  return (
    // <h1>Hello!</h1>
    <Container>
      <Row>
        {fruit ?
          <>
            <Col className='fruit-title' xs="12">
              <h1>{fruit.name}</h1>
              <hr />
            </Col>
            <Col className='img-container' md="6">
              <img src={`${fruit.parkImg[0]}`} alt={fruit.name} />
            </Col>
            <Col md="6">
              <h4><span>:cherries:</span> Nutrional info (per 100g)</h4>
              <p><b>Carbohydrates: </b>{fruit.description}</p>
              <hr />
              <p><b>Protein: </b>{fruit.website}</p>
              <hr />
              {/* <p><b>Fat: </b>{fruit.attractions}</p>
              <hr />
              <p><b>Calories: </b>{fruit.location}</p>
              <hr />
              <p><b>Sugar: </b>{fruit.reviews}</p> */}
              <hr />
              <Link to="/fruits" className='btn btn-warning'>Back to fruit</Link>
              <button className="btn btn-dark" onClick={addFav}>{favMsg}</button>
            </Col >
          </>
          :
          <h2 className='text-center'>
            {/* {errors ? 'Something went wrong! Please try again later!' : <Spinner />} */}
          </h2>
        }
      </Row >
    </Container >
  )
}
export default FruitShow