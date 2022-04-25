import React, { useEffect, useState } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import {
  PDFDownloadLink,
  PDFViewer,
  View,
  Document,
  Text,
  Page,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import black from "../components/fonts/Montserrat-Black.ttf";
import bold from "../components/fonts/Montserrat-Bold.ttf";
import regular from "../components/fonts/Montserrat-Regular.ttf";
import CustomerHeader from "../components/CustomerHeader";
import StringCrypto from "string-crypto";
import { Link, useLocation } from "react-router-dom";
import { printDetailApplication } from "../actions/applicationActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import city_zipcode from "./city_zipcode";

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: black,
      fontWeight: 700,
    },
    {
      src: bold,
      fontWeight: 500,
    },
    {
      src: regular,
      fontWeight: 300,
    },
  ],
});

const styles = StyleSheet.create({
  section: {
    fontFamily: "Montserrat",
    textAlign: "justify",
    margin: 30,
    fontSize: 12,
    lineHeight: 2,
  },
  title: {
    fontWeight: 500,
    fontSize: 15,
    color: "#233E86",
    fontFamily: "Montserrat",
    marginTop: 10,
    marginLeft: 20,
  },
  title1: {
    fontWeight: 500,
    fontSize: 12,
    color: "#233E86",
    marginTop: 10,
    marginLeft: 20,
    fontFamily: "Montserrat",
  },
  text: {
    fontSize: 10,
    color: "#B6B6B6",
    fontWeight: 400,
    fontFamily: "Montserrat",
  },
  boldText: {
    fontSize: 11,
    fontWeight: 500,
    fontFamily: "Montserrat",
    textAlign: "right",
    marginLeft: "auto",
    ellipsizeMode: "tail",
  },
  tableText: {
    fontWeight: 500,
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: 12,
  },
  tableValue: {
    fontWeight: 300,
    fontFamily: "Montserrat",
    fontSize: 13,
  },
  tableRow: {
    borderWidth: 0.7,
    borderColor: "#C2C2C2",
    paddingHorizontal: 8,
    justifyContent: "center",
    paddingTop: 10,
    flex: 1.5,
  },
  tableContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  tableHeader: {
    height: 50,
    width: "100%",
    backgroundColor: "#233E86",
    flexDirection: "row",
  },
  tableContent: {
    height: 50,
    width: "99.99%",
    flexDirection: "row",
  },
  textContainer: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  boxContainer: { flex: 1, paddingHorizontal: 20, paddingVertical: 10 },
});

const EquipmentTable = ({ data, finalDate, index }) => {
  return (
    <>
      <Text style={styles.title1}>Equipment {index + 1}</Text>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={styles.boxContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>System Type: </Text>
            <Text style={styles.boldText}>
              {data?.newEquip_System_type || "N/A"}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Vendor: </Text>
            <Text style={styles.boldText}>
              {data?.newEquip_Vendor || "N/A"}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Quantity: </Text>
            <Text style={styles.boldText}>
              {data?.newEquip_Quantity || "N/A"}
            </Text>
          </View>

          {data.newEquip_Btu !== "N/A" ? (
            <View style={styles.textContainer}>
              <Text style={styles.text}>BTU: </Text>
              <Text style={styles.boldText}>{data?.newEquip_Btu || "N/A"}</Text>
            </View>
          ) : null}

          <View style={styles.textContainer}>
            <Text style={styles.text}>Manufacturer: </Text>
            <Text style={styles.boldText}>
              {data?.newEquip_Manufacturer || "N/A"}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.text}>Model Number: </Text>
              {data?.newEquip_Model_no?.length > 20 ? (
                <View style={{ marginLeft: "auto" }}>
                  <Text style={styles.boldText}>
                    {data?.newEquip_Model_no?.substring(0, 18) || "N/A"}
                  </Text>
                  <Text style={styles.boldText}>
                    {data?.newEquip_Model_no?.substring(18) || ""}
                  </Text>
                </View>
              ) : (
                <Text style={styles.boldText}>
                  {data?.newEquip_Model_no || "N/A"}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.boxContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Invioce#: </Text>
            <Text style={styles.boldText}>
              {data?.newEquip_Invoice_no || "N/A"}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Purchase Date: </Text>
            <Text style={styles.boldText}>
              {data?.newEquip_Purchase_date || "N/A"}
            </Text>
          </View>

          {data.newEquip_Type ? (
            <View style={styles.textContainer}>
              <Text style={styles.text}>Type: </Text>
              <Text style={styles.boldText}>
                {data?.newEquip_Type || "N/A"}
              </Text>
            </View>
          ) : null}

          {data.newEquip_Tons ? (
            <View style={styles.textContainer}>
              <Text style={styles.text}>Tons: </Text>
              <Text style={styles.boldText}>
                {data?.newEquip_Tons || "N/A"}
              </Text>
            </View>
          ) : null}

          <View style={styles.textContainer}>
            <Text style={styles.text}>Install Date: </Text>
            <Text style={styles.boldText}>{finalDate || "N/A"}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            height: 1.5,
            width: "100%",
            backgroundColor: "#C4C4C480",
          }}
        ></View>
      </View>
    </>
  );
};

const Line = () => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          height: 3,
          width: "100%",
          backgroundColor: "#C4C4C480",
        }}
      ></View>
    </View>
  );
};

const StatusIcon = ({ check }) => {
  return (
    <>
      {check ? (
        <Image
          src={require("../components/icons/check.png")}
          style={{ width: 13, height: 13, marginLeft: "auto" }}
          fixed={true}
        />
      ) : (
        <Image
          src={require("../components/icons/times.png")}
          style={{ width: 13, height: 13, marginLeft: "auto" }}
          fixed={true}
        />
      )}
    </>
  );
};

const template = {
  Application_Id: 0,
  Control_Number: "",
  Status: "",
  Stage: "",
  Delay_Reason: "",
  Delay_Reason2: "",
  Type: "",
  Application_Date: "",
  Last_Modified_On: "",
  Info_Account_no: "",
  Info_Bill_id: "",
  Info_Customer_name: "",
  Info_Service_location: "",
  Info_City_village: "",
  Info_Zipcode: "",
  Info_Email: "",
  Info_Tel_no: "",
  Info_Is_owner: "",
  Info_Mailing_address: "",
  Info_Mailing_city: "",
  Info_Mailing_zip: "",
  Info_Home_size: "",
  Info_Home_age: "",
  Info_Home_type: "",
  Info_New_construction: "",
  Old_equipment: [],
  Installer_New_name: "",
  Installer_New_worktel: "",
  Installer_New_companyname: "",
  Installer_New_certno: null,
  Installer_New_finaldate: "",
  Installer_New_email: null,
  New_equipment: [
    {
      newEquip_System_type: "",
      newEquip_Vendor: "",
      newEquip_Quantity: 0,
      newEquip_Btu: "",
      newEquip_Size: null,
      newEquip_Manufacturer: "",
      newEquip_Model_no: "",
      newEquip_Invoice_no: "",
      newEquip_Purchase_date: "",
      newEquip_Type: null,
      newEquip_rebate: null,
      newEquip_Tons: null,
    },
  ],
  Submitted_docs: [
    {
      invoice: null,
      irs_form: null,
      disposal_slip: null,
      letter_authorization: null,
      installer_cert: null,
      other_doc2: null,
      other_doc3: null,
    },
  ],
};

function PrintApplicationSummary(props) {
  const dispatch = useDispatch();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const { decryptString } = new StringCrypto();
  const applicationPrintDetail = useSelector(
    (state) => state.applicationPrintDetail
  );
  let query = useQuery();
  let creds = query.get("auth");
  const [data, setData] = useState(template);
  let totalRebate = 0;

  useEffect(() => {
    if (creds) {
      dispatch(
        printDetailApplication(decryptString(creds, "superSecureToken"))
      );
    } else {
      Swal.fire("ERROR", "Application doesn't exist.", "error").then(() => {
        props.history.push("/");
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (applicationPrintDetail?.application.length !== 0) {
      setData(applicationPrintDetail.application);
    }
  }, [applicationPrintDetail]);

  return (
    <>
      <CustomerHeader />
      <div>
        <Container>
          <h5
            style={{ marginBottom: 30 }}
            className="text-center text-info fs-3"
            id="trackTitle"
          >
            PRINT YOUR APPLICATION
          </h5>
          <PDFDownloadLink
            className="btn btn-info mb-2 btn-sm"
            document={
              <Document>
                <Page size="LEGAL">
                  <View
                    style={{
                      height: 50,
                      width: "100%",
                      backgroundColor: "#233E8B",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source="/icon.png"
                      style={{ width: 130, height: 35, marginLeft: 30 }}
                      fixed={true}
                    />
                  </View>
                  <Text style={styles.title}>Application Information</Text>
                  <View style={{ width: "100%", flexDirection: "row" }}>
                    <View style={styles.boxContainer}>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Control Number: </Text>
                        <Text style={styles.boldText}>
                          {data?.Control_Number || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          GPA Electric Account Number:{" "}
                        </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Account_no || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Bill ID: </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Bill_id || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Applicant Name: </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Customer_name || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Installation Address: </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Service_location || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>City: </Text>
                        <Text style={styles.boldText}>
                          {city_zipcode.find(
                            (p) => p._id === data?.Info_City_village
                          )
                            ? city_zipcode.find(
                                (p) => p._id === data?.Info_City_village
                              ).village
                            : "N/A" || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>ZIP: </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Zipcode || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Email: </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Email || "N/A"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.boxContainer}>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Telephone Number: </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Tel_no || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          Owner{" "}
                          {data?.Type === "RESID"
                            ? "Residential"
                            : "Commercial"}{" "}
                          Property:{" "}
                        </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Is_owner == 1 ? "YES" : "NO" || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Mailing Address: </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Mailing_address || "N/A"}
                        </Text>
                      </View>

                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Mailing Country: </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Mailing_city || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Mailing Zip Code: </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Mailing_zip || "N/A"}
                        </Text>
                      </View>

                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          {data?.Type == "RESID" ? "Home" : "Building"} Size
                          (approx. sq. ft.):{" "}
                        </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Home_size || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          {data?.Type == "RESID" ? "Home" : "Building"} Age
                          (approx. year bult):{" "}
                        </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Home_age || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>New Construction: </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_New_construction == "true"
                            ? "YES"
                            : "NO" || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          {data?.Type == "RESID" ? "Home" : "Building"} Type:{" "}
                        </Text>
                        <Text style={styles.boldText}>
                          {data?.Info_Home_type || "N/A"}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Line />
                  <Text style={styles.title}>Submission of Documentation</Text>
                  <View style={{ width: "100%", flexDirection: "row" }}>
                    <View style={styles.boxContainer}>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Invoice: </Text>
                        <StatusIcon check={data?.Submitted_docs[0]?.invoice} />
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>IRS-W9: </Text>
                        <StatusIcon check={data?.Submitted_docs[0]?.irs_form} />
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          Letter of Authorization:{" "}
                        </Text>
                        <StatusIcon
                          check={data?.Submitted_docs[0]?.letter_authorization}
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Disposal Slip: </Text>
                        <StatusIcon
                          check={data?.Submitted_docs[0]?.disposal_slip}
                        />
                      </View>
                    </View>
                    <View style={styles.boxContainer}>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          Supporting Documents 1: (Consideration Letter){" "}
                        </Text>
                        <StatusIcon
                          check={data?.Submitted_docs[0]?.installer_cert}
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          Supporting Documents 2:{" "}
                        </Text>
                        <StatusIcon
                          check={data?.Submitted_docs[0]?.other_doc2}
                        />
                      </View>
                    </View>
                  </View>
                  <Line />
                  <Text style={styles.title}>Installer Information</Text>
                  <View style={{ width: "100%", flexDirection: "row" }}>
                    <View style={styles.boxContainer}>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Technician Name: </Text>
                        <Text style={styles.boldText}>
                          {data?.Installer_New_name || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Work Telephone: </Text>
                        <Text style={styles.boldText}>
                          {data?.Installer_New_worktel || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Company: </Text>
                        <Text style={styles.boldText}>
                          {data?.Installer_New_companyname || "N/A"}
                        </Text>
                      </View>

                      {data.Delay_Reason === "None" ||
                      data.Delay_Reason === "N/A" ||
                      data.Delay_Reason === "" ? null : (
                        <View style={styles.textContainer}>
                          <Text style={styles.text}>
                            Delay For Date of Purchase{" "}
                          </Text>
                          <Text style={styles.boldText}>
                            {data?.Delay_Reason || "N/A"}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.boxContainer}>
                      {console.log(data)}
                      {data.New_equipment[0].newEquip_System_type === "Dryer" ||
                      data.New_equipment[0].newEquip_System_type === "Washer" ||
                      data.New_equipment[0].newEquip_System_type ===
                        "Window AC" ? null : (
                        <View style={styles.textContainer}>
                          <Text style={styles.text}>Certification No: </Text>
                          <Text style={styles.boldText}>
                            {data.Installer_New_certno || "N/A"}
                          </Text>
                        </View>
                      )}
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Email: </Text>
                        <Text style={styles.boldText}>
                          {data?.Installer_New_email || "N/A"}
                        </Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Date of Final: </Text>
                        <Text style={styles.boldText}>
                          {data?.Installer_New_finaldate || "N/A"}
                        </Text>
                      </View>

                      {data.Delay_Reason2 !== "None" ? (
                        <View style={styles.textContainer}>
                          <Text style={styles.text}>
                            Delay For Final Installation{" "}
                          </Text>
                          <Text style={styles.boldText}>
                            {data?.Delay_Reason2 || "N/A"}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>

                  <Line />
                  <Text style={styles.title}>New Equipment Information</Text>

                  {data?.New_equipment.map((value, index) => {
                    totalRebate = value?.newEquip_rebate + totalRebate;
                    return (
                      <EquipmentTable
                        key={index}
                        finalDate={data?.Installer_New_finaldate}
                        data={value}
                        index={index}
                      />
                    );
                  })}
                </Page>
              </Document>
            }
            fileName={`${data?.Control_Number}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>
          <PDFViewer width={"100%"} height={"600"} showToolbar={false}>
            <Document>
              <Page size="LEGAL">
                <View
                  style={{
                    height: 50,
                    width: "100%",
                    backgroundColor: "#233E8B",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source="/icon.png"
                    style={{ width: 130, height: 35, marginLeft: 30 }}
                    fixed={true}
                  />
                </View>
                <Text style={styles.title}>Application Information</Text>
                <View style={{ width: "100%", flexDirection: "row" }}>
                  <View style={styles.boxContainer}>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Control Number: </Text>
                      <Text style={styles.boldText}>
                        {data?.Control_Number || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>
                        GPA Electric Account Number:{" "}
                      </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Account_no || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Bill ID: </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Bill_id || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Applicant Name: </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Customer_name || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Installation Address: </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Service_location || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>City: </Text>
                      <Text style={styles.boldText}>
                        {city_zipcode.find(
                          (p) => p._id === data?.Info_City_village
                        )
                          ? city_zipcode.find(
                              (p) => p._id === data?.Info_City_village
                            ).village
                          : "N/A" || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>ZIP: </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Zipcode || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Email: </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Email || "N/A"}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.boxContainer}>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Telephone Number: </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Tel_no || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>
                        Owner{" "}
                        {data?.Type === "RESID" ? "Residential" : "Commercial"}{" "}
                        Property:{" "}
                      </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Is_owner == 1 ? "YES" : "NO" || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Mailing Address: </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Mailing_address || "N/A"}
                      </Text>
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Mailing Country: </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Mailing_city || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Mailing Zip Code: </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Mailing_zip || "N/A"}
                      </Text>
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.text}>
                        {data?.Type == "RESID" ? "Home" : "Building"} Size
                        (approx. sq. ft.):{" "}
                      </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Home_size || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>
                        {data?.Type == "RESID" ? "Home" : "Building"} Age
                        (approx. year bult):{" "}
                      </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Home_age || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>New Construction: </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_New_construction == "true"
                          ? "YES"
                          : "NO" || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>
                        {data?.Type == "RESID" ? "Home" : "Building"} Type:{" "}
                      </Text>
                      <Text style={styles.boldText}>
                        {data?.Info_Home_type || "N/A"}
                      </Text>
                    </View>
                  </View>
                </View>
                <Line />
                <Text style={styles.title}>Submission of Documentation</Text>
                <View style={{ width: "100%", flexDirection: "row" }}>
                  <View style={styles.boxContainer}>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Invoice: </Text>
                      <StatusIcon check={data?.Submitted_docs[0]?.invoice} />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>IRS-W9: </Text>
                      <StatusIcon check={data?.Submitted_docs[0]?.irs_form} />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Letter of Authorization: </Text>
                      <StatusIcon
                        check={data?.Submitted_docs[0]?.letter_authorization}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Disposal Slip: </Text>
                      <StatusIcon
                        check={data?.Submitted_docs[0]?.disposal_slip}
                      />
                    </View>
                  </View>
                  <View style={styles.boxContainer}>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>
                        Supporting Documents 1: (Consideration Letter):{" "}
                      </Text>
                      <StatusIcon
                        check={data?.Submitted_docs[0]?.installer_cert}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Supporting Documents 2: </Text>
                      <StatusIcon check={data?.Submitted_docs[0]?.other_doc2} />
                    </View>
                  </View>
                </View>
                <Line />
                <Text style={styles.title}>Installer Information</Text>
                <View style={{ width: "100%", flexDirection: "row" }}>
                  <View style={styles.boxContainer}>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Technician Name: </Text>
                      <Text style={styles.boldText}>
                        {data?.Installer_New_name || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Work Telephone: </Text>
                      <Text style={styles.boldText}>
                        {data?.Installer_New_worktel || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Company: </Text>
                      <Text style={styles.boldText}>
                        {data?.Installer_New_companyname || "N/A"}
                      </Text>
                    </View>

                    {data.Delay_Reason === "None" ||
                    data.Delay_Reason === "N/A" ||
                    data.Delay_Reason === "" ? null : (
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          Delay For Date of Purchase{" "}
                        </Text>
                        <Text style={styles.boldText}>
                          {data?.Delay_Reason || "N/A"}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.boxContainer}>
                    {console.log(data)}
                    {data.New_equipment[0].newEquip_System_type === "Dryer" ||
                    data.New_equipment[0].newEquip_System_type === "Washer" ||
                    data.New_equipment[0].newEquip_System_type ===
                      "Window AC" ? null : (
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>Certification No: </Text>
                        <Text style={styles.boldText}>
                          {data.Installer_New_certno || "N/A"}
                        </Text>
                      </View>
                    )}
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Email: </Text>
                      <Text style={styles.boldText}>
                        {data?.Installer_New_email || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>Date of Final: </Text>
                      <Text style={styles.boldText}>
                        {data?.Installer_New_finaldate || "N/A"}
                      </Text>
                    </View>

                    {data.Delay_Reason2 !== "None" ? (
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>
                          Delay For Final Installation{" "}
                        </Text>
                        <Text style={styles.boldText}>
                          {data?.Delay_Reason2 || "N/A"}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>

                <Line />
                <Text style={styles.title}>New Equipment Information</Text>

                {data?.New_equipment.map((value, index) => {
                  totalRebate = value?.newEquip_rebate + totalRebate;
                  return (
                    <EquipmentTable
                      key={index}
                      finalDate={data?.Installer_New_finaldate}
                      data={value}
                      index={index}
                    />
                  );
                })}
              </Page>
            </Document>
          </PDFViewer>
          <Link to={`/`} className="text-success px-5">
            <h4
              style={{ marginTop: 50 }}
              className="text-center fs-5"
              id="trackBackBtn"
            >
              Back to Homepage
            </h4>
          </Link>
          <Row>
            <br />
            <small
              className="text-secondary text-center"
              id="trackFooter"
              style={{ marginTop: 60 }}
            >
              Energy Sense Rebate Program <br />
              Copyright &copy; 2022 GPA Powered By Xtendly
            </small>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default PrintApplicationSummary;
