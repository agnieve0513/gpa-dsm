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
        showRebateHandler()

        props.setSystemType(e.target.value)
        props.setNewEquipments([])
        dispatch(loadCustomerEquipManufacturer(e.target.value))
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
            props.setRebate(equipment_detail[0].rebate)
            props.setSeer(equipment_detail[0].seer)
        }
        else
        {
            props.setBtu("N/A")
            props.setVendor("N/A")
        }
    }

    useEffect(() => {
        showTable()
    }, [dispatch, props.new_equipments])

    const addEquipmentHandler = ()=> {
        
        const obj = {

            "control_no":  props.control_no,
            "id":  props.new_equipments.length,
            "system_type": props.system_type,
            "manufacturer": props.manufacturer,
            "model_no": props.model_no,
            "quantity": props.quantity,
            "btu": props.btu,
            "size": props.size,
            "rebate": props.rebate,
            "vendor": props.vendor,
            "type": props.type,
            "invoice_no": props.invoice_no,
            "purchase_date": props.purchase_date,

            "installer_information" : {
                "technician_name" : props.technician_name, 
                "work_tel" : props.work_tel,
                "company_name" : props.company_name,
                "technician_cert_no" : props.technician_cert_no,
                "date_final_installation": props.date_final_installation,
                "contact" : props.tech_contact
            }
        }
        props.setNewEquipments(props.new_equipments.concat(obj))
    }

    const deleteEquipmentHandler= (rowdata)=> {
        const index = props.new_equipments.indexOf(rowdata)
        const eqs = props.new_equipments
        
        if (index > -1) {
            eqs.splice(index, 1)
            props.setNewEquipments(eqs)
        }
        dispatch(loadCustomerEquipManufacturer("Central AC"))
    }

    const installerCertificationHandler = () => {
        if(props.system_type === "Dryer" || props.system_type === "Washer")
        {
            return(
                <Row>
                    {
                        invoiceReceipt(12)
                    }
                </Row>
            )
        }
        else
        {
            return (
                <Row>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId='installer_certification' className="mb-3">
                            <Form.Label>INSALLER'S CERTIFICATION*</Form.Label>
                            <Form.Control
                                type='file'
                                placeholder=''
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    {
                        invoiceReceipt(6)
                    }
                </Row>
            )
        }
    }

    const invoiceReceipt = (colLen) => {
        return (
            <Col md={colLen} className="mb-3">
                <Form.Label>INVOICE RECEIPT*</Form.Label>
                <Form.Control
                    type='file'
                    placeholder=''
                    required
                />
            </Col>
        )
    }

    const showTable = () =>{
        return (<MaterialTable 
            columns={[
                { title: "System Type", field: "system_type" },
                { title: "Manufacturer", field: "manufacturer" },
                { title: "Quantity", field: "quantity",},
                { title: "Type", field: "type",},
                { title: "Purchase Date", field: "purchase_date",},
                {
                title: "Action",
                field:"actions",
                width:"10%",
                editComponent: (props) =>
                {
                    return (
                        <Button></Button>
                    )
                },
                render: (rowdata) => (
                    <>
                    {/* <Button variant="light" size="sm" ><i className="fa fa-edit"></i></Button> */}
                    <Button variant="danger" onClick={()=>deleteEquipmentHandler(rowdata)} size="sm" ><i className="fa fa-trash"></i></Button>
                    </>)
                }
            ]}
            data={
                 props.new_equipments.length ===0 ? [] : props.new_equipments
            }
            title="Equipments"
        />)
    }

    const showRebateHandler = () => {
        if(props.system_type !== "Dryer" || props.system_type !== "Washer")
        {
            return (
                <>
                    <Form.Group controlId='rebate'>
                    <Form.Label>REBATE</Form.Label>
                    <Form.Control
                        type='number'
                        onChange={(e)=>props.setRebate(e.target.value)}
                        value={props.rebate}
                        required
                        disabled={true}
                    >
                    </Form.Control>
                    </Form.Group>
                </>
                    
            )
        }
        else
        {
            return (<></>)
        }
    }
   
    const handleNumericFields = (input, propVar) => {
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex
        if (input.value === '' || re.test(input.value)) {
            props[propVar](input.value)
        }
    }

    const today = new Date()
    let years = []
    for(var i=today.getFullYear(); i>=1950; i--) {
        years.push(i)
    }

    return (
            <Row>
            <Col md={3}></Col>
            <Col md={6}>
                {/* Row for installer's information */}
                <h4 className="text-center text-info mt-5">INSTALLER'S INFORMATION</h4>               
                <Row>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId='technician_name'>
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
                        { props.technician_name === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}

                    </Col>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId='work_tel' >
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
                        { props.work_tel === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}

                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="mb-3">
                        <Form.Group controlId='company_name'>
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
                        { props.company_name === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}

                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId='date_final_installation'>
                            <Form.Label>DATE OF FINAL INSTALLATION*</Form.Label>
                            <Form.Control
                                type='date'
                                placeholder=''
                                onChange={(e)=>props.setDateFinalInstallation(e.target.value)}
                                value={props.date_final_installation}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                        { props.date_final_installation === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}

                    </Col>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId='tech_contact'>
                            <Form.Label>CONTACT NO*</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder=''
                                onChange={(e)=>handleNumericFields(e.target, 'setTechContact')}
                                value={props.tech_contact}
                            >
                            </Form.Control>
                        </Form.Group>
                        { props.tech_contact === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}

                    </Col>
                </Row>
                {
                    installerCertificationHandler()
                }

                <h4 className="text-center text-info">NEW EQUIPMENT INFORMATION</h4>
                <Row>
                    <Col md={8} className="mb-3">
                        <Form.Group controlId='system_type'>
                            <Form.Label>SYSTEM TYPE</Form.Label>
                            <Form.Select onChange={(e)=>changeSystemTypeHandler(e)} value={props.system_type} >
                            
                            <option value="Central AC">Central AC</option>
                            <option value="Central AC">Central AC - Commercial</option>
                            <option value="Split AC">Split AC</option>
                            <option value="Split AC">Split AC - Commercial</option>
                            <option value="Window AC">Window AC</option>
                            <option value="Dryer">Dryer</option>
                            <option value="Washer">Washer</option>
                            </Form.Select>
                        </Form.Group>
                        { props.system_type === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}

                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId='manufacturer' className="mb-3">
                            <Form.Label>MANUFACTURER</Form.Label>
                            <Form.Select onChange={(e)=>changeManufacturerHandler(e)} 
                            value={props.manufacturer} >
                                    <option disabled selected>Select Manufacturer</option>

                                    {manufacturers?
                                        manufacturers.map(ce => (
                                         <option key={ce.Manufacturer} value={ce.Manufacturer}>{ce.Manufacturer}</option>
                                    ))
                                      : <option>Loading . . .</option>}
                            </Form.Select>
                        </Form.Group>
                        { props.manufacturer === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}

                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='model_no' className="mb-3">
                            <Form.Label>MODEL NUMBER</Form.Label>
                            <Form.Select onChange={(e)=>changeModelHandler(e)} 
                            value={props.model_no} >
                                <option disabled selected>Select Model</option>
                                {models? 
                                    models.map(me => 
                                    {
                                        if(props.system_type === "Dryer" || props.system_type === "Washer")
                                        {
                                            return <option key={me.id} value={me.id}>{me.model} </option>
                                        }
                                        else
                                        {
                                            if(me.model === "Indoor / Outdoor")
                                            {
                                                return <option key={me.id} value={me.id}>{me.indoor_model} / {me.outdoor_model}</option>
                                            }
                                            else if(me.model === "Both")
                                            {
                                                return <option key={me.id} value={me.id}>{me.indoor_model} / {me.outdoor_model}/ {me.package_model}</option>
                                            }
                                            else
                                            {
                                                return <option key={me.id} value={me.id}>{me.package_model}</option>
                                            }
                                        }
                                    }
                                )
                                : <option>Loading . . . </option>}
                            </Form.Select>
                        </Form.Group>
                        { props.model_no === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId='quantity' className="mb-3">
                            <Form.Label>QUANTITY</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder=''
                                onChange={(e)=>props.setQuantity(e.target.value)}
                                value={props.quantity}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                        { props.quantity === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}

                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='vendor' className="mb-3">
                            <Form.Label>VENDOR</Form.Label>
                            <Form.Select onChange={(e)=>props.setVendor(e.target.value)} 
                            value={props.vendor} >
                                    <option>{props.vendor}</option>
                            </Form.Select>
                        </Form.Group>
                        { props.vendor === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}

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
                        { props.invoice_no === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
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
                        { props.purchase_date === "" ? <p className="validate text-danger">*This Field is Required</p> : <></>}
                    </Col>
                </Row>
                
               <Row>
                    <Col md={12}>
                        {/* Row for rebate */}
                        {
                            showRebateHandler()
                        }
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
                        {showTable()}
                       
                    </Col>
                </Row>
            </Col>
            <Col md={3}></Col>
        </Row>
    )
}

export default NewEuipmentInformation
