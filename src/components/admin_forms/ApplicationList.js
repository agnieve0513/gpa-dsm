import React, { useState, useEffect } from "react";
import { Row, Alert, Container, Button } from "react-bootstrap";
import { listApplications } from "../../actions/applicationActions";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { useDispatch, useSelector } from "react-redux";

import "./ApplicationForm.css";
import Swal from "sweetalert2";
import { useWindowDimensions } from "../../hooks";
import { formatAMPM } from "../../helpers";
import _ from "lodash";

import ViewApp from "./ViewApp";

function ApplicationList() {
  const { height, width } = useWindowDimensions();
  const [show, setShow] = useState(false);

  const [tabThree, setTabThree] = useState(true);
  const [tabFour, setTabFour] = useState(true);

  const [applicationId, setApplicationId] = useState(0);

  const [updatedTime, setUpdatedTime] = useState(formatAMPM(new Date()));
  const [currentControlNum, setCurrentControlNum] = useState("");
  const [reload, setReload] = useState(0);

  const dispatch = useDispatch();

  const applicationList = useSelector((state) => state.applicationList);
  const { loading, error, applications } = applicationList;

  useEffect(() => {
    dispatch(listApplications());
    setUpdatedTime(formatAMPM(new Date()));
  }, [reload]);

  //   TODO: Put Reload Function Here . . .
  const handleReload = () => {
    setReload(reload + 1);
  };

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

  const handleViewApplication = (data) => {
    console.log(data);
    setApplicationId(data.Application_Id)
    setShow(true);
  };
  const ButtonView = (selected) => {
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
          onClick={() => handleViewApplication(selected.data)}
        >
          View
        </Button>
      </div>
    );
  };
  return (
    <>
      {!show ? (
        <Container>
          <div
            className="ag-theme-alpine"
            id="applicationTableContainer"
            style={{ width: 100 + "%" }}
          >
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
                  onClick={() => handleReload()}
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
                //   TODO: Put the Button Click to view application
                buttonAction: ButtonView,
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
              rowData={applications?.length >= 1 ? applications : []}
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

export default ApplicationList;
