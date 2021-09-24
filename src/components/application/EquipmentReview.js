import React, {useState} from 'react'
import { Row, Col, Tabs, Tab, ListGroup,
    Table, Button, ButtonGroup, Container,
    Card } from 'react-bootstrap';

import './EquipmentReview.css';


function EquipmentReview(props) {

    console.log("new equipment length",props.new_equipments.length)
    console.log(props.old_equipments)

    const [new_eq_index, setNewEqIndex] = useState(0)
    const [old_eq_index, setOldEqIndex] = useState(0)

    const backToApplicationHandler = () => {
        props.setStep(2)
    }

    const backToNewEquipmentHandler = ()=> {
        props.setStep(3)
    }

    const backToOldEquipmentHandler = ()=> {
        props.setStep(4)
    }

    const showNewEquipmentInformation = (index)=>
    {
        setNewEqIndex(index)
    }

    const showOldEquipmentInformation = (index)=>
    {
        setOldEqIndex(index)
    }

    return (
        <Row>
            <Col md={1}></Col>
            <Col md={10}>
                <h4 className="text-center text-info mb-3">Equipment Review</h4>
                <Card className="mb-5" id="CardForReview">
                    <Card.Body>
                            <Tabs
                            defaultActiveKey="application_information"
                            transition={false}
                            id=""
                            className="mb-3"
                            >
                            <Tab eventKey="application_information" title="Applicant Information">
                                <Container className="ml-2 mr-2">
                                    <h3 className="mt-3 text-info">Applicant Info <button className="btn btn-danger btn-sm" onClick={()=> backToApplicationHandler()}><i className="fa fa-edit"></i> Edit Information</button></h3>
                                    <ListGroup>
                                        <p>GPA Electric Account Number  <b>{props.account_no}</b> </p>
                                        <p>Bill ID <b>{props.bill_id}</b> </p>
                                        <p>Applicant Name <b>{props.lastname}, {props.firstname} {props.middlename} </b>
                                        </p>
                                        <p>Installation Address <b>{props.service_location}</b> </p>
                                        <p>City <b>{props.city_village}</b> </p>
                                        <p>ZIP <b>{props.zipcode}</b> </p>
                                        <p>Email <b>{props.email}</b> </p>
                                        <p>Telephone Number <b>{props.tel_no}</b> </p>
                                        <p>Owner of the Residential Property <b>{props.is_applicant_owner}</b> </p>
                                        <p>Mailing Address <b>{props.mailing_address}</b> </p>
                                        <p>Home Size (approx. sq. ft.) <b>{ props.home_size }</b> </p>
                                        <p>Home Age (appox. year built) <b>{ props.home_age }</b> </p>
                                        <p>New Construction <b>{props.is_new_construction}</b> </p>
                                        <p>Home Type <b>{props.home_type}</b> </p>
                                        
                                    </ListGroup>
                                </Container>
                            </Tab>
                            <Tab eventKey="new_quipment_info" title="New Equipment Information">
                                <Container className="ml-2 mr-2">
                                    <h3 className="mt-3 mb-3 text-info">New Equipment Info <button onClick={()=> backToNewEquipmentHandler()} className="btn btn-danger btn-sm"><i className="fa fa-edit"></i> Edit Information</button></h3>
                                    {
                                        props.new_equipments.length >=1?
                                        <ButtonGroup className="me-2 mb-3" aria-label="First group">
                                        <Button className="btn btn-sm" onClick={()=>showNewEquipmentInformation(0)} variant="info">E1</Button>{' '}
                                        {
                                            props.new_equipments.length > 1 ?
                                            <Button onClick={()=>showNewEquipmentInformation(1)} className="btn btn-sm" variant="secondary">E2</Button>:
                                            props.new_equipments.length > 2 ?
                                            <Button onClick={()=>showNewEquipmentInformation(2)} className="btn btn-sm" variant="secondary">E3</Button>:
                                            props.new_equipments.length > 3 ?
                                            <Button onClick={()=>showNewEquipmentInformation(3)} className="btn btn-sm" variant="secondary">E4</Button>:
                                            props.new_equipments.length > 4 ?
                                            <Button onClick={()=>showNewEquipmentInformation(4)} className="btn btn-sm" variant="secondary">E5</Button>:<></>
                                        }
                                    </ButtonGroup>
                                    :<></>
                                    }
                                    <Row>
                                        <Col md={6}>
                                        {
                                            props.new_equipments.length >= 1 ?
                                            <>
                                            <ListGroup className="mb-3">
                                            <p>System Type <b> { props.new_equipments[new_eq_index].system_type } </b> </p>
                                            <p>Vendor <b>{ props.new_equipments[new_eq_index].vendor }</b> </p>
                                            <p>Quantity <b>{ props.new_equipments[new_eq_index].quantity }</b></p>
                                            <p>BTU  <b>{ props.new_equipments[new_eq_index].btu }</b></p>
                                            <p>Manufacturer  <b>{ props.new_equipments[new_eq_index].manufacturer }</b></p>
                                            <p>Model Number  <b>{ props.new_equipments[new_eq_index].model_no }</b></p>
                                            <p>Invoice#  <b>{ props.new_equipments[new_eq_index].invoice_no }</b></p>
                                            <p>Purchase Date <b>{ props.new_equipments[new_eq_index].purchase_date }</b></p>
                                            <p>Type <b>{ props.new_equipments[new_eq_index].type }</b></p>
                                            <p>Tons <b>{ props.new_equipments[new_eq_index].tons }</b></p>
                                            <p>Install Date <b>{ props.new_equipments[new_eq_index].purchase_date }</b></p>
                                        </ListGroup>

                                        <h3 className="mt-3 mb-3 text-info">Installer Information</h3>
                                        <ListGroup className="mb-3">
                                            <p>Technician Name <b> { props.new_equipments[new_eq_index].installer_information.technician_name } </b></p>
                                            <p>Work Telephone <b> { props.new_equipments[new_eq_index].installer_information.work_tel } </b></p>
                                            <p>Company <b> { props.new_equipments[new_eq_index].installer_information.company_name } </b></p>
                                            <p>Technician AC <b> { props.new_equipments[new_eq_index].installer_information.technician_name } </b></p>
                                            <p>Certification No. <b> { props.new_equipments[new_eq_index].installer_information.technician_cert_no } </b></p>
                                            <p className="mb-3">Email <b> { props.new_equipments[new_eq_index].installer_information.email } </b></p>
                                            <p>Date of Final <b> { props.new_equipments[new_eq_index].installer_information.date_final_installation } </b></p>
                                        </ListGroup>
                                            </>
                                            :<>No Equipment</>
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
                                                    {props.new_equipments.map(eq =>(
                                                        <tr>
                                                        <td className="p-3">{(eq.id+1)}</td>
                                                        <td className="p-3">{eq.quantity}</td>
                                                    </tr>
                                                    ))}
                                                    <tr>
                                                        <td className="p-3" colSpan="2" className="text-end">TOTAL</td>
                                                        <td className="p-3">$0.00</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Container>
                            </Tab>
                            <Tab eventKey="old_quipment_info" title="Old/Existing Equipment Information">
                                <Container className="ml-2 mr-2">
                                    <h3 className="mt-3 mb-3 text-info">Existing/Old Equipment Info <button  onClick={()=> backToOldEquipmentHandler()} className="btn btn-danger btn-sm" ><i className="fa fa-edit"></i> Edit Information</button></h3>

                                    {
                                        props.old_equipments.length >= 1?
                                        <ButtonGroup className="me-2 mb-3" aria-label="First group">
                                        <Button className="btn btn-sm" onClick={()=>showOldEquipmentInformation(0)} variant="info">E1</Button>{' '}
                                        {
                                            props.old_equipments.length > 1 ?
                                            <Button onClick={()=>showOldEquipmentInformation(1)} className="btn btn-sm" variant="secondary">E2</Button>:
                                            props.old_equipments.length > 2 ?
                                            <Button onClick={()=>showOldEquipmentInformation(2)} className="btn btn-sm" variant="secondary">E3</Button>:
                                            props.old_equipments.length > 3 ?
                                            <Button onClick={()=>showOldEquipmentInformation(3)} className="btn btn-sm" variant="secondary">E4</Button>:
                                            props.old_equipments.length > 4 ?
                                            <Button onClick={()=>showOldEquipmentInformation(4)} className="btn btn-sm" variant="secondary">E5</Button>:<></>
                                        }
                                    </ButtonGroup>:<></>
                                    }
                                    <ListGroup className="mb-3">
                                        {
                                            props.old_equipments.length >= 1?
                                            <>
                                            <p>System Type <b>{props.old_equipments[old_eq_index].system_type}</b> </p>
                                            <p>BTU <b>{props.old_equipments[old_eq_index].btu}</b></p>
                                            <p>Years <b>{props.old_equipments[old_eq_index].years}</b></p>
                                            <p>Quantity <b>{props.old_equipments[old_eq_index].quantity}</b></p>
                                            <p>Tons <b>{props.old_equipments[old_eq_index].tons}</b></p>
                                            <p>Equipment condition prior to removal <b>{[old_eq_index].is_equipment_condition}</b></p>
                                            <p>Seer <b>{props.old_equipments[old_eq_index].seer}</b></p>
                                            <p>Disposal Party <b>{props.old_equipments[old_eq_index].disposal_party}</b></p>
                                            <p>Date <b>{props.old_equipments[old_eq_index].date}</b></p>
                                            </>
                                            : <>No Data</>
                                        }
                                    </ListGroup>
                                </Container>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={1}></Col>
        </Row>
    )
}

export default EquipmentReview
