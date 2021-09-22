import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'

function SubmissionOfDocumentation(props) {
    return (
        <Row>
            <Col md={3}></Col>
            <Col md={6}>
                <h4 className="text-center text-info">Submission of Documentation</h4>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='invoice' className="mb-3">
                            <Form.Label>INVOICE</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setInvoice(e.target.value)}
                                value={props.invoice}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='invoice2' className="mb-3">
                            <Form.Label><i className="fa fa-question-mark"></i></Form.Label>
                            <Form.Control
                                type='file'
                                placeholder=''
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId='irs_form' className="mb-3">
                            <Form.Label>IRS Form W-9</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setIrsForm(e.target.value)}
                                value={props.irs_form}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='irs_form2' className="mb-3">
                            <Form.Label><i className="fa fa-question-mark"></i></Form.Label>
                            <Form.Control
                                type='file'
                                placeholder=''
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='disposal_slip' className="mb-3">
                            <Form.Label>DISPOSAL SLIP</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setDisposalSlip(e.target.value)}
                                value={props.disposal_slip}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='disposal_slip2' className="mb-3">
                            <Form.Label><i className="fa fa-question-mark"></i></Form.Label>
                            <Form.Control
                                type='file'
                                placeholder=''
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='letter_authorization' className="mb-3">
                            <Form.Label>LETTER OF AUTHORIZATION</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setLetterAuthorization(e.target.value)}
                                value={props.letter_authorization}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='letter_authorization2' className="mb-3">
                            <Form.Label><i className="fa fa-question-mark"></i></Form.Label>
                            <Form.Control
                                type='file'
                                placeholder=''
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='other_doc1' className="mb-3">
                            <Form.Label>OTHER SUPPORT DOCUMENTS 1</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setOtherDoc1(e.target.value)}
                                value={props.other_doc1}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='other_doc12' className="mb-3">
                            <Form.Label><i className="fa fa-question-mark"></i></Form.Label>
                            <Form.Control
                                type='file'
                                placeholder=''
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='other_doc2' className="mb-3">
                            <Form.Label>OTHER SUPPORT DOCUMENTS 2</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setOtherDoc2(e.target.value)}
                                value={props.other_doc2}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='other_doc22' className="mb-3">
                            <Form.Label><i className="fa fa-question-mark"></i></Form.Label>
                            <Form.Control
                                type='file'
                                placeholder=''
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='other_doc3' className="mb-3">
                            <Form.Label>OTHER SUPPORT DOCUMENTS 3</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setOtherDoc3(e.target.value)}
                                value={props.other_doc3}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='other_doc32' className="mb-3">
                            <Form.Label><i className="fa fa-question-mark"></i></Form.Label>
                            <Form.Control
                                type='file'
                                placeholder=''
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Col>
            <Col md={3}></Col>
        </Row>
    )
}

export default SubmissionOfDocumentation
