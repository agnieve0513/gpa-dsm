import React, {useState, useEffect} from 'react'
import { Row, Col, Card,Table } from 'react-bootstrap';
import prerequisites from './source_files/document-prerequisites'


import './ApplicationInformation.css'

function ApplicationRequirements(props) {


    return (
        <Row>
            <Col md={2}></Col>
            <Col md={8}>
                <h4 className="text-center text-info">APPLICATION REQUIREMENTS</h4>
                <p>
                    For a smooth and complete application process we recommend that you
                    have all of the following information listed below readily available.
                    <span className="text-danger">Please note that any missing, false, or incorrect information provided
                    may cause a delay or even result in a denial of your application. </span>
                </p>

                <Card id="tableCard">
                <Card.Header>
                    <Card.Title className="text-center">Application Document and Information Pre-requisites</Card.Title>
                </Card.Header>
                <Card.Body>
                        <Table striped bordered hover>
                        <thead className="bg-info text-light">
                            <tr className="p-4">
                            <th width="5%">#</th>
                            <th width="20%">Description</th>
                            <th width="40%">Information (Required)</th>
                            <th width="35%">Additional Information (Required if)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prerequisites.map(p => (
                                <tr key={p._id}>
                                    <td className="text-center" key={"id_"+p._id}>{p._id}</td>
                                    <td key={"description_"+p._id}><b>{p.description}</b> <a className="text-secondary" href={p.image_sample} rel="noreferrer" target="_blank"> <i className="fa fa-question-circle"></i> </a></td>
                                    <td key={"information_"+p._id}>{p.information.map(i => 
                                        (<div key={"info_"+i}><span>{i}</span> <br /></div>))}</td>
                                    <td key={"additional_"+p._id}>{p.additional}</td>
                                </tr>
                            ))}
                        </tbody>
                        </Table>
                </Card.Body>
                </Card>
            </Col>
            <Col md={2}></Col>
        </Row>
    )
}

export default ApplicationRequirements
