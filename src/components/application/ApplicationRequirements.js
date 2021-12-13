import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Modal,
  Button,
  Image,
  Container,
} from "react-bootstrap";
import prerequisites from "./source_files/document-prerequisites";
import ModalImage from "../ModalImage";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import "./ApplicationRequirements.css";
import { TableCell, TableHead, TableRow } from "@material-ui/core";

function ApplicationRequirements(props) {
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    description: "",
    image_sample: "",
  });
  const { height, width } = useWindowDimensions();

  return (
    <Row className="mx-0 main d-flex justify-content-center">
      <ModalImage
        data={modalData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Col className="px-0" id="requirementTable" md={8}>
        {/* <h4 className="text-center text-info" id="appReqHeader">APPLICATION REQUIREMENTS</h4> */}
        <p className="px-8 text-center" id="appReqSub">
          For a smooth and complete application process we recommend that you
          have all of the following information listed below readily available.
          <span className="text-danger">
            Please note that any missing, false, or incorrect information
            provided may cause a delay or even result in a denial of your
            application.{" "}
          </span>
        </p>
        {width > 425
          ? desktopView(setModalData, setModalShow)
          : mobileView(setModalData, setModalShow)}
      </Col>
    </Row>
  );
}

const desktopView = (setModalData, setModalShow) => (
  <Card>
    <Card.Header>
      <Card.Title className="text-center">
        Application Document and Information Pre-requisites
      </Card.Title>
    </Card.Header>
    <Card.Body className="p-0">
      <Table striped bordered hover responsive>
        <thead className="bg-info text-light">
          <tr className="mx-auto">
            <th width="5%">#</th>
            <th width="20%">Description</th>
            <th width="40%">Information (Required)</th>
            <th width="35%">Additional Information (Required if)</th>
          </tr>
        </thead>
        <tbody>
          {prerequisites.map((p) => (
            <tr key={p._id}>
              <td className="text-center" key={"id_" + p._id}>
                {p._id}
              </td>
              <td key={"description_" + p._id}>
                <b>{p.description}</b>{" "}
                <a
                  className="text-secondary"
                  // href={p.image_sample}
                  rel="noreferrer"
                  target="_blank"
                  onClick={() => {
                    setModalData(p);
                    setModalShow(true);
                  }}
                >
                  {" "}
                  <i className="fa fa-question-circle"></i>{" "}
                </a>
              </td>
              <td key={"information_" + p._id}>
                {p.information.map((i) => (
                  <div key={"info_" + i}>
                    <span>{i}</span> <br />
                  </div>
                ))}
              </td>
              <td key={"additional_" + p._id}>{p.additional}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

const mobileView = (setModalData, setModalShow) => (
  <Container className="px-1">
    {/* <h6 className="py-2 px-2 text-info text-center" id="tableTitle">Application Document and Information Pre-requisites</h6> */}
    {prerequisites.map((p) => (
      <Table striped bordered hover responsive>
        <TableRow className="bg-success text-white">
          <TableCell colSpan={2} className="text-center fw-bolder py-1">
            {p._id}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="bg-info text-white ps-2 pe-0" rowSpan={1}>
            Description
          </TableCell>
          <TableCell
            className="d-flex flex-row w-100 justify-content-between"
            colSpan={1}
            width="50%"
          >
            <b className="p-0 text-start" id="descTitle">
              {p.description}
            </b>
            <a
              className="text-secondary p-0"
              // href={p.image_sample}
              rel="noreferrer"
              target="_blank"
              onClick={() => {
                setModalData(p);
                setModalShow(true);
              }}
            >
              {" "}
              <i className="fa fa-question-circle ps-2 pe-0"></i>{" "}
            </a>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="bg-info text-white ps-2 pe-0" rowSpan={1}>
            Information (required)
          </TableCell>
          <TableCell
            className="ps-3 pe-0 flex-column w-100 d-flex"
            colSpan={1}
            width="50%"
            key={"information_" + p._id}
            id="descTitle"
          >
            {p.information.length >= 1 ? (
              p.information.map((i) => (
                <div className="p-0 py-1" key={"info_" + i}>
                  <span>{i}</span>
                  <br />
                </div>
              ))
            ) : (
              <div className="px-3 pt-3">N/A</div>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="bg-info text-white ps-2 pe-0" rowSpan={1}>
            Additional Information (required if)
          </TableCell>
          <TableCell colSpan={1} width="50%" key={"additional_" + p._id}>
            <div className="px-0" id="descTitle">
              {p.additional ? p.additional : "N/A"}
            </div>
          </TableCell>
        </TableRow>
      </Table>
    ))}
  </Container>
);

export default ApplicationRequirements;
