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
import { useWindowDimensions } from "../../hooks";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function TermsAndCondition(props) {
  console.log(props);
  const dispatch = useDispatch();
  const retriveTermsAndCondition = useSelector(
    (state) => state.retriveTermsAndCondition
  );
  const pdfWrapperRef = React.useRef();
  const { width, height } = useWindowDimensions();
  const temp = width <= 990 ? 95 : 100;
  const per = (width / 100) * temp;
  const [date, setDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(retrievePDFAction(props.customer_type === "COMM" ? "comm" : "resd"));
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
        {width >= 425 ? (
          <h4 className="text-center text-info mb-3">Terms and Condition</h4>
        ) : (
          <></>
        )}

        <div
          style={{
            backgroundColor: "#515759",
            overflow: "scroll",
            height: per,
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
              disabled={true}
              style={{ width: "100%" }}
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
