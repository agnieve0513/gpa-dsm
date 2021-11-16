import React, { useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";

function SubmissionOfDocumentation(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Row>
      <Col md={3}></Col>
      <Col md={6}>
        <h4 className="text-center text-info mb-4">
          Submission of Documentation
        </h4>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="invoice">
              <Form.Label>
                INVOICE{" "}
                <a
                  className="text-success"
                  href="./sample_invoice.png"
                  rel="noreferrer"
                  target="_blank"
                >
                  {" "}
                  <i className="fa fa-question-circle"></i>{" "}
                </a>
              </Form.Label>
              <Form.Control type="file" placeholder="" required></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="irs_form">
              <Form.Label>
                IRS Form W-9{" "}
                <a href="./fw9.pdf" rel="noreferrer" target="_blank">
                  Fill up this link
                </a>{" "}
              </Form.Label>
              <Form.Control type="file" placeholder="" required></Form.Control>
            </Form.Group>
            <small className="text-muted">
              Please Be sure that the Applicant's Name should only be 1 Name.{" "}
            </small>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="disposal_slip">
              <Form.Label>
                DISPOSAL RECEIPT{" "}
                <a
                  className="text-success"
                  href="./sample_invoice.png"
                  rel="noreferrer"
                  target="_blank"
                >
                  {" "}
                  <i className="fa fa-question-circle"></i>{" "}
                </a>
              </Form.Label>
              <Form.Control type="file" placeholder="" required></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="letter_authorization">
              <Form.Label>
                LETTER OF AUTHORIZATION{" "}
                <a
                  className="text-success"
                  href="./sample_invoice.png"
                  rel="noreferrer"
                  target="_blank"
                >
                  {" "}
                  <i className="fa fa-question-circle"></i>{" "}
                </a>
              </Form.Label>
              <Form.Control type="file" placeholder="" required></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="other_doc1">
              <Form.Label>
                OTHER SUPPORT DOCUMENTS 1{" "}
                <a
                  className="text-success"
                  href="./sample_invoice.png"
                  rel="noreferrer"
                  target="_blank"
                >
                  {" "}
                  <i className="fa fa-question-circle"></i>{" "}
                </a>
              </Form.Label>
              <Form.Control type="file" placeholder="" required></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="other_doc2">
              <Form.Label>
                OTHER SUPPORT DOCUMENTS 2{" "}
                <a
                  className="text-success"
                  href="./sample_invoice.png"
                  rel="noreferrer"
                  target="_blank"
                >
                  {" "}
                  <i className="fa fa-question-circle"></i>{" "}
                </a>
              </Form.Label>
              <Form.Control type="file" placeholder="" required></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="other_doc3" className="mb-3">
              <Form.Label>
                OTHER SUPPORT DOCUMENTS 3{" "}
                <a
                  className="text-success"
                  href="./sample_invoice.png"
                  rel="noreferrer"
                  target="_blank"
                >
                  {" "}
                  <i className="fa fa-question-circle"></i>{" "}
                </a>
              </Form.Label>
              <Form.Control type="file" placeholder="" required></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}></Col>
        </Row>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}

export default SubmissionOfDocumentation;
