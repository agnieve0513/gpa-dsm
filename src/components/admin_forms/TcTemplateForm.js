import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
  Badge,
  Tab,
  Nav,
} from "react-bootstrap";
import {
  PDFViewer,
  Document,
  Text,
  Page,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import { useDispatch, useSelector } from "react-redux";
import { useWindowDimensions } from "../../hooks";
import { formatAMPM } from "../../helpers";
import {
  uploadFileAction,
  retrievePdfAction,
  logsFileAction,
} from "../../actions/fileActions";
import DisplayPDF from "../application/Pdf";

function TcTemplateForm() {
  const [selectedFile, setSelectedFile] = useState();
  const [customer_type, setCustomerType] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [code, setCode] = useState("comm");
  const WrapperRef = React.useRef(null);
  const { width, height } = useWindowDimensions();
  const temp = width <= 990 ? 95 : 100;
  const per = (width / 100) * temp;
  console.log("WrapperRef", WrapperRef);
  const dispatch = useDispatch();

  let obj = JSON.parse(localStorage.getItem("userInfo"));
  let userId = obj.message.original.details.id;

  const logsFile = useSelector((state) => state.logsFile);
  const [author, setAuthor] = useState("");
  const [authorDate, setAuthorDate] = useState("");

  useEffect(() => {
    if (logsFile.success) {
      for (let i = 0; i < logsFile.success.length; i++) {
        const data = logsFile.success[i];
        if (code === "comm") {
          if (data.Action.includes("comm")) {
            setAuthor(data.Made_By);
            const newdate = new Date(data.Made_On);
            setAuthorDate(
              `${`${newdate}`.substring(0, 15)} ${formatAMPM(newdate)}`
            );
          }
        } else {
          if (data.Action.includes("resd")) {
            setAuthor(data.Made_By);
            const newdate = new Date(data.Made_On);
            setAuthorDate(
              `${`${newdate}`.substring(0, 15)} ${formatAMPM(newdate)}`
            );
          }
        }
      }
    }
  }, [logsFile, code]);
  const uploadFile = useSelector((state) => state.uploadFile);
  const retriveTermsAndCondition = useSelector(
    (state) => state.retriveTermsAndCondition
  );
  const { loading: uploadLoading, error: uploadError, fileCode } = uploadFile;

  const handleUploadFile = () => {
    dispatch(
      uploadFileAction(
        selectedFile,
        customer_type,
        "termsandconditions",
        userId
      )
    );
    dispatch(retrievePdfAction(customer_type));
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const styles = StyleSheet.create({
    section: { textAlign: "justify", margin: 30, fontSize: 12, lineHeight: 2 },
  });

  useEffect(() => {
    dispatch(retrievePdfAction(code));
    dispatch(logsFileAction());
  }, [code, fileCode]);

  const handleDownload = () => {
    if (retriveTermsAndCondition?.data) {
      const url = window.URL.createObjectURL(retriveTermsAndCondition?.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${
          code === "comm" ? "Commercial" : "Residential"
        }Template.${retriveTermsAndCondition?.data.type.substr(
          retriveTermsAndCondition?.data.type.indexOf("/") + 1
        )}`
      );
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col md={8}>
          <h3 style={{ marginBottom: 10 }} className="text-info">
            Upload T&C Template
          </h3>
          <Form.Label>Terms & Condition</Form.Label>
          {width <= 990 ? (
            <InputGroup
              style={{ display: "flex", flexDirection: "column" }}
              className="mb-3"
            >
              <FormControl
                style={{ width: "100%", marginBottom: 10 }}
                placeholder="Terms and Condition"
                type="file"
                onChange={(e) => changeHandler(e)}
              />
              <Form.Select
                style={{ width: "100%", marginBottom: 10 }}
                value={customer_type}
                onChange={(e) => {
                  setCustomerType(e.target.value);
                }}
              >
                <option defaultChecked hidden>
                  Select Template Type
                </option>
                <option value="resd">Residential</option>
                <option value="comm">Commercial</option>
              </Form.Select>
              <Button
                style={{ borderRadius: 5 }}
                variant="info"
                id="button-addon2"
                onClick={() => handleUploadFile()}
              >
                Upload
              </Button>
            </InputGroup>
          ) : (
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Terms and Condition"
                type="file"
                onChange={(e) => changeHandler(e)}
              />
              <Form.Select
                value={customer_type}
                onChange={(e) => {
                  setCustomerType(e.target.value);
                }}
              >
                <option defaultChecked hidden>
                  Select Template Type
                </option>
                <option value="resd">Residential</option>
                <option value="comm">Commercial</option>
              </Form.Select>
              <Button
                variant="info"
                id="button-addon2"
                onClick={() => handleUploadFile()}
              >
                Upload
              </Button>
            </InputGroup>
          )}
          {selectedFile ? (
            <>
              {fileCode ? (
                <>
                  {fileCode.length !== 0 ? (
                    <>
                      {console.log(selectedFile)}
                      <Badge bg={"success"}>File Uploaded</Badge> <br />
                      Filename: {selectedFile.name} <br />
                      File Type: {selectedFile.type} <br />
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <h3 style={{ marginBottom: 20, marginLeft: 10 }} className="text-info">
        View T&C Templates
      </h3>
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="commercial_template"
      >
        <Row style={{ paddingLeft: 12 }}>
          <Col
            className="p-0"
            style={{ backgroundColor: "rgb(227, 227, 229)" }}
          >
            <div id="applicationFormNa">
              <Nav variant="pills">
                <Nav.Item onClick={() => setCode("comm")}>
                  <Nav.Link eventKey="commercial_template">
                    Commercial Template
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => setCode("resd")}>
                  <Nav.Link eventKey="residential_template">
                    Residential Template
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  style={{ marginLeft: "auto", width: 50, paddingTop: 10 }}
                  className="d-flex aligns-items-center justify-content-center editbtn"
                  onClick={() => handleDownload()}
                >
                  <i className="fa fa-download"></i>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
        </Row>
        <Tab.Content>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h5
              style={{ marginBottom: 10, marginLeft: 10, marginTop: 20 }}
              className="text-info"
            >
              {author}
            </h5>
            <h5
              style={{ marginBottom: 10, marginLeft: "auto", marginTop: 20 }}
              className="text-info"
            >
              {authorDate}
            </h5>
          </div>
          <div
            ref={WrapperRef}
            style={{
              backgroundColor: "#515759",
              overflow: "scroll",
              height: per,
              paddingTop: 50,
              paddingBottom: 50,
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            <DisplayPDF
              wrapper={WrapperRef}
              data={retriveTermsAndCondition?.data}
            />
          </div>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}

export default TcTemplateForm;
