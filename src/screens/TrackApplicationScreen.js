import React, {useState, useEffect} from 'react'
// import Form from '../components/Form'
import CustomerHeader from '../components/CustomerHeader'
import { Row, Col, Form,ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'


import { useDispatch, useSelector } from 'react-redux'
import { trackApplications } from '../actions/applicationActions'

function ApplicationScreen() {

    const dispatch = useDispatch()

    const [control_no, setControlNo] = useState("")
    
    const applicationTrack = useSelector(state => state.applicationTrack)
    const {loading:trackLoading,error:trackError, track_application } = applicationTrack

    useEffect(() => {
    }, [dispatch, track_application])


    const trackApplicationHandler = () => {
        dispatch(trackApplications(control_no))
    }
    return (
        <div>
            <CustomerHeader />
            <Row>
                <Col md={3}></Col>
                <Col md={6} className="mt-5 mb-5">
                    <h2 className="text-center text-info mb-5">TRACK YOUR APPLICATION</h2>
                    <Row>
                        <Col md={5}>
                            <p><b>ENTER YOUR CONTROL NUMBER</b></p>
                        </Col>
                        <Col md={5}>
                        <Form.Group controlId='control_no' className="mb-3">
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>setControlNo(e.target.value)}
                                value={control_no}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                        </Col>
                        <Col md={1}>
                            <button className="btn btn-success" onClick={()=> trackApplicationHandler()}><b>SUBMIT</b></button>
                        </Col>
                    </Row>
                    {
                        track_application?
                        track_application.map(tp => (
                            <ListGroup className="mb-2">
                                <ListGroup.Item>Entry Number: <b>{tp.Entry_no}</b></ListGroup.Item>
                                <ListGroup.Item>Account Number: <b>{tp.Account_no}</b></ListGroup.Item>
                                <ListGroup.Item>Bill ID: <b>{tp.Bill_id}</b></ListGroup.Item>
                                <ListGroup.Item>Sysytem Type: <b>{tp.System_Type}</b></ListGroup.Item>
                                <ListGroup.Item>Customer's Name: <b>{tp.customer_name}</b></ListGroup.Item>
                                <ListGroup.Item>Status: <b>{tp.Status}</b></ListGroup.Item>
                                <ListGroup.Item>Stage: <b>{tp.Stage}</b></ListGroup.Item>
                                <ListGroup.Item>Application Date: <b>{tp.Application_Date}</b></ListGroup.Item>
                            </ListGroup>
                        ))
                        : <h6>Loading . . .</h6>
                    }
                </Col>
                <Col md={3}></Col>
            </Row>

            <Row>
                <Col md={2}></Col>
                <Col md={8}>

                    <div className="d-flex mb-5">
                        <Link to={`/`} className="btn btn-success btn-lg mx-auto px-5"><h4>BACK TO GPA HOMEPAGE</h4></Link>
                    </div>
                </Col>
                <Col md={2}></Col>
            </Row>
        </div>
    )
}

export default ApplicationScreen
