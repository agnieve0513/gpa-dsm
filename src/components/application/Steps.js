import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
function Steps(props) {

    return (
        <Container fluid className="mb-4 mt-2">
            <Row className="text-center text-white">
                <Col><i className={"rounded-circle p-4 fa fa-edit fa-1x "+ (props.currentStep >= 1? "bg-success":"bg-secondary")}></i></Col>
                <Col><i className={"rounded-circle p-4 fa fa-user fa-1x "+(props.currentStep >= 2? "bg-success":"bg-secondary")}></i></Col>
                <Col><i className={"rounded-circle p-4 fa fa-wind fa-1x "+(props.currentStep >= 3? "bg-success":"bg-secondary")}></i></Col>
                <Col><i className={"rounded-circle p-4 fa fa-fan fa-1x "+(props.currentStep >= 4? "bg-success":"bg-secondary")}></i></Col>
                <Col><i className={"rounded-circle p-4 fa fa-list fa-1x "+(props.currentStep >= 5? "bg-success":"bg-secondary")}></i></Col>
                <Col><i className={"rounded-circle p-4 fa fa-upload fa-1x "+(props.currentStep >= 6? "bg-success":"bg-secondary")}></i></Col>
                <Col><i className={"rounded-circle p-4 fa fa-tasks fa-1x "+(props.currentStep >= 7? "bg-success":"bg-secondary")}></i></Col>
                <Col><i className={"rounded-circle p-4 fa fa-file-signature fa-1x "+(props.currentStep >= 8? "bg-success":"bg-secondary")}></i></Col>
            </Row>
        </Container>
    )
}

export default Steps
