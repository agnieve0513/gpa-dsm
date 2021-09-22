import React, {useState, useEffect} from 'react'
import { Row, Col, Table, Form, ListGroup, Tabs, Modal, Tab, Container, Button, ButtonGroup, Nav} from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas'

import { listApplications, detailApplication, commentsApplication, logsApplication, updateApplication} from '../../actions/applicationActions'
import { listBatchCurrent, addNewBatch } from '../../actions/batchActions'


import { useDispatch, useSelector } from 'react-redux'
import MaterialTable from "material-table";

import './ApplicationForm.css'

function ApplicationForm() {

    let obj = JSON.parse(localStorage.getItem('userInfo'))
    let roleId = obj.message.original.roleId

    const [showModal, setShowModal] = useState(false)
    const [showBatchModal, setBatchShowModal] = useState(false)
    const [show, setShow] = useState(false)
    const [showNewEquipmentInfo, setShowNewEquipmentInfo] = useState(false)
    const [showOldEquipmentInfo, setShowOldEquipmentInfo] = useState(false)
    const [equipmentInfo, setEquipmentInfo] = useState([])
    const [applicationId, setApplicationId] = useState(0)
    const [status, setStatus] = useState("")
    const [stage, setStage] = useState("")
    const [reason, setReason] = useState("")
    const [batch, setBatch] = useState("")

    const handleModalClose = () => setShowModal(false)
    const handleBatchModalClose = () => setBatchShowModal(false)
    
    const dispatch = useDispatch()
     

    const applicationList = useSelector(state => state.applicationList)
    const {applications} = applicationList

    const applicationDetail = useSelector(state => state.applicationDetail)
    const {application} = applicationDetail

    const applicationComments = useSelector(state => state.applicationComments)
    const {comments} = applicationComments

    const applicationLogs = useSelector(state => state.applicationLogs)
    const {logs} = applicationLogs
    
    const applicationUpdate = useSelector(state => state.applicationUpdate)
    const {error:updateError, loading:updateLoading, success:successUpdate} = applicationUpdate

    const batchCurrent = useSelector(state => state.batchCurrent)
    const { batch_current } = batchCurrent

    const batchAdd = useSelector(state => state.batchAdd)
    const { success:addBatchSuccess } = batchAdd

    useEffect(() => {
        dispatch(listApplications())
        dispatch(listBatchCurrent())
    }, [dispatch, application, successUpdate, addBatchSuccess])

    const selectHandler = (rowdata) => {
        setApplicationId(rowdata.Application_Id)
        dispatch(detailApplication(rowdata.Application_Id))
        dispatch(commentsApplication(rowdata.Application_Id))
        dispatch(logsApplication(rowdata.Application_Id))
        setShow(true)
    }

    const changeStatusHandler = (status) => {
        setStatus(status)
        setShowModal(true)

        console.log(status)
    }

    const updateStatus = (status, stage) => {
        if(status === 3){
            console.log(reason)
            console.log(status)
             if(window.confirm('Are you sure you want to reject application?'))
            {
                dispatch(updateApplication(applicationId,status,stage,reason))
                alert("Saved!")
                setShow(false)
                setShowModal(false)
            }
        }else{
            if(status === 1 && stage === 3)
            {
                setStatus(1)
                setStage(3)
                setShowModal(false)
                setBatchShowModal(true)
            }
            else
            {
                setStatus(status)
                setStage(stage)
                    dispatch(updateApplication(applicationId,status,stage,reason, batch))
                if(window.confirm('Are you sure you want to process application?'))
                {
                    alert("Saved!")
                    setShowModal(false)
                }
            }
        }
    }

    const resetHandler = () =>{
        setShow(false)
    }

    const addBatchHandler = () =>{
        if(window.confirm('Are you sure you want to create new Batch?'))
        {
            dispatch(addNewBatch())
        }
    }

    const selectBatchHandler = (rowdata)=>{
        if(window.confirm('Are you sure you want to add Application to this Batch?'))
        {
            setBatch(rowdata.Id)
            setStatus(status)
            setStage(stage)
            setBatchShowModal(false)

            if(window.confirm('Are you sure you want to process application?'))
            {
                dispatch(updateApplication(applicationId,status,stage,reason, rowdata.Id))
                alert("Saved!")
            }
        }
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
    return (
        <div>
            {
                show ?  
                    <>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="application_information">
                            <Row>
                                <Col md={1}></Col>
                                <Col md={11} id="applicationFormNav">
                                    <Button className="mb-3 btn btn-light" onClick={()=>resetHandler()}><i className="fa fa-arrow-left"></i> Back to Application</Button>
                                    <Nav variant="pills">
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
                                        <Nav.Item className="me-1">
                                        <Nav.Link eventKey="verify_information">Update Status</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col md={1}></Col>
                                <Col md={8}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="application_information">
                                            <Container className="ml-2 mr-2">
                                                <h3 className="mt-3">Applicant Info</h3>
                                                <ListGroup>
                                                    <Row>
                                                        <Col md={3}>
                                                            <p>GPA Electric Account Number </p>
                                                            <p>Bill ID  </p>
                                                            <p>Applicant Name </p>
                                                            <p>Installation Address </p>
                                                            <p>City  </p>
                                                            <p>ZIP  </p>
                                                            <p>Email </p>
                                                            <p>Telephone Number  </p>
                                                            <p>Owner of the Residential Property </p>
                                                            <p>Mailing Address</p>
                                                            <p>Home Size (approx. sq. ft.)</p>
                                                            <p>New Construction</p>
                                                            <p>Home Type </p>
                                                        </Col>
                                                        <Col md={7}>
                                                            {application ? 
                                                            <>
                                                            <p>{application.Info_Account_no}</p>
                                                            <p>{application.Info_Bill_id}</p>
                                                            <p>{application.Info_Customer_name}</p>
                                                            <p>{application.Info_Service_location}</p>
                                                            <p>{application.Info_City_village}</p>
                                                            <p>{application.Info_Zipcode}</p>
                                                            <p>{application.Info_Email}</p>
                                                            <p>{application.Info_Tel_no}</p>
                                                            <p>{application.Info_Is_owner}</p>
                                                            <p>{application.Info_Mailing_address}</p>
                                                            <p>{application.Info_Home_size}</p>
                                                            <p>{application.Info_New_construction}</p>
                                                            <p>{application.Info_Home_type}</p>
                                                            </>: 'Loading . . .'}
                                                        </Col>
                                                    </Row>
                                                    
                                                </ListGroup>
                                            </Container>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="new_quipment_info">
                                            <Container className="ml-2 mr-2">
                                                <h3 className="mt-3 mb-3 text-info">New Equipment Info</h3>
                                                <Row>
                                                    <Col md={6}>
                                                        <ButtonGroup className="me-2 mb-3" aria-label="First group">
                                                            <Button className="btn btn-sm" variant="info" onClick={() => selectEquipment(0, "new_equipment")}>E1</Button>{' '}
                                                            <Button className="btn btn-sm" variant="secondary" onClick={() => selectEquipment(1, "new_equipment")}>E2</Button>{' '}
                                                            <Button className="btn btn-sm" variant="secondary" onClick={() => selectEquipment(2, "new_equipment")}>E3</Button>{' '}
                                                            <Button className="btn btn-sm" variant="secondary" onClick={() => selectEquipment(3, "new_equipment")}>E4</Button>
                                                        </ButtonGroup>
                                                        <ListGroup className="mb-3">
                                                            {showNewEquipmentInfo ?
                                                                <>
                                                                <p>Rebate: <b> {equipmentInfo.newEquip_rebate}</b></p>
                                                                <p>System Type: <b> {equipmentInfo.newEquip_System_type}</b></p>
                                                                <p>Vendor: <b>{equipmentInfo.newEquip_Vendor}</b></p>
                                                                <p>Quantity: <b>{equipmentInfo.newEquip_Quantity}</b></p>
                                                                <p>BTU: <b>{equipmentInfo.newEquip_Btu}</b></p>
                                                                <p>Manufacturer: <b>{equipmentInfo.newEquip_Manufacturer}</b></p>
                                                                <p>Model Number: <b>{equipmentInfo.newEquip_Model_no}</b></p>
                                                                <p>Invoice#: <b>{equipmentInfo.newEquip_Invoice_no}</b></p>
                                                                <p>Purchase Date: <b>{equipmentInfo.newEquip_Purchase_date}</b></p>
                                                                <p>Type: <b>{equipmentInfo.newEquip_Type}</b></p>
                                                                <p>Tons: <b>{equipmentInfo.newEquip_Tons}</b></p>
                                                                <p>Install Date: <b>{equipmentInfo.newEquip_Purchase_date}</b></p>
                                                                </>
                                                            :<p>No Data</p>
                                                            }
                                                            
                                                        </ListGroup>

                                                        <h3 className="mt-3 mb-3 text-info">Installer Information</h3>
                                                        <ListGroup className="mb-3">
                                                            {application ? 
                                                            <>
                                                                <p>Technician Name <b>{application.Installer_New_name}</b></p>
                                                                <p>Work Telephone <b>{application.Installer_New_worktel}</b></p>
                                                                <p>Company <b>{application.Installer_New_companyname}</b></p>
                                                                <p>Certification No. <b>{application.Installer_New_certno}</b></p>
                                                                <p className="mb-3">Email <b>{application.Installer_New_email}</b></p>
                                                                <p>Date of Final <b>{application.Installer_New_finaldate}</b></p>
                                                            </>    
                                                        : <p>No Data</p>}
                                                        </ListGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                    
                                                        <Table striped bordered hover>
                                                            <thead className="bg-info text-white">
                                                                <tr className="py-5">
                                                                    <th>Equipment No.</th>
                                                                    <th>QTY</th>
                                                                    <th>Rebate</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {application ? application.New_equipment.map(equipment => (
                                                                <tr key={equipment.newEquip_Invoice_no}>
                                                                    <td>{equipment.newEquip_Btu}</td>
                                                                    <td>{equipment.newEquip_Quantity}</td>
                                                                    <td>{equipment.newEquip_rebate}</td>
                                                                </tr>
                                                            )):  <tr><td>'Loading . . '</td></tr>
                                                            }
                                                            </tbody>
                                                        </Table>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="old_quipment_info">
                                            <Container className="ml-2 mr-2">
                                                <h3 className="mt-3 mb-3">Existing/Old Equipment Info </h3>

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
                                                <h3 className="mt-3 mb-3">Submitted Documents</h3>

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
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="verify_information">
                                            <Container className="ml-2 mr-2">
                                                <h3 className="mt-3 mb-3">Update Status</h3>
                                                <Row>
                                                    <Col md={12}>

                                                        <Modal show={showBatchModal} onHide={handleBatchModalClose}>
                                                            <Modal.Header closeButton>
                                                            <Modal.Title>
                                                                Batch Selection
                                                            </Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <Button onClick={() => addBatchHandler()}>Add Batch</Button> <br />
                                                                {batch_current?
                                                                    <MaterialTable 
                                                                        columns={[
                                                                            { title: "Code", field: "Batch_code" },
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
                                                                                <Button size="sm" variant="info" onClick={() => selectBatchHandler(rowdata)} ><i className="fa fa-edit"></i></Button>
                                                                                </>)
                                                                            }
                                                                        ]}
                                                                        data={
                                                                            (batch_current) ? batch_current : []
                                                                        }
                                                                        title="Batches"
                                                                    />
                                                                    : <></>
                                                                }
                                                            </Modal.Body>
                                                        </Modal>


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
                                <Col md={3}>
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
                                                        <h6>Commented test by armando</h6>
                                                        <small className="text-muted">August 27, 2021 3:56 PM</small>
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
                            <Container>
                                <Row>
                                    <Col md={8}>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="comment">
                                                <Form.Label>Comments</Form.Label>
                                                <Form.Control as="textarea" rows={5} />
                                            </Form.Group>
                                            <Button>Submit</Button>
                                        </Form>
                                        <hr />
                                        
                                            {
                                                comments ?
                                                comments.map(comment => (
                                                    <ListGroup className="mb-3" key={comment.Made_On}>
                                                        <ListGroup.Item>{comment.Made_By} <small className="text-muted">{comment.role}</small></ListGroup.Item>
                                                        <ListGroup.Item>{comment.Comment}</ListGroup.Item>
                                                        <ListGroup.Item>{comment.Made_On}</ListGroup.Item>
                                                    </ListGroup>
                                                ))
                                                : <p>Loading . . .</p>
                                            }


                                    </Col>
                                </Row>
                            </Container>
                        
                        </Tab.Container>
                    </>
                :
                <Container>
                  <MaterialTable 

                            columns={[
                                { title: "Name", field: "Control_Number", width:"20%" },
                                { title: "Creation Date", field: "Application_Date", width:"10%" },
                                { title: "Stage", field: "Stage", width:"10%" },
                                { title: "Status", field: "Status", width:"10%",
                                lookup: {'Processing':'Processing', 'Approved':'Approved'}
                                },
                                { title: "System Type", field: "System_Type", width:"10%",
                                lookup: {'CENTRAL AC':'CENTRAL AC'}
                                },
                                {
                                    title: "Action",
                                    field:"actions",
                                    filtering: false,
                                    editComponent: (props) =>{
                                        console.log(props);
                                        return (
                                            <Button>Payts</Button>
                                        )
                                    },
                                    render: (rowdata) => (
                                        <>
                                            <Button className="btn btn-sm btn-light" onClick={() => selectHandler(rowdata)}><i className="fa fa-edit"></i></Button>
                                        </>
                                    )
                                }
                            ]}
                            data={
                                applications
                            }
                            title="Applications"
                        />
                </Container>
            }
            
        </div>
    )
}

export default ApplicationForm
