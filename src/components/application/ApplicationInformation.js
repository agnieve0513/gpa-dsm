import React, {useState, useEffect} from 'react'
import { Row, Col, Form, Container, Button, InputGroup } from 'react-bootstrap';


import { verifyCustomer,loadCustomerDetail } from '../../actions/customerAction'
import { useDispatch, useSelector } from 'react-redux'

import city_zipcode from './source_files/city_zipcode'

function ApplicationInformation(props) {
    
    const dispatch = useDispatch()

    const customerVerify = useSelector(state => state.customerVerify)
    const {loading:verifyLoading,error:verifyError, success:verifySuccess, customer_verification} = customerVerify

    const customerDetail = useSelector(state => state.customerDetail)
    const {loading:customerLoading,error:customerError, customer_detail} = customerDetail

    const submitHandler = (e) => {
        e.preventDefault()
    }

    const changeZipCode = (e) => {
       props.setCityVillage(e.target.value)


       const result =  city_zipcode.find((p) => p._id === e.target.value);

       if(result)
       {
          props.setZipCode(result.zip_code); 
       }
    }

    const verifyCustomerHandler = () =>
    {
        if(props.bill_id !== "" && props.account_no !=="")
        {
            dispatch(verifyCustomer(props.account_no, props.bill_id))
            if(customer_verification)
            {
                if(customer_verification.status === true)
                {
                    dispatch(loadCustomerDetail(props.bill_id))
                    if(customer_detail.AccountID)
                    {
                        props.setVerify(true)
                    }
                    else{ props.setVerify(false)}
                }
            }
        }
        else
        {
            alert("Account Number & Bill ID is required to verify customer")
        }
        
    }

    const handleFocus = () =>
    {
        console.log("focused!");
    }

    const handleNumericFields = (input, propVar) => {
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex
        if (input.value === '' || re.test(input.value)) {
            props[propVar](input.value)
        }
    }

    const today = new Date()
    let years = []
    for(var i=today.getFullYear(); i>=1950; i--) {
        years.push(i)
    }

    return (
        <Container>
            <h4 className="text-center text-info mb-4">APPLICANT'S INFORMATION</h4>
            <Row>
                <Col md={2}></Col>
                <Col md={8}>
                    <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId='account_no'>
                                <Form.Label>GPA ELECTRIC ACCOUNT NUMBER* <a className="text-secondary" href="" rel="noreferrer" target="_blank"> <i className="fa fa-question-circle"></i> </a></Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    onChange={(e)=>props.setAccountNo(e.target.value)} value={props.account_no}
                                    required
                                >
                                </Form.Control>
                            </Form.Group>
                            {
                                props.account_no === "" ? <p className="validate text-danger">*This Field is Required</p>
                                :
                                props.verify ? <p className="text-success">Customer Verified</p> : <p className="text-danger">Customer Not Verified</p>                            
                            }
                        </Col>
                        <Col md={6}  className="mb-3">
                            <Form.Group controlId='bill_id'>
                                <Form.Label>BILL ID* <a className="text-secondary" href="" rel="noreferrer" target="_blank"> <i className="fa fa-question-circle"></i> </a></Form.Label> <br />
                                <InputGroup>
                                    <Form.Control
                                    type='text'
                                    placeholder=''
                                    onChange={(e)=>props.setBillId(e.target.value)} value={props.bill_id}
                                    required
                                    />
                                    <Button onClick={()=> verifyCustomerHandler()} variant="danger" id="button-addon2">
                                    Verify
                                    </Button>
                                </InputGroup>
                            </Form.Group>
                            {
                                props.bill_id === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <span><b>Applicant's Name : </b></span>
                            <hr />
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId='firstname' >
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    onChange={(e)=>props.setFirstname(e.target.value)} value={props.firstname}
                                    required
                                    disabled={props.verify? false: true}
                                >
                                </Form.Control>
                            </Form.Group>
                            { props.firstname === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId='lastname'>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    onChange={(e)=>props.setLastname(e.target.value)} value={props.lastname}
                                    required
                                    disabled={props.verify? false: true}
                                >
                                </Form.Control>
                            </Form.Group>
                            { props.lastname === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}

                        </Col>
                        <Col md={2} className="mb-3">
                            <Form.Group controlId='middlename'>
                                <Form.Label>M. I.</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    onChange={(e)=>props.setMiddlename(e.target.value)} value={props.middlename}
                                    required
                                    disabled={props.verify? false: true}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group controlId='service_location' >
                                <Form.Label>SERVICE LOCATION (Address where equipment was installed)*</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    onChange={(e)=>props.setServiceLocation(e.target.value)} value={props.service_location}
                                    required
                                    disabled={props.verify? false: true}
                                >
                                </Form.Control>
                            </Form.Group>
                            { props.service_location === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}

                        </Col>

                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId='city_village' >
                                <Form.Label>CITY/VILLAGE</Form.Label>
                                <Form.Select
                                    onChange={(e)=>changeZipCode(e)}
                                    value={props.city_village}
                                    disabled={props.verify? false: true}
                                    >
                                        <option />
                                        {city_zipcode.map(p => (
                                            <option key={p._id} value={p._id}>{p.village}</option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            { props.city_village === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}

                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId='zip_code' >
                                <Form.Label>ZIP CODE</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    onChange={(e)=>handleNumericFields(e.target, 'setZipCode')}
                                    value={props.zipcode}
                                    required
                                    disabled={props.verify? false: true}
                                >
                                </Form.Control>
                            </Form.Group>
                            { props.zipcode === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId='email' >
                                <Form.Label>EMAIL</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    onChange={(e)=>props.setEmail(e.target.value)}
                                    value={props.email}
                                    required
                                    disabled={props.verify? false: true}
                                >
                                </Form.Control>
                            </Form.Group>
                            { props.email === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId='telephone_no' >
                                <Form.Label>TELEPHONE NUMBER</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    onChange={(e)=> props.setTelNo(e.target.value)}
                                    value={props.tel_no}
                                    required
                                    disabled={props.verify? false: true}
                                >
                                </Form.Control>
                            </Form.Group>
                            { props.tel_no === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <p>
                                Applicant must be either the GPA account holder or
                                the property owner to claim a rebate. Is applicant
                                the owner of the residential property?
                            </p>

                        </Col>
                        <Col md={6}>
                            <Form.Check
                                inline
                                label="Yes"
                                name="is_applicant_owner"
                                type={"radio"}
                                id={`inline-${"radio"}-1`}
                                value="true"
                                checked={"true" === props.is_applicant_owner}
                                onChange={(e)=>props.setIsApplicantOwner(e.target.value)}
                                disabled={props.verify? false: true}
                            />
                            <Form.Check
                                inline
                                label="No"
                                name="is_applicant_owner"
                                type={"radio"}
                                value="false"
                                checked={"false" === props.is_applicant_owner}
                                onChange={(e)=>props.setIsApplicantOwner(e.target.value)}
                                disabled={props.verify? false: true}
                            />
                        </Col>
                        { props.is_applicant_owner === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}

                    </Row>

                    <Row className="mb-3">
                        <Col md={12}>
                            An Exception may be made if the tenant or property owner
                            representative provides an authorization letter
                            with a copy of photo I.D. Residential customers
                            with Commercial Accounts must provide proof of residency
                            in order to participate in this rebate program.
                            Condominium or property managers may apply for tennants.
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group controlId='mailing_address' >
                                <Form.Label>MAILING ADDRESS <b>(Current address where we will send your rebate check)*</b></Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    onChange={(e)=>props.setMailingAddress(e.target.value)}
                                    value={props.mailing_address}
                                    required
                                    disabled={props.verify? false: true}
                                >
                                </Form.Control>
                            </Form.Group>
                            { props.mailing_address === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId='mailing_city_village'>
                                <Form.Label>CITY/VILLAGE</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    onChange={(e)=>props.setMailingCityVillage(e.target.value)}
                                    value={props.mailing_city_village}
                                    required
                                    disabled={props.verify? false: true}
                                >
                                </Form.Control>
                            </Form.Group>
                            { props.mailing_city_village === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId='mailing_zipcode'>
                                <Form.Label>ZIP CODE</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    onChange={(e)=>handleNumericFields(e.target, 'setMailingZipCode')}
                                    value={props.mailing_zipcode}
                                    required
                                    disabled={props.verify? false: true}
                                >
                                </Form.Control>
                            </Form.Group>
                            { props.mailing_zipcode === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId='home_size' >
                                <Form.Label>HOME SIZE (approx.sq ft.)*</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    value={props.home_size}
                                    onChange={(e)=>handleNumericFields(e.target, 'setHomeSize')}
                                    required
                                    disabled={props.verify? false: true}
                                    maxLength="6"
                                >
                                </Form.Control>
                            </Form.Group>
                            { props.home_size === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group controlId='home_age'>
                                <Form.Label>HOME AGE (approx.year built?)*</Form.Label>
                                <Form.Select
                                    onChange={(e)=>handleNumericFields(e.target, 'setHomeAge')}
                                    value={props.home_age}
                                    disabled={props.verify? false: true}
                                    >
                                        <option />
                                        {years.map(p => (
                                            <option>{p}</option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            { props.home_age === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
                        </Col>
                        <Col md={4}>
                            <Form.Label>NEW CONSTRUCTION</Form.Label> <br />
                            <Form.Check
                                inline
                                label="Yes"
                                name="is_new_construction"
                                type={"radio"}
                                value="true"
                                checked={"true" === props.is_new_construction}
                                onChange={(e)=>props.setIsNewConstruction(e.target.value)}
                                disabled={props.verify? false: true}
                            />
                            <Form.Check
                                inline
                                label="No"
                                name="is_new_construction"
                                type={"radio"}
                                value="false"
                                checked={"false" === props.is_new_construction}
                                onChange={(e)=>props.setIsNewConstruction(e.target.value)}
                                disabled={props.verify? false: true}
                            />
                            { props.is_new_construction === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Label>HOME TYPE (check one)</Form.Label> <br />
                            <Form.Check
                                inline
                                label="Single Family"
                                name="home_type"
                                type={"radio"}
                                value="Single Family"
                                checked={"Single Family" === props.home_type}
                                onChange={(e)=>props.setHomeType(e.target.value)}
                                disabled={props.verify? false: true}
                            />
                            <Form.Check
                                inline
                                label="Apartment"
                                name="home_type"
                                type={"radio"}
                                value="Apartment"
                                checked={"Apartment" === props.home_type}
                                onChange={(e)=>props.setHomeType(e.target.value)}
                                disabled={props.verify? false: true}
                            />
                            <Form.Check
                                inline
                                label="Condo"
                                name="home_type"
                                type={"radio"}
                                value="Condo"
                                checked={"Condo" === props.home_type}
                                onChange={(e)=>props.setHomeType(e.target.value)}
                                disabled={props.verify? false: true}
                            />
                            <Form.Check
                                inline
                                label="Mobile Home"
                                name="home_type"
                                type={"radio"}
                                value="Mobile Home"
                                checked={"Mobile Home" === props.home_type}
                                onChange={(e)=>props.setHomeType(e.target.value)}
                                disabled={props.verify? false: true}
                            />
                            <Form.Check
                                inline
                                label="Other"
                                name="home_type"
                                type={"radio"}
                                value="Other"
                                checked={"Other" === props.home_type}
                                onChange={(e)=>props.setHomeType(e.target.value)}
                                disabled={props.verify? false: true}
                            />
                        </Col>
                        { props.home_type === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
                    </Row>
                    </Form>
                </Col>
                <Col md={2}></Col>
            </Row>
        </Container>
    )
}

export default ApplicationInformation
