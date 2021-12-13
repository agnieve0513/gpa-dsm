import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Badge,
  Table,
  InputGroup,
} from "react-bootstrap";
import "./NewEquipmentInformation.css";
import {
  loadCustomerEquipManufacturer,
  loadCustomerEquipModel,
  loadCustomerEquipmentDetail,
} from "../../actions/customerAction";
import { uploadFileAction } from "../../actions/fileActions";

import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import ModalImage from "../ModalImage";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function NewEuipmentInformation(props) {
  const dispatch = useDispatch();

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    description: "",
    image_sample: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let p = {};

  const customerEquipManufacturer = useSelector(
    (state) => state.customerEquipManufacturer
  );
  const {
    loading: manufacturerLoading,
    error: manufacturerError,
    success: manufacturerSuccess,
    manufacturers,
  } = customerEquipManufacturer;

  const customerEquipModel = useSelector((state) => state.customerEquipModel);
  const {
    loading: modelLoading,
    error: modelError,
    success: modelSuccess,
    models,
  } = customerEquipModel;

  const customerEquipmentDetail = useSelector(
    (state) => state.customerEquipmentDetail
  );
  const {
    loading: equipDetailLoading,
    error: equipDetailError,
    success: equipDetailSuccess,
    equipment_detail,
  } = customerEquipmentDetail;

  const uploadFile = useSelector((state) => state.uploadFile);
  const { loading: uploadLoading, error: uploadError, fileCode } = uploadFile;

  const changeSystemTypeHandler = (e) => {
    showRebateHandler();
    props.setVendor("");
    props.setSystemType(e.target.value);
    props.setNewEquipments([]);
    dispatch(loadCustomerEquipManufacturer(e.target.value));
  };

  const changeManufacturerHandler = (e) => {
    props.setManufacturer(e.target.value);
    dispatch(loadCustomerEquipModel(props.system_type, e.target.value));
    props.setVendor("");
    props.setModelList(models);
  };

  const changeModelHandler = (e) => {
    props.setModelNo(e.target.value);
    dispatch(loadCustomerEquipmentDetail(e.target.value));
  };

  useEffect(() => {
    showTable();
  }, [dispatch, props.new_equipments]);

  const addEquipmentHandler = () => {
    if (
      props.system_type === "" ||
      props.manufacturer === "" ||
      props.model_no === "" ||
      props.quantity === "" ||
      props.vendor === "" ||
      props.invoice_no === "" ||
      props.purchase_date === "" ||
      props.technician_name === "" ||
      props.work_tel === "" ||
      props.company_name === "" ||
      props.date_final_installation === ""
    ) {
      const Toast = MySwal.mixin({
        toast: true,
        position: "top-right",
        iconColor: "white",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 3500,
        timerProgressBars: true,
      });

      Toast.fire({
        icon: "info",
        title: "All Fields are required",
        text: "Fields should not be empty in order to proceed to next step",
      });
    } else {
      // Object for saving . ...
      const obj = {
        control_no: props.control_no,
        id: props.new_equipments.length,
        system_type: props.system_type,
        manufacturer: props.manufacturer,
        model_no: props.model_no,
        quantity: props.quantity,
        btu: props.btu,
        size: props.size,
        rebate: props.rebate,
        vendor: props.vendor,
        type: props.type,
        invoice_no: props.invoice_no,
        purchase_date: props.purchase_date,

        installer_information: {
          technician_name: props.technician_name,
          work_tel: props.work_tel,
          company_name: props.company_name,
          technician_cert_no: props.technician_cert_no,
          date_final_installation: props.date_final_installation,
          email: props.tech_email,
        },
      };
      setTotalQuantity(parseInt(totalQuantity) + parseInt(props.quantity));
      props.setTotalRebate(props.total_rebate + parseInt(props.rebate));
      props.setNewEquipments(props.new_equipments.concat(obj));
    }
  };

  const deleteEquipmentHandler = (rowdata) => {
    console.log(rowdata);
    props.setTotalRebate(props.total_rebate - rowdata.rebate);
    const index = props.new_equipments.indexOf(rowdata);
    const eqs = props.new_equipments;
    setTotalQuantity(totalQuantity - 1);
    if (index > -1) {
      eqs.splice(index, 1);
      props.setNewEquipments(eqs);
    }
    dispatch(loadCustomerEquipManufacturer("Central AC"));
  };

  const installerCertificationHandler = () => {
    if (props.system_type === "Dryer" || props.system_type === "Washer") {
      return <></>;
    } else {
      return (
        <Row>
          <ModalImage
            data={modalData}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <Col md={12}>
            <Form.Group controlId="installer_certification" className="mb-3">
              <p>
                <b>INSTALLER'S CERTIFICATION</b>
                <span
                  className="text-secondary"
                  onClick={() => {
                    setModalData(
                      (p = {
                        description: "INSTALLER'S CERTIFICATION",
                        image_sample: "./GPADSM8.png",
                      })
                    );
                    setModalShow(true);
                  }}
                >
                  <i className="fa fa-question-circle"></i>{" "}
                </span>
              </p>
              <InputGroup>
                <Form.Control
                  name="file2"
                  placeholder="Installer's Certification"
                  type="text"
                />
              </InputGroup>
              {props.installer_certification ? (
                <p className="text-wrap">
                  {fileCode ? (
                    <>
                      {fileCode.length !== 0 ? (
                        <>
                          {props.setInstallerCertificationD(fileCode)}
                          {console.log(props.installer_certificationD)}
                          <Badge bg={"success"}>File Uploaded</Badge> <br />
                          <p className="text-break">
                            Filename: {props.installer_certification.name}
                          </p>{" "}
                          <br />
                          File Type: {props.installer_certification.type} <br />
                          <br />
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </p>
              ) : (
                <></>
              )}
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group controlId="disposal_slip">
              <span>
                <b>INVOICE</b>
                <span
                  className="text-secondary mb-1"
                  onClick={() => {
                    setModalData(
                      (p = {
                        description: "DISPOSAL SLIP",
                        image_sample: "./GPADSM5.png",
                      })
                    );
                    setModalShow(true);
                  }}
                >
                  <i className="fa fa-question-circle"></i>{" "}
                </span>
              </span>
              <InputGroup>
                <Form.Control
                  name="file"
                  placeholder="Upload Invoice"
                  type="file"
                  onChange={(e) => handleChangeInvoice(e)}
                />
              </InputGroup>
              {props.invoice === null ? (
                <p className="validate text-danger">*This Field is Required</p>
              ) : (
                <></>
              )}
              {props.invoice ? (
                <>
                  {fileCode ? (
                    <>
                      {fileCode.length !== 0 ? (
                        <>
                          {props.setInvoiceD(fileCode)}
                          {console.log(props.invoiceD)}
                          <Badge bg={"success"}>File Uploaded</Badge> <br />
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  <p className="text-break">Filename: {props.invoice.name}</p>{" "}
                  <br />
                  File Type: {props.invoice.type} <br />
                  <br />
                </>
              ) : (
                <></>
              )}
            </Form.Group>
          </Col>
        </Row>
      );
    }
  };

  const showTable = () => {
    return (
      <MaterialTable
        columns={[
          { title: "System Type", field: "system_type" },
          { title: "Manufacturer", field: "manufacturer" },
          { title: "Quantity", field: "quantity" },
          { title: "Type", field: "type" },
          { title: "Purchase Date", field: "purchase_date" },
          {
            title: "Action",
            field: "actions",
            width: "10%",
            editComponent: (props) => {
              return <Button></Button>;
            },
            render: (rowdata) => (
              <>
                {/* <Button variant="light" size="sm" ><i className="fa fa-edit"></i></Button> */}
                <Button
                  variant="danger"
                  onClick={() => deleteEquipmentHandler(rowdata)}
                  size="sm"
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </>
            ),
          },
        ]}
        data={props.new_equipments.length === 0 ? [] : props.new_equipments}
        title="Equipments"
      />
    );
  };

  const handleNumericFields = (input, propVar) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (input.value === "" || re.test(input.value)) {
      props[propVar](input.value);
    }
  };

  const showRebateHandler = () => {
    if (props.system_type !== "Dryer" || props.system_type !== "Washer") {
      return <></>;
    } else {
      return <></>;
    }
  };

  const handleChangeInvoice = (e) => {
    props.setInvoice(e.target.files[0]);
    dispatch(uploadFileAction(e.target.files[0], "invoice", props.control_no));
  };

  const handleChangeInstallersInformation = (e) => {
    props.setInstallerCertification(e.target.files[0]);
    dispatch(
      uploadFileAction(
        e.target.files[0],
        "installers_information",
        props.control_no
      )
    );
  };

  return (
    <Row>
      <Col md={3} />
      <Col md={6}>
        {/* Row for installer's information */}
        <Row>
          <Col md={12} className="mb-3">
            <Form.Group controlId="system_type">
              <Form.Label>
                <b>SYSTEM TYPE</b>
              </Form.Label>
              <Form.Select
                onChange={(e) => changeSystemTypeHandler(e)}
                value={props.system_type}
              >
                <option defaultValue hidden>SELECT SYSTEM TYPE</option>
                {
                  props.customer_type === "RESID" ? 
                    <>
                      <option value="Central AC">Central AC</option>
                      <option value="Split AC">Split AC</option>
                      <option value="Window AC">Window AC</option>
                      <option value="Washer">Washer</option>
                      <option value="Dryer">Dryer</option>
                    </>
                  : 
                    <>
                      <option value="Central AC">Central AC - Commercial</option>
                      <option value="Split AC">Split AC - Commercial</option>
                      {/* <option value="Window AC">Window AC - Commercial</option> */}
                    </>
                }
                    
              </Form.Select>
            </Form.Group>
            {props.system_type === "" ? (
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <h4 className="text-center text-info mt-2">INSTALLER'S INFORMATION</h4>

        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="technician_name">
              <Form.Label>
                <b>TECHNICIAN NAME</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={(e) => props.setTechnicianName(e.target.value)}
                value={props.technician_name}
                required
              ></Form.Control>
            </Form.Group>
            {props.technician_name === "" ? (
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="work_tel">
              <Form.Label>
                <b>WORK CONTACT NUMBER</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={props.work_tel}
                onChange={(e) => handleNumericFields(e.target, "setWorkTel")}
                maxLength="10"
                required
              ></Form.Control>
            </Form.Group>
            {props.work_tel === "" ? (
              <p className="validate text-danger">*This Field is Required</p>
            ) : props.work_tel.length < 10 ? (
              <p className="validate text-danger">
                *This Field requires 10 digits
              </p>
            ) : props.work_tel.length > 10 ? (
              <p className="validate text-danger">
                *This Field requires 10 digits
              </p>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col md={12} className="mb-3">
            <Form.Group controlId="company_name">
              <Form.Label>
                <b>COMPANY NAME</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={(e) => props.setCompanyName(e.target.value)}
                value={props.company_name}
                required
              ></Form.Control>
            </Form.Group>
            {props.company_name === "" ? (
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="date_final_installation">
              <Form.Label>
                <b>DATE OF FINAL INSTALLATION</b>
              </Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                onChange={(e) => props.setDateFinalInstallation(e.target.value)}
                value={props.date_final_installation}
                required
              ></Form.Control>
            </Form.Group>
            {props.date_final_installation === "" ? (
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="tech_email">
              <Form.Label>
                <b>EMAIL</b>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                onChange={(e) => props.setTechEmail(e.target.value)}
                value={props.tech_email}
                required
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {installerCertificationHandler()}

        <h4 className="text-center text-info mt-5">EQUIPMENT INFORMATION</h4>

        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="manufacturer">
              <Form.Label>
                <b>MANUFACTURER</b>
              </Form.Label>
              <Form.Select
                onChange={(e) => changeManufacturerHandler(e)}
                value={props.manufacturer}
              >
                <option defaultValue hidden>
                  Select Manufacturer
                </option>

                {manufacturers ? (
                  manufacturers.map((ce) => (
                    <option key={ce.Manufacturer} value={ce.Manufacturer}>
                      {ce.Manufacturer}
                    </option>
                  ))
                ) : (
                  <option>Loading . . .</option>
                )}
              </Form.Select>
            </Form.Group>
            {props.manufacturer === "" ? (
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="model_no">
              <Form.Label>
                <b>MODEL NUMBER</b>
              </Form.Label>
              <Form.Select
                onChange={(e) => changeModelHandler(e)}
                value={props.model_no}
              >
                <option defaultValue hidden>
                  Select Model
                </option>
                {models ? (
                  models.map((me) => {
                    props.setVendor("");
                    if (
                      props.system_type === "Dryer" ||
                      props.system_type === "Washer"
                    ) {
                      return (
                        <option key={me.id} value={me.id}>
                          {me.model}{" "}
                        </option>
                      );
                    } else {
                      if (me.model === "Indoor / Outdoor") {
                        return (
                          <option key={me.id} value={me.id}>
                            {me.indoor_model} / {me.outdoor_model}
                          </option>
                        );
                      } else if (me.model === "Both") {
                        return (
                          <option key={me.id} value={me.id}>
                            {me.indoor_model} / {me.outdoor_model}/{" "}
                            {me.package_model}
                          </option>
                        );
                      } else {
                        return (
                          <option key={me.id} value={me.id}>
                            {me.package_model}
                          </option>
                        );
                      }
                    }
                  })
                ) : (
                  <>
                    {props.setVendor("")}
                    <option>Loading . . . </option>
                  </>
                )}
              </Form.Select>
              {props.model_no ? (
                equipment_detail ? (
                  equipment_detail.length ? (
                    <>
                      {props.setRebate(equipment_detail[0].rebate)}
                      {props.setSeer(equipment_detail[0].seer)}
                      {console.log(equipment_detail[0].vendor)}

                      {equipment_detail[0].vendor === ""
                        ? props.setVendor("N/A")
                        : props.setVendor(equipment_detail[0].vendor)}

                      {equipment_detail[0].btu === ""
                        ? props.setBtu("N/A")
                        : props.setBtu(equipment_detail[0].btu)}
                    </>
                  ) : (
                    <>{props.setVendor("")}</>
                  )
                ) : (
                  <>{props.setVendor("")}</>
                )
              ) : (
                <>{props.setVendor("")}</>
              )}
            </Form.Group>
            {props.model_no === "" ? (
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="quantity">
              <Form.Label>
                <b>QUANTITY</b>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                min="1"
                onChange={(e) => props.setQuantity(e.target.value)}
                value={props.quantity}
                required
              ></Form.Control>
            </Form.Group>
            {props.quantity === "" ? (
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="vendor">
              <Form.Label>
                <b>VENDOR</b>
              </Form.Label>
              <Form.Select
                onChange={(e) => props.setVendor(e.target.value)}
                value={props.vendor}
              >
                <option defaultValue hidden>
                  Select Vendor
                </option>
                {props.vendor === "" ? (
                  <>
                    <option></option>
                  </>
                ) : (
                  <option value={props.vendor}>{props.vendor}</option>
                )}
              </Form.Select>
            </Form.Group>
            {props.vendor === "" ? (
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="invoice_no">
              <ModalImage
                data={{
                  description: "Invoice",
                  image_sample: "./sample_invoice.png",
                }}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <Form.Label>
                <b>INVOICE#</b>{" "}
                <a
                  className="text-secondary"
                  rel="noreferrer"
                  target="_blank"
                  onClick={() => {
                    setModalShow(true);
                  }}
                >
                  {" "}
                  <i className="fa fa-question-circle"></i>{" "}
                </a>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={(e) => props.setInvoiceNo(e.target.value)}
                value={props.invoice_no}
                required
              ></Form.Control>
            </Form.Group>
            {props.invoice_no === "" ? (
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="purchase_date">
              <Form.Label>
                <b>PURCHASE DATE (Date on invoice)</b>
              </Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => props.setPurchaseDate(e.target.value)}
                value={props.purchase_date}
                required
              ></Form.Control>
            </Form.Group>
            {props.purchase_date === "" ? (
              <p className="validate text-danger">*This Field is Required</p>
            ) : Math.abs(
                new Date(props.purchase_date) -
                  new Date(props.date_final_installation)
              ) /
                (1000 * 3600 * 24) >
              120 ? (
              <p className="validate text-danger">
                (*Note: Your Application exceeded 120 days. Please be informed
                that there might be a chance your application will be rejected
                if you do not have valid reason for exceeding the alloted time.)
              </p>
            ) : (
              ""
            )}
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group controlId="rebate">
              <Form.Label>
                <b>REBATE</b>
              </Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => props.setRebate(e.target.value)}
                value={props.rebate}
                required
                disabled={true}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Table and button Add Equipment */}
        <Row className="mt-3">
          <Col md={4}></Col>
          <Col md={4}>
            <Row>
              <Button
                variant="success"
                size="lg"
                onClick={() => addEquipmentHandler()}
                className="d-flex justify-content-center"
              >
                Add Equipment
              </Button>
            </Row>
          </Col>
          <Col md={4}></Col>
        </Row>

        <Row className="mt-3">
          <Col md={12}>
            <b>Total Quantity {totalQuantity} </b>
            {showTable()}
          </Col>
        </Row>
      </Col>
      <Col md={3} />
    </Row>
  );
}

export default NewEuipmentInformation;
