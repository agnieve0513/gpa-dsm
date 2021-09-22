import React from 'react'
import {Table, Row, Col, Form, Button } from 'react-bootstrap';

function ExistingEquipmentInformation(props) {

    const handleCheckBox = (e) => {
        if(e.target.checked)
        {
            props.seIsNoExistingToReplace("true")
        }
        else
        {
            props.seIsNoExistingToReplace("false")
        }
    }

    const handleAgreeBox = (e) => {
        if(e.target.checked)
        {
            props.setAgreeTerms("true")
        }
        else
        {
            props.setAgreeTerms("false")
        }
    }
    return (
        <Row>
            <Col md={3}></Col>
            <Col md={6}>
                <h4 className="text-center text-info">Existing Equipment Information</h4>
                <Row>
                    <Col md={12}>
                        <Form.Check
                            inline
                            label="Check if there is no existing/old equipment being replaced"
                            name="is_no_existing_to_replace"
                            type={"checkbox"}
                            id={`inline-${"check"}-1`}
                            checked={props.is_no_existing_to_replace === "true"}
                            onChange={(e)=>handleCheckBox(e)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group controlId='btu' className="mb-3">
                            <Form.Label>SYSTEM TYPE</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                value={props.system_type}
                                onChange={(e)=>props.setSystemType(e.target.value)}
                                required
                                readOnly = "readOnly"
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='old_btu' className="mb-3">
                            <Form.Label>BTU</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                value={props.old_btu}
                                onChange={(e)=>props.setOldBtu(e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='old_years' className="mb-3">
                            <Form.Label>YEARS</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder=''
                                value={props.old_years}
                                onChange={(e)=>props.setOldYears(e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='old_quantity' className="mb-3">
                            <Form.Label>QUANTITY</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder=''
                                value={props.old_quantity}
                                onChange={(e)=>props.setOldQuantity(e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='old_quantity' className="mb-3">
                            <Form.Label>TONS</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                value={props.old_tons}
                                onChange={(e)=>props.setOldTons(e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row>
                    <Col md={12}>
                        <Form.Label>EQUIPMENT CONDITION PRIOR TO REMOVAL</Form.Label> <br />
                        <Form.Check
                            inline
                            label="Operational"
                            name="is_equipment_condition"
                            type={"radio"}
                            id={`inline-${"radio"}-1`}
                            value="Operational"
                            checked={"Operational" === props.is_equipment_condition}
                            onChange={(e)=>props.setIsEquipmentCondition(e.target.value)}

                        />
                        <Form.Check
                            inline
                            label="Failed"
                            name="is_equipment_condition"
                            type={"radio"}
                            value="Failed"
                            checked={"Failed" === props.is_equipment_condition}
                            onChange={(e)=>props.setIsEquipmentCondition(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group controlId='seer' className="mb-3">
                            <Form.Label>SEER</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                value={props.seer}
                                onChange={(e)=>props.setSeer(e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Label>DISPOSAL PARTY</Form.Label> <br />
                        <Form.Check
                            inline
                            label="Customer"
                            name="disposal_party"
                            type={"radio"}
                            id={`inline-${"radio"}-1`}
                            value="Customer"
                            checked={"Customer" === props.disposal_party}
                            onChange={(e)=>props.setDisposalParty(e.target.value)}

                        />
                        <Form.Check
                            inline
                            label="Installer"
                            name="disposal_party"
                            type={"radio"}
                            value="Installer"
                            checked={"Installer" === props.disposal_party}
                            onChange={(e)=>props.setDisposalParty(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={12}>
                        <Form.Check
                            inline
                            label="By checking this box, you agree to the terms and conditions for proper disposal."
                            name="agree_terms"
                            type={"checkbox"}
                            id={`inline-${"check"}-1`}
                            checked={props.agree_terms === "true"}
                            onChange={(e)=>handleAgreeBox(e)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Form.Group controlId='date' className="mb-3">
                            <Form.Label>DATE</Form.Label>
                            <Form.Control
                                type='date'
                                placeholder=''
                                value={props.date}
                                onChange={(e)=>props.setDate(e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                    <Row>
                    <Button variant="success" size="lg" className="d-flex justify-content-center">Add Equipment</Button>
                    </Row>
                    </Col>
                    <Col md={4}></Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <h4 className="text-center mt-3">Equipments</h4>
                        <Table>
                            <thead>
                                <tr>
                                    <td>Equipment</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>No Data</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Col>
            <Col md={3}></Col>
        </Row>
    )
}

export default ExistingEquipmentInformation
