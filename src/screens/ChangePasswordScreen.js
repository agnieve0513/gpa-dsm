import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { emailChangePasswordAction, logout } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";

import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

function ChangePasswordScreen({ location, history }) {
  const [new_password, setNewPassword] = useState("");
  const [confirm_new_password, setConfirmNewPassword] = useState("");
  const [is_confirm, setIsConfirm] = useState();
  const [lengthCheck, setLengthCheck] = useState(false);
  const [lowerCheck, setLowerCheck] = useState(false);
  const [upperCheck, setUpperCheck] = useState(false);
  const [symbolCheck, setSymbolCheck] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);

  const dispatch = useDispatch();

  let { creds } = useParams();

  const emailChangePassword = useSelector((state) => state.emailChangePassword);
  const { email_change_pass } = emailChangePassword;

  var checkPasswordStrength = (string) => {
    var numbers = string.match(/\d+/g);
    var lowers = string.match(/[a-z]/);
    var uppers = string.match(/[A-Z]/);
    var symbols = new RegExp(/[^A-Z a-z 0-9]/);

    if (string.length >= 8) {
      setLengthCheck(true);
    } else {
      setLengthCheck(false);
    }

    if (numbers != null) {
      setNumberCheck(true);
    } else {
      setNumberCheck(false);
    }

    if (lowers != null) {
      setLowerCheck(true);
    } else {
      setLowerCheck(false);
    }

    if (uppers != null) {
      setUpperCheck(true);
    } else {
      setUpperCheck(false);
    }

    if (symbols.test(string)) {
      setSymbolCheck(true);
    } else {
      setSymbolCheck(false);
    }

    setNewPassword(string);
  };

  var allChecksValid = lengthCheck
    ? upperCheck
      ? symbolCheck
        ? numberCheck
          ? true
          : false
        : false
      : false
    : false;

  const submitHandler = (e) => {
    e.preventDefault();

    if (confirm_new_password === new_password) {
      setIsConfirm(true);
      dispatch(emailChangePasswordAction(creds, new_password));

      if (email_change_pass) {
        if (email_change_pass.status) {
          alert(email_change_pass.message);
        } else {
          alert("changing password success");
          dispatch(logout());
          history.push("/admin");
        }
      }
    } else {
      setIsConfirm(false);
    }
  };

  return (
    <div className="change-pass-screen d-flex flex-column flex-grow-1">
      <Row className="d-flex justify-content-center">
        <Col className="mt-4" md={8} sm={12} xs={12}>
          <Row className="mb-5">
            <Col md={4}></Col>
            <Col md={4}></Col>
            <Col md={4}></Col>
          </Row>
          <Row className="mb-2">
            <Col md={1}></Col>
            <Col md={10}>
              <h1 className="mb-4 text-center text-info">Change Password</h1>
            </Col>
            <Col md={1}></Col>
          </Row>
          <Form onSubmit={submitHandler}>
            <Row className="d-flex justify-content-center">
              <Col md={10} xl={6}>
                <Form.Group controlId="new_password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    // placeholder='Enter Password'
                    value={new_password}
                    onChange={(e) => checkPasswordStrength(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirm_new_password">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    // placeholder='Enter Password'
                    value={confirm_new_password}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  ></Form.Control>
                  {is_confirm === false ? (
                    <span className="text-danger">New Password Mismatch</span>
                  ) : (
                    <></>
                  )}
                </Form.Group>

                <Row className="py-4 px-0 mx-auto">
                  <p className="w-auto mb-2 passDetails">Passwords must:</p>
                  <Row>
                    {lengthCheck ? (
                      <i class="fas fa-check w-auto text-success"></i>
                    ) : (
                      <i class="fas fa-times w-auto text-danger"></i>
                    )}
                    <p className="passDetails px-0 w-auto">
                      • Be a minimum of 8 characters
                    </p>
                  </Row>
                  <Row>
                    {lowerCheck ? (
                      <i class="fas fa-check w-auto text-success"></i>
                    ) : (
                      <i class="fas fa-times w-auto text-danger"></i>
                    )}
                    <p className="passDetails px-0 w-auto">
                      • Include at least one lowercase letter (a-z)
                    </p>
                  </Row>
                  <Row>
                    {upperCheck ? (
                      <i class="fas fa-check w-auto text-success"></i>
                    ) : (
                      <i class="fas fa-times w-auto text-danger"></i>
                    )}
                    <p className="passDetails px-0 w-auto">
                      • Include at least one uppercase letter (A-Z)
                    </p>
                  </Row>
                  <Row>
                    {numberCheck ? (
                      <i class="fas fa-check w-auto text-success"></i>
                    ) : (
                      <i class="fas fa-times w-auto text-danger"></i>
                    )}
                    <p className="passDetails px-0 w-auto">
                      • Include at least one number (0-9)
                    </p>
                  </Row>
                  <Row>
                    {symbolCheck ? (
                      <i class="fas fa-check w-auto text-success"></i>
                    ) : (
                      <i class="fas fa-times w-auto text-danger"></i>
                    )}
                    <p className="passDetails px-0 w-auto">
                      • Include at least one symbol
                    </p>
                  </Row>
                </Row>

                <Row>
                  <Col md={6} className="mx-auto">
                    <div className="d-grid gap-2 mt-3 mb-4">
                      <Button
                        type="submit"
                        variant="success"
                        className="me-1"
                        disabled={!allChecksValid}
                      >
                        SUBMIT
                      </Button>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="d-grid gap-2 mt-3 mb-4">
                      <LinkContainer to="/dashboard">
                        <Button type="button" variant="danger">
                          CANCEL
                        </Button>
                      </LinkContainer>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default ChangePasswordScreen;
