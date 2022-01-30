import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Form, InputGroup, Button, Badge } from "react-bootstrap";
import ModalImage from "../ModalImage";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileAction } from "../../actions/fileActions";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import "./SubmissionOfDocumentation.css";

function SubmissionOfDocumentation(props) {
  const { height, width } = useWindowDimensions();
  const [supportDoc, setSupportDoc] = useState(false);

  const dispatch = useDispatch();

  const uploadFile = useSelector((state) => state.uploadFile);
  const { loading: uploadLoading, error: uploadError, fileCode } = uploadFile;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    description: "",
    image_sample: "",
  });

  let p = {};

  let initLetter = React.useMemo(() => props.letter_authorization, []);
  let initInvoice = React.useMemo(() => props.invoice, []);
  let initInstaller = React.useMemo(() => props.installer_certification, []);
  let initDisposal = React.useMemo(() => props.disposal_slip, []);
  if (initLetter && props.letter_authorization === undefined) {
    props.setLetterAuthorization("");
  }
  if (initInvoice && props.invoice === undefined) {
    props.setInvoice("");
  }
  if (initInstaller && props.initInstaller === undefined) {
    props.setInstallerCertification("");
  }
  if (initDisposal && props.disposal_slip === undefined) {
    props.setDisposalSlip("");
  }

  const handleChange = (e, doc_type) => {
    if (doc_type === "irs_form") {
      props.setIrsForm(e.target.files[0]);
    } else if (doc_type === "other_doc1") {
      props.setOtherDoc1(e.target.files[0]);
    } else if (doc_type === "other_doc2") {
      props.setOtherDoc2(e.target.files[0]);
    } else if (doc_type === "letter_authorization") {
      props.setLetterAuthorization(e.target.files[0]);
    } else if (doc_type === "invoice") {
      props.setInvoice(e.target.files[0]);
    } else if (doc_type === "installer_certification") {
      props.setInstallerCertification(e.target.files[0]);
    } else if (doc_type === "disposal_receipt") {
      props.setDisposalSlip(e.target.files[0]);
    }
    dispatch(uploadFileAction(e.target.files[0], doc_type, props.control_no));
  };

  const handleSubmit = (file, doc_type) => {};

  const UploadIcon = () => {
    return (
      <div
        style={{
          width: "40px",
          height: "38px",
          backgroundColor: "#233E86",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <i style={{ color: "white" }} className="fa fa-upload"></i>
      </div>
    );
  };

  const handleShowSuppDocs = () => {
    if (supportDoc === true) {
      setSupportDoc(false);
    } else {
      setSupportDoc(true);
    }
  };

  return (
    <Row className="w-100 mx-0 px-4">
      <ModalImage
        data={modalData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Col md={3}></Col>
      <Col md={6}>
        {width >= 425 ? (
          <h4 className="text-center text-info mb-3 ">
            SUBMISSION OF DOCUMENTATION
          </h4>
        ) : (
          <></>
        )}

        <Form.Group controlId="irs_form" className="mb-3 text-wrap">
          <p>
            <b>IRS Form W-9</b>{" "}
            <span
              className="text-secondary"
              onClick={() => {
                setModalData(
                  (p = {
                    description: "Upload IRS Form W-9",
                    id_: "3",
                  })
                );
                setModalShow(true);
              }}
            >
              <i className="fa fa-question-circle ps-2"></i>{" "}
            </span>
            {props.irs_form ? (
              <>
                <Badge bg={"success"}>File Uploaded</Badge>
              </>
            ) : (
              <></>
            )}
          </p>
          <InputGroup className="mb-1">
            <Form.Control
              name="file2"
              type="file"
              required
              onChange={(e) => handleChange(e, "irs_form")}
            />
            <UploadIcon />
          </InputGroup>
          {props.irs_form === null ? (
            <p className="validate text-danger">*This Field is Required</p>
          ) : (
            <></>
          )}
          {props.irs_form ? (
            <>
              {props.setIrsFormD(fileCode)}
              <p className="m-0">Filename: {props.irs_form.name}</p>
              <p className="m-0">File Type: {props.irs_form.type}</p>
            </>
          ) : (
            <></>
          )}
        </Form.Group>

        {/*  */}
        <Row>
          <Button
            variant="success"
            className="mb-3 uploadDocButton"
            onClick={() => handleShowSuppDocs()}
          >
            Upload Supporting Documents
          </Button>
        </Row>
        {supportDoc ? (
          <>
            <Form.Group controlId="other_supporting_doc1" className="mb-3">
              <Row className="flex d-flex-row justify-content-between">
                <p className="px-0 m-0 mb-1 supportingDoc bold fw-bold">
                  Other Supporting Document 1{" "}
                  {props.other_doc1 ? (
                    <Badge bg={"success"}>File Uploaded</Badge>
                  ) : (
                    <></>
                  )}
                </p>
                <span
                  className="px-0 text-secondary supportingDoc"
                  onClick={() => {
                    setModalData(
                      (p = {
                        description: "Upload Supporting Document 1",
                        image_sample: "./GPADSM8.png",
                      })
                    );
                    setModalShow(true);
                  }}
                >
                  <i className="fa fa-question-circle"></i>{" "}
                </span>
              </Row>
              <InputGroup>
                <Form.Control
                  name="file2"
                  type="file"
                  onChange={(e) => handleChange(e, "other_doc1")}
                />
                <UploadIcon />
              </InputGroup>
              {props.other_doc1 ? (
                <>
                  {props.setOtherDoc1D(fileCode)}
                  <p className="m-0">Filename: {props.other_doc1.name}</p>
                  <p className="m-0">File Type: {props.other_doc1.type}</p>
                </>
              ) : (
                <></>
              )}
            </Form.Group>

            <Form.Group controlId="other_supporting_doc2" className="mb-3">
              <Row className="flex d-flex-row justify-content-between">
                <p className="px-0 m-0 mb-1 supportingDoc fw-bold">
                  Other Supporting Document 2{" "}
                  {props.other_doc2 ? (
                    <Badge bg={"success"}>File Uploaded</Badge>
                  ) : (
                    <></>
                  )}
                </p>
                <span
                  className="px-0 text-secondary supportingDoc"
                  onClick={() => {
                    setModalData(
                      (p = {
                        description: "Upload Supporting Document 2",
                        image_sample: "./GPADSM8.png",
                      })
                    );
                    setModalShow(true);
                  }}
                >
                  <i className="fa fa-question-circle"></i>{" "}
                </span>
              </Row>
              <InputGroup>
                <Form.Control
                  name="file2215353"
                  type="file"
                  onChange={(e) => handleChange(e, "other_doc2")}
                />
                <UploadIcon />
              </InputGroup>
              {props.other_doc2 ? (
                <>
                  {props.setOtherDoc2D(fileCode)}
                  <p className="m-0">Filename: {props.other_doc2.name}</p>
                  <p className="m-0">File Type: {props.other_doc2.type}</p>
                </>
              ) : (
                <></>
              )}
            </Form.Group>
          </>
        ) : (
          <></>
        )}
        {/*  */}
        <h5 className="text-muted pt-3">Files Uploaded:</h5>

        {props.letter_authorization ? (
          <>
            <Form.Group controlId="letter_authorization" className="mb-3">
              <p>
                <b>LOA (Letter of Authorization)</b>{" "}
                <small className="text-muted">
                  If you want to update the existing upload, you can upload the
                  file below{" "}
                </small>
                <span
                  className="text-secondary"
                  onClick={() => {
                    setModalData(
                      (p = {
                        description: "Upload Letter of Authorization",
                        image_sample: "./image_sample/6.jpg",
                      })
                    );
                    setModalShow(true);
                  }}
                >
                  <i className="fa fa-question-circle"></i>{" "}
                </span>{" "}
                {props.letter_authorization ? (
                  <Badge bg={"success"}>File Uploaded</Badge>
                ) : (
                  <></>
                )}
              </p>
              <InputGroup>
                <Form.Control
                  name="file2"
                  type="file"
                  onChange={(e) => handleChange(e, "letter_authorization")}
                />
              </InputGroup>
              {props.letter_authorization ? (
                <>
                  {props.setLetterAuthorizationD(fileCode)}
                  <p className="m-0">
                    Filename: {props.letter_authorization.name}
                  </p>
                  <p className="m-0">
                    File Type: {props.letter_authorization.type}
                  </p>
                </>
              ) : (
                <></>
              )}
            </Form.Group>
          </>
        ) : (
          <></>
        )}
        {/*  */}
        {initInvoice ? (
          <Form.Group controlId="invoice" className="mb-3">
            <p>
              <b>Invoice</b>{" "}
              <small className="text-muted">
                If you want to update the existing Invoice, you can upload the
                file below{" "}
              </small>
              <span
                className="text-secondary"
                onSubmit={(e) => e.preventDefault()}
                onClick={() => {
                  setModalData(
                    (p = {
                      description: "Upload Invoice",
                      image_sample: "./sample_invoice.png",
                    })
                  );
                  setModalShow(true);
                }}
              >
                <i className="fa fa-question-circle"></i>{" "}
              </span>{" "}
              {props.invoice ? (
                <Badge bg={"success"}>File Uploaded</Badge>
              ) : (
                <></>
              )}
            </p>
            <InputGroup>
              <Form.Control
                name="file212351"
                placeholder="Invoice"
                type="file"
                onChange={(e) => handleChange(e, "invoice")}
              />
              <UploadIcon />
            </InputGroup>
            {props.invoice ? (
              <>
                {props.setInvoiceD(fileCode)}
                <p className="m-0">Filename: {props.invoice.name}</p>
                <p className="m-0">File Type: {props.invoice.type}</p>
              </>
            ) : (
              <></>
            )}
          </Form.Group>
        ) : (
          <></>
        )}
        {/*  */}
        {props.installer_certification ? (
          <Form.Group controlId="installer_certification" className="mb-3">
            <p>
              <b>Installers Certification</b>{" "}
              <small className="text-muted">
                If you want to update the existing upload, you can upload the
                file below{" "}
              </small>
              <span
                className="text-secondary"
                onClick={() => {
                  setModalData(
                    (p = {
                      description: "Upload Installer's Certification",
                      image_sample: "./image_sample/7.jpg",
                    })
                  );
                  setModalShow(true);
                }}
              >
                <i className="fa fa-question-circle"></i>{" "}
              </span>{" "}
              {props.installer_certification ? (
                <Badge bg={"success"}>File Uploaded</Badge>
              ) : (
                <></>
              )}
            </p>
            <InputGroup>
              <Form.Control
                name="file2322"
                type="file"
                onChange={(e) => handleChange(e, "installer_certification")}
              />
            </InputGroup>
            {props.installer_certification ? (
              <>
                {props.setInstallerCertificationD(fileCode)}
                <p className="m-0">
                  Filename: {props.installer_certification.name}
                </p>
                <p className="m-0">
                  File Type: {props.installer_certification.type}
                </p>
              </>
            ) : (
              <></>
            )}
          </Form.Group>
        ) : (
          <></>
        )}
        {/*  */}
        {props.disposal_slip ? (
          <Form.Group controlId="disposal_receipt" className="mb-3">
            <p>
              <b>Disposal Receipt</b>{" "}
              <small className="text-muted">
                If you want to update the existing upload, you can upload the
                file below{" "}
              </small>
              <span
                className="text-secondary"
                onClick={() => {
                  setModalData(
                    (p = {
                      description: "Upload Disposal Receipt",
                      image_sample: "./image_sample/5.jpg",
                    })
                  );
                  setModalShow(true);
                }}
              >
                <i className="fa fa-question-circle"></i>{" "}
              </span>{" "}
              {props.disposal_slip ? (
                <Badge bg={"success"}>File Uploaded</Badge>
              ) : (
                <></>
              )}
            </p>
            <InputGroup>
              <Form.Control
                name="file211"
                type="file"
                onChange={(e) => handleChange(e, "disposal_receipt")}
              />
            </InputGroup>
            {props.disposal_slip ? (
              <>
                {props.setDisposalSlipD(fileCode)}
                <p className="m-0">Filename: {props.disposal_slip.name}</p>
                <p className="m-0">File Type: {props.disposal_slip.type}</p>
              </>
            ) : (
              <></>
            )}
          </Form.Group>
        ) : (
          <></>
        )}
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}

export default SubmissionOfDocumentation;
