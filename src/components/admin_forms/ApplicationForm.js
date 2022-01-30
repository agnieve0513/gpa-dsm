import React, { useState, useEffect } from "react";
import { Row, Alert, Container, Button } from "react-bootstrap";
import {
  listApplications,
  detailApplication,
  commentsApplication,
  logsApplication,
} from "../../actions/applicationActions";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import "./ApplicationForm.css";
import Swal from "sweetalert2";
import { useWindowDimensions } from "../../hooks";
import { formatAMPM } from "../../helpers";
import _ from "lodash";
import ViewApplication from "./ViewApplication";

function ApplicationForm({ current }) {
  const { height, width } = useWindowDimensions();
  const [show, setShow] = useState(false);

  const [tabThree, setTabThree] = useState(true);
  const [tabFour, setTabFour] = useState(true);

  const [applicationId, setApplicationId] = useState(0);

  const [updatedTime, setUpdatedTime] = useState(formatAMPM(new Date()));
  const [currentControlNum, setCurrentControlNum] = useState("");

  const dispatch = useDispatch();

  const applicationList = useSelector((state) => state.applicationList);
  const [applications, setApplications] = useState([]);
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    let changedItem = 0;
    if (applications?.length === 0) {
      if (applicationList.applications) {
        setApplications(applicationList.applications);
      }
    } else if (applications?.length > 0) {
      for (let i = 0; i < applications?.length; i++) {
        if (applicationList.applications) {
          const oldInfo = applications[i];
          const newInfo = applicationList.applications.find(
            (value) => value.Application_Id === oldInfo.Application_Id
          );
          if (newInfo) {
            if (newInfo.Last_Modified_On !== oldInfo.Last_Modified_On) {
              changedItem = 1 + changedItem;
            }
          }
        }

        if (i === applications?.length - 1) {
          if (changedItem > 0) {
            setApplications(applicationList.applications);
            setUpdatedTime(formatAMPM(new Date()));
          }
        }
      }
    }

    if (applicationList.applications) {
      if (applicationList.applications.length !== applications.length) {
        setApplications(applicationList.applications);
        setUpdatedTime(formatAMPM(new Date()));
      }
      if (applicationId) {
        const isExist = applicationList.applications.find(
          (value) => value.Application_Id === applicationId
        );
        if (!isExist) {
          setShow(false);
          setApplicationId(null);
          Swal.fire("Info", "Application has already been transfered!", "info");
        }
      }
    }
  }, [applicationList]);

  useEffect(() => {
    if (current !== "application") {
      clearInterval(intervalId);
    }
  }, [current]);

  useEffect(() => {
    if (current == "application") {
      const rerun = setInterval(() => {
        dispatch(listApplications());
      }, 5000);

      setIntervalId(rerun);
    }
  }, [current]);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      var differentHeights = [80, 80, 80, 80];
      if (data) {
        data.forEach(function (dataItem, index) {
          dataItem.rowHeight = differentHeights[index % 4];
        });
        setRowData(data);
      }
    };

    updateData(applications);
  };

  const resetState = () => {
    gridApi.setFilterModel(null);
    console.log("column state reset");
  };

  const ButtonClick = (selected) => {
    const onButtonClick = () => {
      setTabThree(true);
      setTabFour(true);
      dispatch(detailApplication(selected.data.Application_Id));
      setApplicationId(selected.data.Application_Id);
      setCurrentControlNum(selected.data.Control_Number);
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

  return (
    <div>
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
          <div
            className="ag-theme-alpine"
            id="applicationTableContainer"
            style={{ width: 100 + "%" }}
          >
            {/* <Button onClick={() => printState()} className="me-2" variant={"info"}>Print State</Button> */}
            {/* <Button onClick={() => saveState()} className="me-2" size='sm' variant={"success"}>Save State</Button>
                        <Button onClick={() => restoreState()} className="me-2" size='sm' variant={"secondary"}>Restore State</Button> */}
            <Row>
              <div
                style={{
                  padding: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h6
                  style={{
                    marginRight: "auto",
                    marginLeft: 3,
                  }}
                  className="text-muted"
                >
                  Last Update: {updatedTime}
                </h6>
                <Button
                  onClick={() => resetState()}
                  className="mb-2 me-2 float-end"
                  size="sm"
                  variant={"success"}
                >
                  Reload
                </Button>
                <Button
                  onClick={() => resetState()}
                  className="mb-2 float-end"
                  size="sm"
                  variant={"success"}
                >
                  Reset Filter
                </Button>
              </div>
            </Row>
            {width < 700 ? (
              <>
                <Alert
                  variant="info"
                  onClose={() => setShow(false)}
                  dismissible
                >
                  <p>To filter data, please long press the selected column.</p>
                </Alert>
              </>
            ) : (
              <></>
            )}
            <AgGridReact
              className="agGridTable"
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
                  filter: true,
                },
              }}
              rowHeight={40}
            >
              <AgGridColumn
                headerName="Control Number"
                field="Control_Number"
              />
              <AgGridColumn headerName="Batch Code" field="Batch_code" />
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

export default ApplicationForm;
