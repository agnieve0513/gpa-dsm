import React, {useState, useEffect} from 'react'
import { Row, Col, Table, Form, ListGroup, Tabs, Modal, Tab, Container, Button, ButtonGroup, Nav, Offcanvas, Card, Spinner} from 'react-bootstrap'

import { listApplications, detailApplication, commentsApplication,
    addCommentAction,logsApplication, updateApplication} from '../../actions/applicationActions'
import { listBatchCurrent, addNewBatch } from '../../actions/batchActions'

import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {GridOptions} from "ag-grid-community";

import { useDispatch, useSelector } from 'react-redux'
// import MaterialTable from "material-table";

import './ApplicationForm.css'


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function ApplicationForm() {

    const [commentShow, setCommentShow] = useState(false);
    const [show, setShow] = useState(false);

    const handleCommentClose = () => setCommentShow(false);
    const handleCommentShow = () => setCommentShow(true);

    let obj = JSON.parse(localStorage.getItem('userInfo'))
    let roleId = obj.message.original.roleId

    const [new_eq_index, setNewEqIndex] = useState(0)
    const [old_eq_index, setOldEqIndex] = useState(0)
    const [count_equipment, setCountEquipment] = useState(0)
    
    const [showModal, setShowModal] = useState(false)
    const [showBatchModal, setBatchShowModal] = useState(false)
    const [showNewEquipmentInfo, setShowNewEquipmentInfo] = useState(false)
    const [showOldEquipmentInfo, setShowOldEquipmentInfo] = useState(false)
    const [equipmentInfo, setEquipmentInfo] = useState([])
    const [applicationId, setApplicationId] = useState(0)
    const [status, setStatus] = useState("")
    const [stage, setStage] = useState("")
    const [reason, setReason] = useState("")
    const [batch, setBatch] = useState("")
    const [comment, setComment] = useState("")

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

    const addComment = useSelector(state => state.addComment)
    const {error:commentError, loading:commentLoading, success:commentSucess} = addComment

    const batchCurrent = useSelector(state => state.batchCurrent)
    const { batch_current } = batchCurrent

    const batchAdd = useSelector(state => state.batchAdd)
    const { success:addBatchSuccess } = batchAdd

    // Grid State . . . 
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    // Grid Functions . . .
    const onGridReady = (params) => {

        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    
        const updateData = (data) => {
            var differentHeights = [80, 80, 80, 80];
            data.forEach(function (dataItem, index) {
                dataItem.rowHeight = differentHeights[index % 4];
            });
          setRowData(data);
        };
    
        updateData(applications);
      };

      const getRowHeight = (params) => {
        return params.data.rowHeight;
      };

        
        const onSelectionChanged = () => {
        var selectedRows = gridApi.getSelectedRows();
        setApplicationId(selectedRows[0].Application_Id)
        dispatch(detailApplication(selectedRows[0].Application_Id))
        dispatch(commentsApplication(selectedRows[0].Application_Id))
        dispatch(logsApplication(selectedRows[0].Application_Id))
        setShow(true)
      };

      const printState = () => {
        var filterState = gridApi.getFilterModel();
        console.log('filterState: ', filterState);
      };
    
      const saveState = () => {
        window.filterState = gridApi.getFilterModel();
        console.log('filter state saved');
      };
    
      const restoreState = () => {
        gridApi.setFilterModel(window.filterState);
        console.log('filter state restored');
      };
    
      const resetState = () => {
        gridApi.setFilterModel(null);
        console.log('column state reset');
      };

      //for filtering . . .
      const filterParams = {
        filterOptions: [
          'empty',
          {
            displayKey: 'evenNumbers',
            displayName: 'Even Numbers',
            test: function (filterValue, cellValue) {
              return cellValue != null && cellValue % 2 === 0;
            },
            hideFilterInput: true,
          },
          {
            displayKey: 'oddNumbers',
            displayName: 'Odd Numbers',
            test: function (filterValue, cellValue) {
              return cellValue != null && cellValue % 2 !== 0;
            },
            hideFilterInput: true,
          },
          {
            displayKey: 'blanks',
            displayName: 'Blanks',
            test: function (filterValue, cellValue) {
              return cellValue == null;
            },
            hideFilterInput: true,
          },
        ],
        suppressAndOrCondition: true,
      };
      const containsFilterParams = {
        filterOptions: [
          'contains',
          {
            displayKey: 'startsC',
            displayName: 'Starts With "C"',
            test: function (filterValue, cellValue) {
              return cellValue != null && cellValue.indexOf('a') === 0;
            },
            hideFilterInput: true,
          },
          {
            displayKey: 'startsR',
            displayName: 'Starts With "R"',
            test: function (filterValue, cellValue) {
              return cellValue != null && cellValue.indexOf('n') === 0;
            },
            hideFilterInput: true,
          },
        ],
      };
      const equalsFilterParams = {
        filterOptions: [
          'equals',
          {
            displayKey: 'equalsWithNulls',
            displayName: 'Equals (with Nulls)',
            test: function (filterValue, cellValue) {
              if (cellValue == null) return true;
              const parts = cellValue.split('/');
              const cellDate = new Date(
                Number(parts[2]),
                Number(parts[1] - 1),
                Number(parts[0])
              );
              return cellDate.getTime() === filterValue.getTime();
            },
          },
        ],
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          const dateAsString = cellValue;
          if (dateAsString == null) return -1;
          const dateParts = dateAsString.split('/');
          const cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
        browserDatePicker: true,
      };
      const notEqualsFilterParams = {
        filterOptions: [
          'notEqual',
          {
            displayKey: 'notEqualNoNulls',
            displayName: 'Not Equals without Nulls',
            test: function (filterValue, cellValue) {
              if (cellValue == null) return false;
              return cellValue !== filterValue.toLowerCase();
            },
          },
        ],
      };

    useEffect(() => {
        dispatch(listApplications())
        dispatch(listBatchCurrent())
        dispatch(commentsApplication(applicationId))

    }, [dispatch, application, successUpdate, addBatchSuccess,commentSucess])

    const selectHandler = () => {
        
        
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
                selectBatchHandler(1)
                // setBatchShowModal(true)
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

    // TODO: Needed some revisions here if how to automate the adding of batch
    // !This one is for adding to supervisor with batch
    const selectBatchHandler = (batch_id)=>{
        if(window.confirm('Are you sure you want to send to Supervisor?'))
        {
            setBatch(batch_id)
            setStatus(status)
            setStage(stage)
            setBatchShowModal(false)

            if(window.confirm('Are you sure you want to process application?'))
            {
                dispatch(updateApplication(applicationId,status,stage,reason, batch_id))
                alert("The Application was added to a batch and is sent to supervisor!")
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

    const showNewEquipmentInformation = (index)=>
    {
        setNewEqIndex(index)
        console.log(application)
    }

    const addCommentHandler = () => 
    {
        dispatch(addCommentAction(applicationId, comment))

        const Toast = MySwal.mixin({
            toast: true,
            position: 'bottom-right',
            iconColor: 'white',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 3500,
            timerProgressBars: true
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Comment Sent',
            text: ''
          })

        setComment("")
    }

    const changeCommentHandler = (text) => 
    {
        setComment(text)
    }

    // testing lng ...
    const ButtonClick = () => {
        return(
            <Button size="sm" onClick={()=>selectHandler(rowData)}>View</Button>
        );
    }


    return (
        <div>
            {
                show ?  
                    <Container>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="application_information">
                                <Button className="mb-3 btn btn-light" onClick={()=>resetHandler()}><i className="fa fa-arrow-left"></i> Back to Application</Button>
                                <div id="applicationFormNav">
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
                                        {/* <Nav.Item className="me-1">
                                        <Nav.Link eventKey="verify_information">Update Status</Nav.Link>
                                        </Nav.Item> */}
                                    </Nav>
                                </div>
                            <Row>
                                <Col md={9}>
                                    <Tab.Content>
                                        {/* Applicaiton Information */}
                                        <Tab.Pane eventKey="application_information">
                                            <Container className="ml-2 mr-2">
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
                                            </Container>
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

                                    <Button variant="info" onClick={handleCommentShow} className="me-2">
                                        View Comments Section
                                    </Button>
                                </Col>
                            </Row>
                            <hr />
                            {/* Comments section */}
                            
                            <Offcanvas show={commentShow} placement={'bottom'}  onHide={handleCommentClose} id="commentCanvas">
                                <Offcanvas.Header closeButton>
                                <Offcanvas.Title></Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Row>
                                        <Col md={2}></Col>
                                        <Col md={8}>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="comment">
                                                    <Form.Label><b>Comments</b></Form.Label>
                                                    <Form.Control as="textarea" rows={5}
                                                        onChange={(e)=>changeCommentHandler(e.target.value)}
                                                        value={comment}
                                                    />
                                                </Form.Group>
                                                <Button onClick={()=> addCommentHandler()}>Submit</Button>
                                            </Form>
                                            <hr />
                                            
                                                {
                                                    comments ?
                                                    comments.map(comment => (
                                                        <Card className="p-3 mb-1">
                                                            <h6>{comment.Comment}</h6>
                                                            <span>{comment.Made_By} - {comment.role}</span>
                                                            <small className="text-muted">{comment.Made_On}</small>
                                                        </Card>
                                                        
                                                    ))
                                                    : <Spinner animation="border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                       </Spinner>
                                                }


                                        </Col>
                                        <Col md={2}></Col>
                                    </Row>
                                </Offcanvas.Body>
                            </Offcanvas>
                        </Tab.Container>
                    </Container>
                :
                <Container>
                    <div className="ag-theme-alpine" style={{height: 400, width: 100+'%'}}>
                    <div className="mb-2">
                        {/* <Button onClick={() => printState()} className="me-2" variant={"info"}>Print State</Button> */}
                        <Button onClick={() => saveState()} className="me-2" size='sm' variant={"success"}>Save State</Button>
                        <Button onClick={() => restoreState()} className="me-2" size='sm' variant={"secondary"}>Restore State</Button>
                        <Button onClick={() => resetState()} className="me-2" size='sm' variant={"danger"}>Reset Filter</Button>
                    </div>
                        <AgGridReact
                            frameworkComponents={{
                                buttonAction: ButtonClick
                            }}
                            defaultColDef={{
                            flex: 1,
                            minWidth: 150,
                            sortable: true,
                            filter: true,
                            resizable: true,
                            }}
                            localeTextFunc={function (key, defaultValue) {
                            if (key === 'notEqualNoNulls') {
                                return '* Not Equals (No Nulls) *';
                            }
                            return defaultValue;
                            }}
                            rowSelection={'single'}
                            onCellDoubleClicked ={onSelectionChanged}
                            getRowHeight={getRowHeight}
                            onGridReady={onGridReady}
                            rowData={applications}>
                            <AgGridColumn field="Control_Number" filterParams={containsFilterParams} />
                            <AgGridColumn field="Application_Date" filterParams={containsFilterParams} />
                            <AgGridColumn field="Stage" filterParams={containsFilterParams}/>
                            <AgGridColumn field="Status" filterParams={containsFilterParams}/>
                            <AgGridColumn field="System_Type" filterParams={containsFilterParams}/>
                        </AgGridReact>
                    </div>
                </Container>
            }
            
        </div>
    )
}

export default ApplicationForm
