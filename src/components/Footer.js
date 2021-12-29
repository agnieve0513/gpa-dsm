import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
    return (
        <footer className="py-3 px-0 text-center d-flex flex-grow-1 align-items-end w-100">
            <Container className="align-self-end">
                <Row>
                    <Col className="text-center">
                        <small className="">Energy Sense Rebate Program for Central, Ducted Systems <br/>
                        Copyright &copy; 2020 GPA Powered By Xtendly</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
