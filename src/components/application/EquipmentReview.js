import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Tabs,
  Tab,
  ListGroup,
  Table,
  Button,
  ButtonGroup,
  Container,
  Card,
} from "react-bootstrap";

import "./EquipmentReview.css";
import MaterialTable from "material-table";

function EquipmentReview(props) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [new_eq_index, setNewEqIndex] = useState(0);
  const [old_eq_index, setOldEqIndex] = useState(0);

  const backToApplicationHandler = () => {
    props.setStepOneToStepFive(true);
    props.setStep(2);
  };

  const backToNewEquipmentHandler = () => {
    props.setStepOneToStepFive(true);
    props.setStep(3);
  };

  const backToOldEquipmentHandler = () => {
    props.setStep(4);
  };

  const showNewEquipmentInformation = (index) => {
    setNewEqIndex(index);
  };

  const showOldEquipmentInformation = (index) => {
    setOldEqIndex(index);
  };

  let total_rebate = 0;

  return (
    <Row>
      <Col md={1}></Col>
      <Col md={10}>
        <h4 className="text-center text-info mb-3">Equipment Review</h4>
        <Card className="mb-5" id="CardForReview">
          <Card.Body>
            <Tabs
              defaultActiveKey="application_information"
              transition={false}
              id=""
              className="mb-3"
            >
              <Tab
                eventKey="application_information"
                title="Applicant Information"
              >
                <Container className="ml-2 mr-2">
                  <h3 className="mt-3 pb-4 text-info">
                    Applicant Info{" "}
                    <button
                      className="btn edit-btn btn-sm"
                      onClick={() => backToApplicationHandler()}
                    >
                      <i className="fa fa-edit"></i> Edit Information
                    </button>
                  </h3>
                  <Row>
                    <Col md={6} className="mb-3">
                      <p className='title'>GPA Electric Account number</p>
                      <p className='title'>Bill ID</p>
                      <p className='title'>Name on GPA Account</p>
                      <p className='title'>First Name</p>
                      <p className='title'>Middle Name</p>
                      <p className='title'>Last Name</p>
                      <p className='title'>Installation Address</p>
                      <p className='title'>City</p>
                      <p className='title'>ZIP</p>
                      <p className='title'>Email</p>
                      <p className='title'>Telephone Number</p>
                      <p className='title py-4'>Is Applicant the owner of the residential property?</p>
                      <p className='title'>Mailing Address</p>
                      <p className='title'>Home Size (approx. sq. ft.)</p>
                      <p className='title'>Home Age (appox. year built)</p>
                      <p className='title'>New Construction</p>
                      <p className='title'>Home Type</p>
                    </Col>
                    <Col md={6} className="mb-3">
                      <p><b>{props.account_no}</b>{" "}</p>
                      <p><b>{props.bill_id}</b>{" "}</p>
                      <p><b>{props.lastname}, {props.firstname} {props.middlename}{" "}</b></p>
                      <p><b>{props.firstname}</b>{" "}</p>
                      <p><b>{props.middlename}</b>{" "}</p>
                      <p><b>{props.lastname}</b>{" "}</p>
                      <p><b>{props.service_location}</b>{" "}</p>
                      <p><b>{props.city_village}</b>{" "}</p>
                      <p><b>{props.zipcode}</b>{" "}</p>
                      <p><b>{props.email}</b>{" "}</p>
                      <p><b>{props.tel_no}</b>{" "}</p>
                      <p className='py-4'><b>{props.is_applicant_owner ? "Yes" : 
                        props.is_applicant_owner === "true" ? "Yes" : "No"}</b>{" "}</p>
                      <p><b>{props.mailing_address}</b>{" "}</p>
                      <p><b>{props.home_size}</b>{" "}</p>
                      <p><b>{props.home_age}</b>{" "}</p>
                      <p><b>{props.is_new_construction}</b>{" "}</p>
                      <p><b>{props.home_type}</b>{" "}</p>
                    </Col>
                  </Row>
                </Container>
              </Tab>
              <Tab
                eventKey="new_quipment_info"
                title="New Equipment Information"
              >
                <Container className="ml-2 mr-2">
                  <h3 className="mt-3 mb-3 text-info">
                    New Equipment Info{" "}
                    <button
                      onClick={() => backToNewEquipmentHandler()}
                      className="btn edit-btn btn-sm"
                    >
                      <i className="fa fa-edit"></i> Edit Information
                    </button>
                  </h3>

                  <Row>
                    <Col md={12}>
                      {props.new_equipments.length >= 1 ? (
                        <>
                          <MaterialTable
                            columns={[
                              { title: "System Type", field: "system_type" },
                              { title: "Vendor", field: "vendor" },
                              { title: "Quantity", field: "quantity" },
                              { title: "BTU", field: "btu" },
                              { title: "Manufacturer", field: "manufacturer" },
                              { title: "Model Number", field: "model_no" },
                              { title: "Invoice#", field: "invoice_no" },
                              {
                                title: "Purchase Date",
                                field: "purchase_date",
                              },
                              { title: "Type", field: "type" },
                              { title: "Tons", field: "tons" },
                              { title: "Install Date", field: "purchase_date" },
                            ]}
                            data={
                              props.new_equipments.length === 0
                                ? []
                                : props.new_equipments
                            }
                            title="New Equipments"
                          />

                          <Row>
                            <Col md={6}>
                              <h3 className="mt-3 mb-3 text-info">
                                Installer Information
                              </h3>
                              <ListGroup className="mb-3">
                                <p>
                                  Technician Name{" "}
                                  <b>
                                    {" "}
                                    {
                                      props.new_equipments[new_eq_index]
                                        .installer_information.technician_name
                                    }{" "}
                                  </b>
                                </p>
                                <p>
                                  Work Telephone{" "}
                                  <b>
                                    {" "}
                                    {
                                      props.new_equipments[new_eq_index]
                                        .installer_information.work_tel
                                    }{" "}
                                  </b>
                                </p>
                                <p>
                                  Company{" "}
                                  <b>
                                    {" "}
                                    {
                                      props.new_equipments[new_eq_index]
                                        .installer_information.company_name
                                    }{" "}
                                  </b>
                                </p>
                                <p>
                                  Technician AC{" "}
                                  <b>
                                    {" "}
                                    {
                                      props.new_equipments[new_eq_index]
                                        .installer_information.technician_name
                                    }{" "}
                                  </b>
                                </p>
                                <p>
                                  Certification No.{" "}
                                  <b>
                                    {" "}
                                    {
                                      props.new_equipments[new_eq_index]
                                        .installer_information
                                        .technician_cert_no
                                    }{" "}
                                  </b>
                                </p>
                                <p className="mb-3">
                                  Email{" "}
                                  <b>
                                    {" "}
                                    {
                                      props.new_equipments[new_eq_index]
                                        .installer_information.email
                                    }{" "}
                                  </b>
                                </p>
                                <p>
                                  Date of Final{" "}
                                  <b>
                                    {" "}
                                    {
                                      props.new_equipments[new_eq_index]
                                        .installer_information
                                        .date_final_installation
                                    }{" "}
                                  </b>
                                </p>
                              </ListGroup>
                            </Col>
                            <Col md={6} className="mt-3">
                              <Table size="lg" striped bordered hover>
                                <thead className="bg-info text-white">
                                  <tr className="py-5">
                                    <th className="p-3">QTY</th>
                                    <th className="p-3">Rebate</th>
                                    <th className="p-3">Partial Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {props.new_equipments.map((eq) => (
                                    <tr key={eq.id + 1}>
                                      <td className="p-3">{eq.quantity}</td>
                                      <td className="p-3">
                                        {!eq.rebate ? 0 : eq.rebate}
                                      </td>
                                      <td className="p-3">
                                        {!eq.rebate
                                          ? 0
                                          : parseInt(eq.quantity) *
                                            parseInt(eq.rebate)}
                                      </td>
                                      <td hidden>
                                        {
                                          (total_rebate +=
                                            parseInt(eq.quantity) *
                                            parseInt(eq.rebate))
                                        }
                                      </td>
                                    </tr>
                                  ))}
                                  <tr>
                                    <td
                                      className="p-3 text-center"
                                      colSpan="2"
                                    >
                                      TOTAL
                                    </td>
                                    <td className="p-3">
                                      ${!total_rebate ? "0.00" : total_rebate}
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <>No Equipment</>
                      )}
                    </Col>
                    <Col md={6}></Col>
                  </Row>
                </Container>
              </Tab>
              <Tab
                eventKey="old_quipment_info"
                title="Old/Existing Equipment Information"
              >
                <Container className="ml-2 mr-2">
                  <h3 className="mt-3 mb-3 text-info">
                    Existing/Old Equipment Info{" "}
                    <button
                      onClick={() => backToOldEquipmentHandler()}
                      className="btn edit-btn btn-sm "
                    >
                      <i className="fa fa-edit"></i> Edit Information
                    </button>
                  </h3>

                  <MaterialTable
                      columns={[
                        { title: "System Type", field: "system_type" },
                        { title: "Vendor", field: "vendor" },
                        { title: "Quantity", field: "quantity" },
                        { title: "Years", field: "years" },
                        { title: "Quantity", field: "quantity" },
                        { title: "BTU", field: "btu" },
                        { title: "TONS", field: "tons" },
                        { title: "Invoice#", field: "invoice_no" },
                        {
                          title: "Purchase Date",
                          field: "purchase_date",
                        },
                        { title: "Type", field: "type" },
                        { title: "Tons", field: "tons" },
                        { title: "Seer", field: "seer" },
                        { title: "Disposal Party", field: "disposal_party" },
                        { title: "Date", field: "date" },
                      ]}
                      data={
                        props.old_equipments.length === 0
                          ? []
                          : props.old_equipments
                      }
                      title="Existing Equipments"
                    />
                </Container>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Col>
      <Col md={1}></Col>
    </Row>
  );
}

export default EquipmentReview;
