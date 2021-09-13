import React, { Component } from 'react'
import { Row, Col, Card, Table } from 'react-bootstrap'
import './ApplicationRequirements.css';

import prerequisites from './source_files/document-prerequisites'

export default class ApplicationRequirements extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {

        return (
            <div className="container mt-4">
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <h2 className="text-center text-info">APPLICATION REQUIREMENTS</h2>
                        <p>
                            For a smooth and complete application process we recommend that you
                            have all of the following information listed below readily available.
                            <span className="text-danger">Please note that any missing, false, or incorrect information provided
                            may cause a delay or even result in a denial of your application. </span>
                        </p>

                        <Card>
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
                                            <td className="text-center" key={"id_"+p._id}><a href={p.image_sample} rel="noreferrer" target="_blank"> {p._id}</a></td>
                                            <td key={"description_"+p._id}><b>{p.description}</b></td>
                                            <td key={"information_"+p._id}>{p.information.map(i => 
                                                (<div key={"info_"+i}><span>{i}</span> <br /></div>))}</td>
                                            <td key={"additional_"+p._id}>{p.additional}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                </Table>
                        </Card.Body>
                        </Card>

                        <br />

                        <div className="text-center">
                            <button className ="btn btn-success btn-lg px-5" onClick={this.continue}><h4>Continue</h4></button>
                        </div>
                    </Col>
                    <Col md={1}></Col>
                </Row>
            </div>
        )
    }
}
