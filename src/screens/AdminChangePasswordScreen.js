import React, { useState, useEffect } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { changePassword, logout } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import Swal from "sweetalert2";
import Header from "../components/Header";

import './AdminChangePasswordScreen.css';

function AdminChangePasswordScreen({ location, history }) {
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_new_password, setConfirmNewPassword] = useState("");
  const [is_confirm, setIsConfirm] = useState();

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
          <Form onSubmit={(e)=> submitHandler(e)}>
            <Row>
              <Col md={3}></Col>
              <Col md={6}>
                <Form.Group controlId="old_password">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    // placeholder='Enter Password'
                    value={old_password}
                    onChange={(e) => setOldPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="new_password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    // placeholder='Enter Password'
                    value={new_password}
                    onChange={(e) => setNewPassword(e.target.value)}
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

                <Row>
                  <Col md={6} className="mx-auto">
                    <div className="d-grid gap-2 mt-3">
                      <Button type="submit" variant="success" className="">
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

          <Row className="text-center">
              <small className="text-secondary position-absolute footer-text px-2">
                Energy Sense Rebate Program for Central, Ducted Systems <br />
                Copyright &copy; 2020 GPA Powered By Xtendly
              </small>
          </Row>
        </Col>
        <Col md={2} sm={12} xs={12}></Col>
      </Row>
    </div>
  );
}

export default AdminChangePasswordScreen;
