import React, { Component, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { FiThumbsUp } from "react-icons/fi";
import { Link } from "react-router-dom";

import PrintApplication from "./PrintApplication";
import './Confirm.css';

function Confirm(props) {
  const [print, setPrint] = useState(false);
  console.log("props", props);
  const printButtonHandler = () => {
    setPrint(true);
  };

  return print ? (
    <PrintApplication data={props} />
  ) : (
    <div>
      <div className="container mt-5">
        <Container className="text-center">
          <Row className="mb-5">
            <Col md={5}></Col>
            <Col md={2}>
              <Row>
                <Col md={2}></Col>
                <Col md={8} className="rounded-circle bg-info">
                  <h1 className="text-center text-white my-auto py-4">
                    <FiThumbsUp size={70} />
                  </h1>
                </Col>
                <Col md={2}></Col>
              </Row>
            </Col>
            <Col md={5}></Col>
          </Row>

          <div className="">
            <h2 className="mb-3">
              Thank you for your interest in GPA's Energy Sense Rebate Program.
            </h2>
          </div>
          <p>
            {" "}
            Your confirmation number is <b>{props.control_no}</b>.{" "}
          </p>

          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <p>
                Please record and keep this number for tracking your rebate
                status{" "}
                <a href="/" className="text-info">
                  <b>here</b>
                </a>
                . Your rebate control number will also be emailed for your
                records.
              </p>
            </Col>
            <Col md={2}></Col>
          </Row>
        </Container>

        <Container className="text-center mb-3" id="homebtn">
          <Link to={`/`} className="btn btn-success btn-lg px-5">
            <h4>BACK TO GPA HOMEPAGE </h4>
          </Link>
        </Container>
        <Container className="text-center">
          <button
            className="btn btn-info btn-lg px-5"
            onClick={() => printButtonHandler()}
          >
            <h4>Print Application</h4>
          </button>
        </Container>
      </div>
    </div>
  );
}

export default Confirm;
