import React, { useState, useEffect } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";

import "./AdminDashboardScreen.css";

import UserForm from "../components/admin_forms/UserForm";
import ApplicationForm from "../components/admin_forms/ApplicationForm";
import RecordsForm from "../components/admin_forms/RecordsForm";
import EquipmentForm from "../components/admin_forms/EquipmentForm";
import TcTemplateForm from "../components/admin_forms/TcTemplateForm";
import BatchForm from "../components/admin_forms/BatchForm";
import BatchPaymentForm from "../components/admin_forms/BatchPaymentForm";

import { Container, Row, Col, Nav, Tab } from "react-bootstrap";

function AdminDashboardScreen({ location, history }) {
  const redirect = location.search ? location.search.split("=")[1] : "/admin";

  const [role_name, setRoleName] = useState("");
  const [applicationForm, setApplicationForm] = useState(true);
  const [equipmentForm, setEquipmentForm] = useState(false);
  const [usersForm, setUsersForm] = useState(false);
  const [tcForm, setTcForm] = useState(false);
  const [batchForm, setBatchForm] = useState(false);
  const [recordForm, setRecordForm] = useState(true);
  const [batchPaymentForm, setBatchPaymentForm] = useState(true);
  const [show_ui, setShowUi] = useState(false);
  const [role_id, setRoleId] = useState();
  const [current, setCurrent] = useState("application");

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      history.push(redirect);
    } else {
      setShowUi(true);
      let obj = JSON.parse(localStorage.getItem("userInfo"));
      let roleId = obj.message.original.roleId;
      setRoleId(roleId);
      let role_name = "";

      if (roleId === 1) {
        role_name = "Admin";
      } else if (roleId === 2) {
        role_name = "Customer Service";
      } else if (roleId === 3) {
        role_name = "Spord";
      } else if (roleId === 4) {
        role_name = "Budget";
      } else if (roleId === 5) {
        role_name = "Accounting";
      } else if (roleId === 6) {
        role_name = "Supervisor";
      } else if (roleId === 7) {
        role_name = "Guest";
      } else {
        role_name = "Unknown Role";
      }

      setRoleName(role_name);

      console.log(obj);

      if (roleId === 4) {
        setApplicationForm(false);
        setCurrent("batch");
      }

      if (roleId === 3 || roleId === 4 || roleId === 5 || roleId === 6) {
        setBatchForm(true);
      } else if (roleId === 1) {
        setUsersForm(true);
        setBatchForm(true);
        setEquipmentForm(true);
        setTcForm(true);
      }
    }
  }, [history]);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="mt-4">
        <Container fluid>
          {show_ui ? (
            <Tab.Container
              id="left-tabs-example"
              defaultActiveKey={role_id === 4 ? "batch" : "application"}
            >
              <Container>
                <Row className="p-0 mb-4" id="adminHeader">
                  <Col md={8} className="d-flex" id="adminDashBoardNav">
                    <Nav variant="pills mb-4" id="navEquipmentPills">
                      {applicationForm ? (
                        <Nav.Item>
                          <Nav.Link
                            eventKey="application"
                            className="d-flex align-items-center"
                            onClick={() => setCurrent("application")}
                          >
                            APPLICATION
                          </Nav.Link>
                        </Nav.Item>
                      ) : (
                        <></>
                      )}

                      {batchForm ? (
                        <Nav.Item>
                          <Nav.Link
                            eventKey="batch"
                            className="d-flex align-items-center"
                            onClick={() => setCurrent("batch")}
                          >
                            BATCH
                          </Nav.Link>
                        </Nav.Item>
                      ) : (
                        <></>
                      )}

                      {usersForm ? (
                        <Nav.Item>
                          <Nav.Link
                            eventKey="users"
                            className="d-flex align-items-center"
                            onClick={() => setCurrent("users")}
                          >
                            USERS
                          </Nav.Link>
                        </Nav.Item>
                      ) : (
                        <></>
                      )}

                      {/* {equipmentForm ? (
                        <Nav.Item>
                          <Nav.Link eventKey="equipment" className="d-flex align-items-center">EQUIPMENT</Nav.Link>
                        </Nav.Item>
                      ) : (
                        <></>
                      )} */}

                      {tcForm ? (
                        <Nav.Item>
                          <Nav.Link
                            eventKey="template"
                            className="d-flex align-items-center"
                            onClick={() => setCurrent("template")}
                          >
                            T & C TEMPLATE
                          </Nav.Link>
                        </Nav.Item>
                      ) : (
                        <></>
                      )}

                      {recordForm ? (
                        <Nav.Item>
                          <Nav.Link
                            eventKey="records"
                            className="d-flex align-items-center"
                            onClick={() => setCurrent("records")}
                          >
                            RECORDS
                          </Nav.Link>
                        </Nav.Item>
                      ) : (
                        <></>
                      )}

                      {/* {batchPaymentForm ?
                                                <Nav.Item className="mr-1 mt-1">
                                                    <Nav.Link eventKey="batch_payment">Batch Payment</Nav.Link>
                                                </Nav.Item>:<></>} */}
                    </Nav>
                  </Col>
                  <Col md={4} id="dashboardTitle">
                    <h3 className="float-end text-info">
                      {role_name} Dashboard
                    </h3>
                  </Col>
                </Row>
              </Container>
              <Tab.Content>
                <Tab.Pane eventKey="records">{<RecordsForm />}</Tab.Pane>
                <Tab.Pane eventKey="users">
                  {usersForm ? <UserForm /> : <></>}
                </Tab.Pane>
                <Tab.Pane eventKey="application">
                  {applicationForm ? (
                    <ApplicationForm current={current} />
                  ) : (
                    <></>
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="batch">
                  {batchForm ? <BatchForm current={current} /> : <></>}
                </Tab.Pane>
                <Tab.Pane eventKey="equipment">
                  {equipmentForm ? <EquipmentForm /> : <></>}
                </Tab.Pane>
                <Tab.Pane eventKey="template">
                  {tcForm ? <TcTemplateForm /> : <></>}
                </Tab.Pane>
                <Tab.Pane eventKey="batch_payment">
                  {batchPaymentForm ? <BatchPaymentForm /> : <></>}
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          ) : (
            <>Loading . . </>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboardScreen;
