import React, { useState, useEffect } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { changePassword, logout } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import Swal from "sweetalert2";
import Header from "../components/Header";

import './AdminChangePasswordScreen.css';
import Footer from "../components/Footer";

function AdminChangePasswordScreen({ location, history }) {
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_new_password, setConfirmNewPassword] = useState("");
  const [is_confirm, setIsConfirm] = useState();
  const [lengthCheck, setLengthCheck] = useState(false);
  const [lowerCheck, setLowerCheck] = useState(false);
  const [upperCheck, setUpperCheck] = useState(false);
  const [symbolCheck, setSymbolCheck] = useState(false);
  const [numberCheck, setNumberCheck] = useState(false);

  const dispatch = useDispatch();

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  const userChangePassword = useSelector((state) => state.userChangePassword);
  const { error, loading, change_pass } = userChangePassword;

  // useEffect(() => {
  //   if (change_pass) {
      
  //   }
  // }, [change_pass]);

  var checkPasswordStrength = (string) => {
    var numbers = string.match(/\d+/g);
    var lowers = string.match(/[a-z]/);
    var uppers = string.match(/[A-Z]/);
    var symbols = new RegExp(/[^A-Z a-z 0-9]/);

    if (string.length >= 8) {
      setLengthCheck(true)
    } else {
      setLengthCheck(false)
    }

    if (numbers != null) {
      setNumberCheck(true)
    } else {
      setNumberCheck(false)
    }

    if (lowers != null) {
      setLowerCheck(true)
    } else {
      setLowerCheck(false)
    }

    if (uppers != null) {
      setUpperCheck(true)
    } else {
      setUpperCheck(false)
    }

    if (symbols.test(string)) {
      setSymbolCheck(true)
    } else {
      setSymbolCheck(false)
    }

    setNewPassword(string)
  }

  var allChecksValid = lengthCheck ? upperCheck ? symbolCheck ? numberCheck ? true : false : false : false : false

  const submitHandler = (e) => {
    e.preventDefault();

    if (old_password === "") {
      Swal.fire("Warning", "Old password is empty.", "warning");
    } else if (new_password === "") {
      Swal.fire("Warning", "New password is empty.", "warning");
    } else if (confirm_new_password === "") {
      Swal.fire("Warning", "Confirm password is empty.", "warning");
    } else if (confirm_new_password !== new_password) {
      Swal.fire("Warning", "New Password Mismatch", "warning");
      setIsConfirm(false);
    } else if (confirm_new_password === new_password) {
      setIsConfirm(true);
      dispatch(changePassword(old_password, new_password));
      Swal.fire("Success", "Password successfuly changed", "success").then(
        () => {
          dispatch(logout());
          history.push("/admin");
        }
      );
     
    } else {
      Swal.fire("Failed", "Something went wrong. Please try again!", "error");
    }
  };

  return (
    <div className="change-pass-screen">
      <Header />
      <Row md={3} xs={12} sm={12}>
        <Col md={2} sm={12} xs={12}></Col>
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
          <Row>
            <Form onSubmit={(e)=> submitHandler(e)}>
              <Row>
                <Col md={3}></Col>
                <Col md={6}>
                  <Form.Group controlId="old_password">
                    <Form.Label className="pt-2">Old Password</Form.Label>
                    <Form.Control
                      type="password"
                      // placeholder='Enter Password'
                      value={old_password}
                      onChange={(e) => setOldPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="new_password">
                    <Form.Label className="pt-2">New Password</Form.Label>
                    <Form.Control
                      type="password"
                      // placeholder='Enter Password'
                      value={new_password}
                      onChange={(e) => checkPasswordStrength(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="confirm_new_password">
                    <Form.Label className="pt-2">Confirm New Password</Form.Label>
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
                      {lengthCheck ? <i class="fas fa-check w-auto text-success"></i> : <i class="fas fa-times w-auto text-danger"></i>}
                      <p className="passDetails px-0 w-auto">• Be a minimum of 8 characters</p>
                    </Row>
                    <Row>
                      {lowerCheck ? <i class="fas fa-check w-auto text-success"></i> : <i class="fas fa-times w-auto text-danger"></i>}
                      <p className="passDetails px-0 w-auto">• Include at least one lowercase letter (a-z)</p></Row>
                    <Row>
                      {upperCheck ? <i class="fas fa-check w-auto text-success"></i> : <i class="fas fa-times w-auto text-danger"></i>}
                      <p className="passDetails px-0 w-auto">• Include at least one uppercase letter (A-Z)</p></Row>
                    <Row>
                      {numberCheck ? <i class="fas fa-check w-auto text-success"></i> : <i class="fas fa-times w-auto text-danger"></i>}
                      <p className="passDetails px-0 w-auto">• Include at least one number (0-9)</p></Row>
                    <Row>
                      {symbolCheck ? <i class="fas fa-check w-auto text-success"></i> : <i class="fas fa-times w-auto text-danger"></i>}
                      <p className="passDetails px-0 w-auto">• Include at least one symbol</p></Row>
                  </Row>
                  <Row>
                    <Col md={6} className="mx-auto">
                      <div className="d-grid gap-2 mt-3">
                        <Button type="submit" variant="success" className="" disabled={!allChecksValid}>
                          SUBMIT
                        </Button>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="d-grid gap-2 mt-3 cancel">
                        <LinkContainer to="/dashboard">
                          <Button type="button" variant="danger">
                            CANCEL
                          </Button>
                        </LinkContainer>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Form>
          </Row>
          <Footer />
        </Col>
        <Col md={2} sm={12} xs={12}></Col>
      </Row>
    </div>
  );
}

export default AdminChangePasswordScreen;
