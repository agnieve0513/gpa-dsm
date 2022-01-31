import React, { useState, useEffect } from "react";

import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { listBatch, listBatchApplication } from "../../actions/batchActions";
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
import ViewApp from "./ViewApp";

function BatchList() {
  let obj = JSON.parse(localStorage.getItem("userInfo"));
  let selectedIds = [];
  let roleId = obj.message.original.roleId;
  const [updatedTime, setUpdatedTime] = useState(formatAMPM(new Date()));
  const dispatch = useDispatch();

  const { height, width } = useWindowDimensions();
  const [showModal, setShowModal] = useState(false);
  const [batchId, setBatchId] = useState(0);
  const [applicationId, setApplicationId] = useState(0);
  const [status, setStatus] = useState("");
  const [stage, setStage] = useState("");
  const [reason, setReason] = useState("");
  const [selectIds, setSelectedIds] = useState([]);
  const [swalInfo, setSwalInfo] = useState("");
  const [updateState, setUpdateState] = useState(0);
  const [currentBatch, setCurrentBatch] = useState();
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [showApplicationTab, setShowApplicationTab] = useState(false);
  const [currentControlNum, setCurrentControlNum] = useState("");
  const [reload, setReload] = useState(0);
  const [reloadBatchApp, setReloadBatchApp] = useState(0);

  const uploadFile = useSelector((state) => state.uploadFile);
  const { loading: uploadLoading, error: uploadError, fileCode } = uploadFile;

  const batchList = useSelector((state) => state.batchList);
  const {
    loading: loadingBatchList,
    error: errorBatchList,
    batches,
  } = batchList;

  const batchApplication = useSelector((state) => state.batchApplication);
  const {
    loading: loadingBatchListApp,
    error: errorBatchListApp,
    batch_applications,
  } = batchApplication;

  const batchApplicationUpdate = useSelector(
    (state) => state.batchApplicationUpdate
  );

  const {
    error: batchUpdateError,
    loading: batchUpdateLoading,
    success: batchUpdateSuccess,
  } = batchApplicationUpdate;

  useEffect(() => {
    dispatch(listBatch());
    setUpdatedTime(formatAMPM(new Date()));
  }, [reload]);

  useEffect(() => {
    dispatch(listBatchApplication(batchId));
  }, [reloadBatchApp, batchUpdateSuccess]);

  const handleModalClose = () => setShowModal(false);

  const selectHandler = (rowdata) => {
    setCurrentBatch(rowdata.Id);
    setBatchId(rowdata.Id);
    dispatch(listBatchApplication(rowdata.Id));
    setShowApplicationTab(true);
  };

  const backToBatchesHandler = () => {
    setShowApplicationTab(false);
  };

  const applicationViewHandler = (rowdata) => {
    setApplicationId(rowdata.Application_Id);
    setCurrentControlNum(rowdata.Control_Number);
    setShow(true);
  };

  const reloadBatchListHandler = () => {
    setReload(reload + 1);
  };

  const reloadBatchAppHandler = () => {
    setReloadBatchApp(reloadBatchApp + 1);
  };
  const updateStatus = (status, stage, swaInfo) => {
    setStage(stage);
    if (status === 3) {
      Swal.fire({
        title: "Are you sure you want to reject application?",
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateBatchApplication(selectIds, status, stage, reason));
          setShow(false);
          setShowModal(false);
          Swal.fire("Success", "Application has been rejected!", "success");
          setReloadBatchApp(reloadBatchApp + 1);
        }
      });
    } else {
      setStatus(status);
      setStage(stage);
      setUpdateState(updateState + 1);

      Swal.fire({
        title: `Are you sure you want to ${swaInfo}?`,
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateBatchApplication(selectIds, status, stage, reason));
          setShowModal(false);
          Swal.fire("Success", "Application has been processed!", "success");
          setReloadBatchApp(reloadBatchApp + 1);
        }
      });
    }
  };
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
  };
  return (
    <>
      {!show ? (
        <Container>
          {/* Modal for Approving Dissaproving Batch */}
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
                      updateStatus(1, 1, "Send to SPORD");
                    }}
                  >
                    Send to SPORD
                  </Button>
                </Container>
              ) : roleId === 3 ? (
                <Container className="col-8 text-center btn-group-vertical">
                  <Button
                    onClick={() => {
                      updateStatus(1, 3, "Send to Supervisor");
                    }}
                    className="mb-1"
                  >
                    Send to Supervisor
                  </Button>{" "}
                  <br />
                  <Button
                    onClick={() => {
                      updateStatus(1, 4, "Send Back to Customer Service");
                    }}
                  >
                    Send Back to Customer Service
                  </Button>
                </Container>
              ) : roleId === 6 ? (
                <Container className="col-8 text-center btn-group-vertical">
                  <Button
                    onClick={() => {
                      updateStatus(1, 5, "Send to Budget");
                    }}
                  >
                    Send to Budget
                  </Button>
                  <Button
                    onClick={() => {
                      updateStatus(1, 1, "Send Back to SPORD");
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
                        updateStatus(1, 2, "Send to Accounting");
                      }}
                    >
                      Send to Accounting
                    </Button>
                  ) : (
                    <Button
                      className="mb-2"
                      onClick={() => {
                        updateStatus(1, 2, "Send to Accounting");
                      }}
                      disabled
                    >
                      Send to Accounting
                    </Button>
                  )}
                  <Button
                    className="mb-2"
                    onClick={() => {
                      updateStatus(1, 1, "Send Back to Spord");
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
                      updateStatus(2, 0, "Approve Application");
                    }}
                  >
                    Approve Application
                  </Button>
                  <br />
                  <Button
                    variant={"danger"}
                    className="mb-1"
                    onClick={() => {
                      updateStatus(1, 1, "(Decline) Send to Spord");
                    }}
                  >
                    (Decline) Send to Spord
                  </Button>
                  <br />
                  <Button
                    variant={"danger"}
                    className="mb-1"
                    onClick={() => {
                      updateStatus(1, 4, "(Decline) Send to CS");
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
                      updateStatus(2, 0, "Approve Application");
                    }}
                  >
                    Approve Application
                  </Button>
                  <br />
                  <Button
                    onClick={() => {
                      updateStatus(1, 4, "Send to CS");
                    }}
                  >
                    Send to CS
                  </Button>{" "}
                  <br />
                  <Button
                    onClick={() => {
                      updateStatus(1, 1, "Send to SPORD");
                    }}
                  >
                    Send to SPORD
                  </Button>{" "}
                  <br />
                  <Button
                    onClick={() => {
                      updateStatus(1, 3, "Send to Supervisor");
                    }}
                  >
                    Send to Supervisor
                  </Button>{" "}
                  <br />
                  <Button
                    onClick={() => {
                      updateStatus(1, 5, "Send to Budget");
                    }}
                  >
                    Send to Budget
                  </Button>{" "}
                  <br />
                  <Button
                    onClick={() => {
                      updateStatus(1, 2, "Send to Accounting");
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
                  title={
                    width < 770 ? (
                      ""
                    ) : (
                      <div>
                        <h5 className="text-info">
                          {currentBatch}{" "}
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => reloadBatchAppHandler()}
                          >
                            Reload Table
                          </Button>
                        </h5>
                      </div>
                    )
                  }
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
                  data={batches?.length >= 1 ? batches : []}
                  title={
                    <div>
                      <h5 className="text-info">
                        Batch{" "}
                        <span className="text-default me-2">
                          Last Update: {updatedTime}
                        </span>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => reloadBatchListHandler()}
                        >
                          Reload Table
                        </Button>
                      </h5>
                    </div>
                  }
                  options={{
                    rowStyle: {
                      height: "5px !important",
                      search: true,
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
      ) : (
        <ViewApp
          show={show}
          setShow={setShow}
          reload={reload}
          setReload={setReload}
          applicationId={applicationId}
          setApplicationId={setApplicationId}
          currentControlNum={currentControlNum}
        />
      )}
    </>
  );
}

export default BatchList;
