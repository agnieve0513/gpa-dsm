import React, { Component } from 'react'
import { Row, Col, Tabs, Tab, Container, ListGroup,
    Table, Button, ButtonGroup,
    Card} from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import city_zipcode from './source_files/city_zipcode'
import './FinalReview.css';


export default class FinalReview extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };


    render() {
        const { values, inputChange } = this.props;
        const city_value2 = city_zipcode.find((p) => p._id === this.props.values.city_village)
        return (
            <div className="container mt-4 mb-5">

                    <div className="container mt-4  mb-5">
                             <h2 className="text-center text-info">FINAL REVIEW</h2>

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
                                                <h3 className="mt-3">Applicant Info <button className="btn btn-danger btn-sm"><FaEdit /> Edit Information</button></h3>
                                                <ListGroup>
                                                    <p>GPA Electric Account Number <b>{values.gpa_electric_account_number}</b> </p>
                                                    <p>Bill ID <b>{values.bill_id}</b> </p>
                                                    <p>Applicant Name <b>{values.lastname}, {values.firstname} {values.middlename}</b>
                                                    </p>
                                                    <p>Installation Address <b>{values.service_location}</b> </p>
                                                    <p>City <b>{ city_value2.village}</b> </p>
                                                    <p>ZIP <b>{city_value2.zip_code}</b> </p>
                                                    <p>Email <b>{values.email}</b> </p>
                                                    <p>Telephone Number <b>{values.telephone_number}</b> </p>
                                                    <p>Owner of the Residential Property <b>{values.gpa_account_holder}</b> </p>
                                                    <p>Mailing Address <b>{values.mailing_address}</b> </p>
                                                    <p>Home Size (approx. sq. ft.) <b>{values.mailing_home_zie}</b> </p>
                                                    <p>Home Age (appox. year built) <b>{values.home_age}</b> </p>
                                                    <p>New Construction <b>{values.new_construction}</b> </p>
                                                    <p>Home Type <b>{values.home_type}</b> </p>
                                                    
                                                </ListGroup>
                                            </Container>
                                        </Tab>
                                        <Tab eventKey="new_quipment_info" title="New Equipment Information">
                                            <Container className="ml-2 mr-2">
                                                        <h3 className="mt-3 mb-3 text-info">New Equipment Info <button className="btn btn-danger btn-sm"><FaEdit /> Edit Information</button></h3>

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
                                                <h3 className="mt-3 mb-3">Existing/Old Equipment Info <button className="btn btn-danger btn-sm"><FaEdit /> Edit Information</button></h3>

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
                                                <h3 className="mt-3 mb-3">Submission of Documentation <button className="btn btn-danger btn-sm"><FaEdit /> Edit Information</button></h3>

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
                        </div>

                    <hr className="mb-5" />

                    <div className="row d-flex justify-content-center">
                        <div className="col-6 d-flex justify-content-end">
                            <button className ="btn btn-secondary btn-lg px-5" onClick={this.back}><h4>Back</h4></button>
                        </div>
                        <div className="col-6 d-flex justify-content-start">
                            <button className ="btn btn-success btn-lg px-5" onClick={this.continue}><h4>Continue</h4></button>
                        </div>
                    </div>
                
            </div>
        )
    }
}
