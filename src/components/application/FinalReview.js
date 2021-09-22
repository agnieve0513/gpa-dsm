import React from 'react'
import { Row, Col, Tabs, Tab, ListGroup,
    Table, Button, ButtonGroup, Container,
    Card } from 'react-bootstrap';
import './FinalReview.css';

function FinalReview() {
    return (
        <Row>
            <Col md={1}></Col>
            <Col md={10}>
                <h4 className="text-center text-info mb-3">Final Review</h4>
                <Card>
                    <Card.Body>
                        <Container fluid>
                            <Tabs
                        defaultActiveKey="application_information"
                        transition={false}
                        id=""
                        className="mb-3"
                        >
                            <Tab eventKey="application_information" title="Applicant Information">
                                <Container className="ml-2 mr-2">
                                    <h3 className="mt-3">Applicant Info <button className="btn btn-danger btn-sm"><i className="fa fa-edit"></i> Edit Information</button></h3>
                                    <ListGroup>
                                        <p>GPA Electric Account Number <b></b> </p>
                                        <p>Bill ID <b></b> </p>
                                        <p>Applicant Name <b></b>
                                        </p>
                                        <p>Installation Address <b></b> </p>
                                        <p>City <b></b> </p>
                                        <p>ZIP <b></b> </p>
                                        <p>Email <b></b> </p>
                                        <p>Telephone Number <b></b> </p>
                                        <p>Owner of the Residential Property <b></b> </p>
                                        <p>Mailing Address <b></b> </p>
                                        <p>Home Size (approx. sq. ft.) <b></b> </p>
                                        <p>Home Age (appox. year built) <b></b> </p>
                                        <p>New Construction <b></b> </p>
                                        <p>Home Type <b></b> </p>
                                        
                                    </ListGroup>
                                </Container>
                            </Tab>
                            <Tab eventKey="new_quipment_info" title="New Equipment Information">
                                <Container className="ml-2 mr-2">
                                            <h3 className="mt-3 mb-3 text-info">New Equipment Info <button className="btn btn-danger btn-sm"><i className="fa fa-edit"></i> Edit Information</button></h3>

                                    <Row>
                                        <Col md={6}>
                                            <ListGroup className="mb-3">
                                                <p>Rebate</p>
                                                <p>System Type</p>
                                                <p>Vendor</p>
                                                <p>Quantity</p>
                                                <p>BTU</p>
                                                <p>Manufacturer</p>
                                                <p>Model Number</p>
                                                <p>Invoice#</p>
                                                <p>Purchase Date</p>
                                                <p>Type</p>
                                                <p>Tons</p>
                                                <p>Install Date</p>
                                            </ListGroup>

                                            <h3 className="mt-3 mb-3 text-info">Installer Information</h3>
                                            <ListGroup className="mb-3">
                                                <p>Technician Name</p>
                                                <p>Work Telephone</p>
                                                <p>Company</p>
                                                <p>Technician AC</p>
                                                <p>Certification No.</p>
                                                <p className="mb-3">Email</p>
                                                <p>Date of Final</p>
                                                <p>Installation</p>
                                            </ListGroup>
                                        </Col>
                                        <Col md={6}>
                                            <Table striped bordered hover>
                                                <thead className="bg-info text-white">
                                                    <tr className="py-5">
                                                        <th>Equipment No.</th>
                                                        <th>QTY</th>
                                                        <th>Rebate</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>sample data</td>
                                                        <td>1</td>
                                                        <td>payts</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Container>
                            </Tab>
                            <Tab eventKey="old_quipment_info" title="Old/Existing Equipment Information">
                                <Container className="ml-2 mr-2">
                                    <h3 className="mt-3 mb-3">Existing/Old Equipment Info <button className="btn btn-danger btn-sm"><i className="fa fa-edit"></i> Edit Information</button></h3>

                                    <ButtonGroup className="me-2 mb-3" aria-label="First group">
                                        <Button className="btn btn-sm" variant="info">E1</Button>{' '}
                                        <Button className="btn btn-sm" variant="secondary">E2</Button>{' '}
                                        <Button className="btn btn-sm" variant="secondary">E3</Button>{' '}
                                        <Button className="btn btn-sm" variant="secondary">E4</Button>
                                    </ButtonGroup>
                                    <ListGroup className="mb-3">
                                        <p>System Type</p>
                                        <p>BTU</p>
                                        <p>Years</p>
                                        <p>Quantity</p>
                                        <p>Tons</p>
                                        <p>Equipment condition prior to removal</p>
                                        <p>Seer</p>
                                        <p>Disposal Party</p>
                                        <p>Date</p>
                                    </ListGroup>
                                </Container>
                            </Tab>

                            <Tab eventKey="submission_of_documentation" title="Submission of Documentation">
                                <Container className="ml-2 mr-2">
                                    <h3 className="mt-3 mb-3">Submission of Documentation <button className="btn btn-danger btn-sm"><i className="fa fa-edit"></i> Edit Information</button></h3>

                                    <ListGroup className="mb-3">
                                        <p>Invoice</p>
                                        <p>IRS-W9</p>
                                        <p>Letter of Authorization</p>
                                        <p>Disposal Slip</p>
                                        <p>Other support documents 1</p>
                                        <p>Equipment condition prior to removal</p>
                                        <p>Other support documents 2</p>
                                    </ListGroup>
                                </Container>
                            </Tab>
                        </Tabs>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={1}></Col>
            
        </Row>
    )
}

export default FinalReview
