import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
    return (
        <footer className="py-3 text-center d-flex flex-grow-1 align-items-bottom w-100"
            style={{
                // bottom: 0
            }}
        >
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
