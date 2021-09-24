import React, {useState, useEffect} from 'react'
import {Navbar, Nav, Row, Col, Image, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

// import './AdminLoginScreen.css'

import {forgotPassword} from '../actions/userActions'

function AdminForgotPasswordScreen({location, history}) {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] :'/dashboard'

    const userForgotPassword = useSelector(state => state.userForgotPassword)
    const {error, loading, success} = userForgotPassword

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(forgotPassword(email))
      if(success)
      {
        alert('password reset is sent to your email!')
        history.push('/admin')
      }else
      {
        alert('user was not found')
      }
    }

    return (
      <>
      <Navbar bg="info" variant="" expand="lg" collapseOnSelect className="p-2 mb-5">
           
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto bg-info">
                    <Image src='/icon.png' width="270"
                        height="78" />
                    </Nav>
                </Navbar.Collapse>
      </Navbar>
      <Row className="mt-5">
        <Col md={3}></Col>
        <Col md={6}>
          <h1 className="text-center mb-4 text-info">Forgot Your Password?</h1>
          <Row className="mb-4">
            <Col md={2}></Col>
            <Col md={8}>
            <h5 className="text-center text-muted">Please enter your registered email address. An email notification with a password reset link will be sent to you.</h5>
            
            </Col>
            <Col md={2}></Col>
          </Row>

          <Form onSubmit={submitHandler}>
              <Row>
                  <Col md={2}></Col>
                  <Col md={8}>
                      <Form.Group controlId='email' className="mb-2">
                        <Form.Label className="">Enter Email Address</Form.Label>
                        <Form.Control
                        type='email'
                        // placeholder='Enter Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        >
                        </Form.Control>
                      </Form.Group>
                      <Row>
                        <Col md={4}></Col>
                        <Col md={4}>
                        <div className="d-grid gap-2 mt-3 mb-4">
                        <Button type='submit' className="text-center" variant='success'>SUBMIT</Button>
                        </div>
                        </Col>
                        <Col md={4}></Col>
                      </Row>
                  </Col>
                  <Col md={2}></Col>
              </Row>
            </Form>

            <Col className="text-center">
              <small className="text-secondary">Energy Sense Rebate Program for Central, Ducted Systems <br/>
              Copyright &copy; 2020 GPA Powered By Xtendly</small>
          </Col>
        </Col>
        <Col md={3}></Col>
      </Row>
     
      </>
    )
}

export default AdminForgotPasswordScreen
