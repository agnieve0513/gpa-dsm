import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Button,Modal, Form } from 'react-bootstrap'
import { listBatch, listBatchApplication} from '../../actions/batchActions'
import { updateApplication} from '../../actions/applicationActions'

import { useDispatch, useSelector } from 'react-redux'

import MaterialTable from "material-table"

function BatchForm() {

    let obj = JSON.parse(localStorage.getItem('userInfo'))
    let roleId = obj.message.original.roleId

    const [showModal, setShowModal] = useState(false)
    const [applicationId, setApplicationId] = useState(0)
    const [status, setStatus] = useState("")
    const [stage, setStage] = useState("")
    const [reason, setReason] = useState("")
    const [selectIds, setSelectedIds] = useState([])

    const handleModalClose = () => setShowModal(false)

    const dispatch = useDispatch()

    const batchList = useSelector(state => state.batchList)
    const {batches} = batchList

    const batchApplication = useSelector(state => state.batchApplication)
    const {batch_applications} = batchApplication

    const applicationUpdate = useSelector(state => state.applicationUpdate)
    const {error:updateError, loading:updateLoading, success:successUpdate} = applicationUpdate

    useEffect(() => {
        dispatch(listBatch())
    }, [dispatch, batch_applications,successUpdate])

    const selectHandler = (rowdata) => {
        dispatch(listBatchApplication(rowdata.Id))
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


    return (
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
                            { title: "Made on", field: "Made_On"},
                            
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
                                    <input type="checkbox"
                                    onChange={ (e) => getSelected(e, rowdata.Application_Id) }
                                    ></input>
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
                                            batch_applications ? 
                                            <>
                                                <Button className="me-2" variant={"info"} onClick={()=> changeStatusHandler(1) } size={"sm"}><i className="fa fa-check"></i></Button>
                                                <Button className="me-2" variant={"danger"} onClick={()=> changeStatusHandler(3) } size={"sm"}><i className="fa fa-times"></i></Button>
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
    )
}

export default BatchForm
