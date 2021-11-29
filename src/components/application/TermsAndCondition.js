import React, { useState, useEffect } from "react";
import { Row, Col, Form, Carousel } from "react-bootstrap";
import {
  Page,
  StyleSheet,
  View,
  Text,
  PDFViewer,
  Document,
} from "@react-pdf/renderer";
import { pdfjs } from "react-pdf";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { retrievePDFAction } from "../../actions/termsAndConditionActions";
import { blobToBase64 } from "../../helpers";
import DisplayPDF from "./Pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function TermsAndCondition(props) {
  const code =
    "eyJpdiI6InlcL3VHMXFOZ1BOam1hK2tJV0FsM0xRPT0iLCJ2YWx1ZSI6IlwvcjhLMGhyZ2tBckNGQzN1V0daOE5hTnZ4bFRHZWZRQ1V1MFI2N1I5M05ZPSIsIm1hYyI6ImVjM2U2YzAyY2U5YTZmYjJhNmU5YWRhZGI5NTk1MTBiOTIxY2E4ODBhOGViZGRjZWVmOWRmNjBiNzM1M2YwMjAifQ==";
  const dispatch = useDispatch();
  const retriveTermsAndCondition = useSelector(
    (state) => state.retriveTermsAndCondition
  );
  const pdfWrapperRef = React.useRef();
  const [date, setDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(retrievePDFAction(code));
  }, []);

  const styles = StyleSheet.create({
    section: { textAlign: "justify", margin: 30, fontSize: 12, lineHeight: 2 },
  });

  const handleAgreeBox = (e) => {
    if (e.target.checked) {
      props.setTermsAndAgreement(true);
    } else {
      props.setTermsAndAgreement(false);
    }
  };

  return (
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <h4 className="text-center text-info mb-3">Terms and Condition</h4>
        {/* <PDFViewer width={"100%"} height={"600"} showToolbar={false}>
          <Document>
            <Page size="LEGAL" style={styles.page}>
              <View style={styles.section}>
                <Text className="mb-2">Applicant Eligibility:</Text>
                <DisplayPDF data={retriveTermsAndCondition?.data} />
              </View>
              <DisplayPDF data={retriveTermsAndCondition?.data} />
            </Page>
          </Document>
        </PDFViewer> */}
        <div
          style={{
            backgroundColor: "#515759",
            overflow: "scroll",
            height: 1000,
            paddingTop: 50,
            paddingBottom: 50,
          }}
          ref={pdfWrapperRef}
        >
          <DisplayPDF
            wrapper={pdfWrapperRef}
            data={retriveTermsAndCondition?.data}
          />
        </div>
        <Row className="mt-3">
          <Col md={12}>
            <Form.Control
              type="date"
              onChange={setDate}
              onChange={(e) => setDate(e.target.value)}
              value={date}
              defaultValue={date}
              required
              className="mb-3"
              style={{ width: "450px" }}
            ></Form.Control>
            <Form.Check
              inline
              label="By checking this box, you agree to the terms and conditions"
              name="terms_and_agreement"
              type={"checkbox"}
              id={`inline-${"check"}-1`}
              checked={props.terms_and_agreement === true}
              onChange={(e) => handleAgreeBox(e)}
            />
          </Col>
        </Row>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
}

export default TermsAndCondition;
