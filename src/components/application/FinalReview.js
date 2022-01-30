import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Tabs,
  Tab,
  ListGroup,
  Table,
  Badge,
  Button,
  ButtonGroup,
  Container,
  Card,
} from "react-bootstrap";

import "./EquipmentReview.css";
import city_zipcode from "./source_files/city_zipcode";
import MaterialTable from "material-table";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { retrieveFileAction } from "../../actions/fileActions";
import { useDispatch } from "react-redux";

function FinalReview(props) {
  console.log("I am the file: ", props.irs_form);
  const dispatch = useDispatch();

  const { height, width } = useWindowDimensions();
  const squeezedTabs = width > 1367;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [new_eq_index, setNewEqIndex] = useState(0);
  const [old_eq_index, setOldEqIndex] = useState(0);

  const backToApplicationHandler = () => {
    props.setStepOneToStepSix(true);
    props.setStep(2);
  };

  const backToNewEquipmentHandler = () => {
    props.setStepOneToStepSix(true);
    props.setStep(3);
  };

  const backToOldEquipmentHandler = () => {
    props.setStepOneToStepSix(true);
    props.setStep(4);
  };

  const backToSubmissionOfDocumentation = () => {
    props.setStep(6);
  };

  const showNewEquipmentInformation = (index) => {
    setNewEqIndex(index);
  };

  const showOldEquipmentInformation = (index) => {
    setOldEqIndex(index);
  };

  const showCertificateNo = () => {
    if (props.system_type === "Dryer" || props.system_type === "Washer") {
      return <></>;
    } else {
      return (
        <p>
          Certification No.{" "}
          <b>
            {" "}
            {
              props.new_equipments[new_eq_index].installer_information
                .technician_cert_no
            }{" "}
          </b>
        </p>
      );
    }
  };

  let total_rebate = 0;

  return (
    <Row className="w-100 mx-0">
      <Col md={1}></Col>
      <Col md={10}>
        {width >= 425 ? (
          <h4 className="text-center text-info mb-3">FINAL REVIEW</h4>
        ) : (
          <></>
        )}

        <Card className="mb-5">
          <Card.Body className="p-0">
            <Tabs
              defaultActiveKey="application_information"
              transition={false}
              className={
                squeezedTabs ? "mb-3" : "finalTabs mb-3 flex flex-column w-100"
              }
            >
              <Tab
                eventKey="application_information"
                title="Applicant Information"
              >
                <Container className="ml-2 mr-2 px-2">
                  <Row className="pt-3 pb-4 px-2 mx-0 d-flex flex-row justify-content-between w-100">
                    <h3 className="my-0 w-75 text-info text-start">
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
                  <Row>
                    <Col>
                      <p className="title">GPA Electric Account number</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.account_no}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">Bill ID</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.bill_id}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">Name on GPA Account</p>
                    </Col>
                    <Col>
                      <p>
                        <b>
                          {props.lastname}, {props.firstname} {props.middlename}{" "}
                        </b>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">First Name</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.firstname}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">Middle Name</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.middlename}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">Last Name</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.lastname}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">Installation Address</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.service_location}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
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
                  <Row>
                    <Col>
                      <p className="title">ZIP Code</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.zipcode}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">Email</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.email}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">Telephone Number</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.tel_no}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
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
                  <Row>
                    <Col>
                      <p className="title">Mailing Address</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.mailing_address}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">City</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.mailing_city_village}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">Country</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.mailing_country}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">ZIP Code</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.mailing_zipcode}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
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
                  <Row>
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
                  <Row>
                    <Col>
                      <p className="title">New Construction</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.is_new_construction ? "Yes" : "No"}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
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
                                <th>Invoice#</th>
                                <th>Quantity</th>
                                <th>Purchase Date</th>
                                <th>Rebate</th>
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
                                      <td>{eq.invoice_no}</td>
                                      <td>{eq.quantity}</td>
                                      <td>{eq.purchase_date}</td>
                                      <td>{eq.rebate || 0}</td>
                                    </tr>
                                  ))
                                : null}
                            </tbody>
                          </Table>
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
                                {showCertificateNo()}
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
                                {props.delay_reason ? (
                                  <p>
                                    Reason for exceeding 120 days{" "}
                                    <b>{props.delay_reason}</b>
                                  </p>
                                ) : null}
                              </ListGroup>
                            </Col>
                            <Col md={6} className="mt-2">
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
                                    <td className="p-3 text-center" colSpan="2">
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
                        {props.system_type === ("Dryer" || "Washer") ? (
                          <>
                            <th>CUBIC</th>
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
                              {props.system_type === ("Dryer" || "Washer") ? (
                                <>
                                  <td>{eq.btu}</td>
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
              <Tab
                eventKey="submission_of_documentation"
                title="Submission of Documentation"
              >
                <Container className="ml-2 mr-2">
                  <Row className="pt-3 pb-4 px-0 mx-0 d-flex flex-row justify-content-between w-100">
                    <h3 className="px-0 my-0 w-75 text-info text-start">
                      Submission of Documentation{" "}
                    </h3>
                    <button
                      title="Edit details"
                      className="w-25 editButton text-end"
                      onClick={() => backToSubmissionOfDocumentation()}
                    >
                      <i className="fa fa-pen"></i>
                    </button>
                  </Row>
                  {props.letter_authorization ? (
                    <>
                      <b>
                        LOA <Badge bg={"success"}>Uploaded</Badge>
                      </b>
                      <p>
                        Filename: {props.letter_authorization.name} <br />
                        File Type: {props.letter_authorization.type}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}

                  {props.invoice ? (
                    <>
                      <b>
                        Invoice <Badge bg={"success"}>Uploaded</Badge>
                      </b>
                      <p>
                        Filename: {props.invoice.name} <br />
                        File Type: {props.invoice.type}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  {props.installer_certification ? (
                    <>
                      <b>
                        Installer's Certification{" "}
                        <Badge bg={"success"}>Uploaded</Badge>
                      </b>
                      <p>
                        Filename: {props.installer_certification.name} <br />
                        File Type: {props.installer_certification.type}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  {props.irs_form ? (
                    <>
                      <b>
                        IRS Form W-9 <Badge bg={"success"}>Uploaded</Badge>
                      </b>
                      <p>
                        Filename: {props.irs_form.name} <br />
                        File Type: {props.irs_form.type}
                      </p>
                      {/* <Button
                        className="mb-2"
                        variant={"success"}
                        onClick={() =>
                          dispatch(
                            retrieveFileAction(props.irs_form.name)
                          )
                        }
                        size={"sm"}
                      >Download</Button> */}
                    </>
                  ) : (
                    <></>
                  )}
                  {props.disposal_receipt ? (
                    <>
                      <b>
                        Disposal Receipt <Badge bg={"success"}>Uploaded</Badge>
                      </b>
                      <p>
                        Filename: {props.disposal_receipt.name} <br />
                        File Type: {props.disposal_receipt.type}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}

                  {props.other_doc2 ? (
                    <>
                      <b>
                        Other Support Documents 1{" "}
                        <Badge bg={"success"}>Uploaded</Badge>
                      </b>
                      <p>
                        Filename: {props.other_doc1.name} <br />
                        File Type: {props.other_doc1.type}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  {props.other_doc3 ? (
                    <>
                      <b>
                        Other Support Documents 2{" "}
                        <Badge bg={"success"}>Uploaded</Badge>
                      </b>
                      <p>
                        Filename: {props.other_doc2.name} <br />
                        File Type: {props.other_doc2.type}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
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

export default FinalReview;
