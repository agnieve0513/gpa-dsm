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

import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en.json";

import "./ApplicationForm.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

TimeAgo.addDefaultLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

function RecordsForm() {
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

  const [applicationClicked, setApplicationClicked] = useState(false);
  const [newEquipmentClicked, setNewEquipmentClicked] = useState(false);
  const [oldEquipmentClicked, setOldEquipmentClicked] = useState(false);
  const [submitDocsClicked, setSubmitDocsClicked] = useState(false);

  const [detailsToggle, setDetailsToggle] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleBatchModalClose = () => setBatchShowModal(false);

  const dispatch = useDispatch();

  const applicationList = useSelector((state) => state.applicationList);
  const { applications } = applicationList;

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
        displayKey: "startsC",
        displayName: 'Starts With "C"',
        test: function (filterValue, cellValue) {
          return cellValue != null && cellValue.indexOf("a") === 0;
        },
        hideFilterInput: true,
      },
      {
        displayKey: "startsR",
        displayName: 'Starts With "R"',
        test: function (filterValue, cellValue) {
          return cellValue != null && cellValue.indexOf("n") === 0;
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

  useEffect(() => {
    // dispatch(listApplications())
    // dispatch(listBatchCurrent())
    // dispatch(commentsApplication(applicationId))
  }, []);
  // }, [application, successUpdate, addBatchSuccess,commentSucess])

  const selectHandler = () => {};

  const changeStatusHandler = (status) => {
    setStatus(status);
    setShowModal(true);

    console.log(status);
  };

  const updateStatus = (status, stage) => {
    console.log(status, " - ", stage);
    if (status === 3) {
      console.log(reason);
      console.log(status);
      if (window.confirm("Are you sure you want to reject application?")) {
        dispatch(updateApplication(applicationId, status, stage, reason));
        alert("Saved!");
        setShow(false);
        setShowModal(false);
      }
    } else {
      setStatus(status);
      setStage(stage);
      if (window.confirm("Are you sure you want to process application?")) {
        dispatch(
          updateApplication(applicationId, status, stage, reason, batch)
        );
        alert("Saved!");
        setShowModal(false);
      }
    }
  };

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
      dispatch(detailApplication(selected.data.Application_Id));
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

  const handleRetrieveFile = () => {
    dispatch(
      retrieveFileAction(
        "eyJpdiI6ImozMXhYeFwvVWRMdFZNRzFQdTlUdGx3PT0iLCJ2YWx1ZSI6IjRqVDZMZmd4dlhQYWNKdDF1dUFUY0ZiZThuekZYbWVPSlB1UXJRa1R6aWc9IiwibWFjIjoiZDU5ZGJlM2U1MWVmZjMwZTAxYWMwYWZhYjhjYzcyNzc1M2RiM2RlMGNhMWJlMTExODgyZWIxMzI3NGY4MTFhNiJ9"
      )
    );
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
                    <h3 className="mt-3 pb-4 text-info">Applicant Info</h3>
                    {application ? (
                      <Row>
                        <Col md={6} className="mb-3">
                          <p className='title'>GPA Electric Account number</p>
                          <p className='title'>Bill ID</p>
                          <p className='title'>Appplicant Name</p>
                          <p className='title'>Installation Address</p>
                          <p className='title'>City</p>
                          <p className='title'>ZIP</p>
                          <p className='title'>Email</p>
                          <p className='title'>Telephone Number</p>
                          <p className='title py-4'>Owner of the Residential Property</p>
                          <p className='title'>Mailing Address</p>
                          <p className='title'>City</p>
                          <p className='title'>Zip Code</p>
                          <p className='title'>Home Size (approx. sq. ft.)</p>
                          <p className='title'>New Construction</p>
                          <p className='title'>Home Type</p>
                        </Col>
                        <Col md={6} className="mb-3">
                          <p><b>{application.Info_Account_no}</b>{" "}</p>
                          <p><b>{application.Info_Bill_id}</b>{" "}</p>
                          <p><b>{application.Info_Customer_name}</b></p>
                          <p><b>{application.Info_Service_location}</b>{" "}</p>
                          <p><b>{application.Info_City_village}</b>{" "}</p>
                          <p><b>{application.Info_Zipcode}</b>{" "}</p>
                          <p><b>{application.Info_Email}</b>{" "}</p>
                          <p><b>{application.Info_Tel_no}</b>{" "}</p>
                          <p className='py-4'><b>{application.Info_Is_owner ? "Yes" : 
                            application.Info_Is_owner === "true" ? "Yes" : "No"}</b>{" "}</p>
                          <p><b>{application.Info_Mailing_address}</b>{" "}</p>
                          <p><b>{application.Info_City_village}</b>{" "}</p>
                          <p><b>{application.Info_Zipcode}</b>{" "}</p>
                          <p><b>{application.Info_Home_size}</b>{" "}</p>
                          <p><b>{application.Info_New_construction}</b>{" "}</p>
                          <p><b>{application.Info_Home_type}</b>{" "}</p>
                        </Col>
                    </Row>
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
                              <td
                                className="p-3 text-center"
                                colSpan="2"
                              >
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
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="submission_of_documentation">
                    <Container className="ml-2 mr-2">
                      <h3 className="mt-3 mb-3 text-info">
                        Submitted Documents
                      </h3>
                      <Button onClick={() => handleRetrieveFile()}>
                        Click to Test
                      </Button>

                      <ListGroup className="mb-3">
                        {application ? (
                          <>
                            <p>
                              Invoice{" "}
                              <a href={application.Submitted_docs[0].invoice}>
                                Click to Download
                              </a>
                            </p>
                            <p>
                              IRS-W9{" "}
                              <a href={application.Submitted_docs[0].irs_form}>
                                Click to Download
                              </a>
                            </p>
                            <p>
                              Letter of Authorization{" "}
                              <a
                                href={
                                  application.Submitted_docs[0]
                                    .letter_authorization
                                }
                              >
                                Click to Download
                              </a>
                            </p>
                            <p>
                              Disposal Slip{" "}
                              <a
                                href={
                                  application.Submitted_docs[0].disposal_slip
                                }
                              >
                                Click to Download
                              </a>
                            </p>
                            {application.Submitted_docs[0].other_doc2 ? (
                              <p>
                                Other support documents 1{" "}
                                <a
                                  href={
                                    application.Submitted_docs[0].other_doc2
                                  }
                                >
                                  Click to Download
                                </a>
                              </p>
                            ) : (
                              <></>
                            )}
                            {application.Submitted_docs[0].other_doc2 ? (
                              <p>Other support documents 2</p>
                            ) : (
                              <></>
                            )}
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
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: 100 + "%" }}
          >
            <div className="mb-2">
              {/* <Button onClick={() => printState()} className="me-2" variant={"info"}>Print State</Button> */}
              {/* <Button onClick={() => saveState()} className="me-2" size='sm' variant={"success"}>Save State</Button>
                        <Button onClick={() => restoreState()} className="me-2" size='sm' variant={"secondary"}>Restore State</Button> */}
              <Button
                onClick={() => resetState()}
                className="me-2"
                size="sm"
                variant={"success"}
              >
                Reset Filter
              </Button>
            </div>
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
                field="Control_Number"
                filterParams={containsFilterParams}
              />
              <AgGridColumn
                field="Application_Date"
                filterParams={containsFilterParams}
              />
              <AgGridColumn field="Stage" filterParams={containsFilterParams} />
              <AgGridColumn
                field="Status"
                filterParams={containsFilterParams}
              />
              <AgGridColumn
                field="System_Type"
                filterParams={containsFilterParams}
              />
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
