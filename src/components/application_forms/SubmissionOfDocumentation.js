import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import system_type from './source_files/system_type'
import { FaQuestionCircle } from 'react-icons/fa'

export default class SubmissionOfDocumentation extends Component {

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
        return (
            <div className="container mt-4">
                <h2 className="text-center text-info mb-5">SUBMISSION OF DOCUMENTATION</h2>

                    <Row>
                        <Col md={2}></Col>
                        <Col md={8}>
                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">INVOICE </label>
                                        <input type="text" className="form-control" name="mailing_zip_code" />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label"><span className="badge badge-pill badge-success"><FaQuestionCircle /></span></label>
                                        <input type="file" className="form-control" name="mailing_zip_code"/>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">IRS Form W-9 </label>
                                        <input type="text" className="form-control" name="mailing_zip_code" />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label"><span className="badge badge-pill badge-success"><FaQuestionCircle /></span></label>
                                        <input type="file" className="form-control" name="mailing_zip_code"/>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">DISPOSAL SLIP </label>
                                        <input type="text" className="form-control" name="mailing_zip_code" />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label"><span className="badge badge-pill badge-success"><FaQuestionCircle /></span></label>
                                        <input type="file" className="form-control" name="mailing_zip_code"/>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">LETTER OF AUTHORIZATION </label>
                                        <input type="text" className="form-control" name="mailing_zip_code" />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label"><span className="badge badge-pill badge-success"><FaQuestionCircle /></span></label>
                                        <input type="file" className="form-control" name="mailing_zip_code"/>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">OTHER SUPPORT DOCUMENTS 1 </label>
                                        <input type="text" className="form-control" name="mailing_zip_code" />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label"><span className="badge badge-pill badge-success"><FaQuestionCircle /></span></label>
                                        <input type="file" className="form-control" name="mailing_zip_code"/>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">OTHER SUPPORT DOCUMENTS 2 </label>
                                        <input type="text" className="form-control" name="mailing_zip_code" />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label"><span className="badge badge-pill badge-success"><FaQuestionCircle /></span></label>
                                        <input type="file" className="form-control" name="mailing_zip_code"/>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">OTHER SUPPORT DOCUMENTS 3 </label>
                                        <input type="text" className="form-control" name="mailing_zip_code" />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label"><span className="badge badge-pill badge-success"><FaQuestionCircle /></span></label>
                                        <input type="file" className="form-control" name="mailing_zip_code"/>
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                        <Col md={2}></Col>
                    </Row>


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
