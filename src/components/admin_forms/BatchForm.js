import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Button,Modal, Form, Dropdown, Tabs, Tab, ListGroup, Nav, ButtonGroup,Table } from 'react-bootstrap'
import { listBatch, listBatchApplication} from '../../actions/batchActions'
import { listApplications, detailApplication, commentsApplication,
    addCommentAction,logsApplication, updateApplication} from '../../actions/applicationActions'

import { useDispatch, useSelector } from 'react-redux'

import MaterialTable from "material-table"

import './BatchForm.css';

import TimeAgo from 'javascript-time-ago';
// English.
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

function BatchForm() {

    let obj = JSON.parse(localStorage.getItem('userInfo'))
    let roleId = obj.message.original.roleId

    const [showModal, setShowModal] = useState(false)
    const [applicationId, setApplicationId] = useState(0)
    const [status, setStatus] = useState("")
    const [stage, setStage] = useState("")
    const [reason, setReason] = useState("")
    const [selectIds, setSelectedIds] = useState([])
    const [showBatchApplicationTable,setShowBatchApplicationTable] = useState(false)
    const [show, setShow] = useState(false)
    const [new_eq_index, setNewEqIndex] = useState(0)
    const [equipmentInfo, setEquipmentInfo] = useState([])
    const [showNewEquipmentInfo, setShowNewEquipmentInfo] = useState(false)
    const [showOldEquipmentInfo, setShowOldEquipmentInfo] = useState(false)
    const [comment, setComment] = useState("")


    const handleModalClose = () => setShowModal(false)

    const dispatch = useDispatch()

    const batchList = useSelector(state => state.batchList)
    const {batches} = batchList

    const applicationDetail = useSelector(state => state.applicationDetail)
    const {application} = applicationDetail

    const batchApplication = useSelector(state => state.batchApplication)
    const {batch_applications} = batchApplication

    const applicationComments = useSelector(state => state.applicationComments)
    const {comments} = applicationComments

    const applicationLogs = useSelector(state => state.applicationLogs)
    const {logs} = applicationLogs

    const applicationUpdate = useSelector(state => state.applicationUpdate)
    const {error:updateError, loading:updateLoading, success:successUpdate} = applicationUpdate

    useEffect(() => {
        dispatch(listBatch())
    }, [dispatch])

    const selectHandler = (rowdata) => {
        dispatch(listBatchApplication(rowdata.Id))
        console.log(batch_applications)
    }

    const changeStatusHandler = (status) => {
        setStatus(status)
        setShowModal(true)
    }

    const updateStatus = (status, stage) => {
        if(status === 3){
             if(window.confirm('Are you sure you want to reject application?'))
            {
                dispatch(updateApplication(applicationId,status,stage,reason))
                alert("Saved!")
                setShowModal(false)
            }
        }else{
            setStatus(status)
            setStage(stage)
                dispatch(updateApplication(applicationId,status,stage,reason))
            if(window.confirm('Are you sure you want to process application?'))
            {
                alert("Saved!")
                setShowModal(false)
            }
        }
    }

    const getSelected = (e, application_id) =>{
        
        const checked = e.target.checked;
        if(checked)
        {
            selectIds.push(application_id)
        }
        else
        {
            
            const index = selectIds.indexOf(application_id)
            delete selectIds[index]
        }

        console.log(selectIds)

    }

    
    const changeCommentHandler = (text) => 
    {
        setComment(text)
    }

    const resetHandler = () =>{
        setShow(false)
    }

    const addCommentHandler = () => 
    {
        dispatch(addCommentAction(applicationId, comment))
        setComment("")
    }

    const showNewEquipmentInformation = (index)=>
    {
        setNewEqIndex(index)
        console.log(application)
    }

    const selectEquipment = (id, equipmentType) => {
        
        if(equipmentType === "new_equipment")
        {
            if(application.New_equipment[id])
            {
                setEquipmentInfo(application.New_equipment[id])
                setShowNewEquipmentInfo(true)
            }
        }
        else
        {
            if(application.Old_equipment[id])
            {
                setEquipmentInfo(application.Old_equipment[id])
                setShowOldEquipmentInfo(true)
            }
        }
    }

    const applicationViewHandler = (rowdata) =>
    {
        console.log(rowdata)
        setApplicationId(rowdata.Application_Id)
        dispatch(detailApplication(rowdata.Application_Id))
        dispatch(commentsApplication(rowdata.Application_Id))
        dispatch(logsApplication(rowdata.Application_Id))
        setShow(true)
    }


    return (
        <>
        {
            show ?
            <Container>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="application_information">
                                <Button className="mb-3 btn btn-light" onClick={()=>resetHandler()}><i className="fa fa-arrow-left"></i> Back to Application</Button>
                                <Row>
                                    <Col md={12} style={{backgroundColor:'rgb(227, 227, 229)'}}>
                                        <div id="applicationFormNa">
                                            <Nav variant="pills" className="d-flex aligns-items-center justify-content-center">
                                                <Nav.Item className="me-1">
                                                <Nav.Link eventKey="application_information">Applicant Information</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item className="me-1">
                                                <Nav.Link eventKey="new_quipment_info">New Equipment Information</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item className="me-1">
                                                <Nav.Link eventKey="old_quipment_info">Old/Existing Equipment Information</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item className="me-1">
                                                <Nav.Link eventKey="submission_of_documentation">Submitted Documents</Nav.Link>
                                                </Nav.Item>
                                                {/* <Nav.Item className="me-1">
                                                <Nav.Link eventKey="verify_information">Update Status</Nav.Link>
                                                </Nav.Item> */}
                                            </Nav>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={9}>
                                        <Tab.Content>
                                            {/* Applicaiton Information */}
                                            <Tab.Pane eventKey="application_information">
                                                    <h3 className="mt-3 text-info">Applicant Info</h3>
                                                    {application?
                                                        <ListGroup>
                                                        <p>GPA Electric Account Number  <b>{application.Info_Account_no}</b> </p>
                                                        <p>Bill ID <b>{application.Info_Bill_id}</b> </p>
                                                        <p>Applicant Name <b>{application.Info_Customer_name} </b>
                                                        </p>
                                                        <p>Installation Address <b>{application.Info_Service_location}</b> </p>
                                                        <p>City <b>{application.Info_City_village}</b> </p>
                                                        <p>ZIP <b>{application.Info_Zipcode}</b> </p>
                                                        <p>Email <b>{application.Info_Email}</b> </p>
                                                        <p>Telephone Number <b>{application.Info_Tel_no}</b> </p>
                                                        <p>Owner of the Residential Property <b>{application.Info_Is_owner}</b> </p>
                                                        <p>Mailing Address <b>{application.Info_Mailing_address}</b> </p>
                                                        <p>Home Size (approx. sq. ft.) <b>{application.Info_Home_size}</b> </p>
                                                        <p>New Construction <b>{application.Info_New_construction}</b> </p>
                                                        <p>Home Type <b>{application.Info_Home_type}</b> </p>
                                                    </ListGroup>:<></>
                                                    }
                                            </Tab.Pane>
                                            {/* New equipment */}
                                            <Tab.Pane eventKey="new_quipment_info">
                                                <Container className="ml-2 mr-2">
                                                    <h3 className="mt-3 mb-3 text-info">New Equipment Info</h3>
                                                    <Row>
                                                        <Col md={6}>
                                                        {
                                                            application? 
                                                                application.New_equipment.length >=1?
                                                                <ButtonGroup className="me-2 mb-3" aria-label="First group">
                                                                        <Button className="btn btn-sm" onClick={()=>showNewEquipmentInformation(0)} variant="info">E1</Button>
                                                                        {
                                                                            application.New_equipment.length > 1 ?
                                                                            <Button onClick={()=>showNewEquipmentInformation(1)} className="btn btn-sm" variant="secondary">E2</Button>: <></>
                                                                        }
                                                                        {
                                                                            application.New_equipment.length > 2 ?
                                                                            <Button onClick={()=>showNewEquipmentInformation(2)} className="btn btn-sm" variant="secondary">E3</Button>: <></>
                                                                        }
                                                                        {
                                                                            application.New_equipment.length > 3 ?
                                                                            <Button onClick={()=>showNewEquipmentInformation(3)} className="btn btn-sm" variant="secondary">E4</Button>:<></>
                                                                        }
                                                                        {
                                                                            application.New_equipment.length > 4 ?
                                                                            <Button onClick={()=>showNewEquipmentInformation(4)} className="btn btn-sm" variant="secondary">E5</Button>:<></>
                                                                        }
                                                                    </ButtonGroup>
                                                                    :<></>
                                                            :<></>
                                                        } 
                                                        </Col>
                                                        </Row>
                                                        <Row>
                                                                <Col md={6}>
                                                                {
                                                                    application ?

                                                                    application.New_equipment.length >= 1 ?
                                                                    <>
                                                                    <ListGroup className="mb-3">
                                                                    <p>System Type <b> { application.New_equipment[new_eq_index].newEquip_System_type } </b> </p>
                                                                    <p>Vendor <b>{ application.New_equipment[new_eq_index].newEquip_Vendor }</b> </p>
                                                                    <p>Quantity <b>{ application.New_equipment[new_eq_index].newEquip_Quantity }</b></p>
                                                                    <p>BTU  <b>{ application.New_equipment[new_eq_index].newEquip_Btu }</b></p>
                                                                    <p>Manufacturer  <b>{ application.New_equipment[new_eq_index].newEquip_Manufacturer }</b></p>
                                                                    <p>Model Number  <b>{ application.New_equipment[new_eq_index].newEquip_Model_no }</b></p>
                                                                    <p>Invoice#  <b><a href="./sample.png" rel="noreferrer" target="_blank">{ application.New_equipment[new_eq_index].newEquip_Invoice_no }</a></b></p>
                                                                    <p>Purchase Date <b>{ application.New_equipment[new_eq_index].newEquip_Purchase_date }</b></p>
                                                                    <p>Type <b>{ application.New_equipment[new_eq_index].newEquip_Type }</b></p>
                                                                    <p>Tons <b>{ application.New_equipment[new_eq_index].newEquip_Tons }</b></p>
                                                                    <p>Install Date <b>{ application.New_equipment[new_eq_index].newEquip_Purchase_date }</b></p>
                                                                    </ListGroup>

                                                                    <h3 className="mt-3 mb-3 text-info">Installer Information</h3>
                                                                    <ListGroup className="mb-3">
                                                                        <p>Technician Name <b> { application.Installer_New_name } </b></p>
                                                                        <p>Work Telephone <b> { application.Installer_New_worktel } </b></p>
                                                                        <p>Company <b> { application.Installer_New_companyname } </b></p>
                                                                        <p>Certification No. <b> { application.Installer_New_certno } </b></p>
                                                                        <p className="mb-3">Email <b> { application.Installer_New_email } </b></p>
                                                                        <p>Date of Final <b> { application.Installer_New_finaldate } </b></p>
                                                                    </ListGroup>
                                                                    </>
                                                                    :<>No Equipment</>
                                                                    :<></>
                                                                }
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Table size="lg" striped bordered hover>
                                                                        <thead className="bg-info text-white">
                                                                            <tr className="py-5">
                                                                                <th className="p-3">Equipment No.</th>
                                                                                <th className="p-3">QTY</th>
                                                                                <th className="p-3">Rebate</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                application? 
                                                                                <>
                                                                                    {
                                                                                        application.New_equipment.map((eq, id) =>(
                                                                                            
                                                                                        <tr key={(id+1)}>
                                                                                            <td className="p-3">{(id+1)}</td>
                                                                                            <td className="p-3">{eq.newEquip_Quantity}</td>
                                                                                            <td className="p-3">{eq.newEquip_rebate}</td>
                                                                                        </tr>
                                                                                        ))
                                                                                    }
                                                                                </>
                                                                                :<></>
                                                                            }
                                                                            <tr>
                                                                                <td className="p-3" colSpan="2" className="text-end">TOTAL</td>
                                                                                <td className="p-3">$0.00</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>
                                                                </Col>
                                                            </Row>
                                                    </Container>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="old_quipment_info">
                                                <Container className="ml-2 mr-2">
                                                    <h3 className="mt-3 mb-3 text-info">Existing/Old Equipment Info </h3>

                                                    <ButtonGroup className="me-2 mb-3" aria-label="First group">
                                                        <Button className="btn btn-sm" variant="info" onClick={() => selectEquipment(0, "old_equipment")}>E1</Button>{' '}
                                                                <Button className="btn btn-sm" variant="secondary" onClick={() => selectEquipment(1, "old_equipment")}>E2</Button>{' '}
                                                                <Button className="btn btn-sm" variant="secondary" onClick={() => selectEquipment(2, "old_equipment")}>E3</Button>{' '}
                                                                <Button className="btn btn-sm" variant="secondary" onClick={() => selectEquipment(3, "old_equipment")}>E4</Button>
                                                    </ButtonGroup>

                                                    <ListGroup className="mb-3">
                                                        {showOldEquipmentInfo ?
                                                                    <>
                                                                    <p>System Type <b>{equipmentInfo.oldEquip_System_type} </b></p>
                                                                    <p>BTU <b> {equipmentInfo.oldEquip_Btu}</b></p>
                                                                    <p>Years <b>{equipmentInfo.oldEquip_Years}</b></p>
                                                                    <p>Quantity <b>{equipmentInfo.oldEquip_Quantity}</b></p>
                                                                    <p>Tons <b>{equipmentInfo.oldEquip_Tons}</b></p>
                                                                    <p>Equipment condition prior to removal <b>{equipmentInfo.oldEquip_Conditon}</b></p>
                                                                    <p>Seer <b>{equipmentInfo.oldEquip_Seer}</b></p>
                                                                    <p>Disposal Party <b>{equipmentInfo.oldEquip_Disposal_party}</b></p>
                                                                    <p>Date <b>{equipmentInfo.oldEquip_Disposal_party}</b></p>
                                                                    </>
                                                                :<p>No Data</p>
                                                                }
                                                    </ListGroup>
                                                </Container>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="submission_of_documentation">
                                                <Container className="ml-2 mr-2">
                                                    <h3 className="mt-3 mb-3 text-info">Submitted Documents</h3>

                                                    <ListGroup className="mb-3">
                                                        <p>Invoice</p>
                                                        <p>IRS-W9</p>
                                                        <p>Letter of Authorization</p>
                                                        <p>Disposal Slip</p>
                                                        <p>Other support documents 1</p>
                                                        <p>Equipment condition prior to removal</p>
                                                        <p>Other support documents 2</p>
                                                    </ListGroup>
                                                </Container>
                                                <Container className="ml-2 mr-2">
                                                    <h3 className="mt-3 mb-3">Update Status</h3>
                                                    <Row>
                                                        <Col md={12}>

                                                            <Modal show={showModal} onHide={handleModalClose}>
                                                                <Modal.Header closeButton>
                                                                <Modal.Title>
                                                                    {status === 3 ? <>Reject Application</>: <>Process Application</>}
                                                                </Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    {
                                                                        status === 3 ?
                                                                            <>
                                                                                <Form.Group controlId='role_id' className="mb-1">
                                                                                    <Form.Select onChange={(e)=>setReason(e.target.value)} value={reason} required>
                                                                                        <option >Open this select menu</option>
                                                                                        <option value="0">None</option>
                                                                                        <option value="1">Applicant is not a GPA Account holder or property owner.</option>
                                                                                        <option value="2">Application information provided was incorrect.</option>
                                                                                        <option value="3">Equipment was not installed within 120 days from invoice date.</option>
                                                                                        <option value="4">Application was not submitted within 120 days from install date.</option>
                                                                                        <option value="5">Missing or incorrect Invoice.</option>
                                                                                        <option value="6">Missing or incorrect W-9.</option>
                                                                                        <option value="7">Missing or Incorrect Installer Information.</option>
                                                                                        <option value="8">Other: Please contact GPA for more information.</option>
                                                                                    </Form.Select>
                                                                                </Form.Group>
                                                                                <Button variant={"danger"} onClick={() => updateStatus(3,0)}>Reject Application</Button>
                                                                            </>
                                                                        :
                                                                        
                                                                            roleId === 2 ?
                                                                                <Button onClick={() => updateStatus(1, 1)}>Send to SPORD</Button>
                                                                            :
                                                                                roleId === 3 ?
                                                                                <>
                                                                                <Button onClick={() => updateStatus(1, 3)} className="mb-1">Send to Supervisor</Button> <br />
                                                                                <Button onClick={() => updateStatus(1, 4)}>Send Back to Customer Service</Button>
                                                                                </>
                                                                                :
                                                                                roleId === 6 ?
                                                                                <>
                                                                                <Button onClick={() => updateStatus(1, 5)}>Send to Budget</Button>
                                                                                <Button onClick={() => updateStatus(1, 1)}>Send Back to SPORD</Button>
                                                                                </>
                                                                                :
                                                                                roleId === 4 ?
                                                                                <>
                                                                                <Button onClick={() => updateStatus(1, 2)}>Send to Accounting</Button>
                                                                                <Button onClick={() => updateStatus(1, 3)}>Send Back to Supervisor</Button>
                                                                                </>
                                                                                :
                                                                                roleId === 5 ?
                                                                                <>
                                                                                <Button variant={"success"} className="mb-1" onClick={() => updateStatus(1, 0)}>Approve Application</Button><br />
                                                                                <Button variant={"danger"} className="mb-1" onClick={() => updateStatus(1, 1)}>(Decline) Send to Spord</Button><br />
                                                                                <Button variant={"danger"} className="mb-1" onClick={() => updateStatus(1, 4)}>(Decline) Send to CS</Button>
                                                                                </>: 
                                                                                roleId === 1 ?
                                                                                    <>
                                                                                        <Button variant={"success"} className="mb-1" onClick={() => updateStatus(1, 0)}>Approve Application</Button><br />
                                                                                        <Button className="mb-1" onClick={() => updateStatus(1, 4)}>Send to CS</Button> <br />
                                                                                        <Button className="mb-1" onClick={() => updateStatus(1, 1)}>Send to SPORD</Button> <br />
                                                                                        <Button className="mb-1" onClick={() => updateStatus(1, 3)}>Send to Supervisor</Button> <br />
                                                                                        <Button className="mb-1" onClick={() => updateStatus(1, 5)}>Send to Budget</Button> <br />
                                                                                        <Button className="mb-1" onClick={() => updateStatus(1, 2)}>Send to Accounting</Button> <br />
                                                                                    </>:<></>
                                                                    }
                                                                </Modal.Body>
                                                            </Modal>
                                                            <Button className="me-2" variant={"info"} onClick={()=> changeStatusHandler(1) }>Process Sending</Button>
                                                            <Button className="me-2" variant={"danger"} onClick={()=> changeStatusHandler(3) }>Reject</Button>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                    <Col md={3} style={{backgroundColor: "rgb(243, 244, 249)", borderLeft:"2px solid #d0d5db"}}>
                                        {application ?
                                            <>
                                            <h4 className="mt-3 mb-3">Details</h4>
                                            <h6 className="text-muted">Date Applied</h6>
                                            <h6>{application.Application_Date}</h6>
                                            <br />
                                            <h6 className="text-muted">Current Stage</h6>
                                            <h6>{application.Status}</h6>
                                            <br />
                                            <h6 className="text-muted">Current Department</h6>
                                            <h6 className="mb-5">{application.Stage}</h6>

                                            <h4>Event Logs</h4>
                                            {
                                                logs ? 
                                                <div style={{ height: '200px', overflowY: 'auto' }}>
                                                    {
                                                        logs.map((log, index) => (
                                                        <div key={index}>
                                                            
                                                            <h6>{log.Action}</h6>
                                                            <small className="text-muted">Made By: {log.Made_By}</small><br />
                                                            <small className="text-muted">Made On: {log.Made_On}</small>
                                                            <hr />
                                                        </div>
                                                        ))
                                                    }
                                                    
                                                </div>
                                                : <p>Loading...</p>
                                            }
                                            </>
                                        : 'loading . . '}

                                    </Col>
                                </Row>
                                <hr />
                                {/* Comments section */}
                                <br />
                                <Row>
                                    
                                    <Col md={9}>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="comment">
                                                <Form.Label><b>Comments</b></Form.Label>
                                                <Form.Control as="textarea" rows={5}
                                                    onChange={(e)=>changeCommentHandler(e.target.value)}
                                                    value={comment}
                                                />
                                            </Form.Group>
                                            <Button onClick={()=> addCommentHandler()} variant="success">Submit</Button>
                                            <br />
                                            <br />
                                        </Form>
                                        <hr />
                                        
                                            {
                                                comments ?
                                                comments.map(comment => (
                                                    <div className="p-3 mb-1">
                                                        <h6>{comment.Made_By} | {timeAgo.format(new Date(comment.Made_On) -   60 * 60 * 1000, 'twitter')}<br />
                                                        <small className="text-muted">{comment.role}</small>
                                                        </h6>
                                                        <h6 className="text-muted">{comment.Comment}</h6>
                                                    </div>
                                                    
                                                ))
                                                : <></>
                                            }


                                    </Col>
                                    <Col md={3}></Col>
                                </Row>
                        </Tab.Container>
                    </Container>
            :
            <Container>
            
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>
                        {status === 3 ? <>Reject Application</>: <>Process Application</>}
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            status === 3 ?
                                <>
                                    <Form.Group controlId='role_id' className="mb-3">
                                        <Form.Select onChange={(e)=>setReason(e.target.value)} value={reason} required>
                                            <option >Open this select menu</option>
                                            <option value="0">None</option>
                                            <option value="1">Applicant is not a GPA Account holder or property owner.</option>
                                            <option value="2">Application information provided was incorrect.</option>
                                            <option value="3">Equipment was not installed within 120 days from invoice date.</option>
                                            <option value="4">Application was not submitted within 120 days from install date.</option>
                                            <option value="5">Missing or incorrect Invoice.</option>
                                            <option value="6">Missing or incorrect W-9.</option>
                                            <option value="7">Missing or Incorrect Installer Information.</option>
                                            <option value="8">Other: Please contact GPA for more information.</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Button variant={"danger"} onClick={() => updateStatus(3,0)}>Reject Application</Button>
                                </>
                            :
                            
                                roleId === 2 ?
                                    <Button onClick={() => updateStatus(1, 1)}>Send to SPORD</Button>
                                :
                                    roleId === 3 ?
                                    <>
                                    <Button onClick={() => updateStatus(1, 3)}>Send to Supervisor</Button>
                                    <Button onClick={() => updateStatus(1, 4)}>Send Back to Customer Service</Button>
                                    </>
                                    :
                                    roleId === 6 ?
                                    <>
                                    <Button onClick={() => updateStatus(1, 5)}>Send to Budget</Button>
                                    <Button onClick={() => updateStatus(1, 1)}>Send Back to SPORD</Button>
                                    </>
                                    :
                                    roleId === 4 ?
                                    <>
                                    <Button onClick={() => updateStatus(1, 2)}>Send to Accounting</Button>
                                    <Button onClick={() => updateStatus(1, 3)}>Send Back to Supervisor</Button>
                                    </>
                                    :
                                    roleId === 5 ?
                                    <>
                                    <Button variant={"success"} className="mb-1" onClick={() => updateStatus(1, 0)}>Approve Application</Button><br />
                                    <Button variant={"danger"} className="mb-1" onClick={() => updateStatus(1, 1)}>(Decline) Send to Spord</Button><br />
                                    <Button variant={"danger"} className="mb-1" onClick={() => updateStatus(1, 4)}>(Decline) Send to CS</Button>
                                    </>: 
                                        roleId === 1 ?
                                        <>
                                            <Button variant={"success"} className="mb-1" onClick={() => updateStatus(1, 0)}>Approve Application</Button><br />
                                            <Button className="mb-1" onClick={() => updateStatus(1, 4)}>Send to CS</Button> <br />
                                            <Button className="mb-1" onClick={() => updateStatus(1, 1)}>Send to SPORD</Button> <br />
                                            <Button className="mb-1" onClick={() => updateStatus(1, 3)}>Send to Supervisor</Button> <br />
                                            <Button className="mb-1" onClick={() => updateStatus(1, 5)}>Send to Budget</Button> <br />
                                            <Button className="mb-1" onClick={() => updateStatus(1, 2)}>Send to Accounting</Button> <br />
                                        </>:<></>
                        }
                    </Modal.Body>
                </Modal>
                
                <Row >
                    <Col md={5}>
                        <Row className="mb-1">
                            <Col md={10}>
                                <h4>GLA Funds</h4>
                            </Col>
                            <Col md={2} className="d-flex flex-row-reverse bd-highlight">
                                <Button variant={"info"} size={"sm"} className=""><i className="fa fa-edit"></i></Button>
                            </Col>
                        </Row>
                        <MaterialTable 
                            columns={[
                                
                                { title: "Batch Code", field: "Batch_code"},
                                {
                                    title: 'MadeOn',
                                    render: rowData=> {
                                        let d = new Date(rowData.Made_On)
                                        return <>{d.toLocaleDateString()}</>
                                    }
                                    
                                },
                                
                                
                                {
                                    title: "Action",
                                    field:"actions",
                                    width:"10%",
                                    editComponent: (props) =>{
                                        return (
                                            <Button>Payts</Button>
                                        )
                                    },
                                    render: (rowdata) => (
                                        <>
                                        <Button className="btn btn-sm btn-light" onClick={() => selectHandler(rowdata)}><i className="fa fa-edit"></i></Button>
                                        </>
                                    )
                                },

                            ]}
                            data={batches}
                            title="Batch"
                            options={{
                                rowStyle: {
                                  height:'5px !important'
                                }
                              }}
                        />
                    </Col>
                        <Col md={7}>
                           
                            <MaterialTable 
                                columns={[
                                    {
                                        title: "#",
                                        field:"check_actions",
                                        width:"10%",
                                        editComponent: (props) =>{
                                            return (
                                                <Button>Payts</Button>
                                            )
                                        },
                                        render: (rowdata) => (
                                            <>
                                            {
                                                Object.keys(batch_applications[0]).length > 3? 
                                                <>
                                                <input type="checkbox"
                                                onChange={ (e) => getSelected(e, rowdata.Application_Id) }
                                                ></input>
                                                </> : <></>
                                            }
                                            </>
                                            
                                        )
                                    },
                                    { title: "Control No.", field: "Control_Number"},
                                    { title: "Status", field: "Status"},
                                    { title: "Stage", field: "Stage"},
                                    {
                                        title: "Action",
                                        field:"actions",
                                        width:"10%",
                                        editComponent: (props) =>{
                                            return (
                                                <Button>Payts</Button>
                                            )
                                        },
                                        render: (rowdata) => (
                                            <>
                                                {
                                                    Object.keys(batch_applications[0]).length > 3? 
                                                    <>
                                                    <Dropdown >
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                                                        Actions
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={()=> applicationViewHandler(rowdata) }>View</Dropdown.Item>
                                                        <Dropdown.Item onClick={()=> changeStatusHandler(1)}>Process</Dropdown.Item>
                                                        <Dropdown.Item onClick={()=> changeStatusHandler(3) }>Reject</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                    </Dropdown>
                                                    </>
                                                    : <></>
                                                }
                                            </>
                                        )
                                    }
                                ]}
                                data={batch_applications}
                                title="Batch Application"
                            />
                            <div className="d-flex flex-row-reverse">
                                <Button className="ms-1 mt-1 px-5" variant={"danger"} onClick={()=> changeStatusHandler(3) }>Reject</Button>
                                <Button className="ms-1 mt-1 px-5" variant={"success"} onClick={()=> changeStatusHandler(1) }>Proccess</Button>
                            </div>
                        </Col>
                </Row>
            </Container>
        }
        </>
    )
}

export default BatchForm
