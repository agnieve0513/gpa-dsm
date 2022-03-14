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
import Moment from "react-moment";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useWindowDimensions } from "../../hooks";
import moment from "moment";
const MySwal = withReactContent(Swal);

function NewEuipmentInformation(props) {
  const dispatch = useDispatch();

  const [modelId, setModelID] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    description: "",
    image_sample: "",
  });

  const { height, width } = useWindowDimensions();
  const screenWidthM = width > 425;

  const date = new Date(Date.now());
  date.setDate(date.getDate());
  const currentDate = moment(date).format("YYYY-MM-DD");

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
    props.setTotalQuantity(0);
    dispatch(loadCustomerEquipManufacturer(e.target.value));
  };

  const changeManufacturerHandler = (e) => {
    props.setManufacturer(e.target.value);
    dispatch(loadCustomerEquipModel(props.system_type, e.target.value));
    props.setVendor("");
    props.setModelList(models);
  };

  const handleModelNo = (id) => {
    switch (id.model) {
      case "Indoor / Outdoor": {
        return id.indoor_model + " / " + id.outdoor_model;
      }
      case "Package": {
        return id.package_model;
      }
      case "Both": {
        return id.indoor_model + " / " + id.outdoor_model + " / " + id.model;
      }
      default: {
        return id.model;
      }
    }
  };

  const changeModelHandler = (e) => {
    setModelID(e.target.value);
    var selectedModel = models.find(
      (model) => model.id === parseInt(e.target.value)
    );
    var modelName = handleModelNo(selectedModel);
    // console.log('selMod', selectedModel, 'modelN', modelName)
    props.setModelNo(modelName);
    dispatch(loadCustomerEquipmentDetail(e.target.value));
  };

  useEffect(() => {
    showTable();
  }, [dispatch, props.new_equipments]);

  const Toast = MySwal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBars: true,
  });

  const Toast2 = MySwal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 4000,
    timerProgressBars: true,
  });

  const addEquipmentHandler = () => {
    if (
      props.system_type === "" ||
      props.manufacturer === "" ||
      props.model_no === "" ||
      props.quantity === "" ||
      props.vendor === "" ||
      props.invoice === null ||
      props.invoice_no === "" ||
      props.purchase_date === "" ||
      props.technician_name === "" ||
      props.work_tel === "" ||
      props.company_name === "" ||
      props.date_final_installation === "" ||
      (Math.abs(
        new Date(props.purchase_date) - new Date(props.date_final_installation)
      ) /
        (1000 * 3600 * 24) >
        120 &&
        props.delay_reason === "") 
    ) {
      Toast.fire({
        icon: "info",
        title: "All Fields are required",
        text: "Fields should not be empty in order to proceed to next step",
      });
    } else {
      if (
        props.max_invoice >=
        parseInt(parseInt(props.totalQuantity) + parseInt(props.quantity))
      ) {
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
          seer: props.newSeer,

          installer_information: {
            technician_name: props.technician_name,
            technician_cert_no: props.technician_cert_no,
            work_tel: props.work_tel,
            company_name: props.company_name,
            installer_certification: props.installer_certification,
            date_final_installation: props.date_final_installation,
            email: props.tech_email,
          },
        };
        props.setTotalQuantity(
          parseInt(props.quantity) + parseInt(props.totalQuantity)
        );
        props.setTotalRebate(props.total_rebate + parseInt(props.rebate));
        props.setNewEquipments(props.new_equipments.concat(obj));
      } else {
        Toast.fire({
          icon: "warning",
          title: "Maximum Quantity of Invoice reached",
          text: "Total quantity of equipment that can be added should be equal or less than specified maximum quantity.",
        });
      }
    }
  };

  const deleteEquipmentHandler = (rowdata) => {
    // console.log(rowdata);
    props.setTotalRebate(props.total_rebate - rowdata.rebate);
    const index = props.new_equipments.indexOf(rowdata);
    const eqs = props.new_equipments;
    props.setTotalQuantity(props.totalQuantity - rowdata.quantity);
    if (index > -1) {
      eqs.splice(index, 1);
      props.setNewEquipments(eqs);
    }
    dispatch(loadCustomerEquipManufacturer("Central AC"));
  };

  const installerCertificationHandler = () => {
    if (
      props.system_type === "Dryer" ||
      props.system_type === "Washer" ||
      props.system_type === "Window AC"
    ) {
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
              <p className="d-flex justify-content-between applicationTitle">
                INSTALLER'S CERTIFICATION NUMBER
                <span
                  className="text-secondary"
                  onClick={() => {
                    setModalData(
                      (p = {
                        description:
                          "INSTALLER'S CERTIFICATION NUMBER LOCATION",
                        image_sample: "./image_sample/7.jpg",
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
                  placeholder="Installer's Certification Number"
                  type="text"
                  value={props.technician_cert_no}
                  onChange={(e) => props.setTechnicianCertNo(e.target.value)}
                />
              </InputGroup>
              {props.technician_cert_no === "" ? (
                <p className="validate text-danger requiredField">
                  *This Field is Required
                </p>
              ) : (
                <></>
              )}
              {/* {props.installer_certification ? (
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
              )} */}
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
      dispatch(
        uploadFileAction(e.target.files[0], "invoice", props.control_no, false)
      );
    };

  const handleChangeConsiderationLetter = (e) => {
    props.setOtherDoc1(e.target.files[0]);
    dispatch(
      uploadFileAction(e.target.files[0], "other_doc1", props.control_no, false)
    );
  };


  const handleShowExeededTime = () => {
    if (props.delay_reason === "") {
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

      Toast2.fire({
        icon: "info",
        title: "The application has exceeded 120 day",
        text: "There might be a chance that it will be rejected, please provide a valid reason.",
      });
    }
  };

  return (
    <Row className="mx-0 w-100 d-flex justify-content-center">
      <Col md={10} xl={6}>
        {/* Row for installer's information */}
        <Row className="">
          <Col md={12} className="mb-3">
            {screenWidthM ? (
              <h4 className="text-center text-info mb-4">
                NEW EQUIPMENT INFORMATION
              </h4>
            ) : (
              <></>
            )}
            <Form.Group controlId="system_type">
              <Form.Label className=" applicationTitle">SYSTEM TYPE</Form.Label>
              <Form.Select
                onChange={(e) => changeSystemTypeHandler(e)}
                value={props.system_type}
              >
                <option defaultValue hidden>
                  SELECT SYSTEM TYPE
                </option>
                {props.customer_type === "RESID" ? (
                  <>
                    <option value="Central AC">Central AC</option>
                    <option value="Split AC">Split AC</option>
                    <option value="Window AC">Window AC</option>
                    <option value="Washer">Washer</option>
                    <option value="Dryer">Dryer</option>
                  </>
                ) : (
                  <>
                    <option value="Central AC">Central AC - Commercial</option>
                    <option value="Split AC">Split AC - Commercial</option>
                    {/* <option value="Window AC">Window AC - Commercial</option> */}
                  </>
                )}
              </Form.Select>
            </Form.Group>
            {props.system_type === "" ? (
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <h5 className="text-center text-info mt-2 applicationSubHeader pb-2">
          INSTALLER'S INFORMATION
        </h5>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="technician_name">
              <Form.Label className=" applicationTitle">
                TECHNICIAN NAME
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
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="work_tel">
              <Form.Label className=" applicationTitle">
                WORK CONTACT NUMBER
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
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : props.work_tel.length < 10 ? (
              <p className="validate text-danger requiredField">
                *This Field requires 10 digits
              </p>
            ) : props.work_tel.length > 10 ? (
              <p className="validate text-danger requiredField">
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
              <Form.Label className=" applicationTitle">
                COMPANY NAME
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
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="date_final_installation">
              <Form.Label className=" applicationTitle">
                DATE OF FINAL INSTALLATION
              </Form.Label>
              <Form.Control
                className="datePick"
                type="date"
                placeholder=""
                onChange={(e) => props.setDateFinalInstallation(e.target.value)}
                value={props.date_final_installation}
                max={currentDate}
                onKeyDown={(e) => e.preventDefault()}
                defaultValue={currentDate}
                required
              ></Form.Control>
            </Form.Group>
            {props.date_final_installation === "" ? (
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : Math.abs(new Date(props.date_final_installation) - new Date()) /
                (1000 * 3600 * 24) >
              120 ? (
              <>
                {handleShowExeededTime()}
                <Form.Control
                  as="textarea"
                  row={3}
                  onChange={(e) => props.setDelayReason(e.target.value)}
                  value={props.delay_reason}
                  required
                  placeholder="Please enter a valid reason for exceeding 120 days."
                ></Form.Control>
                {props.delay_reason === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </>
            ) : (
              ""
            )}
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="tech_email">
              <Form.Label className=" applicationTitle">EMAIL</Form.Label>
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
        <Row>
          <Col md={12}>
            <Form.Group controlId="disposal_slip">
              <p className="d-flex justify-content-between applicationTitle">
                INVOICE
                <span
                  className="text-secondary"
                  onClick={() => {
                    setModalData(
                      (p = {
                        description: "INVOICE",
                        image_sample: "./sample_invoice.png",
                      })
                    );
                    setModalShow(true);
                  }}
                >
                  <i className="fa fa-question-circle"></i>{" "}
                </span>
              </p>
              <InputGroup className="mb-2">
                <Form.Control
                  name="file"
                  placeholder="Upload Invoice"
                  type="file"
                  onChange={(e) => handleChangeInvoice(e)}
                />
                <div
                  style={{
                    width: "40px",
                    height: "38px",
                    backgroundColor: "#233E86",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i style={{ color: "white" }} className="fa fa-upload"></i>
                </div>
              </InputGroup>
              {props.invoice === null ? (
                <p className="validate text-danger requiredField">
                  *This Field is Required
                </p>
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
                          {console.log("INVOICE D VALUE: ", props.invoiceD)}
                          <Badge bg={"success"}>File Uploaded</Badge> <br />
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  <p className="text-break m-0">
                    Filename: {props.invoice.name}
                  </p>
                  <p>File Type: {props.invoice.type}</p>
                </>
              ) : (
                <></>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="quantity">
              <Form.Label className=" applicationTitle">
                MAX QUANTITY ON INVOICE
              </Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                min="1"
                onChange={(e) => {
                  props.setTotalQuantity(0);
                  props.setTotalRebate(0);
                  props.setNewEquipments([]);
                  props.setMaxInvoice(e.target.value);
                }}
                value={props.max_invoice}
                required
              ></Form.Control>
            </Form.Group>
            {props.max_invoice < 1 ? (
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <h5 className="text-center text-info mt-5 pb-2 applicationSubHeader">
          EQUIPMENT INFORMATION
        </h5>

        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="manufacturer">
              <Form.Label className=" applicationTitle">
                MANUFACTURER
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
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="model_no">
              <Form.Label className=" applicationTitle">
                MODEL NUMBER
              </Form.Label>
              <Form.Select
                onChange={(e) => changeModelHandler(e)}
                value={modelId}
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
                      {props.setNewSeer(equipment_detail[0].seer)}
                      {props.setRebate(equipment_detail[0].rebate)}
                      {/* {console.log(equipment_detail[0].vendor)} */}

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
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="quantity">
              <Form.Label className=" applicationTitle">QUANTITY</Form.Label>
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
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="vendor">
              <Form.Label className=" applicationTitle">VENDOR</Form.Label>
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
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="invoice_no">
              <Form.Label className=" applicationTitle d-flex flex-row justify-content-between">
                INVOICE#{" "}
                <a
                  className="text-secondary"
                  rel="noreferrer"
                  target="_blank"
                  onClick={() => {
                    setModalData(
                      (p = {
                        description: "INVOICE",
                        image_sample: "./sample_invoice.png",
                      })
                    );
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
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="purchase_date">
              <Form.Label className=" applicationTitle">
                PURCHASE DATE (Date on invoice)
              </Form.Label>
              <Form.Control
                onkeydown="return false"
                type="date"
                onChange={(e) => props.setPurchaseDate(e.target.value)}
                value={props.purchase_date}
                max={currentDate}
                onKeyDown={(e) => e.preventDefault()}
                required
              ></Form.Control>
            </Form.Group>
            {props.purchase_date === "" ? (
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : Math.abs(
                new Date(props.purchase_date) -
                  new Date(props.date_final_installation)
              ) /
                (1000 * 3600 * 24) >
              120 ? (
              <>
                {handleShowExeededTime()}
                <Form.Control
                  as="textarea"
                  row={3}
                  onChange={(e) => props.setDelayReason(e.target.value)}
                  value={props.delay_reason}
                  required
                  placeholder="Please enter a valid reason for exceeding 120 days."
                ></Form.Control>
                {props.delay_reason === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group controlId="rebate">
              <Form.Label className=" applicationTitle">Seer</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => props.setNewSeer(e.target.value)}
                value={props.newSeer}
                required
                disabled={true}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={props.delay_reason ? 6 : 12}>
            <Form.Group controlId="rebate">
              <Form.Label className=" applicationTitle">REBATE</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => props.setRebate(e.target.value)}
                value={props.rebate}
                required
                disabled={true}
              ></Form.Control>
            </Form.Group>
          </Col>
          {props.delay_reason ? (
            <Col md={6}>
              <Form.Group controlId="disposal_slip">
                <p className="d-flex justify-content-between applicationTitle">
                  CONSIDERATION LETTER (Attached to Supporting Document)
                </p>
                <InputGroup className="mb-2">
                  <Form.Control
                    name="file"
                    placeholder="Upload Consideration Letter"
                    type="file"
                    onChange={(e) => handleChangeConsiderationLetter(e)}
                  />
                  <div
                    style={{
                      width: "40px",
                      height: "38px",
                      backgroundColor: "#233E86",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i style={{ color: "white" }} className="fa fa-upload"></i>
                  </div>
                </InputGroup>
                {props.other_doc1 === null ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
                {props.other_doc1 ? (
                  <>
                    {fileCode ? (
                      <>
                        {fileCode.length !== 0 ? (
                          <>
                            {props.setOtherDoc1D(fileCode)}
                            {console.log(props.other_doc1D)}
                            <Badge bg={"success"}>File Uploaded</Badge> <br />
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    <p className="text-break m-0">
                      Filename: {props.other_doc1.name}
                    </p>
                    <p>File Type: {props.other_doc1.type}</p>
                  </>
                ) : (
                  <></>
                )}
              </Form.Group>
            </Col>
          ) : null}
        </Row>

        {/* Table and button Add Equipment */}
        <Row className="mt-3">
          <Col className="d-flex justify-content-center" md={12}>
            <Button
              variant="success"
              size="lg"
              onClick={() => addEquipmentHandler()}
              className="d-flex justify-content-center addEquipmentButton"
            >
              Add Equipment
            </Button>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={12}>
            <b>Total Quantity {props.totalQuantity} </b>
            {showTable()}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default NewEuipmentInformation;
