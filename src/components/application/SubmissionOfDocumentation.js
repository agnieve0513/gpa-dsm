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

  let initLetter = React.useMemo(() => props.letter_authorization, [])
  let initInvoice = React.useMemo(() => props.invoice, [])
  let initInstaller = React.useMemo(() => props.installer_certification, [])
  let initDisposal = React.useMemo(() => props.disposal_slip, [])
  if (initLetter && props.letter_authorization===undefined) {
    props.setLetterAuthorization('')
  }
  if (initInvoice && props.invoice===undefined) {
    props.setInvoice('')
  }
  if (initInstaller && props.initInstaller===undefined) {
    props.setInstallerCertification('')
  }
  if (initDisposal && props.disposal_slip===undefined) {
    props.setDisposalSlip('')
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
          <h4 className="text-center text-info">Submission of Documentation</h4>
        ) : (
          <></>
        )}

        <Form.Group controlId="irs_form" className="mb-3 text-wrap">
          <p>
            IRS Form W-9{" "}
            <small className="text-muted">
              (Click this link to download the File and Enter your details on
              it. After that, upload the file that contains your data
              information)
            </small>
            <span
              className="text-secondary"
              onClick={() => {
                setModalData(
                  (p = {
                    description: "Upload IRS Form W-9",
                    image_sample: "./GPADSM8.png",
                  })
                );
                setModalShow(true);
              }}
            >
              <i className="fa fa-question-circle ps-2"></i>{" "}
            </span>
          </p>
          <InputGroup className="mb-2">
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
              {fileCode ? (
                <>
                  {props.setIrsFormD(fileCode)}
                  {/* {console.log(props.irs_formD)} */}
                  <Badge bg={"success"}>File Uploaded</Badge> <br />
                </>
              ) : (
                <>no upload</>
              )}
              <p className="text-break"> Filename: {props.irs_form.name}</p>{" "}
              File Type: {props.irs_form.type} <br />
              <br />
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
              <p className="d-flex justify-content-between applicationTitle">
                Other Supporting Document 1
                <span
                  className="text-secondary"
                  onClick={() => {
                    setModalData(
                      (p = {
                        description: "Upload IRS Form W-9",
                        image_sample: "./GPADSM8.png",
                      })
                    );
                    setModalShow(true);
                  }}
                >
                  <i className="fa fa-question-circle"></i>{" "}
                </span>
              </p>
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
                  {fileCode ? (
                    <>
                      {props.setOtherDoc1D(fileCode)}
                      {/* {console.log(props.other_doc1D)} */}
                      <Badge bg={"success"}>File Uploaded</Badge> <br />
                    </>
                  ) : (
                    <>no upload</>
                  )}
                  <p className="text-break"> Filename:{" "}{props.other_doc1.name} </p> <br />
                  File Type: {props.other_doc1.type} <br />
                  <br />
                </>
              ) : (
                <></>
              )}
            </Form.Group>

            <Form.Group controlId="other_supporting_doc2" className="mb-3">
              <Row className="px-3 flex d-flex-row justify-content-between">
                <p className="m-0 mb-1 supportingDoc">Other Supporting Document 2</p>
                <span
                  className="px-0 text-secondary supportingDoc"
                  onClick={() => {
                    setModalData(
                      (p = {
                        description: "Upload IRS Form W-9",
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
                  {fileCode ? (
                    <>
                      {props.setOtherDoc2D(fileCode)}
                      {/* {console.log(props.other_doc2D)} */}
                      <Badge bg={"success"}>File Uploaded</Badge> <br />
                    </>
                  ) : (
                    <>no upload</>
                  )}
                  Filename: {props.other_doc1.name} <br />
                  File Type: {props.other_doc1.type} <br />
                  <br />
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
                LOA (Letter of Authorization){" "}
                <small className="text-muted">
                  If you want to update the existing upload, you can upload the
                  file below
                </small>
                <span
                  className="text-secondary"
                  onClick={() => {
                    setModalData(
                      (p = {
                        description: "Upload IRS Form W-9",
                        image_sample: "./GPADSM7.png",
                      })
                    );
                    setModalShow(true);
                  }}
                >
                  <i className="fa fa-question-circle"></i>{" "}
                </span>
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
                  {fileCode ? (
                    <>
                      {props.setLetterAuthorizationD(fileCode)}
                      {/* {console.log(props.letter_authorizationD)} */}
                      <Badge bg={"success"}>File Uploaded</Badge> <br />
                    </>
                  ) : (
                    <>no upload</>
                  )}
                  Filename: {props.letter_authorization.name} <br />
                  File Type: {props.letter_authorization.type} <br />
                  <br />
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
              Invoice{" "}
              <small className="text-muted">
                If you want to update the existing Invoice, you can upload the
                file below
              </small>
              <span
                className="text-secondary"
                onSubmit={e => e.preventDefault()}
                onClick={() => {
                  setModalData(
                    (p = {
                      description: "Upload IRS Form W-9",
                      image_sample: "./GPADSM7.png",
                    })
                  );
                  setModalShow(true);
                }}
              >
                <i className="fa fa-question-circle"></i>{" "}
              </span>
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
                {fileCode ? (
                  <>
                    {props.setInvoiceD(fileCode)}
                    {console.log('invoiceID', props.invoiceD)}
                    <Badge bg={"success"}>File Uploaded</Badge> <br />
                  </>
                ) : (
                  <>no upload</>
                )}
                Filename: {props.invoice.name} <br />
                File Type: {props.invoice.type} <br />
                <br />
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
              Installers Certification{" "}
              <small className="text-muted">
                If you want to update the existing upload, you can upload the
                file below
              </small>
              <span
                className="text-secondary"
                onClick={() => {
                  setModalData(
                    (p = {
                      description: "Upload IRS Form W-9",
                      image_sample: "./GPADSM7.png",
                    })
                  );
                  setModalShow(true);
                }}
              >
                <i className="fa fa-question-circle"></i>{" "}
              </span>
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
                {fileCode ? (
                  <>
                    {props.setInstallerCertificationD(fileCode)}
                    {/* {console.log(props.installer_certificationD)} */}
                    <Badge bg={"success"}>File Uploaded</Badge> <br />
                  </>
                ) : (
                  <>no upload</>
                )}
                Filename: {props.installer_certification.name} <br />
                File Type: {props.installer_certification.type} <br />
                <br />
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
              Disposal Receipt{" "}
              <small className="text-muted">
                If you want to update the existing upload, you can upload the
                file below
              </small>
              <span
                className="text-secondary"
                onClick={() => {
                  setModalData(
                    (p = {
                      description: "Upload IRS Form W-9",
                      image_sample: "./GPADSM7.png",
                    })
                  );
                  setModalShow(true);
                }}
              >
                <i className="fa fa-question-circle"></i>{" "}
              </span>
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
                {fileCode ? (
                  <>
                    {props.setDisposalSlipD(fileCode)}
                    {/* {console.log(props.disposal_slipD)} */}
                    <Badge bg={"success"}>File Uploaded</Badge> <br />
                  </>
                ) : (
                  <>no upload</>
                )}
                Filename: {props.disposal_slip.name} <br />
                File Type: {props.disposal_slip.type} <br />
                <br />
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
