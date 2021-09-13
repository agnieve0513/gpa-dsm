import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { FaQuestionCircle } from 'react-icons/fa'
import city_zipcode from './source_files/city_zipcode'

export default class ApplicationForm extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    changeZipCode = () => {
        
       const result =  city_zipcode.find((p) => p._id === this.props.values.city_village);
       if(result)
       {
          this.props.values.zip_code = result.zip_code; 
       }
    }

    changeEmailZipCode = () => {
        const result =  city_zipcode.find((p) => p._id === this.props.values.mailing_city_village);
       if(result)
       {
          this.props.values.mailing_zip_code = result.zip_code; 
       }
    }

    render() {

        const { values, inputChange } = this.props;

        return (
            <div className="container mt-4">
                <h2 className="text-center text-info mb-5">APPLICANT'S INFORMATION </h2>
                <Row className="mb-5">
                    <Col md={1}></Col>
                    <Col md={10}>

                        <Row className="">
                            <Col md={6}>

                                <div className="form-group">
                                    <label className="control-label mb-1">GPA ELECTRIC ACCOUNT NUMBER 
                                    <span className="badge rounded-pill bg-success"><FaQuestionCircle /></span></label>
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                        <input type="text" className="form-control"name="gpa_electric_account_number"
                                        onChange={inputChange('gpa_electric_account_number')} value={values.gpa_electric_account_number} />
                                            <button className="btn btn-danger">Verify</button>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label className="control-label mb-1">BILL ID 
                                        <span className="badge rounded-pill bg-success"><FaQuestionCircle /></span>
                                    </label>
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                        <input type="text" className="form-control"name="bill_id"
                                        onChange={inputChange('bill_id')} value={values.bill_id} />
                                            <button className="btn btn-danger">Verify</button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={12}>
                                <b>Applicant Name (Name should match your W9form)</b>
                            </Col>
                        </Row>
                        <Row className="">
                            <Col md={5}>
                                <div className="form-group">
                                    <label className="control-label">FIRSTNAME</label>
                                    <input type="text" className="form-control"name="firstname"
                                        onChange={inputChange('firstname')} value={values.firstname} />
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="form-group">
                                    <label className="control-label">LASTNAME </label>
                                    <input type="text" className="form-control"name="lastname"
                                        onChange={inputChange('lastname')} value={values.lastname} />
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="form-group">
                                    <label className="control-label">MI  </label>
                                    <input type="text" className="form-control"name="middle_initial"
                                        onChange={inputChange('middle_initial')} value={values.middle_initial} />
                                </div>
                            </Col>
                        </Row>

                        <Row  className="mt-3">
                            <Col md={12}>
                                <div className="form-group">
                                    <label className="control-label">SERVICE LOCATION (Address where equipment was installed) </label>
                                    <input type="text" className="form-control"name="service_location"
                                        onChange={inputChange('service_location')} value={values.service_location} />
                                </div>
                            </Col>
                        </Row>

                        <Row   className="mt-3">
                            <Col md={6}>
                                <div className="form-group">
                                    <label className="control-label">CITY/VILLAGE  </label>
                                    <select className="form-control"name="city_village" value={values.city_village}
                                        onChange={inputChange('city_village')}>
                                            {city_zipcode.map(p => (
                                                <option key={p._id} value={p._id}>{p.village}</option>
                                            ))}
                                    </select>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label className="control-label">ZIP CODE </label>
                                    <input type="text" className="form-control" name="zip_code"
                                        onChange={this.changeZipCode()} value={values.zip_code}  readOnly ="readOnly"/>
                                </div>
                            </Col>
                        </Row>

                        <Row   className="mt-3">
                            <Col md={6}>
                                <div className="form-group">
                                    <label className="control-label">EMAIL</label>
                                    <input type="email" className="form-control" name="email"
                                        onChange={inputChange('email')} value={values.email} />
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="form-group">
                                    <label className="control-label">TELEPHONE NUMBER</label>
                                    <input type="text" className="form-control" name="telephone_number"
                                        onChange={inputChange('telephone_number')} value={values.telephone_number} />
                                </div>
                            </Col>
                        </Row>

                        <Row   className="mt-3">
                            <Col md={6}>
                                <p align='justify'>Applicant must be either the GPA account holder or the
                                    property owner to claim a rebate. Is applicant the owner of the residential property?</p>
                            </Col>

                            <Col md={6}>
                                <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gpa_account_holder"
                                        value="true"
                                        onChange={inputChange('gpa_account_holder')}
                                        checked={"true" === values.gpa_account_holder} />
                                <label className="form-check-label" htmlFor="gpa_account_holder">Yes</label>
                                </div>

                                <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gpa_account_holder"
                                        value="false"
                                        onChange={inputChange('gpa_account_holder')}
                                        checked={"false" === values.gpa_account_holder} />
                                <label className="form-check-label" htmlFor="gpa_account_holder">No</label>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} className="mb-3">
                                <p align='justify'>An Exception may be made if the tenant or property owner representative
                                    provides an authorization letter with a copy of photo I.D. Residential
                                    customers with Commercial Accounts must provide proof of residency in
                                    order to participate in this rebate program. Condominium or property
                                    managers may apply for tennants.</p>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md={12}>
                                <div className="form-group">
                                    <label className="control-label">MAILING ADDRESS<b>(Current address where we will send your rebate check) </b> </label>
                                    <input type="text" className="form-control" name="mailing_address"
                                        onChange={inputChange('mailing_address')} value={values.mailing_address} />
                                </div>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col md={6}>
                                <div className="form-group">
                                    <label className="control-label">CITY/VILLAGE</label>
                                        <select className="form-control"name="mailing_city_village"
                                        onChange={inputChange('mailing_city_village')} value={values.mailing_city_village}>
                                             {city_zipcode.map(p => (
                                                <option key={p._id} value={p._id}>{p.village}</option>
                                            ))}
                                    </select>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label className="control-label">ZIP CODE </label>
                                    <input type="text" className="form-control" name="mailing_zip_code"
                                        onChange={this.changeEmailZipCode()} value={values.mailing_zip_code}  readOnly ="readOnly"/>
                                </div>
                            </Col>
                        </Row>

                        <Row   className="mt-3">
                            <Col md={4}>
                                <div className="form-group">
                                    <label className="control-label">HOME ZIZE (approx.sq ft.)</label>
                                    <input type="text" className="form-control" name="mailing_home_zie"
                                        onChange={inputChange('mailing_home_zie')} value={values.mailing_home_zie} />
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="form-group">
                                    <label className="control-label">HOME AGE (approx.year built?)</label>
                                    <input type="text" className="form-control" name="home_age"
                                        onChange={inputChange('home_age')} value={values.home_age} />
                                </div>
                            </Col>
                            <Col md={4}>
                                    <p className="control-label ">NEW CONSTRUCTION</p>

                                    <Row>
                                        <Col md={6}>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="new_construction"
                                                        value="true"
                                                        onChange={inputChange('new_construction')}
                                                        checked={"true" === values.new_construction} />
                                                <label className="form-check-label" htmlFor="new_construction">Yes</label>
                                            </div>
                                        </Col>

                                        <Col md={6}>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="new_construction"
                                                        value="false"
                                                        onChange={inputChange('new_construction')}
                                                        checked={"false" === values.new_construction} />
                                                <label className="form-check-label" htmlFor="new_construction">No</label>
                                            </div>
                                        </Col>
                                    </Row>
                            </Col>
                        </Row>

                        <Row   className="mt-3">
                            <Col md={12}>
                                <p className="control-label ">HOME TYPE (check one)</p>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            
                            <Col md={3}>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="home_type"
                                            value="SINGLE_FAMILY"
                                            onChange={inputChange('home_type')}
                                            checked={"SINGLE_FAMILY" === values.home_type} />
                                    <label className="form-check-label" htmlFor="home_type">SINGLE FAMILY</label>
                                </div>
                            </Col>

                            <Col md={2}>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="home_type"
                                            value="APARTMENT"
                                            onChange={inputChange('home_type')}
                                            checked={"APARTMENT" === values.home_type} />
                                    <label className="form-check-label" htmlFor="home_type">APARTMENT</label>
                                </div>
                            </Col>

                            <Col md={2}>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="home_type"
                                            value="CONDO"
                                            onChange={inputChange('home_type')}
                                            checked={"CONDO" === values.home_type} />
                                    <label className="form-check-label" htmlFor="home_type">CONDO</label>
                                </div>
                            </Col>

                            <Col md={3}>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="home_type"
                                            value="MOBILE_HOME"
                                            onChange={inputChange('home_type')}
                                            checked={"MOBILE_HOME" === values.home_type} />
                                    <label className="form-check-label" htmlFor="home_type">MOBILE HOME</label>
                                </div>
                            </Col>

                            <Col md={2}>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="home_type"
                                            value="OTHER"
                                            onChange={inputChange('home_type')}
                                            checked={"OTHER" === values.home_type} />
                                    <label className="form-check-label" htmlFor="home_type">OTHER</label>
                                </div>
                            </Col>
                        </Row>

                        <hr className="mb-4" />


                        <div className="row d-flex justify-content-center">
                            <div className="col-6 d-flex justify-content-end">
                                <button className ="btn btn-secondary btn-lg px-5" onClick={this.back}><h4>Back</h4></button>
                            </div>
                            <div className="col-6 d-flex justify-content-start">
                                <button className ="btn btn-success btn-lg px-5" onClick={this.continue}><h4>Continue</h4></button>
                            </div>
                        </div>
                    </Col>
                    <Col md={1}></Col>
                </Row>
              
            </div>
        )
    }
}
