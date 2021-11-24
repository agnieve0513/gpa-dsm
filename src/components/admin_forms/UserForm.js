import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button, Container } from "react-bootstrap";
import {
  register,
  listUsers,
  deleteUser,
  update,
} from "../../actions/userActions";

import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { GridOptions } from "ag-grid-community";

function UserForm({ history, location }) {
  const [action, setAction] = useState("add");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role_id, setRoleId] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading: userListLoading, error: userListError, users } = userList;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userResult } = userRegister;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: updateError,
    loading: updateLoading,
    success: successUpdate,
  } = userUpdate;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

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

    updateData(users);
  };

  const getRowHeight = (params) => {
    return params.data.rowHeight;
  };

  const onSelectionChanged = () => {
    var selectedRows = gridApi.getSelectedRows()[0];
    console.log(selectedRows);

    let role_id = 0;

    if (selectedRows.role_name === "Admin") {
      role_id = 1;
    } else if (selectedRows.role_name === "Customer Service") {
      role_id = 2;
    } else if (selectedRows.role_name === "Spord") {
      role_id = 3;
    } else if (selectedRows.role_name === "Budget") {
      role_id = 4;
    } else if (selectedRows.role_name === "Accounting") {
      role_id = 5;
    } else if (selectedRows.role_name === "Supervisor") {
      role_id = 6;
    } else if (selectedRows.role_name === "Guest") {
      role_id = 7;
    }

    setId(selectedRows.id);
    setName(selectedRows.name);
    setEmail(selectedRows.email);
    setRoleId(role_id);
    setAction("update");

    // setApplicationId(selectedRows[0].Application_Id)
    // dispatch(detailApplication(selectedRows[0].Application_Id))
    // dispatch(commentsApplication(selectedRows[0].Application_Id))
    // dispatch(logsApplication(selectedRows[0].Application_Id))
    // setShow(true)
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
    dispatch(listUsers());
  }, [dispatch, successDelete, userResult, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not Match");
    } else {
      if (action === "update") {
        dispatch(update(id, role_id, name, email));
        Swal.fire("Success!", "User Info Successfully Updated", "success");
        clearHandler();
      } else {
        dispatch(register(role_id, name, email, password));
        if (userResult.success) {
          Swal.fire("Success!", "User Successfully Added", "success");
          clearHandler();
        } else {
          Swal.fire("Error!", userResult.message, "error");
        }
      }
    }
  };

  const selectHandler = (data) => {
    let role_id = 0;

    if (data.role_name === "Admin") {
      role_id = 1;
    } else if (data.role_name === "Customer Service") {
      role_id = 2;
    } else if (data.role_name === "Spord") {
      role_id = 3;
    } else if (data.role_name === "Budget") {
      role_id = 4;
    } else if (data.role_name === "Accounting") {
      role_id = 5;
    } else if (data.role_name === "Supervisor") {
      role_id = 6;
    } else if (data.role_name === "Guest") {
      role_id = 7;
    }

    setId(data.id);
    setName(data.name);
    setEmail(data.email);
    setRoleId(role_id);
    setAction("update");
  };

  const deleteHandler = () => {
    Swal.fire({
      icon: "question",
      title: "Do you want to Delete the User?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
        Swal.fire("Success!", "User Successfully Deleted", "success");
      } else if (result.isDenied) {
      }
    });
  };

  const clearHandler = () => {
    setName("");
    setEmail("");
    setRoleId("");
    setPassword("");
    setConfirmPassword("");
    setAction("add");
  };

  const ButtonClick = (selected) => {
    const onButtonClick = () => {
      let role_id = 0;
      console.log(selected.data);
      if (selected.data.role_name === "Admin") {
        role_id = 1;
      } else if (selected.data.role_name === "Customer Service") {
        role_id = 2;
      } else if (selected.data.role_name === "Spord") {
        role_id = 3;
      } else if (selected.data.role_name === "Budget") {
        role_id = 4;
      } else if (selected.data.role_name === "Accounting") {
        role_id = 5;
      } else if (selected.data.role_name === "Supervisor") {
        role_id = 6;
      } else if (selected.data.role_name === "Guest") {
        role_id = 7;
      }

      setId(selected.data.id);
      setName(selected.data.name);
      setEmail(selected.data.email);
      setRoleId(role_id);
      setAction("update");
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
    <Container>
      <Row>
        <Col md={4}>
          <Card className="p-3">
            <Card.Body>
              <h5>Add User</h5>
              {message}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="role_id" className="mb-3">
                  <Form.Select
                    onChange={(e) => setRoleId(e.target.value)}
                    value={role_id}
                  >
                    <option>Open this select menu</option>
                    <option value="1">Admin</option>
                    <option value="2">Customer Service</option>
                    <option value="3">Spord</option>
                    <option value="4">Budget</option>
                    <option value="5">Accounting</option>
                    <option value="6">Supervisor</option>
                    <option value="7">Guest</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                {action === "add" ? (
                  <>
                    <Form.Group controlId="password" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="passwordConfirm" className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </>
                ) : (
                  <></>
                )}

                <Button type="submit" variant="success" className="me-2">
                  Save
                </Button>

                <Button
                  type="button"
                  variant="danger"
                  disabled={action === "add" ? true : false}
                  onClick={deleteHandler}
                >
                  Delete
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  className="ms-2"
                  onClick={() => clearHandler()}
                >
                  Clear All
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <div
            className="ag-theme-alpine"
            style={{ height: 530, width: 100 + "%" }}
          >
            <AgGridReact
              frameworkComponents={{}}
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
              // onCellDoubleClicked={onSelectionChanged}
              // getRowHeight={getRowHeight}
              onGridReady={onGridReady}
              rowData={users}
              columnTypes={{
                medalColumn: {
                  flex: 1,
                  maxWidth: 120,
                  filter: false,
                },
              }}
              rowHeight={40}
              frameworkComponents={{
                buttonAction: ButtonClick,
              }}
            >
              <AgGridColumn field="name" />
              <AgGridColumn field="email" />
              <AgGridColumn field="role_name" />
              <AgGridColumn
                field="Action"
                type="medalColumn"
                columnGroupShow="closed"
                cellRenderer="buttonAction"
              />
            </AgGridReact>
          </div>
          {/* <MaterialTable 
                        
                        columns={[
                            { title: "Name", field: "name", width:"50%" },
                            { title: "Email", field: "email", width:"30%" },
                            { title: "Role", field: "role_name", width:"10%" },
                            {
                                title: "Action",
                                field:"actions",
                                width:"10%",
                                editComponent: (props) =>{
                                    return (
                                        <Button>Payts</Button>
                                    )
                                },
                                render: (rowdata) => (
                                    <>
                                    <Button className="btn btn-sm btn-light" onClick={() => selectHandler(rowdata)}><i className="fa fa-edit"></i></Button>
                                    <Button className="btn btn-sm btn-light" onClick={()=> deleteHandler(rowdata)}><i className="fa fa-trash"></i></Button>
                                    </>
                                )
                            }
                        ]}
                        data={
                            users
                        }
                        title="Current Users"
                    
                    /> */}
        </Col>
      </Row>
    </Container>
  );
}

export default UserForm;
