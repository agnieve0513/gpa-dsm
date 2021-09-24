import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import './Steps.css'

function Steps(props) {

    return (
        <Container fluid className="mb-4" id="StepsContent">
            <Row className="text-center text-white">
                <Col className="pt-3 px-4">
                <li><i className={"rounded-circle p-4 fa fa-edit fa-1x "+ (props.currentStep >= 1? "bg-success":"bg-secondary")}></i></li>
                <li><i className={"rounded-circle p-4 fa fa-user fa-1x "+(props.currentStep >= 2? "bg-success":"bg-secondary")}></i></li>
                <li><i className={"rounded-circle p-4 fa fa-wind fa-1x "+(props.currentStep >= 3? "bg-success":"bg-secondary")}></i></li>
                <li><i className={"rounded-circle p-4 fa fa-fan fa-1x "+(props.currentStep >= 4? "bg-success":"bg-secondary")}></i></li>
                <li><i className={"rounded-circle p-4 fa fa-list fa-1x "+(props.currentStep >= 5? "bg-success":"bg-secondary")}></i></li>
                <li><i className={"rounded-circle p-4 fa fa-upload fa-1x "+(props.currentStep >= 6? "bg-success":"bg-secondary")}></i></li>
                <li><i className={"rounded-circle p-4 fa fa-tasks fa-1x "+(props.currentStep >= 7? "bg-success":"bg-secondary")}></i></li>
                <li><i className={"rounded-circle p-4 fa fa-file-signature fa-1x "+(props.currentStep >= 8? "bg-success":"bg-secondary")}></i></li>
                </Col>
            </Row>
            <Container className="px-4">
            <Row className="text-center" id="ForSteps">
                <Col><p>Application Requirement</p></Col>
                <Col><p>Applicant Information</p></Col>
                <Col><p>New Equipment Information</p></Col>
                <Col><p>Existing/Old Equipment Information</p></Col>
                <Col><p>Equipment Review</p></Col>
                <Col><p>Submission of Documentation</p></Col>
                <Col><p>Final Review</p></Col>
                <Col><p>Terms & Conditions</p></Col>
            </Row>
            </Container>
        </Container>
    )
}

export default Steps
