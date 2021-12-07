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
import { uploadFileAction, retrievePdfAction } from "../../actions/fileActions";
import DisplayPDF from "../application/Pdf";

function TcTemplateForm() {
  const WrapperRef = React.useRef();
  const [selectedFile, setSelectedFile] = useState();
  const [customer_type, setCustomerType] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [code, setCode] = useState("comm");

  const dispatch = useDispatch();

  const uploadFile = useSelector((state) => state.uploadFile);
  const retriveTermsAndCondition = useSelector(
    (state) => state.retriveTermsAndCondition
  );
  const { loading: uploadLoading, error: uploadError, fileCode } = uploadFile;

  const handleUploadFile = () => {
    dispatch(uploadFileAction(selectedFile, customer_type, "tnc_template"));
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
  }, [code]);

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
          <Form.Label>Terms & Condition</Form.Label>
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
                setCode(e.target.value);
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
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <h3
            style={{ marginLeft: 10, marginBottom: 10 }}
            className="text-info"
          >
            {code === "comm" ? "Commercial" : "Residential"} Template
          </h3>

          <Button
            size={"sm"}
            variant={"success"}
            onClick={() => handleDownload()}
            style={{ marginLeft: "auto", marginBottom: 10 }}
          >
            Download
          </Button>
        </div>

        <div
          style={{
            backgroundColor: "#515759",
            overflow: "scroll",
            height: 1000,
            paddingTop: 50,
            paddingBottom: 50,
            marginLeft: 10,
          }}
          ref={WrapperRef}
        >
          <DisplayPDF
            wrapper={WrapperRef}
            data={retriveTermsAndCondition?.data}
          />
        </div>
      </div>
    </Container>
  );
}

export default TcTemplateForm;
