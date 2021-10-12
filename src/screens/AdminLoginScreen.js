import React, {useState, useEffect} from 'react'
import { Row, Col, Image, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import './AdminLoginScreen.css'

import {login} from '../actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'

function AdminLoginScreen({location, history}) {

    const [attempt, setAttempt] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] :'/dashboard'

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
      if(localStorage.getItem('userInfo'))
      {
        history.push(redirect)
      }
      else
      {
        if(attempt === true)
        {
          alert("Wrong Credentials")
        }
        history.push('/admin')
      }
    }, [userInfo])

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
      setAttempt(true)
    }

    return (
        <Row md={3} xs={12} sm={12} id="homeScreen">
              <Col md={2} sm={12} xs={12}></Col>
              <Col className="mt-4" md={8} sm={12} xs={12}>
                <Row className="mb-5">
                  <Col md={4}></Col>
                  <Col md={4}>
                    <Image src='/icon.png' className="mb-3" fluid />
                  </Col>
                  <Col md={4}></Col>
                </Row>
                <Row className="mb-2">
                  <Col md={1}></Col>
                  <Col md={10}>
                    <h1 className="mb-4 text-center text-white">ADMIN LOGIN</h1>
                  </Col>
                  <Col md={1}></Col>
                </Row>
                <Form onSubmit={submitHandler}>
                  <Row>
                      <Col md={3}></Col>
                      <Col md={6}>
                          <Form.Group controlId='email' className="mb-2">
                            <Form.Label className="text-light">Email Address</Form.Label>
                            <Form.Control
                            type='email'
                            // placeholder='Enter Email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            >
                            </Form.Control>
                          </Form.Group>

                          <Form.Group controlId='password'>
                            <Form.Label className="text-light">Password</Form.Label>
                            <Form.Control
                            type='password'
                            // placeholder='Enter Password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            >
                            </Form.Control>
                          </Form.Group>
                          <div className="d-grid gap-2 mt-3 mb-4">
                            <Button type='submit' variant='success'>LOGIN</Button>
                          </div>
                          <LinkContainer to="/forgot" className="d-flex justify-content-center text-light mb-3">
                            <a href="#">Forgot Password?</a>
                          </LinkContainer>
                      </Col>
                      <Col md={3}></Col>
                  </Row>
                </Form>
                
                <Row className="mt-2">
                    <Col className="text-center">
                        <small className="text-secondary">Energy Sense Rebate Program for Central, Ducted Systems <br/>
                        Copyright &copy; 2020 GPA Powered By Xtendly</small>
                    </Col>
                </Row>
              </Col>
              <Col md={2} sm={12} xs={12}></Col>
            </Row>
    )
}

export default AdminLoginScreen
