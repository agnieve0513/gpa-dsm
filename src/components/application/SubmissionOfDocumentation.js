import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Form, InputGroup, Button, Badge } from "react-bootstrap";
import ModalImage from "../ModalImage";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileAction } from "../../actions/fileActions";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import "./SubmissionOfDocumentation.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function SubmissionOfDocumentation(props) {

    const Toast = MySwal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

  const { height, width } = useWindowDimensions();
  const [supportDoc, setSupportDoc] = useState(false);

  const dispatch = useDispatch();

  const uploadFile = useSelector((state) => state.uploadFile);
  const { loading: uploadLoading, error: uploadError, fileCode } = uploadFile;


  const uploadSuccessfully = ()=> {
     Toast.fire({
       icon: "info",
       title: "Uploaded Successfully",
       text: "Please wait while the uploaded file is being fetched.",
     }).then(()=> {
       props.setVerify(true);
       props.setAlreadyUploaded(true);
     }
     )
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    
    if (props.alreadyUploaded) {
      props.setVerify(true);
    } else {
      props.setVerify(false);
    }

    if(fileCode){

      switch (docType) {
        case "loa":
          props.setLetterAuthorizationD(fileCode);
          console.log(
            "File code for LOA after successfully uploading file:",
            fileCode
          );
          uploadSuccessfully();
          break;
        case "invoice":
          props.setInvoiceD(fileCode);
          console.log(
            "File code for Invoice after successfully uploading file:",
            fileCode
          );
          uploadSuccessfully();
          break;
        case "irs":
          props.setIrsFormD(fileCode);
          console.log(
            "File code for IRS after successfully uploading file:",
            fileCode
          );
          uploadSuccessfully();
          break;
        case "other_doc1":
          props.setOtherDoc1D(fileCode);
          console.log(
            "File code for Other Doc1 after successfully uploading file:",
            fileCode
          );
          uploadSuccessfully();
          break;
        case "other_doc2":
          props.setOtherDoc2D(fileCode);
          console.log(
            "File code for Other Doc2 after successfully uploading file:",
            fileCode
          );
          uploadSuccessfully();
          break;
      }
      setIrsFormTrigger(false);
      setInvoiceTrigger(false);
      setLoaTrigger(false);
      setDisposalSlipTrigger(false);
      setOtherDoc1Trigger(false);
      setOtherDoc2Trigger(false);
      setOtherDoc3Trigger(false);
    }
 
  }, [
   fileCode
  ]);

  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    description: "",
    image_sample: "",
  });

  const [loaTrigger, setLoaTrigger] = useState(0);
  const [invoiceTrigger, setInvoiceTrigger] = useState(0);
  const [irsFormTrigger, setIrsFormTrigger] = useState(0);
  const [disposalSlipTrigger, setDisposalSlipTrigger] = useState(0);
  const [otherDoc1Trigger, setOtherDoc1Trigger] = useState(0);
  const [otherDoc2Trigger, setOtherDoc2Trigger] = useState(0);
  const [otherDoc3Trigger, setOtherDoc3Trigger] = useState(0);
  const [docType, setDocType] = useState("");

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
    dispatch(uploadFileAction(e.target.files[0], doc_type, props.control_no, false));
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

     const errorFileInvalidMessage = () => {
       const Toast = MySwal.mixin({
         toast: true,
         position: "top-right",
         iconColor: "white",
         customClass: {
           popup: "colored-toast",
         },
         showConfirmButton: false,
         timer: 3500,
         timerProgressBars: true,
       });

       Toast.fire({
         icon: "info",
         title: "Invalid File Uploaded",
         text: "Please note that only Images (JPG, JPEG, PNG) and PDF files are accepted by the system.",
       });
     };

  return (
    <Row className="w-100 mx-0 px-4">
      {console.log("InvoiceD: ", props.invoiceD)}
      {console.log("irsD: ", props.irs_formD)}
      {console.log("disposal_slipD: ", props.disposal_slipD)}
      {console.log("letter_authorizationD: ", props.letter_authorizationD)}
      {console.log("other_doc1D: ", props.other_doc1D)}
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
          </p>
          <InputGroup className="mb-1">
            <Form.Control
              name="file2"
              type="file"
              required
              onChange={(e) => {
                if (
                  e.target.files[0].type === "application/pdf" ||
                  e.target.files[0].type === "image/png" ||
                  e.target.files[0].type === "image/jpeg"
                ) {
                  handleChange(e, "irs_form");

                  setDocType("irs");
                  setIrsFormTrigger(irsFormTrigger + 1);
                } else {
                  errorFileInvalidMessage();
                  e.target.value = null;
                }
              }}
            />
            <UploadIcon />
          </InputGroup>
          {console.log("FILECODEEE: ", fileCode)}
          {props.irs_form && fileCode ? (
            <>
              <Badge bg={"success"}>File Successfully Uploaded</Badge> <br />
            </>
          ) : null}
          {irsFormTrigger && uploadError ? (
            <>
              {props.setIrsForm(null)}
              <Badge bg={"danger"}>Error Uploading File</Badge> <br />
              <p className="validate text-muted requiredField">
                Please Select Different File
              </p>
            </>
          ) : props.irs_form === null ? (
            <p className="validate text-danger">*This Field is Required</p>
          ) : (
            <></>
          )}
          {props.irs_form ? (
            <>
              {console.log("IRSD VALUE: ", props.irs_formD)}
              {/* <Badge bg={"success"}>Uploaded File Successfully</Badge> <br /> */}
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
                  <small class="text-muted">(Consideration Letter)</small>{" "}
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
                  onChange={(e) => {
                    if (
                      e.target.files[0].type === "application/pdf" ||
                      e.target.files[0].type === "image/png" ||
                      e.target.files[0].type === "image/jpeg"
                    ) {
                      handleChange(e, "other_doc1");

                      setDocType("other_doc1");
                      setOtherDoc1Trigger(otherDoc1Trigger + 1);
                    } else {
                      errorFileInvalidMessage();
                      e.target.value = null;
                    }
                  }}
                />
                <UploadIcon />
              </InputGroup>
              {props.other_doc1 && fileCode ? (
                <>
                  <Badge bg={"success"}>File Successfully Uploaded</Badge>{" "}
                  <br />
                </>
              ) : null}
              {otherDoc1Trigger && uploadError ? (
                <>
                  {props.setOtherDoc1(null)}
                  <Badge bg={"danger"}>Error Uploading File</Badge> <br />
                  <p className="validate text-muted requiredField">
                    Please Select Different File
                  </p>
                </>
              ) : (
                <></>
              )}
              {props.other_doc1 ? (
                <>
                  {otherDoc1Trigger === true
                    ? props.setOtherDoc1D(fileCode)
                    : null}
                  {/* <Badge bg={"success"}>Uploaded File Successfully</Badge>{" "} */}
                  <br />
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
                  onChange={(e) => {
                    if (
                      e.target.files[0].type === "application/pdf" ||
                      e.target.files[0].type === "image/png" ||
                      e.target.files[0].type === "image/jpeg"
                    ) {
                      handleChange(e, "other_doc2");

                      setDocType("other_doc2");
                      setOtherDoc2Trigger(otherDoc2Trigger + 1);
                    } else {
                      errorFileInvalidMessage();
                      e.target.value = null;
                    }
                  }}
                />
                <UploadIcon />
              </InputGroup>
              {props.other_doc2 && fileCode ? (
                <>
                  <Badge bg={"success"}>File Successfully Uploaded</Badge>{" "}
                  <br />
                </>
              ) : null}
              {otherDoc2Trigger && uploadError ? (
                <>
                  {props.setOtherDoc1(null)}
                  <Badge bg={"danger"}>Error Uploading File</Badge> <br />
                  <p className="validate text-muted requiredField">
                    Please Select Different File
                  </p>
                </>
              ) : (
                <></>
              )}
              {props.other_doc2 ? (
                <>
                  {otherDoc2Trigger ? props.setOtherDoc2D(fileCode) : null}
                  {/* <Badge bg={"success"}>Uploaded File Successfully</Badge>{" "} */}
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
              </p>
              <InputGroup>
                <Form.Control
                  name="file2"
                  type="file"
                  onChange={(e) => {
                    if (
                      e.target.files[0].type === "application/pdf" ||
                      e.target.files[0].type === "image/png" ||
                      e.target.files[0].type === "image/jpeg"
                    ) {
                      handleChange(e, "letter_authorization");
                    } else {
                      errorFileInvalidMessage();
                      e.target.value = null;
                    }

                    setDocType("loa");
                    setLoaTrigger(loaTrigger + 1);
                  }}
                />
              </InputGroup>
              {props.letter_authorization && fileCode ? (
                <>
                  <Badge bg={"success"}>File Successfully Uploaded</Badge>{" "}
                  <br />
                </>
              ) : null}
              {loaTrigger && uploadError ? (
                <>
                  {props.setLetterAuthorization(null)}
                  <Badge bg={"danger"}>Error Uploading File</Badge> <br />
                  <p className="validate text-muted requiredField">
                    Please Select Different File
                  </p>
                </>
              ) : (
                <></>
              )}
              {props.letter_authorization ? (
                <>
                  {loaTrigger === true
                    ? props.setLetterAuthorizationD(fileCode)
                    : null}
                  {/* <Badge bg={"success"}>Uploaded File Successfully</Badge>{" "} */}
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
            </p>
            <InputGroup>
              <Form.Control
                name="file212351"
                placeholder="Invoice"
                type="file"
                onChange={(e) => {
                  if (
                    e.target.files[0].type === "application/pdf" ||
                    e.target.files[0].type === "image/png" ||
                    e.target.files[0].type === "image/jpeg"
                  ) {
                    handleChange(e, "invoice");

                    setDocType("invoice");
                    setInvoiceTrigger(invoiceTrigger + 1);
                  } else {
                    errorFileInvalidMessage();
                    e.target.value = null;
                  }
                }}
              />
              <UploadIcon />
            </InputGroup>
            {props.invoice && fileCode ? (
              <>
                <Badge bg={"success"}>File Successfully Uploaded</Badge> <br />
              </>
            ) : null}
            {invoiceTrigger && uploadError ? (
              <>
                {props.setInvoice(null)}
                <Badge bg={"danger"}>Error Uploading File</Badge> <br />
                <p className="validate text-muted requiredField">
                  Please Select Different File
                </p>
              </>
            ) : (
              <></>
            )}
            {props.invoice ? (
              <>
                {invoiceTrigger === true ? props.setInvoiceD(fileCode) : null}
                {/* <Badge bg={"success"}>Uploaded File Successfully</Badge>{" "} */}
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
        {/* {props.installer_certification ? (
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
                // <Badge bg={"success"}>File Uploaded</Badge>
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
        )} */}
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
            </p>
            <InputGroup>
              <Form.Control
                name="file211"
                type="file"
                onChange={(e) => {
                  if (
                    e.target.files[0].type === "application/pdf" ||
                    e.target.files[0].type === "image/png" ||
                    e.target.files[0].type === "image/jpeg"
                  ) {
                    handleChange(e, "disposal_receipt");
                    disposalSlipTrigger(true);
                  } else {
                    errorFileInvalidMessage();
                    e.target.value = null;
                  }
                }}
              />
            </InputGroup>
            {props.disposal_slip && fileCode ? (
              <>
                <Badge bg={"success"}>File Successfully Uploaded</Badge> <br />
              </>
            ) : null}
            {disposalSlipTrigger && uploadError ? (
              <>
                {props.setInvoice(null)}
                <Badge bg={"danger"}>Error Uploading File</Badge> <br />
                <p className="validate text-muted requiredField">
                  Please Select Different File
                </p>
              </>
            ) : (
              <></>
            )}
            {props.disposal_slip ? (
              <>
                {disposalSlipTrigger === true
                  ? props.setDisposalSlipD(fileCode)
                  : null}
                {/* <Badge bg={"success"}>Uploaded File Successfully</Badge>{" "} */}
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
