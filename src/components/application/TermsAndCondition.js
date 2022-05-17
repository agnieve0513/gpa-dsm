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

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const MySwal = withReactContent(Swal);

function TermsAndCondition(props) {

   const Toast = MySwal.mixin({
     toast: true,
     position: "center",
     showConfirmButton: false,
     timer: 3000,
     timerProgressBar: true,
   });

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

    Toast.fire({
      icon: "info",
      title: "Loading T&C",
      text: "Please wait while file is being fetched.",
    });

    window.scrollTo(0, 0);
    let template = "";
    console.log(props.customer_type);
    console.log(props.system_type);
    if (props.customer_type === "RESID" && props.system_type === "Washer") {
      template = "resd_dryer_washer";
    } 
     if (
      props.customer_type === "RESID" &&
      props.system_type === "Dryer"
    ) {
      template = "resd_dryer_washer";
    } 
     if (
      props.customer_type === "RESID" &&
      props.system_type === "Airconditioner-Central"
    ) {
      template = "resd_ducted";
    } 
     if (
      props.customer_type === "RESID" &&
      props.system_type === "Airconditioner-Split"
    ) {
      template = "resd_aircon_ductless";
    } 
     if (
      props.customer_type === "RESID" &&
      props.system_type === "Airconditioner-Window"
    ) {
      template = "resd_aircon_window";
    } 
     if (
       (props.customer_type === "E-COM-2" &&
         props.system_type === "Airconditioner-Split") ||
       (props.customer_type === "COMM" &&
         props.system_type === "Airconditioner-Split")
     ) {
       template = "comm_ductless";
     } 

     if (
       (props.customer_type === "E-COM-2" &&
         props.system_type === "Airconditioner-Central") ||
       (props.customer_type === "COMM" &&
         props.system_type === "Airconditioner-Central")
     ) {
       template = "comm_ducted";
     }

     if (
       (props.customer_type === "E-COM-2" &&
         props.system_type === "Airconditioner-Rooftop") ||
       (props.customer_type === "COMM" &&
         props.system_type === "Airconditioner-Rooftop")
     ) {
       template = "airconditioner_rooftop";
     }

     if (
       (props.customer_type === "E-COM-2" &&
         props.system_type === "Airconditioner-VRF") ||
       (props.customer_type === "COMM" &&
         props.system_type === "Airconditioner-VRF")
     ) {
       template = "airconditioner_vrf";
     }
     
    console.log(template);
    dispatch(retrievePDFAction(template));
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
