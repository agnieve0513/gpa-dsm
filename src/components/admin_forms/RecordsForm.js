import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Form,
  ListGroup,
  Tabs,
  Modal,
  Tab,
  Badge,
  InputGroup,
  Container,
  Button,
  ButtonGroup,
  Nav,
  Offcanvas,
  Card,
  Spinner,
} from "react-bootstrap";

import {
  listApplications,
  listApplicationsRecords,
  detailApplication,
  commentsApplication,
  addCommentAction,
  logsApplication,
  updateApplication,
} from "../../actions/applicationActions";
import { listBatchCurrent, addNewBatch } from "../../actions/batchActions";
import { retrieveFileAction } from "../../actions/fileActions";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { GridOptions } from "ag-grid-community";

import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import ModalImage from "../ModalImage";

import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en.json";

import "./ApplicationForm.css";

import { uploadFileAction } from "../../actions/fileActions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useWindowDimensions } from "../../hooks";
const MySwal = withReactContent(Swal);
let p = {};

TimeAgo.addDefaultLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

function RecordsForm() {
  const { height, width } = useWindowDimensions();
  const [commentShow, setCommentShow] = useState(false);
  const [show, setShow] = useState(false);

  const handleCommentClose = () => setCommentShow(false);
  const handleCommentShow = () => setCommentShow(true);

  let obj = JSON.parse(localStorage.getItem("userInfo"));
  let roleId = obj.message.original.roleId;

  const [new_eq_index, setNewEqIndex] = useState(0);
  const [old_eq_index, setOldEqIndex] = useState(0);
  const [count_equipment, setCountEquipment] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [showBatchModal, setBatchShowModal] = useState(false);
  const [showNewEquipmentInfo, setShowNewEquipmentInfo] = useState(false);
  const [showOldEquipmentInfo, setShowOldEquipmentInfo] = useState(false);
  const [equipmentInfo, setEquipmentInfo] = useState([]);
  const [applicationId, setApplicationId] = useState(0);
  const [status, setStatus] = useState("");
  const [stage, setStage] = useState("");
  const [reason, setReason] = useState("");
  const [batch, setBatch] = useState("");
  const [comment, setComment] = useState("");
  const [swalInfo, setSwalInfo] = useState("");
  const [updateState, setUpdateState] = useState(0);

  const [applicationClicked, setApplicationClicked] = useState(false);
  const [newEquipmentClicked, setNewEquipmentClicked] = useState(false);
  const [oldEquipmentClicked, setOldEquipmentClicked] = useState(false);
  const [submitDocsClicked, setSubmitDocsClicked] = useState(false);

  const [detailsToggle, setDetailsToggle] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleBatchModalClose = () => setBatchShowModal(false);

  const dispatch = useDispatch();

  const applicationListRecord = useSelector(
    (state) => state.applicationListRecord
  );
  const { applications } = applicationListRecord;

  const applicationDetail = useSelector((state) => state.applicationDetail);
  const { loading, error, application } = applicationDetail;
  
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

  const addComment = useSelector((state) => state.addComment);
  const {
    error: commentError,
    loading: commentLoading,
    success: commentSucess,
  } = addComment;

  const retrieveFile = useSelector((state) => state.retrieveFile);
  const {
    error: retrieveError,
    loading: retrieveLoading,
    success: retrieveSuccess,
  } = retrieveFile;

  const batchCurrent = useSelector((state) => state.batchCurrent);
  const { batch_current } = batchCurrent;

  const batchAdd = useSelector((state) => state.batchAdd);
  const { success: addBatchSuccess } = batchAdd;

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
  const uploadFile = useSelector((state) => state.uploadFile);
  const { loading: uploadLoading, error: uploadError, fileCode } = uploadFile;
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
    setApplicationId(selectedRows[0].Application_Id);
    dispatch(detailApplication(selectedRows[0].Application_Id));
    dispatch(commentsApplication(selectedRows[0].Application_Id));
    dispatch(logsApplication(selectedRows[0].Application_Id));
    setShow(true);
  };

  const printState = () => {
    var filterState = gridApi.getFilterModel();
    console.log("filterState: ", filterState);
  };

  const saveState = () => {
    window.filterState = gridApi.getFilterModel();
    console.log("filter state saved");
  };

  const restoreState = () => {
    gridApi.setFilterModel(window.filterState);
    console.log("filter state restored");
  };

  const resetState = () => {
    gridApi.setFilterModel(null);
    console.log("column state reset");
  };

  //for filtering . . .
  const filterParams = {
    filterOptions: [
      "empty",
      {
        displayKey: "evenNumbers",
        displayName: "Even Numbers",
        test: function (filterValue, cellValue) {
          return cellValue != null && cellValue % 2 === 0;
        },
        hideFilterInput: true,
      },
      {
        displayKey: "oddNumbers",
        displayName: "Odd Numbers",
        test: function (filterValue, cellValue) {
          return cellValue != null && cellValue % 2 !== 0;
        },
        hideFilterInput: true,
      },
      {
        displayKey: "blanks",
        displayName: "Blanks",
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
      "contains",
      {
        test: function (filterValue, cellValue) {
          return cellValue != null && cellValue.indexOf("a") === 0;
        },
        hideFilterInput: true,
      },
    ],
  };
  const equalsFilterParams = {
    filterOptions: [
      "equals",
      {
        displayKey: "equalsWithNulls",
        displayName: "Equals (with Nulls)",
        test: function (filterValue, cellValue) {
          if (cellValue == null) return true;
          const parts = cellValue.split("/");
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
      const dateParts = dateAsString.split("/");
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
      "notEqual",
      {
        displayKey: "notEqualNoNulls",
        displayName: "Not Equals without Nulls",
        test: function (filterValue, cellValue) {
          if (cellValue == null) return false;
          return cellValue !== filterValue.toLowerCase();
        },
      },
    ],
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
  // }, [application, successUpdate, addBatchSuccess,commentSucess])

  const selectHandler = () => {};

  const changeStatusHandler = (status) => {
    setStatus(status);
    setShowModal(true);

    console.log(status);
  };

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
          dispatch(updateApplication(applicationId, status, stage, reason));
          setShow(false);
          setShowModal(false);
          Swal.fire("Success", "Application has been rejected!", "success");
        }
      });
    } else {
      if (swalInfo !== "") {
        Swal.fire({
          title: `Are you sure you want to ${swalInfo}?`,
          // showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          // denyButtonText: `Cancel`,
        }).then((result) => {
          if (result.isConfirmed) {
            setStatus(status);
            setStage(stage);
            dispatch(
              updateApplication(applicationId, status, stage, reason, batch)
            );
            setShowModal(false);
            Swal.fire("Success", "Application has been processed!", "success");
          }
        });
      }
      setUpdateState(updateState + 1);
    }
  };

  useEffect(() => {
    dispatch(listApplicationsRecords());
    dispatch(listBatchCurrent());
    dispatch(detailApplication(applicationId));
    dispatch(logsApplication(applicationId));

    dispatch(commentsApplication(applicationId));
  }, [successUpdate, addBatchSuccess, commentSucess]);

  const resetHandler = () => {
    setShow(false);
  };

  const addBatchHandler = () => {
    if (window.confirm("Are you sure you want to create new Batch?")) {
      dispatch(addNewBatch());
    }
  };

  // TODO: Needed some revisions here if how to automate the adding of batch
  // !This one is for adding to supervisor with batch
  const selectBatchHandler = (batch_id) => {
    if (window.confirm("Are you sure you want to send to Supervisor?")) {
      setBatch(batch_id);
      setStatus(status);
      setStage(stage);
      setBatchShowModal(false);

      if (window.confirm("Are you sure you want to process application?")) {
        dispatch(
          updateApplication(applicationId, status, stage, reason, batch_id)
        );
      }
    }
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

  const showNewEquipmentInformation = (index) => {
    setNewEqIndex(index);
    console.log(application);
  };

  const addCommentHandler = () => {
    dispatch(addCommentAction(applicationId, comment));

    const Toast = MySwal.mixin({
      toast: true,
      position: "bottom-right",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 3500,
      timerProgressBars: true,
    });

    Toast.fire({
      icon: "success",
      title: "Comment Sent",
      text: "",
    });

    setComment("");
  };

  const changeCommentHandler = (text) => {
    setComment(text);
  };

  // testing lng ...
  const ButtonClick = (selected) => {
    const onButtonClick = () => {
      console.log("selected application: ", selected.data);
      dispatch(detailApplication(selected.data.Application_Id));
      setApplicationId(selected.data.Application_Id);

      dispatch(commentsApplication(selected.data.Application_Id));
      dispatch(logsApplication(selected.data.Application_Id));
      setShow(true);
    };
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={{ width: 70 }}
          variant="success"
          size="sm"
          onClick={() => onButtonClick()}
        >
          View
        </Button>
      </div>
    );
  };

  const reader = new FileReader();

  const handleRetrieveFile = (code) => {
    console.log(code);
    dispatch(retrieveFileAction(code));
  };

  const handleDetailsToggle = () => {
    if (detailsToggle === false) {
      setDetailsToggle(true);
    } else {
      setDetailsToggle(false);
    }
  };

  return (
    <div>
      {show ? (
        <Container>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="application_information"
          >
            <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button className="mb-3 btn btn-light" onClick={() => resetHandler()}>
            <i className="fa fa-arrow-left"></i> Back to Application
          </Button>
          <h4 style={{ marginLeft: "auto" }}>{application?.Control_Number}</h4>
        </div>
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
                      className="d-flex aligns-items-center justify-content-center editbtn"
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
                        {width > 770 ? (
                          <>
                            <div style={{ marginRight: 50 }}>
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
                                <b style={{ color: "#B6B6B6" }}>
                                  Telephone Number
                                </b>
                              </p>
                              <p className="mt-5 mb-5">
                                <b style={{ color: "#B6B6B6" }}>
                                  Is Applicant the owner of the <br />{" "}
                                  residential property?
                                </b>
                              </p>
                              <p>
                                <b style={{ color: "#B6B6B6" }}>
                                  MAILING ADDRESS
                                </b>
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
                                <b style={{ color: "#B6B6B6" }}>
                                  NEW CONSTRUCTION
                                </b>
                              </p>
                              <p>
                                <b style={{ color: "#B6B6B6" }}>HOME TYPE</b>
                              </p>
                            </div>
                            <div>
                              <p>
                                <b>{application.Info_Account_no || "N/A"}</b>
                              </p>
                              <p>
                                <b>{application.Info_Bill_id || "N/A"}</b>
                              </p>
                              <p>
                                <b>{application.Info_Customer_name || "N/A"}</b>
                              </p>
                              <p>
                                <b>
                                  {application.Info_Mailing_address || "N/A"}
                                </b>
                              </p>
                              <p>
                                <b>{application.Info_Mailing_city || "N/A"}</b>
                              </p>
                              <p>
                                <b>{application.Info_Mailing_zip || "N/A"}</b>
                              </p>
                              <p>
                                <b>{application.Info_Email || "N/A"}</b>
                              </p>
                              <p>
                                <b>{application.Info_Tel_no || "N/A"}</b>
                              </p>
                              <p className="mt-5 mb-5">
                                <b>
                                  {application.Info_Is_owner || "N/A"}
                                  <br />
                                  <p
                                    style={{
                                      color: "#F9F9FA",
                                      userSelect: "none",
                                    }}
                                  >
                                    h
                                  </p>
                                </b>
                              </p>
                              <p>
                                <b>
                                  {application.Info_Mailing_address || "N/A"}
                                </b>
                              </p>
                              <p>
                                <b>{application.Info_Mailing_city || "N/A"}</b>
                              </p>
                              <p>
                                <b>{application.Info_Mailing_zip || "N/A"}</b>
                              </p>
                              <p>
                                <b>{application.Info_Home_age || "N/A"}</b>
                              </p>
                              <p>
                                <b>
                                  {application.Info_New_construction || "N/A"}
                                </b>
                              </p>
                              <p>
                                <b>{application.Info_Home_type || "N/A"}</b>
                              </p>
                            </div>
                          </>
                        ) : (
                          <div style={{ marginRight: 50 }}>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>
                                GPA Electric Account Number
                              </b>
                              <br />
                              <b>{application.Info_Account_no || "N/A"}</b>
                            </p>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>Bill ID</b>
                              <br />
                              <b>{application.Info_Bill_id || "N/A"}</b>
                            </p>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>
                                Name on GPA Account
                              </b>
                              <br />
                              <b>{application.Info_Customer_name || "N/A"}</b>
                            </p>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>
                                Installation Address
                              </b>
                              <br />
                              <b>{application.Info_Mailing_address || "N/A"}</b>
                            </p>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>City</b>
                              <br />
                              <b>{application.Info_Mailing_city || "N/A"}</b>
                            </p>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>Zip</b>
                              <br />
                              <b>{application.Info_Mailing_zip || "N/A"}</b>
                            </p>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>Email</b>
                              <br />
                              <b>{application.Info_Email || "N/A"}</b>
                            </p>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>
                                Telephone Number
                              </b>
                              <br />
                              <b>{application.Info_Tel_no || "N/A"}</b>
                            </p>
                            <p className="mt-5 mb-5">
                              <b style={{ color: "#B6B6B6" }}>
                                Is Applicant the owner of the <br /> residential
                                property?
                              </b>
                              <br />
                              <b>{application.Info_Is_owner || "N/A"}</b>
                            </p>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>
                                MAILING ADDRESS
                              </b>
                              <br />
                              <b>{application.Info_Mailing_address || "N/A"}</b>
                            </p>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>CITY</b>
                              <br />
                              <b>{application.Info_Mailing_city || "N/A"}</b>
                            </p>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>ZIP</b>
                              <br />
                              <b>{application.Info_Mailing_zip || "N/A"}</b>
                            </p>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>HOME AGE</b>
                              <br />
                              <b>{application.Info_Home_age || "N/A"}</b>
                            </p>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>
                                NEW CONSTRUCTION
                              </b>
                              <br />
                              <b>
                                {application.Info_New_construction || "N/A"}
                              </b>
                            </p>
                            <p>
                              <b style={{ color: "#B6B6B6" }}>HOME TYPE</b>
                              <br />
                              <b>{application.Info_Home_type || "N/A"}</b>
                            </p>
                          </div>
                        )}
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
                              <ListGroup
                                className="mb-3"
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div style={{ marginRight: 50 }}>
                                  <p>
                                    <b style={{ color: "#B6B6B6" }}>
                                      Technician Name
                                    </b>
                                  </p>
                                  <p>
                                    <b style={{ color: "#B6B6B6" }}>
                                      Work Telephone
                                    </b>
                                  </p>
                                  <p>
                                    <b style={{ color: "#B6B6B6" }}>Company</b>
                                  </p>
                                  <p>
                                    <b style={{ color: "#B6B6B6" }}>
                                      Certification No.
                                    </b>
                                  </p>
                                  <p>
                                    <b style={{ color: "#B6B6B6" }}>Email</b>
                                  </p>
                                  <p>
                                    <b style={{ color: "#B6B6B6" }}>
                                      Date of Final
                                    </b>
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    <b>
                                      {application.Installer_New_name || "N/A"}
                                    </b>
                                  </p>
                                  <p>
                                    <b>
                                      {application.Installer_New_worktel ||
                                        "N/A"}
                                    </b>
                                  </p>
                                  <p>
                                    <b>
                                      {application.Installer_New_companyname ||
                                        "N/A"}
                                    </b>
                                  </p>
                                  <p>
                                    <b>
                                      {application.Installer_New_certno ||
                                        "N/A"}
                                    </b>
                                  </p>
                                  <p>
                                    <b>
                                      {application.Installer_New_email || "N/A"}
                                    </b>
                                  </p>
                                  <p>
                                    <b>
                                      {application.Installer_New_finaldate ||
                                        "N/A"}
                                    </b>
                                  </p>
                                </div>
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
                                  {
                                    application.Submitted_docs[0].invoice !== null ?
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
                                    Download
                                  </Button>:
                                  <span className="text-danger">*No File Attached</span>
                                  }
                                  
                                  <br />
                                </span>
                              </Col>
                              <Col md={4}>
                                <span>
                                  IRS-W9{" "}
                                  {
                                    application.Submitted_docs[0].irs_form !== null ?
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
                                    Download
                                  </Button>
                                  :
                                  <span className="text-danger">*No File Attached</span>
                                  }
                                </span>
                              </Col>
                              <Col md={4}>
                                <span>
                                  Letter of Authorization{" "}
                                  {
                                    application.Submitted_docs[0]
                                          .letter_authorization !== null ?
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
                                    Download
                                  </Button>:
                                  <span className="text-danger">*No File Attached</span>
                                  }
                                  
                                </span>{" "}
                                <br />
                              </Col>
                              <Col md={4}>
                                <span>
                                  Disposal Slip{" "}
                                  {
                                    application.Submitted_docs[0]
                                          .disposal_slip !== null ?
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
                                    Download
                                  </Button> :
                                  <span className="text-danger">*No File Attached</span>

                                  }
                                  {" "}
                                </span>{" "}
                                <br />
                              </Col>

                              <Col md={4}>
                                <span>
                                  Other Document 1{" "}
                                  {
                                    application.Submitted_docs[0].other_doc2 !== null ? 
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
                                    Download
                                  </Button> :
                                  <span className="text-danger">*No File Attached</span>

                                  }
                                  {" "}
                                </span>{" "}
                                <br />
                              </Col>

                              <Col md={4}>
                                <span>
                                  Other Document 2{" "}
                                  {
                                    application.Submitted_docs[0].other_doc3 !== null ?
<Button
                                    className="mb-2"
                                    variant={"success"}
                                    onClick={() =>
                                      handleRetrieveFile(
                                        application.Submitted_docs[0].other_doc3
                                      )
                                    }
                                    size={"sm"}
                                  >
                                    Download
                                  </Button> :
                                  <span className="text-danger">*No File Attached</span>

                                  }
                                  {" "}
                                </span>{" "}
                                <br />
                              </Col>
                            </Row>
                          </>
                        ) : (
                          ""
                        )}
                      </ListGroup>
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
                        <h4 className="mt-3 mb-2">Details</h4>
                        <h6 className="text-muted">Date Applied</h6>
                        <h6>{application.Application_Date}</h6>
                        <br />
                        <h6 className="text-muted">Current Stage</h6>
                        <h6>{application.Status}</h6>
                        <br />
                        <h6 className="text-muted">Current Department</h6>
                        <h6 className="mb-2">{application.Stage}</h6>

                        <h4>Event Logs</h4>
                        {logs ? (
                          <div style={{ height: "700px", overflowY: "auto" }}>
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
          </Tab.Container>
        </Container>
      ) : (
        <Container>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: 100 + "%" }}
          >
            {/* <Button onClick={() => printState()} className="me-2" variant={"info"}>Print State</Button> */}
            {/* <Button onClick={() => saveState()} className="me-2" size='sm' variant={"success"}>Save State</Button>
                        <Button onClick={() => restoreState()} className="me-2" size='sm' variant={"secondary"}>Restore State</Button> */}
            <Row>
              <Col md="12" style={{ padding: 0 }}>
                <Button
                  onClick={() => resetState()}
                  className="mb-2 float-end"
                  size="sm"
                  variant={"success"}
                >
                  Reset Filter
                </Button>
              </Col>
            </Row>
            <AgGridReact
              frameworkComponents={{
                buttonAction: ButtonClick,
              }}
              defaultColDef={{
                flex: 1,
                minWidth: 150,
                sortable: true,
                filter: true,
                resizable: true,
              }}
              localeTextFunc={function (key, defaultValue) {
                if (key === "notEqualNoNulls") {
                  return "* Not Equals (No Nulls) *";
                }
                return defaultValue;
              }}
              rowSelection={"single"}
              //   onCellDoubleClicked={onSelectionChanged}
              //   getRowHeight={getRowHeight}
              onGridReady={onGridReady}
              rowData={applications}
              columnTypes={{
                medalColumn: {
                  flex: 1,
                  maxWidth: 120,
                  filter: false,
                },
              }}
              rowHeight={40}
            >
              <AgGridColumn
                headerName="Control Number"
                field="Control_Number"
              />
              <AgGridColumn headerName="Name" field="customer_name" />
              <AgGridColumn
                headerName="Application Date"
                field="Application_Date"
              />
              <AgGridColumn field="Stage" />
              <AgGridColumn field="Status" />
              <AgGridColumn headerName="System Type" field="System_Type" />
              <AgGridColumn
                field="Action"
                type="medalColumn"
                columnGroupShow="closed"
                cellRenderer="buttonAction"
              />
            </AgGridReact>
          </div>
        </Container>
      )}
    </div>
  );
}

export default RecordsForm;
