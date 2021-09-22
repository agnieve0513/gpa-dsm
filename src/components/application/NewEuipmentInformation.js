import React, {useState, useEffect} from 'react'
import { Row, Col, Form, Button, Table} from 'react-bootstrap'

import { loadCustomerEquipManufacturer,loadCustomerEquipModel,loadCustomerEquipmentDetail } from '../../actions/customerAction'
import { useDispatch, useSelector } from 'react-redux'
import MaterialTable from "material-table"

function NewEuipmentInformation(props) {
    
    const dispatch = useDispatch()

    const customerEquipManufacturer = useSelector(state => state.customerEquipManufacturer)
    const {loading:manufacturerLoading,error:manufacturerError, success:manufacturerSuccess,manufacturers} = customerEquipManufacturer

    const customerEquipModel = useSelector(state => state.customerEquipModel)
    const {loading:modelLoading,error:modelError, success:modelSuccess, models} = customerEquipModel

    const customerEquipmentDetail = useSelector(state => state.customerEquipmentDetail)
    const {loading:equipDetailLoading,error:equipDetailError, success:equipDetailSuccess, equipment_detail} = customerEquipmentDetail

    const changeSystemTypeHandler = (e) => {
        props.setSystemType(e.target.value)
        dispatch(loadCustomerEquipManufacturer(e.target.value))
        console.log(manufacturers)
    }

    const changeManufacturerHandler = (e) => {
        props.setManufacturer(e.target.value)
        dispatch(loadCustomerEquipModel(props.system_type, e.target.value))
        props.setModelList(models)
    }

    const changeModelHandler = (e) => {
        props.setModelNo(e.target.value)
        dispatch(loadCustomerEquipmentDetail(e.target.value))
    
        if(equipment_detail.length)
        {
            props.setBtu(equipment_detail[0].btu)
            props.setVendor(equipment_detail[0].vendor)
        }
        else
        {
            props.setBtu("N/A")
            props.setVendor("N/A")
        }
    }

    useEffect(() => {
    }, [dispatch,])

    const addEquipmentHandler = ()=> {
        const obj = {
            "system_type": props.system_type,
            "manufacturer": props.manufacturer
        }
        props.setNewEquipments(props.new_equipments.concat(obj))
    }

    return (
        <Row>
            <Col md={3}></Col>
            <Col md={6}>
                <h4 className="text-center text-info">NEW EQUIPMENT INFORMATION</h4>
                <Row>
                    <Col md={8}>
                        <Form.Group controlId='system_type' className="mb-3">
                            <Form.Label>SYSTEM TYPE</Form.Label>
                            <Form.Select onChange={(e)=>changeSystemTypeHandler(e)} value={props.system_type} >
                            <option value="Central AC">Central AC</option>
                            <option value="Split AC">Split AC</option>
                            <option value="Window AC">Window AC</option>
                            <option value="Dryer">Dryer</option>
                            <option value="Washer">Washer</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='manufacturer' className="mb-3">
                            <Form.Label>MANUFACTURER</Form.Label>
                            <Form.Select onChange={(e)=>changeManufacturerHandler(e)} 
                            value={props.manufacturer} >
                                    {manufacturers?
                                        manufacturers.map(ce => (
                                         <option key={ce.Manufacturer} value={ce.Manufacturer}>{ce.Manufacturer}</option>
                                    ))
                                      : <option>Loading . . .</option>}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='model_no' className="mb-3">
                            <Form.Label>MODEL NUMBER</Form.Label>
                            <Form.Select onChange={(e)=>changeModelHandler(e)} 
                            value={props.model_no} >
                                {models? 
                                models.map(me => (
                                    <option key={me.id} value={me.id}>{me.indoor_model}</option>
                                ))
                                : <option>Loading . . . </option>}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='quantity' className="mb-3">
                            <Form.Label>QUANTITY</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setQuantity(e.target.value)}
                                value={props.quantity}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='btu' className="mb-3">
                            <Form.Label>BTU</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setBtu(e.target.value)}
                                value={props.btu}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId='vendor' className="mb-3">
                            <Form.Label>VENDOR</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setVendor(e.target.value)}
                                value={props.vendor}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='type' className="mb-3">
                            <Form.Label>TYPE</Form.Label>
                            <Form.Select onChange={(e)=>props.setType(e.target.value)} 
                            value={props.type} >
                                
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId='invoice_no' className="mb-3">
                            <Form.Label>INVOICE#</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setInvoiceNo(e.target.value)}
                                value={props.invoice_no}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='purchase_date' className="mb-3">
                            <Form.Label>PURCHASE DATE (Date on invoice)</Form.Label>
                            <Form.Control
                                type='date'
                                onChange={(e)=>props.setPurchaseDate(e.target.value)}
                                value={props.purchase_date}
                                required
                            >
                            </Form.Control>
                        </Form.Group>

                    </Col>

                </Row>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                    <Row>
                    <Button variant="success" size="lg" onClick={()=> addEquipmentHandler()} className="d-flex justify-content-center">Add Equipment</Button>
                    </Row>
                    </Col>
                    <Col md={4}></Col>
                </Row>

                <Row className="mt-3">
                    <Col md={12}>
                        <MaterialTable 
                            
                            columns={[
                                { title: "System Type", field: "system_type" },
                                { title: "Manufacturer", field: "manufacturer" },
                                { title: "Package", field: "model",},
                                { title: "Energy Start Certification", field: "is_energy_start_certificate",
                                    render: (rowdata) => (
                                        (rowdata.is_energy_start_certificate === 1)? 'True' : 'False'
                                    ),
                                    lookup: {'True': 'True', 'False':'False'},
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
                                    <Button className="btn btn-sm btn-light" ><i className="fa fa-edit"></i></Button>
                                    </>)
                                }
                            ]}
                            data={
                                (props.new_equipments) ? props.new_equipments : []
                            }
                            title="Equipments"
                        />
                       
                    </Col>
                </Row>

                
                <h4 className="text-center text-info mt-5">INSTALLER'S INFORMATION</h4>               
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='technician_name' className="mb-3">
                            <Form.Label>TECHNICIAN NAME*</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setTechnicianName(e.target.value)}
                                value={props.technician_name}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='work_tel' className="mb-3">
                            <Form.Label>WORK TELEPHONE*</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setWorkTel(e.target.value)}
                                value={props.work_tel}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group controlId='company_name' className="mb-3">
                            <Form.Label>COMPANY NAME*</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setCompanyName(e.target.value)}
                                value={props.company_name}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='date_final_installation' className="mb-3">
                            <Form.Label>DATE OF FINAL INSTALLATION*</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setDateFinalInstallation(e.target.value)}
                                value={props.date_final_installation}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='tech_email' className="mb-3">
                            <Form.Label>EMAIL*</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>props.setTechEmail(e.target.value)}
                                value={props.tech_email}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Col>
            <Col md={3}></Col>
        </Row>
    )
}

export default NewEuipmentInformation
