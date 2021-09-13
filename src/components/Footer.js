import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
    return (
        <footer className="py-3 mt-5">
            <Container>
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
