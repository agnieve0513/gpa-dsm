import React from 'react'
import Form from '../components/Form'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'

import { Link } from 'react-router-dom'

function ApplicationScreen() {
    return (
        <div>
            <Header />
            <Row>
                <Col md={3}></Col>
                <Col md={6} className="mt-5 mb-5">
                    <h2 className="text-center text-info mb-5">TRACK YOUR APPLICATION</h2>
                    <Row>
                        <Col md={5}>
                            <p><b>ENTER YOUR CONTROL NUMBER</b></p>
                        </Col>
                        <Col md={5}>
                            <input type="text" className="form-control" name="" />
                        </Col>
                        <Col md={1}>
                            <button className="btn btn-success"><b>SUBMIT</b></button>
                        </Col>
                    </Row>
                    
                </Col>
                <Col md={3}></Col>
            </Row>

            <Row>
                <Col md={2}></Col>
                <Col md={8}>
                    <p className="text-center">
                        <span> <i className="fa fa-cog text-warning"></i>  Processing </span> |
                        <span> <i className="fa fa-times text-danger"></i>Denied/More Info Needed (Date)</span> |
                        <i className="fa fa-check text-success"></i> <span> Approved (Date)</span> |
                        <i className="fa fa-user text-secondary"></i> <span>Check Mailed (Date)</span>
                    </p>

                    <div className="d-flex">
                        <Link to={`/`} className="btn btn-success btn-lg mx-auto px-5"><h4>BACK TO GPA HOMEPAGE</h4></Link>
                    </div>
                </Col>
                <Col md={2}></Col>
            </Row>
        </div>
    )
}

export default ApplicationScreen
