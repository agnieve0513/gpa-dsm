import React, {useState, useEffect} from 'react'
import { Row, Col, Table, Tab, Container, Nav} from 'react-bootstrap'

import { listEquipments } from '../../actions/equipmentActions'
import { useDispatch, useSelector } from 'react-redux'

import {   } from 'react-bootstrap'
import MaterialTable from "material-table"

import './EquipmentForm.css'

function EquipmentForm() {

    const dispatch = useDispatch()

    const equipmentList = useSelector(state => state.equipmentList)
    const {equipments} = equipmentList

    useEffect(() => {
        dispatch(listEquipments())
    }, [dispatch])
    
    return (
        <Container>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="air_condition">
                    <Row>
                        <Col md={6} id="equipmentFormNav">
                            <Nav variant="pills">
                                    <Nav.Item className="mr-1">
                                        <Nav.Link eventKey="air_condition">Air Conditioner</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="mr-1">
                                        <Nav.Link eventKey="washer_dryer">Washer/Dryer</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="mr-1">
                                        <Nav.Link eventKey="commercial_air_conditioner">Commercial Air Conditioner</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                        </Col>
                        <Col md={6}>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="commercial_air_conditioner">
                                <MaterialTable 
                                        detailPanel={equipmentDetail => {
                                            return (
                                                <Container className="m-3">
                                                    <h4>Details</h4>
                                                    <Table borderless hover>
                                                        <thead></thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Vendor 1</td>
                                                                <td>{equipmentDetail.vendor_1}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Vendor 2</td>
                                                                <td>{equipmentDetail.vendor_2}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Vendor 3</td>
                                                                <td>{equipmentDetail.vendor_3}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Seer</td>
                                                                <td>{equipmentDetail.seer}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Tons</td>
                                                                <td>{equipmentDetail.tons}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>BTU</td>
                                                                <td>{equipmentDetail.cu_ft}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Notes</td>
                                                                <td>{equipmentDetail.notes}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Date Added</td>
                                                                <td>{equipmentDetail.date_added}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Last Date Updated</td>
                                                                <td>{equipmentDetail.last_updated}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Container>
                                            )
                                        }}

                                        // options={{
                                        //     filtering: true
                                        // }}
                                        
                                        columns={[
                                            { title: "Type", field: "type" },
                                            { title: "Manufacturer", field: "manufacturer" },
                                            { title: "Package", field: "model",},
                                            { title: "Energy Start Certification", field: "is_energy_start_certificate",
                                                render: (rowdata) => (
                                                    (rowdata.is_energy_start_certificate === 1)? 'True' : 'False'
                                                ),
                                                lookup: {'True': 'True', 'False':'False'},
                                            },
                                            { title: "Rebate", field: "rebate"},
                                            { title: "Cu. Ft", field: "cu_ft"},
                                        ]}
                                        data={
                                            (equipments) ? equipments.dryer_list: []
                                        }
                                        title=""
                                        options={{headerStyle: {fontSize: 16}}}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey="air_condition">

                                    <MaterialTable 
                                        detailPanel={equipmentDetail => {
                                            return (
                                                <Container className="m-3">
                                                    <h4>Details</h4>
                                                    <Table borderless hover>
                                                        <thead></thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Vendor 1</td>
                                                                <td>{equipmentDetail.vendor_1}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Vendor 2</td>
                                                                <td>{equipmentDetail.vendor_2}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Vendor 3</td>
                                                                <td>{equipmentDetail.vendor_3}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Vendor 4</td>
                                                                <td>{equipmentDetail.vendor_4}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Vendor 5</td>
                                                                <td>{equipmentDetail.vendor_5}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Seer</td>
                                                                <td>{equipmentDetail.seer}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Tons</td>
                                                                <td>{equipmentDetail.tons}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>BTU</td>
                                                                <td>{equipmentDetail.btu_h}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Notes</td>
                                                                <td>{equipmentDetail.notes}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Date Added</td>
                                                                <td>{equipmentDetail.date_added}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Last Date Updated</td>
                                                                <td>{equipmentDetail.last_updated}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Container>
                                            )
                                        }}

                                        // options={{
                                        //     filtering: true
                                        // }}

                                        columns={[
                                            { title: "Type", field: "type"},
                                            { title: "Manufacturer", field: "manufacturer"},
                                            { title: "Indoor Model", field: "indoor_model"},
                                            { title: "Outdoor Model", field: "outdoor_model"},
                                            { title: "Rebate", field: "rebate"},
                                        ]}
                                        data={
                                            (equipments) ? equipments.ac_list: []
                                        }
                                        title=""
                                        options={{headerStyle: {fontSize: 16}}}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey="washer_dryer">

                                    <MaterialTable 
                                        detailPanel={equipmentDetail => {
                                            return (
                                                <Container className="m-3">
                                                    <h4>Details</h4>
                                                    <Table borderless hover>
                                                        <thead></thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Vendor 1</td>
                                                                <td>{equipmentDetail.vendor_1}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Vendor 2</td>
                                                                <td>{equipmentDetail.vendor_2}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Vendor 3</td>
                                                                <td>{equipmentDetail.vendor_3}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Seer</td>
                                                                <td>{equipmentDetail.seer}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Tons</td>
                                                                <td>{equipmentDetail.tons}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>BTU</td>
                                                                <td>{equipmentDetail.cu_ft}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Notes</td>
                                                                <td>{equipmentDetail.notes}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Date Added</td>
                                                                <td>{equipmentDetail.date_added}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Last Date Updated</td>
                                                                <td>{equipmentDetail.last_updated}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Container>
                                            )
                                        }}

                                        // options={{
                                        //     filtering: true
                                        // }}
                                        
                                        columns={[
                                            { title: "Type", field: "type" },
                                            { title: "Manufacturer", field: "manufacturer" },
                                            { title: "Package", field: "model",},
                                            { title: "Energy Start Certification", field: "is_energy_start_certificate",
                                                render: (rowdata) => (
                                                    (rowdata.is_energy_start_certificate === 1)? 'True' : 'False'
                                                ),
                                                lookup: {'True': 'True', 'False':'False'},
                                            },
                                            { title: "Rebate", field: "rebate"},
                                            { title: "Cu. Ft", field: "cu_ft"},
                                        ]}
                                        data={
                                            (equipments) ? equipments.dryer_list: []
                                        }
                                        title=""
                                        options={{headerStyle: {fontSize: 16}}}
                                    />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                    </Tab.Container>
        </Container>
    )
}

export default EquipmentForm
