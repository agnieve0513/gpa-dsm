import React, {useState, useEffect} from 'react';
// import Form from '../components/Form'
import CustomerHeader from '../components/CustomerHeader';
import { Row, Col, Form,ListGroup, Button, Badge, Card,ProgressBar, InputGroup} from 'react-bootstrap';
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
    const [clickTrack, setClickTrack] = useState(false);

    const applicationTrack = useSelector(state => state.applicationTrack);
    const { error, success,track_application } = applicationTrack;

    const trackApplicationHandler = () => {
        dispatch(trackApplications(control_no));
        setClickTrack(true);
    };

    const printApplicaitonHandler = () =>
    {
        setViewPdf(true);
    };

    const backApplicaitonHandler = () =>
    {
        setViewPdf(false);
    };

    let currentStage = {};

    const stages = [
       { id:0,
        stage: "Customer Service",
        percent: 20
       },
       {
           id:1,
           stage: "Spord",
           percent: 40
       },
       {
           id:2,
           stage: "Supervisor",
           percent: 60
       },
       {
           id:3,
           stage: "Budget",
           percent:80
       },
       {
           id:4,
           stage: "Accounting",
           percent:100
       }
    ]



    return (
        <div>
            <CustomerHeader />
            <Row>
                <Col md={3}></Col>
                <Col md={6} className="mt-5 mb-2">
                    <h2 className="text-center text-info mb-5">TRACK YOUR APPLICATION</h2>
                    <Form.Label htmlFor="basic-url">ENTER YOUR CONTROL NUMBER</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>setControlNo(e.target.value)}
                                value={control_no}
                                required
                            />
                           <button className="btn btn-success" id="submitbtn" onClick={()=> trackApplicationHandler()}><b>SUBMIT</b></button>

                    </InputGroup>
                </Col>
                <Col md={3}></Col>
            </Row>
            <Row>
                   
                    
                <Col md={3}></Col>
                <Col md={6}>
                    {
                        clickTrack?
                            track_application ?
                                track_application.table.length > 0?
                                <>
                                    <h4 className="text-muted">Date Applied: {track_application.table[0].Application_Date} </h4>
                                    <h4 className="text-muted">Account Number: *******{track_application.table[0].Account_no.slice(track_application.table[0].Account_no.length - 3) } </h4>
                                    <h4 className="text-muted">System Type: {track_application.table[0].System_Type} </h4>
                                    <h4 className="text-muted">Status: {track_application.table[0].Status}</h4>
                                    <h4 className="text-muted">Step {(stages.find((p) => p.stage === track_application.table[0].Stage).id+1)} of 5
                                        
                                    </h4>
                                    <ProgressBar variant="success" animated now={(stages.find((p) => p.stage === track_application.table[0].Stage).percent)} />
                                </>:<></>
                            :<></>
                        :<></>
                    }
                    
                </Col>
                <Col md={3}></Col>

            </Row>
            <br />
            <br />
            <Row className="mt-4">
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
