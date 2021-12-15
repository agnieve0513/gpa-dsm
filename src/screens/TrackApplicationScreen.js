import React, { useState, useEffect } from "react";
// import Form from '../components/Form'
import CustomerHeader from "../components/CustomerHeader";
import {
  Row,
  Col,
  Spinner,
  Form,
  ListGroup,
  Container,
  Button,
  Badge,
  Card,
  ProgressBar,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { trackApplications } from "../actions/applicationActions";

import {
  PDFViewer,
  View,
  Document,
  Text,
  Page,
  StyleSheet,
} from "@react-pdf/renderer";

import "./TrackApplicationScreen.css";

import { useParams } from "react-router-dom";

function ApplicationScreen() {
  // // style for pdf
  // const styles = StyleSheet.create({
  //     section: {  textAlign: 'justify', margin: 30, fontSize:12,lineHeight:2 }
  // });
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    if (ctrl_no) {

      const timer = setTimeout(() => {
        dispatch(trackApplications(ctrl_no));
        setClickTrack(true);
        setIsSearch(true);
        setSearchVisible(false);

      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dispatch = useDispatch();

  let { ctrl_no } = useParams();

  const [control_no, setControlNo] = useState("");
  const [viewPdf, setViewPdf] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [clickTrack, setClickTrack] = useState(false);

  const applicationTrack = useSelector((state) => state.applicationTrack);
  const { error, success, track_application } = applicationTrack;

  const [isSearch, setIsSearch] = useState();

  const trackApplicationHandler = () => {
    dispatch(trackApplications(control_no));
    setClickTrack(true);
    setIsSearch(true);
    searchVisible(true);
  };

  const printApplicaitonHandler = () => {
    setViewPdf(true);
  };

  const backApplicaitonHandler = () => {
    setViewPdf(false);
  };

  let currentStage = {};

  const stages = [
    { id: 0, stage: "Customer Service", percent: 20 },
    {
      id: 1,
      stage: "Spord",
      percent: 40,
    },
    {
      id: 2,
      stage: "Supervisor",
      percent: 60,
    },
    {
      id: 3,
      stage: "Budget",
      percent: 80,
    },
    {
      id: 4,
      stage: "Accounting",
      percent: 100,
    },
  ];

  const resetHandler = () => {
    setIsSearch(false);
    setControlNo("");
  };

  return (
    <Container className="m-0 p-0" fluid>
      <CustomerHeader />
      <Row className="px-0 mx-0 w-100">
        <Col className="px-0" xl={4} md={2} xs={"auto"} />
        <Col className="mt-4">
          {isSearch ? (
            clickTrack ? (
              track_application ? (
                track_application.table ? (
                  track_application.table.length > 0 ? (
                    <Container className="mb-2">
                      <h5
                        className="text-center text-info fs-3"
                        id="trackTitle"
                      >
                        TRACK YOUR APPLICATION
                      </h5>
                      <Row className="px-0 mb-4 mx-0 d-flex align-items-center">
                        <Col className="px-0">
                          <b className="px-0 d-flex mx-0" id="trackStep">
                            Step{" "}
                            {stages.find(
                              (p) =>
                                p.stage === track_application.table[0].Stage
                            ).id + 1}{" "}
                            of 5{" "}
                          </b>
                        </Col>
                        <Col className="px-0" id="colBar">
                          <ProgressBar
                            className="px-0"
                            id="trackBar"
                            variant="success"
                            now={
                              stages.find(
                                (p) =>
                                  p.stage === track_application.table[0].Stage
                              ).percent
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="px-0 mb-5">
                        <p className="text-muted mb-3 trackText">
                          Date Applied:{" "}
                          <b className="float-end trackText">
                            {track_application.table[0].Application_Date}{" "}
                          </b>
                        </p>
                        <p className="text-muted mb-3 trackText">
                          Account Number:{" "}
                          <b className="float-end trackText">
                            {" "}
                            *******
                            {track_application.table[0].Account_no.slice(
                              track_application.table[0].Account_no.length - 3
                            )}{" "}
                          </b>{" "}
                        </p>
                        <p className="text-muted mb-3 trackText">
                          System Type:{" "}
                          <b className="float-end trackText">
                            {" "}
                            {track_application.table[0].System_Type}{" "}
                          </b>{" "}
                        </p>
                        <p className="text-muted mb-3 trackText">
                          Status:{" "}
                          <b className="float-end trackText">
                            {track_application.table[0].Status}{" "}
                          </b>
                        </p>
                      </Row>
                      <Row className="px-0">
                        <button
                          style={{ borderRadius: "0.5rem" }}
                          className="btn btn-success py-3 mt-5 fw-normal"
                          id="submitbtn"
                          onClick={() => resetHandler()}
                        >
                          <b className="trackButtonText">
                            TRACK NEW APPLICATION
                          </b>
                        </button>
                      </Row>
                    </Container>
                  ) : (
                    <>Ambot</>
                  )
                ) : (
                  <>
                    <p>No Application was Found.</p>
                    <div class="d-grid gap-2 mt-5">
                      <button
                        style={{ borderRadius: "0.5rem" }}
                        className="btn btn-success py-3 mt-5"
                        id="submitbtn"
                        onClick={() => resetHandler()}
                      >
                        <b className="trackButtonText">TRACK NEW APPLICATION</b>
                      </button>
                    </div>
                  </>
                )
              ) : (
                <>
                  <p>No Application was Found.</p>
                  <div class="d-grid gap-2 mt-5">
                    <button
                      style={{ borderRadius: "0.5rem" }}
                      className="btn btn-success py-3 mt-5"
                      id="submitbtn"
                      onClick={() => resetHandler()}
                    >
                      <b className="trackButtonText">TRACK NEW APPLICATION</b>
                    </button>
                  </div>
                </>
              )
            ) : (
              ""
            )
          ) : 

              searchVisible ?
              (
            <Container>
              <h4 className="text-center text-info mb-5">
                TRACK YOUR APPLICATION
              </h4>
              <p>ENTER YOUR CONTROL NUMBER</p>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder=""
                  onChange={(e) => setControlNo(e.target.value)}
                  value={control_no}
                  required
                />
              </InputGroup>
              <div class="d-grid gap-2">
                <button
                  className="btn btn-success px-5 py-2"
                  id="submitbtn"
                  onClick={() => trackApplicationHandler()}
                >
                  <b>SUBMIT</b>
                </button>
              </div>
            </Container>
          ): 
          <>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>
          }
          <Link to={`/`} className="text-success mx-auto px-5">
            <h4 className="text-center fs-5" id="trackBackBtn">
              Back to Homepage
            </h4>
          </Link>
          <Row>
            <br />
            <small
              className="text-secondary position-absolute text-center"
              id="trackFooter"
            >
              Energy Sense Rebate Program <br />
              Copyright &copy; 2020 GPA Powered By Xtendly
            </small>
          </Row>
        </Col>
        <Col className="px-0" xl={4} md={2} xs={"auto"} />
      </Row>
    </Container>
  );
}

export default ApplicationScreen;
