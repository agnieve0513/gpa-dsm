import React, { useEffect, useState } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import {
  PDFViewer,
  View,
  Document,
  Text,
  Page,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import black from "../components/fonts/Montserrat-Black.ttf";
import bold from "../components/fonts/Montserrat-Bold.ttf";
import regular from "../components/fonts/Montserrat-Regular.ttf";
import CustomerHeader from "../components/CustomerHeader";
import StringCrypto from "string-crypto";
import { Link, useLocation } from "react-router-dom";
import { printDetailApplication } from "../actions/applicationActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

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
    fontSize: 20,
    color: "#233E86",
  },
  title1: {
    fontWeight: 500,
    fontSize: 15,
    color: "#233E86",
  },
  text: {
    fontSize: 13,
    width: 300,
    color: "#B6B6B6",
    fontWeight: 500,
  },
  boldText: {
    fontSize: 13,
    fontWeight: 500,
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
});

const EquipmentTable = ({ data, finalDate, index }) => {
  return (
    <>
      <>
        <Text style={styles.title1}>Equipment {index + 1}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>System Type: </Text>
          <Text style={styles.boldText}>{data?.newEquip_System_type}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Vendor: </Text>
          <Text style={styles.boldText}>{data?.newEquip_Vendor}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Quantity: </Text>
          <Text style={styles.boldText}>{data?.newEquip_Quantity}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>BTU: </Text>
          <Text style={styles.boldText}>{data?.newEquip_Btu}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Manufacturer: </Text>
          <Text style={styles.boldText}>{data?.newEquip_Manufacturer}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Model Number: </Text>
          <Text style={styles.boldText}>{data?.newEquip_Model_no}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Invioce#: </Text>
          <Text style={styles.boldText}>{data?.newEquip_Invoice_no}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Purchase Date: </Text>
          <Text style={styles.boldText}>{data?.newEquip_Purchase_date}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Type: </Text>
          <Text style={styles.boldText}>{data?.newEquip_Type}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Tons: </Text>
          <Text style={styles.boldText}>{data?.newEquip_Tons}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <Text style={styles.text}>Install Date: </Text>
          <Text style={styles.boldText}>{finalDate}</Text>
        </View>
      </>
    </>
  );
};

const EquipmentTotalTable = ({ totalRebate, data }) => {
  console.log("data", data);
  return (
    <View style={[styles.tableContainer]}>
      <View style={styles.tableHeader}>
        <View style={[styles.tableRow, { flex: 2, borderBottonWidth: 0 }]}>
          <Text style={styles.tableText}>Equipment No.</Text>
        </View>
        <View style={[styles.tableRow, { borderBottonWidth: 0 }]}>
          <Text style={styles.tableText}>QTY</Text>
        </View>
        <View style={[styles.tableRow, { flex: 2, borderBottonWidth: 0 }]}>
          <Text style={styles.tableText}>Rebate</Text>
        </View>
      </View>
      {data.map((value, index) => {
        return (
          <View key={index} style={styles.tableContent}>
            <View style={[styles.tableRow, { flex: 2 }]}>
              <Text style={styles.tableValue}>{index + 1}</Text>
            </View>
            <View style={[styles.tableRow]}>
              <Text style={styles.tableValue}>{value.newEquip_Quantity}</Text>
            </View>
            <View style={[styles.tableRow, { flex: 2 }]}>
              <Text style={styles.tableValue}>{value.newEquip_rebate}</Text>
            </View>
          </View>
        );
      })}
      <View style={[styles.tableContent]}>
        <View style={[styles.tableRow, { flex: 2, borderTopWidth: 0 }]}>
          <Text style={styles.tableValue}>TOTAL</Text>
        </View>
        <View style={[styles.tableRow, { flex: 1.09, borderTopWidth: 0 }]}>
          <Text style={styles.tableValue}>{totalRebate}</Text>
        </View>
      </View>
    </View>
  );
};

const template = {
  Application_Id: 0,
  Control_Number: "",
  Status: "",
  Stage: "",
  Reason: "",
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
          <PDFViewer width={"100%"} height={"600"} showToolbar={true}>
            <Document>
              <Page size="LEGAL">
                <View style={styles.section}>
                  <Text style={styles.title}>Application Information</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Control Number: </Text>
                    <Text style={styles.boldText}>{data?.Control_Number}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>
                      GPA Electric Account Number:{" "}
                    </Text>
                    <Text style={styles.boldText}>{data?.Info_Account_no}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Bill ID: </Text>
                    <Text style={styles.boldText}>{data?.Info_Bill_id}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Applicant Name: </Text>
                    <Text style={styles.boldText}>
                      {data?.Info_Customer_name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Installation Address: </Text>
                    <Text style={styles.boldText}>
                      {data?.Info_Service_location}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>City: </Text>
                    <Text style={styles.boldText}>
                      {data?.Info_City_village}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>ZIP: </Text>
                    <Text style={styles.boldText}>{data?.Info_Zipcode}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Email: </Text>
                    <Text style={styles.boldText}>{data?.Info_Email}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Telephone Number: </Text>
                    <Text style={styles.boldText}>{data?.Info_Tel_no}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>
                      Owner Residential Property:{" "}
                    </Text>
                    <Text style={styles.boldText}>{data?.Info_Is_owner}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Mailing Address: </Text>
                    <Text style={styles.boldText}>
                      {data?.Info_Mailing_address}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>
                      Home Size (approx. sq. ft.):{" "}
                    </Text>
                    <Text style={styles.boldText}>{data?.Info_Home_size}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>
                      Home Age (approx. year bult):{" "}
                    </Text>
                    <Text style={styles.boldText}>{data?.Info_Home_age}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>New Construction: </Text>
                    <Text style={styles.boldText}>
                      {data?.Info_New_construction}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Home Type: </Text>
                    <Text style={styles.boldText}>{data?.Info_Home_type}</Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>New Equipment Information</Text>
                  <EquipmentTable
                    finalDate={data?.Installer_New_finaldate}
                    data={data?.New_equipment[0]}
                    index={0}
                  />
                </View>
              </Page>
              {data?.New_equipment.length > 1 ? (
                <Page size="LEGAL">
                  <View style={styles.section}>
                    {data?.New_equipment.map((value, index) => {
                      totalRebate = value?.newEquip_rebate + totalRebate;
                      if (index !== 0) {
                        return (
                          <EquipmentTable
                            finalDate={data?.Installer_New_finaldate}
                            data={value}
                            index={index}
                          />
                        );
                      }
                    })}
                  </View>
                </Page>
              ) : (
                <></>
              )}
              <Page size="LEGAL">
                <View style={styles.section}>
                  <EquipmentTotalTable
                    totalRebate={totalRebate}
                    data={data?.New_equipment}
                  />
                  <Text style={styles.title}>Installer Information</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Technician Name: </Text>
                    <Text style={styles.boldText}>
                      {data?.Installer_New_name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Work Telephone: </Text>
                    <Text style={styles.boldText}>
                      {data?.Installer_New_worktel}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Company: </Text>
                    <Text style={styles.boldText}>
                      {data?.Installer_New_companyname}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Certification No: </Text>
                    <Text style={styles.boldText}>
                      {data?.Installer_New_certno}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Email: </Text>
                    <Text style={styles.boldText}>
                      {data?.Installer_New_email}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Date of Final: </Text>
                    <Text style={styles.boldText}>
                      {data?.Installer_New_finaldate}
                    </Text>
                  </View>
                </View>
                <View style={[styles.section, { marginTop: 0 }]}>
                  <Text style={styles.title}>Submission of Documentation</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Invioce: </Text>
                    {data?.Submitted_docs[0]?.invoice ? (
                      <Image
                        src={require("../components/icons/check.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    ) : (
                      <Image
                        src={require("../components/icons/times.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    )}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>IRS-W9: </Text>
                    {data?.Submitted_docs[0]?.irs_form ? (
                      <Image
                        src={require("../components/icons/check.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    ) : (
                      <Image
                        src={require("../components/icons/times.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    )}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Letter of Authorization: </Text>
                    {data?.Submitted_docs[0]?.letter_authorization ? (
                      <Image
                        src={require("../components/icons/check.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    ) : (
                      <Image
                        src={require("../components/icons/times.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    )}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Disposal Slip: </Text>
                    {data?.Submitted_docs[0]?.disposal_slip ? (
                      <Image
                        src={require("../components/icons/check.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    ) : (
                      <Image
                        src={require("../components/icons/times.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    )}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Other support documents 1: </Text>
                    {data?.Submitted_docs[0]?.other_doc1 ? (
                      <Image
                        src={require("../components/icons/check.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    ) : (
                      <Image
                        src={require("../components/icons/times.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    )}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Other support documents 2: </Text>
                    {data?.Submitted_docs[0]?.other_doc2 ? (
                      <Image
                        src={require("../components/icons/check.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    ) : (
                      <Image
                        src={require("../components/icons/times.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    )}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Other support documents 3: </Text>
                    {data?.Submitted_docs[0]?.other_doc3 ? (
                      <Image
                        src={require("../components/icons/check.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    ) : (
                      <Image
                        src={require("../components/icons/times.png")}
                        style={{ width: 15, height: 15 }}
                        fixed={true}
                      />
                    )}
                  </View>
                </View>
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
              Copyright &copy; 2020 GPA Powered By Xtendly
            </small>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default PrintApplicationSummary;
