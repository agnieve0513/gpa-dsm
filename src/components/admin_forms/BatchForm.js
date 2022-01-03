import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Badge,
  Form,
  Dropdown,
  Tabs,
  InputGroup,
  Tab,
  ListGroup,
  Nav,
  ButtonGroup,
  Table,
} from "react-bootstrap";
import {
  listBatch,
  listBatchApplication,
  listBatchCurrent,
} from "../../actions/batchActions";
import {
  uploadFileAction,
  retrieveFileAction,
} from "../../actions/fileActions";

import {
  listApplications,
  detailApplication,
  commentsApplication,
  addCommentAction,
  logsApplication,
  updateApplication,
  updateBatchApplication,
} from "../../actions/applicationActions";

import { useDispatch, useSelector } from "react-redux";
import ModalImage from "../ModalImage";
import MaterialTable from "material-table";

import "./BatchForm.css";
import Swal from "sweetalert2";
import TimeAgo from "javascript-time-ago";
// English.
import en from "javascript-time-ago/locale/en.json";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { formatAMPM } from "../../helpers";

TimeAgo.addDefaultLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

function BatchForm({ current }) {
  let obj = JSON.parse(localStorage.getItem("userInfo"));
  let roleId = obj.message.original.roleId;

  const { height, width } = useWindowDimensions();

  const [showModal, setShowModal] = useState(false);
  const [applicationId, setApplicationId] = useState(0);
  const [status, setStatus] = useState("");
  const [stage, setStage] = useState("");
  const [reason, setReason] = useState("");
  const [selectIds, setSelectedIds] = useState([]);
  const [showBatchApplicationTable, setShowBatchApplicationTable] =
    useState(false);
  const [batch, setBatch] = useState("");
  const [swalInfo, setSwalInfo] = useState("");
  const [updateState, setUpdateState] = useState(0);

  const [new_eq_index, setNewEqIndex] = useState(0);
  const [equipmentInfo, setEquipmentInfo] = useState([]);
  const [showNewEquipmentInfo, setShowNewEquipmentInfo] = useState(false);
  const [showOldEquipmentInfo, setShowOldEquipmentInfo] = useState(false);
  const [currentBatch, setCurrentBatch] = useState();
  const [comment, setComment] = useState("");
  const [detailsToggle, setDetailsToggle] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [show, setShow] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    description: "",
    image_sample: "",
  });

  const [invoice, setInvoice] = useState(null);
  const [irs_form, setIrsForm] = useState(null);
  const [disposal_slip, setDisposalSlip] = useState(null);
  const [letter_authorization, setLetterAuthorization] = useState(null);
  const [installer_certification, setInstallerCertification] = useState(null);
  const [other_doc1, setOtherDoc1] = useState(null);
  const [other_doc2, setOtherDoc2] = useState(null);
  const [other_doc3, setOtherDoc3] = useState(null);

  const [invoiceD, setInvoiceD] = useState("");
  const [irs_formD, setIrsFormD] = useState("");
  const [disposal_slipD, setDisposalSlipD] = useState("");
  const [letter_authorizationD, setLetterAuthorizationD] = useState();
  const [installer_certificationD, setInstallerCertificationD] = useState();
  const [other_doc1D, setOtherDoc1D] = useState("");
  const [other_doc2D, setOtherDoc2D] = useState("");
  const [other_doc3D, setOtherDoc3D] = useState("");

  const [showApplicationTab, setShowApplicationTab] = useState(false);

  const uploadFile = useSelector((state) => state.uploadFile);
  const { loading: uploadLoading, error: uploadError, fileCode } = uploadFile;

  const handleModalClose = () => setShowModal(false);

  const dispatch = useDispatch();

  const applicationDetail = useSelector((state) => state.applicationDetail);
  const { application } = applicationDetail;

  const applicationComments = useSelector((state) => state.applicationComments);
  const { comments } = applicationComments;

  const applicationLogs = useSelector((state) => state.applicationLogs);
  const { logs } = applicationLogs;

  const applicationUpdate = useSelector((state) => state.applicationUpdate);
  const {
    error: updateError,
    loading: updateLoading,
    success: successUpdate,
  } = applicationUpdate;

  const batchApplicationUpdate = useSelector(
    (state) => state.batchApplicationUpdate
  );
  const {
    error: batchUpdateError,
    loading: batchUpdateLoading,
    success: batchUpdateSuccess,
  } = batchApplicationUpdate;

  const [intervalId, setIntervalId] = useState();
  const [intervalId2, setIntervalId2] = useState();
  const batchApplication = useSelector((state) => state.batchApplication);
  const [batch_applications, setBatchApplication] = useState([]);
  const batchList = useSelector((state) => state.batchList);
  const [batches, setBatches] = useState([]);
  const [updatedTime, setUpdatedTime] = useState(formatAMPM(new Date()));

  useEffect(() => {
    let changedItem = 0;
    if (batch_applications?.length === 0) {
      if (batchApplication.batch_applications) {
        setBatchApplication(batchApplication.batch_applications);
      }
    } else if (batch_applications?.length > 0) {
      for (let i = 0; i < batch_applications?.length; i++) {
        if (batchApplication.batch_applications) {
          const oldInfo = batch_applications[i];
          const newInfo = batchApplication.batch_applications.find(
            (value) => value.Application_Id === oldInfo.Application_Id
          );

          if (newInfo) {
            changedItem = 1 + changedItem;
          }
        }

        if (i === batch_applications?.length - 1) {
          if (changedItem > 0) {
            setBatchApplication(batchApplication.batch_applications);
            setUpdatedTime(formatAMPM(new Date()));
          }
        }
      }
    }
  }, [batchApplication]);

  useEffect(() => {
    let changedItem = 0;
    if (batches?.length === 0) {
      if (batchList.batches) {
        setBatches(batchList.batches);
      }
    } else if (batches?.length > 0) {
      for (let i = 0; i < batches?.length; i++) {
        if (batchList.batches) {
          const oldInfo = batches[i];
          const newInfo = batchList.batches.find(
            (value) => value.batch_Id === oldInfo.batch_Id
          );

          if (newInfo) {
            changedItem = 1 + changedItem;
          }
        }

        if (i === batches?.length - 1) {
          if (changedItem > 0) {
            setBatches(batchList.batches);
            setUpdatedTime(formatAMPM(new Date()));
          }
        }
      }
    }
  }, [batchList]);

  useEffect(() => {
    if (current !== "batch") {
      clearInterval(intervalId);
    }
  }, [current]);

  useEffect(() => {
    if (current == "batch") {
      const rerun = setInterval(() => {
        dispatch(listBatch());
      }, 5000);

      setIntervalId(rerun);
    }
  }, [current]);

  useEffect(() => {
    if (current == "batch") {
      if (currentBatch) {
        if (intervalId2) {
          clearInterval(intervalId2);
        }
        const rerun = setInterval(() => {
          dispatch(listBatchApplication(currentBatch));
        }, 5000);

        setIntervalId2(rerun);
      }
    }
  }, [currentBatch]);

  useEffect(() => {
    dispatch(listBatch());
    dispatch(listBatchApplication(currentBatch));
  }, [dispatch, batchUpdateSuccess, applicationUpdate]);

  const selectHandler = (rowdata) => {
    setCurrentBatch(rowdata.Id);

    dispatch(listBatchApplication(rowdata.Id));
    setShowApplicationTab(true);
    console.log("Batch Applications: ", batch_applications);
  };

  let selectedIds = [];

  // function for processing batch application
  const changeStatusHandler = (status) => {
    if (selectIds.length <= 0) {
      Swal.fire(
        "Select an application!",
        "Please select atleast 1 application.",
        "info"
      );
    } else if (roleId !== 3) {
      setStatus(status);
      setShowModal(true);
    }

    console.log(selectedIds);
  };

  let p = {};

  const updateStatus = (status, stage) => {
    console.log(status, " - ", stage);
    setStage(stage);
    if (status === 3) {
      Swal.fire({
        title: "Are you sure you want to reject application?",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        // denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateBatchApplication(selectIds, status, stage, reason));
          setShow(false);
          setShowModal(false);
          Swal.fire("Success", "Application has been rejected!", "success");
        }
      });
    } else {
      setStatus(status);
      setStage(stage);
      setUpdateState(updateState + 1);
    }
  };

  useEffect(() => {
    if (swalInfo !== "" && status !== "" && stage !== "") {
      Swal.fire({
        title: `Are you sure you want to ${swalInfo}?`,
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        // denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateBatchApplication(selectIds, status, stage, reason));
          // setShow(false);
          setShowModal(false);
          Swal.fire("Success", "Application has been processed!", "success");
        }
      });
    }
  }, [swalInfo, updateState, status, stage]);

  const getSelected = (e, application_id) => {
    const checked = e.target.checked;
    if (checked) {
      selectIds.push(application_id);
    } else {
      const index = selectIds.indexOf(application_id);
      delete selectIds[index];
    }

    console.log(selectIds);
  };

  const changeCommentHandler = (text) => {
    setComment(text);
  };

  const resetHandler = () => {
    setShow(false);
  };

  const addCommentHandler = () => {
    dispatch(addCommentAction(applicationId, comment));
    setComment("");
  };

  const showNewEquipmentInformation = (index) => {
    setNewEqIndex(index);
    console.log(application);
  };

  const selectEquipment = (id, equipmentType) => {
    if (equipmentType === "new_equipment") {
      if (application.New_equipment[id]) {
        setEquipmentInfo(application.New_equipment[id]);
        setShowNewEquipmentInfo(true);
      }
    } else {
      if (application.Old_equipment[id]) {
        setEquipmentInfo(application.Old_equipment[id]);
        setShowOldEquipmentInfo(true);
      }
    }
  };

  const applicationViewHandler = (rowdata) => {
    console.log("Row data: ", rowdata);
    setApplicationId(rowdata.Application_Id);
    dispatch(detailApplication(rowdata.Application_Id));
    dispatch(commentsApplication(rowdata.Application_Id));
    dispatch(logsApplication(rowdata.Application_Id));
    setShow(true);
  };

  const handleDetailsToggle = () => {
    if (detailsToggle === false) {
      setDetailsToggle(true);
    } else {
      setDetailsToggle(false);
    }
  };

  const handleRetrieveFile = (code) => {
    console.log(code);
    dispatch(retrieveFileAction(code));
  };

  const handleSubmit = (file, doc_type, control_no) => {
    dispatch(uploadFileAction(file, doc_type, control_no));
  };

  const backToBatchesHandler = () => {
    clearInterval(intervalId2);
    setCurrentBatch(null);
    setBatchApplication([]);
    setShowApplicationTab(false);
  };

  const handleOnChange = (e, doc_type) => {
    if (doc_type === "irs_form") {
      setIrsForm(e.target.files[0]);
    } else if (doc_type === "other_doc1") {
      setOtherDoc1(e.target.files[0]);
    } else if (doc_type === "other_doc2") {
      setOtherDoc2(e.target.files[0]);
    } else if (doc_type === "letter_authorization") {
      setLetterAuthorization(e.target.files[0]);
    } else if (doc_type === "invoice") {
      setInvoice(e.target.files[0]);
    } else if (doc_type === "installer_certification") {
      setInstallerCertification(e.target.files[0]);
    } else if (doc_type === "disposal_receipt") {
      setDisposalSlip(e.target.files[0]);
    }
    dispatch(uploadFileAction(e.target.files[0], doc_type, 0));
    return;
  };

  return (
    <>
      {show ? (
        <Container>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="application_information"
          >
            <Button
              className="mb-3 btn btn-light"
              onClick={() => resetHandler()}
            >
              <i className="fa fa-arrow-left"></i> Back to Application
            </Button>
            <Row style={{ paddingLeft: 12 }}>
              <Col
                className="p-0"
                style={{ backgroundColor: "rgb(227, 227, 229)" }}
              >
                <div id="applicationFormNa">
                  <Nav variant="pills">
                    <Nav.Item>
                      <Nav.Link eventKey="application_information">
                        Applicant Information
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="new_quipment_info">
                        New Equipment Information
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="old_quipment_info">
                        Old/Existing Equipment Information
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="submission_of_documentation">
                        Submitted Documents
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item
                      style={{ marginLeft: "auto", width: 50, paddingTop: 10 }}
                      className="d-flex aligns-items-center justify-content-center"
                      onClick={() => handleDetailsToggle()}
                    >
                      <i className="fa fa-edit"></i>
                    </Nav.Item>
                    {/* <Nav.Item className="me-1">
                                                <Nav.Link eventKey="verify_information">Update Status</Nav.Link>
                                                </Nav.Item> */}
                  </Nav>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={detailsToggle ? 9 : 12}>
                <Tab.Content>
                  {/* Applicaiton Information */}
                  <Tab.Pane eventKey="application_information">
                    <h3 className="mt-3 mb-5 text-info">Applicant Info</h3>
                    {application ? (
                      <ListGroup
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <div style={{ paddingRight: 100 }}>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>
                              GPA Electric Account Number
                            </b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>Bill ID</b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>
                              Name on GPA Account
                            </b>
                          </p>
                          {/* <p>
                            <b style={{ color: "#B6B6B6" }}>First Name</b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>Middle Name</b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>Last Name</b>
                          </p> */}
                          <p>
                            <b style={{ color: "#B6B6B6" }}>
                              Installation Address
                            </b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>City</b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>Zip</b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>Email</b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>Telephone Number</b>
                          </p>
                          <p className="mt-5 mb-5">
                            <b style={{ color: "#B6B6B6" }}>
                              Is Applicant the owner of the <br /> residential
                              property?
                            </b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>MAILING ADDRESS</b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>CITY</b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>ZIP</b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>HOME AGE</b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>NEW CONSTRUCTION</b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>HOME TYPE</b>
                          </p>
                        </div>
                        <div>
                          <p>
                            <b>{application.Info_Account_no}</b>
                          </p>
                          <p>
                            <b>{application.Info_Bill_id}</b>
                          </p>
                          <p>
                            <b>{application.Info_Customer_name}</b>
                          </p>
                          <p>
                            <b>{application.Info_Mailing_address}</b>
                          </p>
                          <p>
                            <b>{application.Info_Mailing_city}</b>
                          </p>
                          <p>
                            <b>{application.Info_Mailing_zip}</b>
                          </p>
                          <p>
                            <b>{application.Info_Email}</b>
                          </p>
                          <p>
                            <b>
                              {application.Info_Tel_no
                                ? application.Info_Tel_no
                                : "N/A"}
                            </b>
                          </p>
                          <p className="mt-5 mb-5">
                            <b>
                              {application.Info_Is_owner}
                              <br />
                              <p style={{ color: "#F9F9FA" }}>h</p>
                            </b>
                          </p>
                          <p>
                            <b>{application.Info_Mailing_address}</b>
                          </p>
                          <p>
                            <b>{application.Info_Mailing_city}</b>
                          </p>
                          <p>
                            <b>{application.Info_Mailing_zip}</b>
                          </p>
                          <p>
                            <b>{application.Info_Home_age}</b>
                          </p>
                          <p>
                            <b>{application.Info_New_construction}</b>
                          </p>
                          <p>
                            <b>{application.Info_Home_type}</b>
                          </p>
                        </div>
                      </ListGroup>
                    ) : (
                      <></>
                    )}
                  </Tab.Pane>
                  {/* New equipment */}
                  <Tab.Pane eventKey="new_quipment_info">
                    <h3 className="mt-3 mb-3 text-info">New Equipment Info</h3>
                    <Row>
                      <Col md={6}></Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <MaterialTable
                          columns={[
                            {
                              title: "System Type",
                              field: "newEquip_System_type",
                            },
                            { title: "Vendor", field: "newEquip_Vendor" },
                            { title: "Quantity", field: "newEquip_Quantity" },
                            { title: "BTU", field: "newEquip_Btu" },
                            {
                              title: "Manufacturer",
                              field: "newEquip_Manufacturer",
                            },
                            {
                              title: "Model Number",
                              field: "newEquip_Model_no",
                            },
                            { title: "Invoice#", field: "newEquip_Invoice_no" },
                            {
                              title: "Purchase Date",
                              field: "newEquip_Purchase_date",
                            },
                            { title: "Type", field: "newEquip_Type" },
                            { title: "Tons", field: "newEquip_Tons" },
                            {
                              title: "Install Date",
                              field: "newEquip_Purchase_date",
                            },
                          ]}
                          data={
                            application
                              ? application.New_equipment.length === 0
                                ? []
                                : application.New_equipment
                              : []
                          }
                          title="New Equipments"
                          options={{
                            headerStyle: {
                              backgroundColor: "#233f88",
                              color: "#FFF",
                            },
                          }}
                        />
                      </Col>
                      <Col md={6}>
                        {application ? (
                          application.New_equipment.length >= 1 ? (
                            <>
                              <h3 className="mt-3 mb-3 text-info">
                                Installer Information
                              </h3>
                              <ListGroup className="mb-3">
                                <p>
                                  Technician Name{" "}
                                  <b> {application.Installer_New_name} </b>
                                </p>
                                <p>
                                  Work Telephone{" "}
                                  <b> {application.Installer_New_worktel} </b>
                                </p>
                                <p>
                                  Company{" "}
                                  <b>
                                    {" "}
                                    {application.Installer_New_companyname}{" "}
                                  </b>
                                </p>
                                <p>
                                  Certification No.{" "}
                                  <b> {application.Installer_New_certno} </b>
                                </p>
                                <p className="mb-3">
                                  Email{" "}
                                  <b> {application.Installer_New_email} </b>
                                </p>
                                <p>
                                  Date of Final{" "}
                                  <b> {application.Installer_New_finaldate} </b>
                                </p>
                              </ListGroup>
                            </>
                          ) : (
                            <>No Equipment</>
                          )
                        ) : (
                          <></>
                        )}
                      </Col>
                      <Col md={6} className="mt-3">
                        <Table size="lg" striped bordered hover>
                          <thead className="bg-info text-white">
                            <tr className="py-5">
                              <th className="p-3">Equipment No.</th>
                              <th className="p-3">QTY</th>
                              <th className="p-3">Rebate</th>
                            </tr>
                          </thead>
                          <tbody>
                            {application ? (
                              <>
                                {application.New_equipment.map((eq, id) => (
                                  <tr key={id + 1}>
                                    <td className="p-3">{id + 1}</td>
                                    <td className="p-3">
                                      {eq.newEquip_Quantity}
                                    </td>
                                    <td className="p-3">
                                      {eq.newEquip_rebate}
                                    </td>
                                  </tr>
                                ))}
                              </>
                            ) : (
                              <></>
                            )}
                            <tr>
                              <td className="p-3 text-center" colSpan="2">
                                TOTAL
                              </td>
                              <td className="p-3">$0.00</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="old_quipment_info">
                    <h3 className="mt-3 mb-3 text-info">
                      Existing/Old Equipment Info{" "}
                    </h3>
                    <MaterialTable
                      columns={[
                        { title: "System Type", field: "oldEquip_System_type" },
                        { title: "Years", field: "oldEquip_Btu" },
                        { title: "Quantity", field: "oldEquip_Years" },
                        { title: "BTU", field: "oldEquip_Quantity" },
                        { title: "Eqpmt. Condition", field: "oldEquip_Tons" },
                        { title: "Seer", field: "oldEquip_Seer" },
                        {
                          title: "Disposal Party",
                          field: "oldEquip_Disposal_party",
                        },
                        {
                          title: "Date",
                          field: "oldEquip_Disposal_party",
                        },
                      ]}
                      data={
                        application
                          ? application.Old_equipment.length === 0
                            ? []
                            : application.Old_equipment
                          : []
                      }
                      title="Old Equipments"
                      options={{
                        headerStyle: {
                          backgroundColor: "#233f88",
                          color: "#FFF",
                        },
                      }}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="submission_of_documentation">
                    <ModalImage
                      data={modalData}
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    <Container className="ml-2 mr-2">
                      <h3 className="mt-3 mb-3 text-info">
                        Submitted Documents
                      </h3>

                      <ListGroup className="mb-3">
                        {application ? (
                          <>
                            <Row>
                              <Col md={4}>
                                <span>
                                  Invoice{" "}
                                  <Button
                                    className="mb-2"
                                    variant={"success"}
                                    onClick={() =>
                                      handleRetrieveFile(
                                        application.Submitted_docs[0].invoice
                                      )
                                    }
                                    size={"sm"}
                                  >
                                    Click to Download
                                  </Button>{" "}
                                  <br />
                                </span>
                                <Form.Group
                                  controlId="invoice"
                                  className="mb-3"
                                >
                                  <InputGroup>
                                    <Form.Control
                                      name="invoice"
                                      type="file"
                                      onChange={(e) =>
                                        handleOnChange(e, "invoice")
                                      }
                                    />
                                  </InputGroup>

                                  {invoice ? (
                                    <>
                                      {fileCode ? (
                                        <>
                                          {/* {setInvoiceD(fileCode)}
                                          {console.log(setInvoiceD)} */}
                                          <Badge bg={"success"}>
                                            File Uploaded
                                          </Badge>{" "}
                                          <br />
                                        </>
                                      ) : (
                                        <>no upload</>
                                      )}
                                      Filename: {invoice.name} <br />
                                      File Type: {invoice.type} <br />
                                      <br />
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <span>
                                  IRS-W9{" "}
                                  <Button
                                    className="mb-2"
                                    variant={"success"}
                                    onClick={() =>
                                      handleRetrieveFile(
                                        application.Submitted_docs[0].irs_form
                                      )
                                    }
                                    size={"sm"}
                                  >
                                    Click to Download
                                  </Button>{" "}
                                </span>
                                <Form.Group
                                  controlId="irs_form"
                                  className="mb-3"
                                >
                                  <InputGroup>
                                    <Form.Control
                                      name="irs_form"
                                      type="file"
                                      onChange={(e) =>
                                        handleOnChange(e, "irs_form")
                                      }
                                    />
                                  </InputGroup>

                                  {irs_form ? (
                                    <>
                                      {fileCode ? (
                                        <>
                                          {/* {setIrsFormD(fileCode)}
                                          {console.log(irs_formD)} */}
                                          <Badge bg={"success"}>
                                            File Uploaded
                                          </Badge>{" "}
                                          <br />
                                        </>
                                      ) : (
                                        <>no upload</>
                                      )}
                                      Filename: {irs_form.name} <br />
                                      File Type: {irs_form.type} <br />
                                      <br />
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <span>
                                  Letter of Authorization{" "}
                                  <Button
                                    className="mb-2"
                                    variant={"success"}
                                    onClick={() =>
                                      handleRetrieveFile(
                                        application.Submitted_docs[0]
                                          .letter_authorization
                                      )
                                    }
                                    size={"sm"}
                                  >
                                    Click to Download
                                  </Button>
                                </span>{" "}
                                <br />
                                <Form.Group
                                  controlId="letter_authorization"
                                  className="mb-3"
                                >
                                  <InputGroup>
                                    <Form.Control
                                      name="letter_authorization"
                                      type="file"
                                      onChange={(e) =>
                                        handleOnChange(
                                          e,
                                          "letter_authorization"
                                        )
                                      }
                                    />
                                  </InputGroup>

                                  {letter_authorization ? (
                                    <>
                                      {fileCode ? (
                                        <>
                                          {/* {setLetterAuthorizationD(fileCode)}
                                          {console.log(setLetterAuthorizationD)} */}
                                          <Badge bg={"success"}>
                                            File Uploaded
                                          </Badge>{" "}
                                          <br />
                                        </>
                                      ) : (
                                        <>no upload</>
                                      )}
                                      Filename: {letter_authorization.name}{" "}
                                      <br />
                                      File Type: {
                                        letter_authorization.type
                                      }{" "}
                                      <br />
                                      <br />
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <span>
                                  Disposal Slip{" "}
                                  <Button
                                    className="mb-2"
                                    variant={"success"}
                                    onClick={() =>
                                      handleRetrieveFile(
                                        application.Submitted_docs[0]
                                          .disposal_slip
                                      )
                                    }
                                    size={"sm"}
                                  >
                                    Click to Download
                                  </Button>{" "}
                                </span>{" "}
                                <br />
                                <Form.Group
                                  controlId="disposal_slilp"
                                  className="mb-3"
                                >
                                  <InputGroup>
                                    <Form.Control
                                      name="disposal_slilp"
                                      type="file"
                                      onChange={(e) =>
                                        handleOnChange(e, "disposal_slip")
                                      }
                                    />
                                  </InputGroup>

                                  {disposal_slip ? (
                                    <>
                                      {fileCode ? (
                                        <>
                                          {/* {setDisposalSlipD(fileCode)}
                                          {console.log(setDisposalSlipD)} */}
                                          <Badge bg={"success"}>
                                            File Uploaded
                                          </Badge>{" "}
                                          <br />
                                        </>
                                      ) : (
                                        <>no upload</>
                                      )}
                                      Filename: {disposal_slip.name} <br />
                                      File Type: {disposal_slip.type} <br />
                                      <br />
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </Form.Group>
                              </Col>

                              <Col md={4}>
                                <span>
                                  Other Document 1{" "}
                                  <Button
                                    className="mb-2"
                                    variant={"success"}
                                    onClick={() =>
                                      handleRetrieveFile(
                                        application.Submitted_docs[0].other_doc1
                                      )
                                    }
                                    size={"sm"}
                                  >
                                    Click to Download
                                  </Button>{" "}
                                </span>{" "}
                                <br />
                                <Form.Group
                                  controlId="other_doc1"
                                  className="mb-3"
                                >
                                  <InputGroup>
                                    <Form.Control
                                      name="other_doc1"
                                      type="file"
                                      onChange={(e) =>
                                        handleOnChange(e, "other_doc1")
                                      }
                                    />
                                  </InputGroup>

                                  {other_doc1 ? (
                                    <>
                                      {fileCode ? (
                                        <>
                                          {/* {setOtherDoc1D(fileCode)}
                                          {console.log(setOtherDoc1D)} */}
                                          <Badge bg={"success"}>
                                            File Uploaded
                                          </Badge>{" "}
                                          <br />
                                        </>
                                      ) : (
                                        <>no upload</>
                                      )}
                                      Filename: {other_doc1.name} <br />
                                      File Type: {other_doc1.type} <br />
                                      <br />
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </Form.Group>
                              </Col>

                              <Col md={4}>
                                <span>
                                  Other Document 2{" "}
                                  <Button
                                    className="mb-2"
                                    variant={"success"}
                                    onClick={() =>
                                      handleRetrieveFile(
                                        application.Submitted_docs[0].other_doc2
                                      )
                                    }
                                    size={"sm"}
                                  >
                                    Click to Download
                                  </Button>{" "}
                                </span>{" "}
                                <br />
                                <Form.Group
                                  controlId="letter_authorization"
                                  className="mb-3"
                                >
                                  <InputGroup>
                                    <Form.Control
                                      name="letter_authorization"
                                      type="file"
                                      onChange={(e) =>
                                        handleOnChange(e, "other_doc2")
                                      }
                                    />
                                  </InputGroup>

                                  {other_doc2 ? (
                                    <>
                                      {fileCode ? (
                                        <>
                                          {/* {setOtherDoc2D(fileCode)}
                                          {console.log(setOtherDoc2D)} */}
                                          <Badge bg={"success"}>
                                            File Uploaded
                                          </Badge>{" "}
                                          <br />
                                        </>
                                      ) : (
                                        <>no upload</>
                                      )}
                                      Filename: {other_doc2.name} <br />
                                      File Type: {other_doc2.type} <br />
                                      <br />
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </Form.Group>
                              </Col>
                            </Row>
                          </>
                        ) : (
                          ""
                        )}
                      </ListGroup>
                    </Container>
                    <Container className="ml-2 mr-2">
                      <h3 className="mt-3 mb-3">Update Status</h3>
                      <Row>
                        <Col md={12}>
                          <Modal show={showModal} onHide={handleModalClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>
                                {status === 3 ? (
                                  <>Reject Application</>
                                ) : (
                                  <>Process Application</>
                                )}
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                              {status === 3 ? (
                                <Container className="col-8 text-center btn-group-vertical">
                                  <Form.Group
                                    controlId="role_id"
                                    className="mb-1"
                                  >
                                    <Form.Select
                                      onChange={(e) =>
                                        setReason(e.target.value)
                                      }
                                      value={reason}
                                      required
                                    >
                                      <option>Open this select menu</option>
                                      <option value="0">None</option>
                                      <option value="1">
                                        Applicant is not a GPA Account holder or
                                        property owner.
                                      </option>
                                      <option value="2">
                                        Application information provided was
                                        incorrect.
                                      </option>
                                      <option value="3">
                                        Equipment was not installed within 120
                                        days from invoice date.
                                      </option>
                                      <option value="4">
                                        Application was not submitted within 120
                                        days from install date.
                                      </option>
                                      <option value="5">
                                        Missing or incorrect Invoice.
                                      </option>
                                      <option value="6">
                                        Missing or incorrect W-9.
                                      </option>
                                      <option value="7">
                                        Missing or Incorrect Installer
                                        Information.
                                      </option>
                                      <option value="8">
                                        Other: Please contact GPA for more
                                        information.
                                      </option>
                                    </Form.Select>
                                  </Form.Group>
                                  <Button
                                    variant={"danger"}
                                    onClick={() => updateStatus(3, 0)}
                                  >
                                    Reject Application
                                  </Button>
                                </Container>
                              ) : roleId === 2 ? (
                                <Container>
                                  <Button
                                    onClick={() => {
                                      setSwalInfo("Send to SPORD");
                                      updateStatus(1, 1);
                                    }}
                                  >
                                    Send to SPORD
                                  </Button>
                                </Container>
                              ) : roleId === 3 ? (
                                <Container className="col-8 text-center btn-group-vertical">
                                  <Button
                                    onClick={() => {
                                      setSwalInfo("Send to Supervisor");
                                      updateStatus(1, 3);
                                    }}
                                    className="mb-1"
                                  >
                                    Send to Supervisor
                                  </Button>{" "}
                                  <br />
                                  <Button
                                    onClick={() => {
                                      setSwalInfo(
                                        "Send Back to Customer Service"
                                      );
                                      updateStatus(1, 4);
                                    }}
                                  >
                                    Send Back to Customer Service
                                  </Button>
                                </Container>
                              ) : roleId === 6 ? (
                                <Container className="col-8 text-center btn-group-vertical">
                                  <Button
                                    onClick={() => {
                                      setSwalInfo("Send to Budget");
                                      updateStatus(1, 5);
                                    }}
                                  >
                                    Send to Budget
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      setSwalInfo("Send Back to SPORD");
                                      updateStatus(1, 1);
                                    }}
                                  >
                                    Send Back to SPORD
                                  </Button>
                                </Container>
                              ) : roleId === 4 ? (
                                <Container className="col-8 text-center btn-group-vertical">
                                  <Button
                                    className="mb-5"
                                    onClick={() => {
                                      setSwalInfo("Send to Accounting");
                                      updateStatus(1, 2);
                                    }}
                                  >
                                    Send to Accounting
                                  </Button>
                                  <Button
                                    className="mb-1"
                                    onClick={() => {
                                      setSwalInfo("Send Back to Supervisor");
                                      updateStatus(1, 3);
                                    }}
                                  >
                                    Send Back to Supervisor
                                  </Button>
                                </Container>
                              ) : roleId === 5 ? (
                                <Container className="col-8 text-center btn-group-vertical">
                                  <Button
                                    variant={"success"}
                                    className="mb-1"
                                    onClick={() => {
                                      setSwalInfo("Approve Application");
                                      updateStatus(2, 0);
                                    }}
                                  >
                                    Approve Application
                                  </Button>
                                  <br />
                                  <Button
                                    variant={"danger"}
                                    className="mb-1"
                                    onClick={() => {
                                      setSwalInfo("(Decline) Send to Spord");
                                      updateStatus(1, 1);
                                    }}
                                  >
                                    (Decline) Send to Spord
                                  </Button>
                                  <br />
                                  <Button
                                    variant={"danger"}
                                    className="mb-1"
                                    onClick={() => {
                                      setSwalInfo("(Decline) Send to CS");
                                      updateStatus(1, 4);
                                    }}
                                  >
                                    (Decline) Send to CS
                                  </Button>
                                </Container>
                              ) : roleId === 1 ? (
                                <Container className="col-8 text-center btn-group-vertical">
                                  <Button
                                    variant={"success"}
                                    onClick={() => {
                                      setSwalInfo("Approve Application");
                                      updateStatus(2, 0);
                                    }}
                                  >
                                    Approve Application
                                  </Button>
                                  <br />
                                  <Button
                                    onClick={() => {
                                      setSwalInfo("Send to CS");
                                      updateStatus(1, 4);
                                    }}
                                  >
                                    Send to CS
                                  </Button>{" "}
                                  <br />
                                  <Button
                                    onClick={() => {
                                      setSwalInfo("Send to SPORD");
                                      updateStatus(1, 1);
                                    }}
                                  >
                                    Send to SPORD
                                  </Button>{" "}
                                  <br />
                                  <Button
                                    onClick={() => {
                                      setSwalInfo("Send to Supervisor");
                                      updateStatus(1, 3);
                                    }}
                                  >
                                    Send to Supervisor
                                  </Button>{" "}
                                  <br />
                                  <Button
                                    onClick={() => {
                                      setSwalInfo("Send to Budget");
                                      updateStatus(1, 5);
                                    }}
                                  >
                                    Send to Budget
                                  </Button>{" "}
                                  <br />
                                  <Button
                                    onClick={() => {
                                      setSwalInfo("Send to Accounting");
                                      updateStatus(1, 2);
                                    }}
                                  >
                                    Send to Accounting
                                  </Button>{" "}
                                  <br />
                                </Container>
                              ) : (
                                <></>
                              )}
                            </Modal.Body>
                          </Modal>
                          <Button
                            className="me-2"
                            variant={"info"}
                            onClick={() => changeStatusHandler(1)}
                          >
                            Process Sending
                          </Button>
                          <Button
                            className="me-2"
                            variant={"danger"}
                            onClick={() => changeStatusHandler(3)}
                          >
                            Reject
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
              {detailsToggle ? (
                <>
                  {application ? (
                    <>
                      <Col
                        md={3}
                        style={{
                          backgroundColor: "rgb(243, 244, 249)",
                          borderLeft: "2px solid #d0d5db",
                        }}
                      >
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
                        {logs ? (
                          <div style={{ height: "200px", overflowY: "auto" }}>
                            {logs.map((log, index) => (
                              <div key={index}>
                                <h6>{log.Action}</h6>
                                <small className="text-muted">
                                  Made By: {log.Made_By}
                                </small>
                                <br />
                                <small className="text-muted">
                                  Made On: {log.Made_On}
                                </small>
                                <hr />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p>Loading...</p>
                        )}
                      </Col>
                    </>
                  ) : (
                    "loading . . "
                  )}
                </>
              ) : (
                <></>
              )}
            </Row>
            <hr />
            {/* Comments section */}
            <br />
            <Row>
              <Col md={9}>
                <Form>
                  <Form.Group className="mb-3" controlId="comment">
                    <Form.Label>
                      <b>Comments</b>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      onChange={(e) => changeCommentHandler(e.target.value)}
                      value={comment}
                    />
                  </Form.Group>
                  <Button onClick={() => addCommentHandler()} variant="success">
                    Submit
                  </Button>
                  <br />
                  <br />
                </Form>
                <hr />

                {comments ? (
                  comments.map((comment) => (
                    <div className="p-3 mb-1">
                      <h6>
                        {comment.Made_By} |{" "}
                        {timeAgo.format(
                          new Date(comment.Made_On) - 60 * 60 * 1000,
                          "twitter"
                        )}
                        <br />
                        <small className="text-muted">{comment.role}</small>
                      </h6>
                      <h6 className="text-muted">{comment.Comment}</h6>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </Col>
              <Col md={3}></Col>
            </Row>
          </Tab.Container>
        </Container>
      ) : (
        <Container>
          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {status === 3 ? (
                  <>Reject Application</>
                ) : (
                  <>Process Application</>
                )}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              {status === 3 ? (
                <Container className="col-8 text-center btn-group-vertical">
                  <Form.Group controlId="role_id" className="mb-1">
                    <Form.Select
                      onChange={(e) => setReason(e.target.value)}
                      value={reason}
                      required
                    >
                      <option>Open this select menu</option>
                      <option value="0">None</option>
                      <option value="1">
                        Applicant is not a GPA Account holder or property owner.
                      </option>
                      <option value="2">
                        Application information provided was incorrect.
                      </option>
                      <option value="3">
                        Equipment was not installed within 120 days from invoice
                        date.
                      </option>
                      <option value="4">
                        Application was not submitted within 120 days from
                        install date.
                      </option>
                      <option value="5">Missing or incorrect Invoice.</option>
                      <option value="6">Missing or incorrect W-9.</option>
                      <option value="7">
                        Missing or Incorrect Installer Information.
                      </option>
                      <option value="8">
                        Other: Please contact GPA for more information.
                      </option>
                    </Form.Select>
                  </Form.Group>
                  <Button variant={"danger"} onClick={() => updateStatus(3, 0)}>
                    Reject Application
                  </Button>
                </Container>
              ) : roleId === 2 ? (
                <Container>
                  <Button
                    onClick={() => {
                      setSwalInfo("Send to SPORD");
                      updateStatus(1, 1);
                    }}
                  >
                    Send to SPORD
                  </Button>
                </Container>
              ) : roleId === 3 ? (
                <Container className="col-8 text-center btn-group-vertical">
                  <Button
                    onClick={() => {
                      setSwalInfo("Send to Supervisor");
                      updateStatus(1, 3);
                    }}
                    className="mb-1"
                  >
                    Send to Supervisor
                  </Button>{" "}
                  <br />
                  <Button
                    onClick={() => {
                      setSwalInfo("Send Back to Customer Service");
                      updateStatus(1, 4);
                    }}
                  >
                    Send Back to Customer Service
                  </Button>
                </Container>
              ) : roleId === 6 ? (
                <Container className="col-8 text-center btn-group-vertical">
                  <Button
                    onClick={() => {
                      setSwalInfo("Send to Budget");
                      updateStatus(1, 5);
                    }}
                  >
                    Send to Budget
                  </Button>
                  <Button
                    onClick={() => {
                      setSwalInfo("Send Back to SPORD");
                      updateStatus(1, 1);
                    }}
                  >
                    Send Back to SPORD
                  </Button>
                </Container>
              ) : roleId === 4 ? (
                <Container className="col-8 text-center btn-group-vertical">
                  <Button
                    className="mb-2"
                    onClick={() => {
                      setSwalInfo("Send to Accounting");
                      updateStatus(1, 2);
                    }}
                  >
                    Send to Accounting
                  </Button>
                  <Button
                    className="mb-2"
                    onClick={() => {
                      setSwalInfo("Send Back to Supervisor");
                      updateStatus(1, 3);
                    }}
                  >
                    Send Back to Supervisor
                  </Button>
                </Container>
              ) : roleId === 5 ? (
                <Container className="col-8 text-center btn-group-vertical">
                  <Button
                    variant={"success"}
                    className="mb-1"
                    onClick={() => {
                      setSwalInfo("Approve Application");
                      updateStatus(2, 0);
                    }}
                  >
                    Approve Application
                  </Button>
                  <br />
                  <Button
                    variant={"danger"}
                    className="mb-1"
                    onClick={() => {
                      setSwalInfo("(Decline) Send to Spord");
                      updateStatus(1, 1);
                    }}
                  >
                    (Decline) Send to Spord
                  </Button>
                  <br />
                  <Button
                    variant={"danger"}
                    className="mb-1"
                    onClick={() => {
                      setSwalInfo("(Decline) Send to CS");
                      updateStatus(1, 4);
                    }}
                  >
                    (Decline) Send to CS
                  </Button>
                </Container>
              ) : roleId === 1 ? (
                <Container className="col-8 text-center btn-group-vertical">
                  <Button
                    variant={"success"}
                    onClick={() => {
                      setSwalInfo("Approve Application");
                      updateStatus(2, 0);
                    }}
                  >
                    Approve Application
                  </Button>
                  <br />
                  <Button
                    onClick={() => {
                      setSwalInfo("Send to CS");
                      updateStatus(1, 4);
                    }}
                  >
                    Send to CS
                  </Button>{" "}
                  <br />
                  <Button
                    onClick={() => {
                      setSwalInfo("Send to SPORD");
                      updateStatus(1, 1);
                    }}
                  >
                    Send to SPORD
                  </Button>{" "}
                  <br />
                  <Button
                    onClick={() => {
                      setSwalInfo("Send to Supervisor");
                      updateStatus(1, 3);
                    }}
                  >
                    Send to Supervisor
                  </Button>{" "}
                  <br />
                  <Button
                    onClick={() => {
                      setSwalInfo("Send to Budget");
                      updateStatus(1, 5);
                    }}
                  >
                    Send to Budget
                  </Button>{" "}
                  <br />
                  <Button
                    onClick={() => {
                      setSwalInfo("Send to Accounting");
                      updateStatus(1, 2);
                    }}
                  >
                    Send to Accounting
                  </Button>{" "}
                  <br />
                </Container>
              ) : (
                <></>
              )}
            </Modal.Body>
          </Modal>

          <Row>
            {showApplicationTab ? (
              <Col md={12}>
                <Button
                  variant={"white"}
                  size={"sm"}
                  className="mb-2"
                  onClick={() => backToBatchesHandler()}
                >
                  <i className="fa fa-arrow-left"></i> Back to Batches
                </Button>
                <MaterialTable
                  columns={[
                    // {
                    //   title: "#",
                    //   field: "check_actions",
                    //   width: "10%",
                    //   editComponent: (props) => {
                    //     return <Button>Payts</Button>;
                    //   },
                    //   render: (rowdata) => (
                    //     <>
                    //       {Object.keys(batch_applications[0]).length > 3 ? (
                    //         <>
                    //           <input
                    //             type="checkbox"
                    //             onChange={(e) =>
                    //               getSelected(e, rowdata.Application_Id)
                    //             }
                    //           ></input>
                    //         </>
                    //       ) : (
                    //         <></>
                    //       )}
                    //     </>
                    //   ),
                    // },
                    { title: "Control No.", field: "Control_Number" },
                    { title: "Status", field: "Status" },
                    { title: "Stage", field: "Stage" },
                    { title: "Total Rebate", field: "TotalRebate" },
                    // {
                    //   title: "Action",
                    //   field: "actions",
                    //   width: "10%",
                    //   editComponent: (props) => {
                    //     return <Button>Payts</Button>;
                    //   },
                    //   render: (rowdata) => (
                    //     <>
                    //       {Object.keys(batch_applications[0]).length > 3 ? (
                    //         <>
                    //           <Button variant={"success"} size="sm" onClick={(rowdata)=>applicationViewHandler(rowdata)} >View</Button>
                    //         </>
                    //       ) : (
                    //         <></>
                    //       )}
                    //     </>
                    //   ),
                    // },
                  ]}
                  data={batch_applications}
                  title={width < 770 ? "" : "Batch Application"}
                  options={{
                    headerStyle: {
                      backgroundColor: "#233f88",
                      color: "#FFF",
                    },
                    selection: true,
                  }}
                  onSelectionChange={(rows) =>
                    rows.length > 0 ? (
                      <>
                        {(selectedIds = [])}
                        {rows.map((row) => {
                          selectedIds.push(row.Application_Id);
                        })}
                        {setSelectedIds(selectedIds)}
                      </>
                    ) : (
                      <>
                        {(selectedIds = [])}
                        {setSelectedIds(selectedIds)}
                      </>
                    )
                  }
                />
                <div className="d-flex flex-row-reverse">
                  <Button
                    className="ms-1 mt-1 px-5"
                    variant={roleId === 3 ? "secondary" : "danger"}
                    onClick={() => changeStatusHandler(3)}
                    disabled={roleId === 3 ? true : false}
                  >
                    Reject
                  </Button>
                  <Button
                    className="ms-1 mt-1 px-5"
                    variant={roleId === 3 ? "secondary" : "success"}
                    onClick={() => changeStatusHandler(1)}
                    disabled={roleId === 3 ? true : false}
                  >
                    Process
                  </Button>
                </div>
              </Col>
            ) : (
              <Col md={12}>
                <MaterialTable
                  columns={[
                    { title: "Batch Code", field: "Batch_code" },
                    { title: "Batch Type", field: "Batch_type" },
                    { title: "Batch Ferc", field: "Batch_ferc" },
                    {
                      title: "MadeOn",
                      render: (rowData) => {
                        let d = new Date(rowData.Made_On);
                        return <>{d.toLocaleDateString()}</>;
                      },
                    },

                    {
                      title: "Action",
                      field: "actions",
                      width: "10%",
                      editComponent: (props) => {
                        return <Button>Payts</Button>;
                      },
                      render: (rowdata) => (
                        <>
                          <Button
                            className="btn btn-sm btn-light"
                            onClick={() => selectHandler(rowdata)}
                          >
                            <i className="fa fa-edit"></i>
                          </Button>
                        </>
                      ),
                    },
                  ]}
                  data={batches}
                  title="Batch"
                  options={{
                    rowStyle: {
                      height: "5px !important",
                    },
                    headerStyle: {
                      backgroundColor: "#233f88",
                      color: "#FFF",
                    },
                  }}
                />
              </Col>
            )}
          </Row>
        </Container>
      )}
    </>
  );
}

export default BatchForm;
