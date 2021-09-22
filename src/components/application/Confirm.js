import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { FiThumbsUp } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default class Confirm extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {

        return (
            <div className="container mt-5">
                
                <Container className="text-center">

                    <Row className="mb-5">
                        <Col md={5}></Col>
                        <Col md={2}>
                            <Row>
                                <Col md={2}></Col>
                                <Col md={8} className="rounded-circle bg-info" >
                                    <h1 className="text-center text-white my-auto py-4">
                                        <FiThumbsUp size={70} />
                                    </h1>
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Col>
                        <Col md={5}></Col>
                    </Row>

                    <div className="">
                        <h2 className="mb-3">Thank you!</h2>
                    </div>
                    <p> Your confirmation number is <b>2101-D0001</b>. </p>

                    <Row>
                        <Col md={2}></Col>
                        <Col md={8}>
                            <p>
                                Please record and keep this number for tracking your rebate status <a href='/' className="text-info"><b>here</b></a>. Your rebate control number will also be emailed for your records.
                            </p>
                        </Col>
                        <Col md={2}></Col>
                    </Row>
                    
                </Container>

                <Container className="text-center mb-3">
                    <Link to={`/`} className ="btn btn-success btn-lg px-5"><h4>BACK TO GPA HOMEPAGE </h4></Link>
                </Container>
                <Container className="text-center">
                    <button className ="btn btn-info btn-lg px-5"><h4>Print Application</h4></button>
                </Container>
            </div>
        )
    }
}
