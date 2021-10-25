import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

import './Steps.css';

function Steps(props) {

    return (
        <Container fluid className="mb-4" id="StepsContent">
            <Row className="text-center text-white" id="stepsBackground">
                <Col className="pt-3 px-4">
                <li>
                    <Image src='./icons-improved/step1.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 1? "bg-success":"bg-secondary")} fluid />
                    <span id="one">Application Requirement</span>
                </li>
                <li>
                    <Image src='./icons-improved/step2.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 2? "bg-success":"bg-secondary")} fluid />
                    <span id="two">Applicant Information</span>
                </li>
                <li>
                    <Image src='./icons-improved/step3.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 3? "bg-success":"bg-secondary")} fluid />
                    <span id="three">New Equipment Information</span>
                </li>
                <li>
                    <Image src='./icons-improved/step4.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 4? "bg-success":"bg-secondary")} fluid />
                    <span id="four">Existing Equipment Information</span>
                </li>
                <li>
                    <Image src='./icons-improved/step5.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 5? "bg-success":"bg-secondary")} fluid />
                    <span id="five">Equipment Review</span>
                </li>
                <li>
                    <Image src='./icons-improved/step6.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 6? "bg-success":"bg-secondary")} fluid />
                    <span id="six">Submission of Documentation</span>
                </li>
                <li>
                    <Image src='./icons-improved/step7.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 7? "bg-success":"bg-secondary")} fluid />
                    <span id="seven">Final Review</span>
                </li>
                <li>
                    <Image src='./icons-improved/step8.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 8? "bg-success":"bg-secondary")} fluid />
                    <span id="eight">Terms & Conditions</span>
                </li>
                </Col>
            </Row>
         
        </Container>
    )
}

export default Steps
