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
import city_zipcode from "./source_files/city_zipcode";
import MaterialTable from "material-table";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

function EquipmentReview(props) {
  const { height, width } = useWindowDimensions();
  const squeezedTabs = width > 1283;

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

  console.log(
    "system type",
    props.system_type !== "Dryer",
    props.system_type !== "Dryer" || props.system_type !== "Washer"
  );
  const showCertificateNo = () => {
    if (
      props.system_type === "Dryer" ||
      props.system_type === "Washer" ||
      props.system_type === "Airconditioner-Window"
    ) {
      return <></>;
    } else {
      return (
        <>
          <Col md={5}>
            <p>
              <b style={{ color: "#B6B6B6" }}>Certification No. </b>
            </p>
          </Col>
          <Col md={7}>
            <b>
              {" "}
              {
                props.new_equipments[new_eq_index].installer_information
                  .technician_cert_no
              }{" "}
            </b>
          </Col>
        </>
      );
    }
  };

  let total_rebate = 0;

  return (
    <Row className="w-100 mx-0 d-flex justify-content-center">
      <Col sm={12} xl={10}>
        {width >= 425 ? (
          <h4 className="text-center text-info mb-3">EQUIPMENT REVIEW</h4>
        ) : (
          <></>
        )}

        <Card className="mb-5 CardForReview" id="equipReviewCard">
          <Card.Body className="p-0">
            <Tabs
              defaultActiveKey="application_information"
              transition={false}
              className={
                squeezedTabs ? "mb-3" : "equipTabs mb-3 flex flex-column w-100"
              }
            >
              <Tab
                eventKey="application_information"
                title="Applicant Information"
              >
                <Container className="ml-2 mr-2">
                  <Row className="pt-3 pb-4 px-0 mx-0 d-flex flex-row justify-content-between w-100">
                    <h3 className="px-0 my-0 w-75 text-info text-start">
                      Applicant Info{" "}
                    </h3>
                    <button
                      title="Edit details"
                      className="w-25 editButton text-end"
                      onClick={() => backToApplicationHandler()}
                    >
                      <i className="fa fa-pen"></i>
                    </button>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">GPA Electric Account number</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.account_no}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">Bill ID</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.bill_id}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">Name on GPA Account</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.gpa_holder}</b>
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      {props.customer_type == "COMM" ? (
                        <p className="title">Applicant's Name</p>
                      ) : (
                        <p className="title">First Name</p>
                      )}
                    </Col>
                    <Col>
                      <p>
                        <b>{props.firstname}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  {props.customer_type !== "COMM" ? (
                    <>
                      <Row className="px-0">
                        <Col>
                          <p className="title">Middle Name</p>
                        </Col>
                        <Col>
                          <p>
                            <b>{props.middlename}</b>{" "}
                          </p>
                        </Col>
                      </Row>
                      <Row className="px-0">
                        <Col>
                          <p className="title">Last Name</p>
                        </Col>
                        <Col>
                          <p>
                            <b>{props.lastname}</b>{" "}
                          </p>
                        </Col>
                      </Row>
                    </>
                  ) : null}
                  <Row className="px-0">
                    <Col>
                      <p className="title">Installation Address</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.service_location}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">City</p>
                    </Col>
                    <Col>
                      <p>
                        <b>
                          {props.city_village
                            ? city_zipcode.find(
                                (loc) => loc._id === props.city_village
                              ).village
                            : "None"}
                        </b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">ZIP</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.zipcode}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">Email</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.email}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">Telephone Number</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.tel_no}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title py-4">
                        Is Applicant the owner of the residential property?
                      </p>
                    </Col>
                    <Col>
                      <p className="py-4">
                        <b>
                          {props.is_applicant_owner
                            ? "Yes"
                            : props.is_applicant_owner === "true"
                            ? "Yes"
                            : "No"}
                        </b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">Mailing Address</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.mailing_address}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">City</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.mailing_city_village}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">Country</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.mailing_country}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">ZIP Code</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.mailing_zipcode}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row></Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">
                        {props.customer_type === "RESID" ? "Home" : "Building"}{" "}
                        Size (approx. sq. ft.)
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.home_size}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">
                        {props.customer_type === "RESID" ? "Home" : "Building"}{" "}
                        Age (appox. year built)
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.home_age}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">New Construction</p>
                      {console.log(props.is_new_construction)}
                    </Col>
                    <Col>
                      <p>
                        <b>
                          {props.is_new_construction == "true" ? "Yes" : "No"}
                        </b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    <Col>
                      <p className="title">
                        {props.customer_type === "RESID" ? "Home" : "Building"}{" "}
                        Type
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.home_type}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Tab>
              <Tab
                eventKey="new_quipment_info"
                title="New Equipment Information"
              >
                <Container className="ml-2 mr-2">
                  <Row className="pt-3 pb-4 px-0 mx-0 d-flex flex-row justify-content-between w-100">
                    <h3 className="px-0 my-0 w-75 text-info text-start">
                      New Equipment Info{" "}
                    </h3>
                    <button
                      title="Edit details"
                      className="w-25 editButton text-end"
                      onClick={() => backToNewEquipmentHandler()}
                    >
                      <i className="fa fa-pen"></i>
                    </button>
                  </Row>
                  <Row>
                    <Col className="px-0" md={12}>
                      {props.new_equipments.length >= 1 ? (
                        <>
                          <Table>
                            <thead className="bg-info text-white">
                              <tr>
                                <th>#</th>
                                <th>System Type</th>
                                <th>Manufacturer</th>
                                <th>Model Number</th>
                                <th>Vendor</th>
                                {props.system_type === "Dryer" ||
                                props.system_type === "Washer" ? null : (
                                  <th>SEER</th>
                                )}
                                <th>Invoice#</th>
                                <th>Quantity</th>
                                <th>Purchase Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {console.log(props.new_equipments)}
                              {props.new_equipments.length >= 1
                                ? props.new_equipments.map((eq) => (
                                    <tr>
                                      <td>{eq.id + 1}</td>
                                      <td>{props.system_type}</td>
                                      <td>{eq.manufacturer}</td>
                                      <td>{eq.model_no}</td>

                                      <td>{eq.vendor}</td>
                                      {props.system_type === "Dryer" ||
                                      props.system_type === "Washer" ? null : (
                                        <td>{eq.seer}</td>
                                      )}
                                      <td>{eq.invoice_no}</td>
                                      <td>{eq.quantity}</td>
                                      <td>{eq.purchase_date}</td>
                                    </tr>
                                  ))
                                : null}
                            </tbody>
                          </Table>

                          <Row>
                            <Col md={6}>
                              <Row>
                                <Col md={12}>
                                  <h3 className="mt-3 mb-3 text-info">
                                    Installer Information
                                  </h3>
                                </Col>
                              </Row>
                              <ListGroup className="mb-3">
                                <Row>
                                  <Col md={5}>
                                    <p>
                                      <b style={{ color: "#B6B6B6" }}>
                                        Technician Name{" "}
                                      </b>
                                    </p>
                                  </Col>
                                  <Col md={7}>
                                    <b>
                                      {" "}
                                      {
                                        props.new_equipments[new_eq_index]
                                          .installer_information.technician_name
                                      }{" "}
                                    </b>
                                  </Col>
                                  <Col md={5}>
                                    <p>
                                      {" "}
                                      <b style={{ color: "#B6B6B6" }}>
                                        Work Telephone
                                      </b>{" "}
                                    </p>
                                  </Col>
                                  <Col md={7}>
                                    <b>
                                      {" "}
                                      {
                                        props.new_equipments[new_eq_index]
                                          .installer_information.work_tel
                                      }{" "}
                                    </b>
                                  </Col>
                                  <Col md={5}>
                                    <p>
                                      <b style={{ color: "#B6B6B6" }}>
                                        {" "}
                                        Company
                                      </b>
                                    </p>
                                  </Col>
                                  <Col md={7}>
                                    <b>
                                      {" "}
                                      {
                                        props.new_equipments[new_eq_index]
                                          .installer_information.company_name
                                      }{" "}
                                    </b>
                                  </Col>
                                  {showCertificateNo()}
                                  <Col md={5}>
                                    <p className="mb-3">
                                      <b style={{ color: "#B6B6B6" }}>Email</b>
                                    </p>
                                  </Col>
                                  <Col md={7}>
                                    <b>
                                      {" "}
                                      {
                                        props.new_equipments[new_eq_index]
                                          .installer_information.email
                                      }{" "}
                                    </b>
                                  </Col>
                                  <Col md={5}>
                                    <p>
                                      <b style={{ color: "#B6B6B6" }}>
                                        Date of Final Installation
                                      </b>
                                    </p>
                                  </Col>
                                  <Col md={7}>
                                    <b>
                                      {" "}
                                      {
                                        props.new_equipments[new_eq_index]
                                          .installer_information
                                          .date_final_installation
                                      }{" "}
                                    </b>
                                  </Col>
                                  {props.delay_reason ? (
                                    <>
                                      <Col md={5}>
                                        <p>
                                          <b style={{ color: "#B6B6B6" }}>
                                            Delay For Date of Purchase{" "}
                                          </b>{" "}
                                        </p>
                                      </Col>
                                      <Col md={7}>
                                        <b>{props.delay_reason}</b>
                                      </Col>
                                    </>
                                  ) : null}
                                  {props.delay_reason2 ? (
                                    <>
                                      <Col md={5}>
                                        <p>
                                          <b style={{ color: "#B6B6B6" }}>
                                            Delay For Final Installation{" "}
                                          </b>{" "}
                                        </p>
                                      </Col>
                                      <Col md={7}>
                                        <b>{props.delay_reason2}</b>
                                      </Col>
                                    </>
                                  ) : null}
                                </Row>
                              </ListGroup>
                            </Col>
                            <Col md={6} className="mt-3">
                              <Table size="lg" striped bordered hover>
                                <thead className="bg-info text-white">
                                  <tr className="py-5">
                                    <th className="p-3 text-center">QTY</th>
                                    <th className="p-3 text-center">Rebate</th>
                                    <th className="p-3 text-center">
                                      Partial Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {props.new_equipments.map((eq) => (
                                    <tr key={eq.id + 1}>
                                      <td className="p-3" align="right">
                                        {eq.quantity}
                                      </td>
                                      <td className="p-3" align="right">
                                        $ {!eq.rebate ? 0 : eq.rebate}
                                      </td>
                                      <td className="p-3" align="right">
                                        {" "}
                                        $
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
                                    <td className="p-3 text-center" colSpan="2">
                                      TOTAL
                                    </td>
                                    <td className="p-3" align="right">
                                      $ {!total_rebate ? "0.00" : total_rebate}
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <Row className="py-4">No Equipment</Row>
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
                <Container className="my-4">
                  <Row className="pt-3 pb-4 px-0 mx-0 d-flex flex-row justify-content-between w-100">
                    <h3 className="px-0 my-0 w-75 text-info text-start">
                      Old Equipment Info{" "}
                    </h3>
                    <button
                      title="Edit details"
                      className="w-25 editButton text-end"
                      onClick={() => backToOldEquipmentHandler()}
                    >
                      <i className="fa fa-pen"></i>
                    </button>
                  </Row>
                  <Table>
                    <thead className="bg-info text-white">
                      <tr>
                        <th>#</th>
                        <th>System Type</th>
                        {props.system_type === "Dryer" ||
                        props.system_type === "Washer" ? (
                          <>
                            <th>CUBIC FEET</th>
                          </>
                        ) : (
                          <>
                            <th>BTU</th>
                            <th>TONS</th>
                            <th>SEER</th>
                          </>
                        )}
                        <th>QUANTITY</th>
                        <th>NO. OF YEARS</th>
                        <th>Equipment Conditoin</th>
                        <th>Disposal Party</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {console.log(props.old_equipments)}
                      {props.old_equipments.length
                        ? props.old_equipments.map((eq) => (
                            <tr>
                              <td>{eq.id}</td>
                              <td>{props.system_type}</td>
                              {props.system_type === "Dryer" ||
                              props.system_type === "Washer" ? (
                                <>
                                  <td>{eq.tons}</td>
                                </>
                              ) : (
                                <>
                                  <td>{eq.btu}</td>
                                  <td>{eq.tons}</td>
                                  <td>{eq.seer}</td>
                                </>
                              )}
                              <td>{eq.quantity}</td>
                              <td>{eq.years}</td>
                              <td>{eq.is_equipment_condition}</td>
                              <td>{eq.disposal_party}</td>
                              <td>{eq.date}</td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </Table>
                </Container>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default EquipmentReview;
