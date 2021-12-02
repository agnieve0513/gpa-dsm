import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

import {Link} from 'react-router-dom';

import './HomeScreen.css';

function HomeScreen() {

    return (
            <Row md={3} xs={12} sm={12} id="homeScreen">
              <Col md={2} sm={12} xs={12}></Col>
              <Col className="text-center mt-4 position-relative main-content" md={8} sm={12} xs={12}>
                <Row className="mx-0 d-flex justify-content-center">
                  <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                      <Image src='/icon.png' className="mb-3" fluid />
                    </Col>
                    <Col md={4}></Col>
                  </Row>
                  <Row>
                    <Col md={1}></Col>
                      <Col md={10}>
                        <h2 className="mb-4 text-white" id="applyHead">APPLY FOR THE GPA ENERGY SENSE REBATE</h2>
                      </Col>
                    <Col md={1}></Col>
                  </Row>
                  <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                      <p className="text-justify mb-4 text-white" id="applyCaption">
                        Before you submit your rebate application please be sure to
                        have all documents and information ready. If you have any questions
                        you may contact us at <b>(671)647-5787 /8/9</b> or email us at <b>energysense@gpagwa.com</b>,
                        visit our webpage at <a className="text-white" href="http://guampowerauthority.com/gpa_authority/EnergySense/es-home.html">
                        <u>Energy Sense Website</u></a>
                      </p>
                    </Col>
                    <Col md={2}></Col>
                  </Row>
                  <Link to={`/application`} className="btn btn-success btn-lg px-5 mb-4" id="applyOnlineBtn">
                    <h4 className="mb-0 p-1">Apply Online</h4>
                  </Link>
                  <br />
                  <p className="mb-3"><Link to={`/track`} className="text-white"><u>TRACK YOUR APPLICATION</u></Link></p>
                  <p className="mb-3 text-white">
                    <a className="text-white" href="http://guampowerauthority.com/gpa_authority/EnergySense/es-home.html">
                      <u>View Approved Model Listing</u>
                    </a>
                  </p>
                  <p className="pd-6"><Link to={`/faq`} className="text-white"><u>Online Rebate Requirements and FAQ</u></Link></p>
                  <Row className="p-4"/>
                </Row>
                <Row>
                    <br/>
                    <small className="text-secondary position-absolute footer-text">Energy Sense Rebate Program <br/>
                      Copyright &copy; 2020 GPA Powered By Xtendly</small>
                </Row>
              </Col>
              <Col md={2} sm={12} xs={12}></Col>
            </Row>
    )
}

export default HomeScreen
