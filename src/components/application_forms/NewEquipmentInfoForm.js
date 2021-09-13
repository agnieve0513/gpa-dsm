import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import system_type from './source_files/system_type'

export default class NewEquipmentInfoForm extends Component {

    render() {
        const { values, inputChange } = this.props;
        return (
            <div className="container mt-4">
                <h2 className="text-center text-info mb-5">NEW EQUIPMENT INFORMATION</h2>
                <Form>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={8}>
                            <Row>
                                <Col md={8}>
                                    <div className="form-group">
                                        <label className="control-label"><h4>SYSTEM TYPE:  </h4></label>
                                        <select className="form-control"name="system_type" value=''
                                            onChange={inputChange('system_type')}>
                                                <option defaultValue disabled>Select System Type ---</option>
                                                <option>Central AC</option>
                                                <option>Split AC</option>
                                                <option>Window AC</option>
                                                <option>Dryer</option>
                                                <option>Washer</option>
                                        </select>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">MANUFACTURER </label>
                                        <input type="text" className="form-control"name="manufacturer"
                                            onChange={inputChange('manufacturer')} value={values.manufacturer} />
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">MODEL NUMBER </label>
                                        <input type="text" className="form-control"name="model_number"
                                            onChange={inputChange('model_number')} value={values.model_number} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">QUANTITY </label>
                                        <input type="text" className="form-control"name="quantity"
                                            onChange={inputChange('quantity')} value={values.quantity} />
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">BTU </label>
                                        <input type="text" className="form-control"name="btu"
                                            onChange={inputChange('btu')} value={values.btu} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">VENDOR </label>
                                        <input type="text" className="form-control"name="vendor"
                                            onChange={inputChange('vendor')} value={values.vendor} />
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">TYPE </label>
                                        <input type="text" className="form-control"name="type"
                                            onChange={inputChange('type')} value={values.type} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">INVOICE# </label>
                                        <input type="text" className="form-control"name="invoice"
                                            onChange={inputChange('invoice')} value={values.invoice} />
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">PURCHASE DATE (Date on invoice) </label>
                                        <input type="date" className="form-control"name="purchase_date"
                                            onChange={inputChange('purchase_date')} value={values.purchase_date} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label className="control-label">TONS </label>
                                        <input type="text" className="form-control"name="tons"
                                            onChange={inputChange('tons')} value={values.tons} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label className="control-label">REBATE </label>
                                        <input type="text" className="form-control"name="rebate"
                                            onChange={inputChange('rebate')} value={values.rebate} />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-5">
                                <Col md={12}>
                                    <div className="form-group">
                                        <label className="control-label">INSTALL DATE </label>
                                        <input type="date" className="form-control"name="install_date"
                                            onChange={inputChange('install_date')} value={values.install_date} />
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-center mb-4">
                                <button className ="btn btn-success btn-md px-5 rounded-lg" onClick={this.continue}><h5>ADD EQUIPMENT</h5></button>
                            </div>
                        </Col>
                        <Col md={2}></Col>
                    </Row>

                    

                    <Row>
                        <Col md={1}></Col>
                        <Col md={10}>
                            <h3 className="text-center text-info mb-5">INSTALLER'S INFORMATION</h3>
                        
                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">TECHNICIAN NAME </label>
                                        <input type="text" className="form-control"name="technician_name"
                                            onChange={inputChange('technician_name')} value={values.technician_name} />
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">WORK TELEPHONE </label>
                                        <input type="date" className="form-control"name="work_telephone"
                                            onChange={inputChange('work_telephone')} value={values.work_telephone} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label className="control-label">COMPANY NAME </label>
                                        <input type="text" className="form-control"name="company_name"
                                            onChange={inputChange('company_name')} value={values.company_name} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                 <Col md={12}>
                                    <div className="form-group">
                                        <label className="control-label">TECHNICIAN AC CERTIFICATION NUMBER </label>
                                        <input type="text" className="form-control"name="technician_certificate_number"
                                            onChange={inputChange('technician_certificate_number')}
                                            value={values.technician_certificate_number} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label className="control-label">DATE OF FINAL INSTALLATION </label>
                                        <input type="date" className="form-control"name="date_final_installation"
                                            onChange={inputChange('date_final_installation')} value={values.date_final_installation} />
                                    </div>
                                </Col>

                                <Col md={6} className="mb-3">
                                    <div className="form-group">
                                        <label className="control-label">EMAIL </label>
                                        <input type="email" className="form-control"name="installer_email"
                                            onChange={inputChange('installer_email')} value={values.installer_email} />
                                    </div>
                                </Col>
                            </Row>
                    </Col>
                    <Col md={1}></Col>
                    </Row>

                </Form>
            </div>
        )
    }
}
