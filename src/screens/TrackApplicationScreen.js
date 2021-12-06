import React, {useState, useEffect} from 'react';
// import Form from '../components/Form'
import CustomerHeader from '../components/CustomerHeader';
import { Row, Col, Form,ListGroup, Container, Button, Badge, Card,ProgressBar, InputGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { trackApplications } from '../actions/applicationActions';

import { PDFViewer,View, Document, Text, Page,StyleSheet  } from '@react-pdf/renderer';

import './TrackApplicationScreen.css';

function ApplicationScreen() {

    // // style for pdf
    // const styles = StyleSheet.create({
    //     section: {  textAlign: 'justify', margin: 30, fontSize:12,lineHeight:2 }
    // });

    const dispatch = useDispatch();

    const [control_no, setControlNo] = useState("");
    const [viewPdf, setViewPdf] = useState(false);
    const [stepNumber, setStepNumber] = useState(0);
    const [clickTrack, setClickTrack] = useState(false);

    const applicationTrack = useSelector(state => state.applicationTrack);
    const { error, success,track_application } = applicationTrack;

    const [isSearch, setIsSearch] = useState();

    const trackApplicationHandler = () => {
        dispatch(trackApplications(control_no));
        setClickTrack(true);
        setIsSearch(true)
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

    const resetHandler = () => 
    {
        setIsSearch(false);
        setControlNo('')
    }

    return (
        <>
            <CustomerHeader />
            <Row>
                <Col md={4}></Col>
                <Col md={4} className="mt-5">
                    {
                        isSearch?
                        clickTrack?
                            track_application ?
                                track_application.table ?
                                track_application.table.length > 0?
                                <Container>
                                <span className="text-muted float-start mr-2" style={{marginRight:"5px", marginTop:"-3px"}}> 
                                <b className="mr-2">Step {(stages.find((p) => p.stage === track_application.table[0].Stage).id+1)} of 5 </b>
                                    </span>
                                    <ProgressBar className="ml-2 mb-3" variant="success" now={(stages.find((p) => p.stage === track_application.table[0].Stage).percent)} />
                                    

                                    <p className="text-muted">Date Applied: <b className="float-end">{track_application.table[0].Application_Date} </b></p>
                                    <p className="text-muted">Account Number: <b className="float-end" > *******{track_application.table[0].Account_no.slice(track_application.table[0].Account_no.length - 3) } </b> </p>
                                    <p className="text-muted">System Type:  <b className="float-end"> {track_application.table[0].System_Type} </b> </p>
                                    <p className="text-muted mb-3">Status: <b className="float-end">{track_application.table[0].Status } </b></p>
                                    
                                    <div class="d-grid gap-2 mt-3">
                                        <button style={{borderRadius:"0.5rem"}} className="btn btn-success px-5 py-2" id="submitbtn" onClick={()=> resetHandler()}><b>TRACK NEW APPLICATION</b></button>
                                    </div>
                                </Container>:
                                <>
                                    Ambot
                                </>
                                :<>
                                <p>No Application was Found.</p>
                                <div class="d-grid gap-2 mt-5">
                                    <button style={{borderRadius:"0.5rem"}} className="btn btn-success px-5 py-2" id="submitbtn" onClick={()=> resetHandler()}><b>TRACK NEW APPLICATION</b></button>
                                </div>
                                </>
                            :<>
                                <p>No Application was Found.</p>
                                <div class="d-grid gap-2 mt-5">
                                    <button style={{borderRadius:"0.5rem"}} className="btn btn-success px-5 py-2" id="submitbtn" onClick={()=> resetHandler()}><b>TRACK NEW APPLICATION</b></button>
                                </div>
                            </>
                        :''
                        :
                        <Container>
                        <h4 className="text-center text-info mb-5">TRACK YOUR APPLICATION</h4>
                        <p>ENTER YOUR CONTROL NUMBER</p>
                        <InputGroup className="mb-3">
                            <Form.Control
                                        type='text'
                                        placeholder=''
                                        onChange={(e)=>setControlNo(e.target.value)}
                                        value={control_no}
                                        required
                                    />

                            </InputGroup>
                            <div class="d-grid gap-2">
                                <button className="btn btn-success px-5 py-2" id="submitbtn" onClick={()=> trackApplicationHandler()}><b>SUBMIT</b></button>
                            </div>
                        </Container>
                    }
                    

                </Col>
                <Col md={4} style={{display:"none"}}></Col>
            </Row>
         
            <Row className="">
                <Col md={2} style={{display:"none"}}></Col>
                <Col md={8}>
                    <div className="d-flex">
                        <Link to={`/`} className="text-success mx-auto px-5">
                            <h4 className="text-center fs-4">BACK TO GPA HOMEPAGE</h4>
                        </Link>
                    </div>
                </Col>
                <Col md={2} style={{display:"none"}}></Col>
            </Row>
        </>
    )
}

export default ApplicationScreen
