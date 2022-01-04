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
import MaterialTable from "material-table";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { retrieveFileAction } from "../../actions/fileActions";
import { useDispatch } from "react-redux";

function FinalReview(props) {
  console.log('I am the file: ', props.irs_form)
  const dispatch = useDispatch();

  const { height, width } = useWindowDimensions();
  const squeezedTabs = width > 1367

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

  let total_rebate = 0;

  return (
    <Row className="w-100 mx-0">
      <Col md={1}></Col>
      <Col md={10}>
        {width >= 425 ? (
          <h4 className="text-center text-info mb-3">Final Review</h4>
        ) : (
          <></>
        )}

        <Card className="mb-5">
          <Card.Body className="p-0">
            <Tabs
              defaultActiveKey="application_information"
              transition={false}
              className={squeezedTabs ? "mb-3" : "finalTabs mb-3 flex flex-column w-100"}
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
                        <b>{props.city_village}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">ZIP</p>
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
                      <p className="title">Home Size (approx. sq. ft.)</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.home_size}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">Home Age (appox. year built)</p>
                    </Col>
                    <Col>
                      <p>
                        <b>{props.home_age}</b>{" "}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col><p className='title'>New Construction</p></Col>
                    <Col><p><b>{props.is_new_construction ? "Yes" : "No"}</b>{" "}</p></Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="title">Home Type</p>
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
                            title={width < 770 ? "" : "Equipments"}
                            options={{
                              headerStyle: {
                                fontSize: 16,
                                backgroundColor: "#233f88",
                                color: "#FFF",
                              },
                            }}
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
                    title={width < 770 ? "" : "Existing Equipments"}
                    options={{
                      headerStyle: {
                        fontSize: 16,
                        backgroundColor: "#233f88",
                        color: "#FFF",
                      },
                    }}
                  />
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
                        Installer's Certification <Badge bg={"success"}>Uploaded</Badge>
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
                      <Button
                        className="mb-2"
                        variant={"success"}
                        onClick={() =>
                          dispatch(
                            retrieveFileAction(props.irs_form.name)
                          )
                        }
                        size={"sm"}
                      >Download</Button>
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
                  {props.letter_authorization ? (
                    <>
                      <b>
                        Letter Authorization <Badge bg={"success"}>Uploaded</Badge>
                      </b>
                      <p>
                        Filename: {props.letter_authorization.name} <br />
                        File Type: {props.letter_authorization.type}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  {props.other_doc1 ? (
                    <>
                      <b>
                        Other Support Documents 1 <Badge bg={"success"}>Uploaded</Badge>
                      </b>
                      <p>
                        Filename: {props.other_doc1.name} <br />
                        File Type: {props.other_doc1.type}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  {props.other_doc2 ? (
                    <>
                      <b>
                        Other Support Documents 2 <Badge bg={"success"}>Uploaded</Badge>
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
