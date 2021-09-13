import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import system_type from './source_files/system_type'

export default class OldEquipmentInfoForm extends Component {

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
            <Row>
                <Col md={2}></Col>
                <Col md={8}>
                    <Form>
                        <Row>
                            <Col md={8}>
                                <div className="form-check form-group">
                                    <input type="checkbox" className="form-check-input" />
                                    <label className="form-check-label">
                                        Check if there is no existing/old equipment being replaced
                                    </label>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={8}>
                                <div className="form-group">
                                    <label className="control-label">SYSTEM TYPE:</label>
                                    <select className="form-control"name="old_system_type" value=''
                                        onChange={inputChange('old_system_type')}>
                                            <option defaultValue disabled>Select System Type ---</option>
                                            {system_type.map(p => (
                                                <option></option>
                                            ))}
                                    </select>
                                </div>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={6}>
                                <div className="form-group">
                                    <label className="control-label">BTU </label>
                                    <input type="text" className="form-control"name="old_btu"
                                        onChange={inputChange('old_btu')} value={values.old_btu} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label className="control-label">YEARS</label>
                                    <select className="form-control"name="old_years" value={values.old_years}
                                        onChange={inputChange('old_years')}>
                                            <option defaultValue disabled>Select Number of Years ---</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <div className="form-group">
                                    <label className="control-label">QUANTITY </label>
                                    <input type="text" className="form-control"name="old_quantity"
                                        onChange={inputChange('old_quantity')} value={values.old_quantity} />
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="form-group">
                                    <label className="control-label">TONS</label>
                                    <select className="form-control"name="old_equipment_condition"
                                    value={values.old_equipment_condition}
                                        onChange={inputChange('old_equipment_condition')}>
                                            <option defaultValue disabled>Select Number of Tons ---</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={12} >
                                <label className="control-label">EQUIPMENT CONDITION PRIOR TO REMOVAL</label>
                                <Row>
                                    <Col md={6}>
                                        <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="old_equipment_condition"
                                                value="Operational"
                                                onChange={inputChange('old_equipment_condition')}
                                                checked={"Operational" === values.gpa_account_holder} />
                                        <label className="form-check-label" htmlFor="old_equipment_condition">Operational</label>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="old_equipment_condition"
                                                value="Failed"
                                                onChange={inputChange('old_equipment_condition')}
                                                checked={"Failed" === values.old_equipment_condition} />
                                        <label className="form-check-label" htmlFor="old_equipment_condition">Failed</label>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    
                        <Row>
                            <Col md={12}>
                                <div className="form-group">
                                    <label className="control-label">SEER </label>
                                    <input type="text" className="form-control" name="old_seer"
                                        onChange={inputChange('old_seer')} value={values.old_seer} />
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={12} >
                                <label className="control-label">EQUIPMENT CONDITION PRIOR TO REMOVAL</label>
                                <Row>
                                    <Col md={6}>
                                        <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="old_disposal_party"
                                                value="Customer"
                                                onChange={inputChange('old_disposal_party')}
                                                checked={"Customer" === values.old_disposal_party} />
                                        <label className="form-check-label" htmlFor="old_disposal_party">Customer</label>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="old_disposal_party"
                                                value="Installer"
                                                onChange={inputChange('old_disposal_party')}
                                                checked={"Installer" === values.old_disposal_party} />
                                        <label className="form-check-label" htmlFor="old_disposal_party">Installer</label>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={8}>
                                <div className="form-check form-group">
                                    <input type="checkbox" className="form-check-input"
                                    name="old_agree_terms"
                                        onChange={inputChange('old_agree_terms')}
                                        value="checked"
                                        checked={"checked"=== values.old_agree_terms}
                                        />
                                    <label className="form-check-label">
                                        By checking this box, you agree to the terms and conditions for proper disposal.
                                    </label>
                                </div>
                            </Col>
                        </Row>


                    <div className="text-center mb-4">
                        <button className ="btn btn-success btn-md px-5 rounded-lg" onClick={this.continue}><h5>ADD EQUIPMENT</h5></button>
                    </div>
                </Form>
                </Col>
                <Col md={2}></Col>
            </Row>
            
        )
    }
}
