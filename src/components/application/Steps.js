import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import './Steps.css';


function checkStep(step) {
    var stepString = ''
    switch(step) {
        case 1:
            stepString = 'Application Requirement'
            break;
        case 2:
            stepString = 'Applicant Information'
            break;
        case 3:
            stepString = 'New Equipment Information'
            break;
        case 4:
            stepString = 'Existing Equipment Information'
            break;
        case 5:
            stepString = 'Equipment Review'
            break;
        case 6:
            stepString = 'Submission of Documentation'
            break;
        case 7:
            stepString = 'Final Review'
            break;
        case 8:
            stepString = 'Terms & Conditions'
            break;
    }
    return stepString
}

function Steps(props) {
    const { height, width } = useWindowDimensions();

    const allStep = (props) => 
        <Container fluid className="mb-4" id="StepsContent">
            <Row className="px-0 text-center text-white" id="stepsBackground">
                <Col className="pt-3">
                    <li>
                        <Image src='./icons-improved/step1.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 1? "bg-success":"bg-secondary")} fluid />
                        <span id="one">{'Application Requirement'}</span>
                    </li>
                    <li>
                        <Image src='./icons-improved/step2.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 2? "bg-success":"bg-secondary")} fluid />
                        <span id="two">{'Applicant Information'}</span>
                    </li>
                    <li>
                        <Image src='./icons-improved/step3.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 3? "bg-success":"bg-secondary")} fluid />
                        <span id="three">{'New Equipment Information'}</span>
                    </li>
                    <li>
                        <Image src='./icons-improved/step4.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 4? "bg-success":"bg-secondary")} fluid />
                        <span id="four">{'Existing Equipment Information'}</span>
                    </li>
                    <li>
                        <Image src='./icons-improved/step5.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 5? "bg-success":"bg-secondary")} fluid />
                        <span id="five">{'Equipment Review'}</span>
                    </li>
                    <li>
                        <Image src='./icons-improved/step6.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 6? "bg-success":"bg-secondary")} fluid />
                        <span id="six">{'Submission of Documentation'}</span>
                    </li>
                    <li>
                        <Image src='./icons-improved/step7.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 7? "bg-success":"bg-secondary")} fluid />
                        <span id="seven">{'Final Review'}</span>
                    </li>
                    <li>
                        <Image src='./icons-improved/step8.png' width={"65"} className={"rounded-circle p-3 fa fa-edit fa-1x "+ (props.currentStep >= 8? "bg-success":"bg-secondary")} fluid />
                        <span id="eight">{'Terms & Conditions'}</span>
                    </li>
                </Col>
            </Row>
        </Container>

    const specificStep = (props) =>
        <Container fluid className="mb-4 w-100 overflow-hidden" id="StepsContent">
            <Row className="ps-4 py-3 text-center text-white d-flex align-items-center justify-content-center" id="stepsBackground">
                <Image src={'./icons-improved/step'+props.currentStep+'.png'} className={"rounded-circle p-3 fa fa-edit fa-1x bg-success"} fluid 
                    style={{width:65}}/>
                <Col  className="pe-0 d-flex flex-column text-start">
                    <p className="p-0 my-0 text-dark fw-bold">{checkStep(props.currentStep)}</p>
                    <p className="p-0 my-0 text-black-50" id="mobileStep">Step {props.currentStep} of 8</p>
                </Col>
            </Row>
        </Container>

    const StepComponent = () => {
        return width <= 425 ? specificStep(props) :  allStep(props)
    }

    return (
        <StepComponent />
    )
}

export default Steps
