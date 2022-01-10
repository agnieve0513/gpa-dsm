import React, { useState, useEffect } from "react";

import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { listBatch, listBatchApplication } from "../../actions/batchActions";
import {
  uploadFileAction,
  retrieveFileAction,
} from "../../actions/fileActions";

import {
  detailApplication,
  commentsApplication,
  addCommentAction,
  logsApplication,
  updateBatchApplication,
} from "../../actions/applicationActions";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import "./BatchForm.css";
import Swal from "sweetalert2";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { formatAMPM } from "../../helpers";
import ViewApplication from "./ViewApplication";

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
  const [show, setShow] = useState(false);

  const [invoice, setInvoice] = useState(null);
  const [irs_form, setIrsForm] = useState(null);
  const [disposal_slip, setDisposalSlip] = useState(null);
  const [letter_authorization, setLetterAuthorization] = useState(null);
  const [installer_certification, setInstallerCertification] = useState(null);
  const [other_doc1, setOtherDoc1] = useState(null);
  const [other_doc2, setOtherDoc2] = useState(null);

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
  const [currentControlNum, setCurrentControlNum] = useState("");

  useEffect(() => {
    if (batchApplication.batch_applications) {
      const items = batchApplication.batch_applications;
      console.log("ITEMS", items);
      if (items[0]?.Result == "No Data Found in batch") {
        setBatchApplication([]);
      }
      let changedItem = 0;
      let allBatchApplications = [];
      const roles = [
        "Admin",
        "Customer Service",
        "Spord",
        "Budget",
        "Accounting",
        "Supervisor",
        "Guest",
        "Unknown Role",
      ];

      for (let i = 0; i < items.length; i++) {
        const currentRole = roles[roleId - 1];
        if (currentRole === "Admin") {
          allBatchApplications.push(items[i]);
        } else if (currentRole === items[i].Stage) {
          allBatchApplications.push(items[i]);
        }
      }

      if (batch_applications?.length === 0) {
        if (allBatchApplications) {
          setBatchApplication(allBatchApplications);
        }
      } else if (batch_applications?.length > 0) {
        for (let i = 0; i < batch_applications?.length; i++) {
          if (allBatchApplications) {
            const oldInfo = batch_applications[i];
            const newInfo = allBatchApplications.find(
              (value) => value.Application_Id === oldInfo.Application_Id
            );

            if (newInfo) {
              if (
                newInfo.Status !== oldInfo.Status ||
                newInfo.Stage !== oldInfo.Stage
              ) {
                changedItem = 1 + changedItem;
              }
            }
          }

          if (i === batch_applications?.length - 1) {
            if (changedItem > 0) {
              setBatchApplication(allBatchApplications);
              setUpdatedTime(formatAMPM(new Date()));
            }
          }
        }
      }

      if (allBatchApplications) {
        if (allBatchApplications.length !== batch_applications.length) {
          setBatchApplication(allBatchApplications);
          setUpdatedTime(formatAMPM(new Date()));
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

    if (batchApplication.batches) {
      if (batchApplication.batches.length !== batches.length) {
        setBatches(batchApplication.batches);
        setUpdatedTime(formatAMPM(new Date()));
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
    console.log("rowdata", rowdata);
    setApplicationId(rowdata.Application_Id);
    dispatch(detailApplication(rowdata.Application_Id));
    dispatch(commentsApplication(rowdata.Application_Id));
    dispatch(logsApplication(rowdata.Application_Id));
    setCurrentControlNum(rowdata.Control_Number);
    setShow(true);
  };

  const backToBatchesHandler = () => {
    clearInterval(intervalId2);
    setCurrentBatch(null);
    setBatchApplication([]);
    setShowApplicationTab(false);
  };

  return (
    <>
      {show ? (
        <Container>
          <ViewApplication
            setShow={setShow}
            current={current}
            currentControlNum={currentControlNum}
            applicationId={applicationId}
            setApplicationId={setApplicationId}
          />
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
                  {batch_applications?.length === selectIds?.length ? (
                    <Button
                      className="mb-2"
                      onClick={() => {
                        setSwalInfo("Send to Accounting");
                        updateStatus(1, 2);
                      }}
                    >
                      Send to Accounting
                    </Button>
                  ) : (
                    <Button
                      className="mb-2"
                      onClick={() => {
                        setSwalInfo("Send to Accounting");
                        updateStatus(1, 2);
                      }}
                      disabled
                    >
                      Send to Accounting
                    </Button>
                  )}
                  <Button
                    className="mb-2"
                    onClick={() => {
                      setSwalInfo("Send Back to Spord");
                      updateStatus(1, 1);
                    }}
                  >
                    Send Back to Spord
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
                    {
                      title: "Action",
                      field: "actions",
                      width: "10%",
                      editComponent: (props) => {
                        return <Button>Payts</Button>;
                      },
                      render: (rowdata) => (
                        <>
                          {Object.keys(batch_applications[0]).length > 3 ? (
                            <>
                              <Button
                                variant={"success"}
                                size="sm"
                                onClick={() => applicationViewHandler(rowdata)}
                              >
                                View
                              </Button>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ),
                    },
                  ]}
                  data={batch_applications}
                  title={width < 770 ? "" : currentBatch}
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
                    { title: "Total", field: "Batch_total" },
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
