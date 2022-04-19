import React, { useState, useEffect } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import "./AdminLoginScreen.css";

import { login } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AdminLoginScreen({ location, history }) {
  const [attempt, setAttempt] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      Swal.fire({
        title: "Login Success",
        text: "Your are redirected to Dashboard",
        type: "success",
        heightAuto: false,
      });
      history.push(redirect);
    } else {
      if (attempt === true) {
        Swal.fire({
          title: "Login Failed",
          text: "Wrong Credentials",
          type: "error",
          heightAuto: false,
        });
      }
      history.push("/admin");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setAttempt(true);
  };

  return (
    <Row  id="homeScreen2">
      <Col lg={2} md={2} sm={12} xs={12}></Col>
      <Col
        className="text-center mt-5 position-relative"
        lg={8}
        md={8}
        sm={12}
        xs={12}
      >
        <Row className="mx-0 d-flex justify-content-center">
          <Row className="">
            <Col md={4}></Col>
            <Col md={4}>
              <Image src="/icon.png" className="mb-3" fluid />
            </Col>
            <Col md={4}></Col>
          </Row>
          <Row className="mb-2">
            <Col md={1}></Col>
            <Col md={10}>
              <h1 className="mb-4 text-center text-white">ADMIN LOGIN</h1>
            </Col>
            <Col md={1}></Col>
          </Row>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={3}></Col>
              <Col md={6}>
                <Row className="py-1">
                  <Form.Group controlId="email" className="mb-2">
                    <Form.Label className="text-light text-start w-100 m-0">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      // placeholder='Enter Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Row>
                <Row className="py-1">
                  <Form.Group controlId="password">
                    <Form.Label className="text-light text-start w-100 m-0">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      // placeholder='Enter Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <div className="d-grid gap-2 mt-3 mb-4">
                    <Button type="submit" className="py-2" variant="success">
                      LOGIN
                    </Button>
                  </div>
                </Row>
                <LinkContainer
                  to="/forgot"
                  className="d-flex justify-content-center text-light mb-3"
                >
                  <a href="#">Forgot Password?</a>
                </LinkContainer>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Form>
        </Row>
        <Row>
          <br />
          <small className="my-2 px-2 text-secondary position-absolute footer-text text-center">
            Energy Sense Rebate Program for Central, Ducted Systems <br />
            Copyright &copy; 2020 GPA Powered By Xtendly
          </small>
        </Row>
      </Col>
      <Col lg={2} md={2} sm={12} xs={12}></Col>
    </Row>
  );
}

export default AdminLoginScreen;
