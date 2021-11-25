import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Row,
  Col,
  Image,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// import './AdminLoginScreen.css'

import { forgotPassword } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import Swal from "sweetalert2";

function AdminForgotPasswordScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  const userForgotPassword = useSelector((state) => state.userForgotPassword);

  console.log("email", email);

  useEffect(() => {
    console.log(userForgotPassword);
    if (userForgotPassword.userInfo) {
      if (userForgotPassword.userInfo.status) {
        setLoading(false);
        Swal.fire(
          "Success",
          "Password reset is sent to your email!",
          "success"
        ).then(() => history.push("/admin"));
      } else {
        setLoading(false);
        Swal.fire("Failed", "User was not found", "error");
      }
    }
  }, [userForgotPassword]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(forgotPassword(email));
  };

  return (
    <>
      <Navbar
        bg="info"
        variant=""
        expand="lg"
        collapseOnSelect
        className="p-2 mb-5"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto bg-info">
            <LinkContainer to="/admin">
              <a>
                <Image src="/icon.png" width="270" height="78" />
              </a>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Row className="mt-5">
        <Col md={3}></Col>
        <Col md={6}>
          <h1 className="text-center mb-4 text-info">Forgot Your Password?</h1>
          <Row className="mb-4">
            <Col md={2}></Col>
            <Col md={8}>
              <h5 className="text-center text-muted">
                Please enter your registered email address. An email
                notification with a password reset link will be sent to you.
              </h5>
            </Col>
            <Col md={2}></Col>
          </Row>

          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={2}></Col>
              <Col md={8}>
                <Form.Group controlId="email" className="mb-2">
                  <Form.Label className="">Enter Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    // placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                {/* <Row>
                  <Col md={4} style={{ marginLeft: "auto" }}>
                    <div className="d-grid gap-2 mt-3 mb-4">
                      <Button
                        type="submit"
                        className="text-center"
                        variant="success"
                      >
                        {loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "SUBMIT"
                        )}
                      </Button>
                    </div>
                  </Col>
                  <Col md={4} style={{ marginRight: "auto" }}>
                    <div className="d-grid gap-2 mt-3 mb-4">
                      <Button
                        type="submit"
                        className="text-center"
                        variant="success"
                      >
                        {loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "SUBMIT"
                        )}
                      </Button>
                    </div>
                  </Col>
                </Row> */}
                <Row>
                  <Col md={6} className="mx-auto">
                    <div className="d-grid gap-2 mt-3 mb-4">
                      <Button
                        type="submit"
                        className="text-center"
                        variant="success"
                      >
                        {loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "SUBMIT"
                        )}
                      </Button>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="d-grid gap-2 mt-3 mb-4">
                      <Button
                        onClick={() => history.push("/admin")}
                        type="button"
                        variant="danger"
                      >
                        CANCEL
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={2}></Col>
            </Row>
          </Form>

          <Col className="text-center">
            <small className="text-secondary">
              Energy Sense Rebate Program for Central, Ducted Systems <br />
              Copyright &copy; 2020 GPA Powered By Xtendly
            </small>
          </Col>
        </Col>
        <Col md={3}></Col>
      </Row>
    </>
  );
}

export default AdminForgotPasswordScreen;
