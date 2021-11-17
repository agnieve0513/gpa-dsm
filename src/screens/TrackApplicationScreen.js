import React, {useState, useEffect} from 'react';
// import Form from '../components/Form'
import CustomerHeader from '../components/CustomerHeader';
import { Row, Col, Form,ListGroup, Button, Badge, Card, InputGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { trackApplications } from '../actions/applicationActions';

import { PDFViewer,View, Document, Text, Page,StyleSheet  } from '@react-pdf/renderer';

import './TrackApplicationScreen.css';

function ApplicationScreen() {

    // style for pdf
    const styles = StyleSheet.create({
        section: {  textAlign: 'justify', margin: 30, fontSize:12,lineHeight:2 }
    });

    const dispatch = useDispatch();

    const [control_no, setControlNo] = useState("");
    const [viewPdf, setViewPdf] = useState(false);
    const [stepNumber, setStepNumber] = useState(0);

    const applicationTrack = useSelector(state => state.applicationTrack);
    const { error, success,track_application } = applicationTrack;


    useEffect(() => {
    }, [dispatch, track_application]);


    const trackApplicationHandler = () => {
        dispatch(trackApplications(control_no));
    };

    const printApplicaitonHandler = () =>
    {
        setViewPdf(true);
    };

    const backApplicaitonHandler = () =>
    {
        setViewPdf(false);
    };

    const stages = ["Customer Service", "Spord", "Supervisor", "Budget", "Accounting"];


    return (
        <div>
            <CustomerHeader />
            <Row>
                <Col md={3}></Col>
                <Col md={6} className="mt-5 mb-2">
                    <h2 className="text-center text-info mb-5">TRACK YOUR APPLICATION</h2>
                    <Row>
                    <Form.Label htmlFor="basic-url">ENTER YOUR CONTROL NUMBER</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>setControlNo(e.target.value)}
                                value={control_no}
                                required
                            />
                           <button className="btn btn-success" onClick={()=> trackApplicationHandler()}><b>SUBMIT</b></button>

                    </InputGroup>
                    </Row>
                    {
                        track_application?
                        track_application.map(tp => (
                            <>
                                {
                                    <Row>
                                        <Col md={6}>
                                        <div class="timeline p-4 block mb-4">
                                            <p><b>Application Stage</b></p>

                                            {
                                                stages.map((i, value) =>
                                                    <div class="tl-item">
                                                        {
                                                            tp.Staget === i ? setStepNumber(value) : ""
                                                        }
                                                        <div class={tp.Stage === i ? "tl-dot b-primary": stepNumber < value ? "tl-dot b-danger": "tl-dot b-success"}></div>
                                                        <div class="tl-content">
                                                            <div class="">{i}</div>
                                                            <div class="tl-date text-muted mt-1"><Badge bg={tp.Stage === i ? "info": stepNumber < value ? "danger": "success"}>
                                                            {tp.Stage === i ? "Processing": stepNumber < value ? "N/A": "Approved"}
                                                                </Badge></div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            
                                        </div>
                                        </Col>
                                        <Col md={6}>
                                            <div class="timeline p-4 block mb-2">
                                                <p><b>Application Info</b></p>
                                                <p>Entry Number: <b>{tp.Entry_no}</b></p>
                                                <p>Account Number: <b>{tp.Account_no}</b></p>
                                                <p>Bill ID: <b>{tp.Bill_id}</b></p>
                                                <p>Sysytem Type: <b>{tp.System_Type}</b></p>
                                                <p>Customer's Name: <b>{tp.customer_name}</b></p>
                                                <p>Status: <b>{tp.Status}</b></p>
                                                <p>Stage: <b>{tp.Stage}</b></p>
                                                <p>Application Date: <b>{tp.Application_Date}</b></p>
                                            
                                            </div>
                                        </Col>
                                    </Row>
                                }
                            </>
                        ))
                        : <h6>Loading . . .</h6>
                    }
                </Col>
                <Col md={3}></Col>
            </Row>

            <Row className="mt-1">
                <Col md={2}></Col>
                <Col md={8}>

                    <div className="d-flex mb-5">
                        <Link to={`/`} className="text-success mx-auto px-5"><h4>BACK TO GPA HOMEPAGE</h4></Link>
                    </div>
                </Col>
                <Col md={2}></Col>
            </Row>
        </div>
    )
}

export default ApplicationScreen
