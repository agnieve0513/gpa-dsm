import React from "react";
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
import { Link } from "react-router-dom";
import black from "../fonts/Montserrat-Black.ttf";
import bold from "../fonts/Montserrat-Bold.ttf";
import regular from "../fonts/Montserrat-Regular.ttf";

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
  text: {
    fontSize: 13,
  },
  boldText: {
    fontSize: 13,
    fontWeight: 500,
  },
  tableText: {
    fontWeight: 500,
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: 13,
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
  },
});

function PrintApplication(props) {
  console.log("props", props);
  const {
    application_information,
    existing_old_equipment_information,
    new_equipment_information,
    submitted_documents,
  } = props.data.data;
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
        <h4 className="text-center text-info mb-3 mt-3">Print Application</h4>
        <PDFViewer width={"100%"} height={"600"} showToolbar={true}>
          <Document>
            <Page size="LEGAL">
              <View style={styles.section}>
                <Text style={styles.title}>Application Information</Text>
                <Text style={styles.text}>
                  GPA Electric Account Number:{" "}
                  <Text style={styles.boldText}>
                    {application_information?.account_no}
                  </Text>
                </Text>

                <Text style={styles.text}>
                  Bill ID:{" "}
                  <Text style={styles.boldText}>
                    {application_information?.bill_id}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Applicant Name:{" "}
                  <Text style={styles.boldText}>
                    {application_information?.customer_name}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Installation Address:{" "}
                  <Text style={styles.boldText}>
                    {application_information?.service_location}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  City:{" "}
                  <Text style={styles.boldText}>
                    {application_information?.city_village}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  ZIP:{" "}
                  <Text style={styles.boldText}>
                    {application_information?.zipcode}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Email:{" "}
                  <Text style={styles.boldText}>
                    {application_information?.email}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Telephone Number:{" "}
                  <Text style={styles.boldText}>
                    {application_information?.tel_no}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Owner Residential Property:{" "}
                  <Text style={styles.boldText}>
                    {application_information?.bill_id}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Mailing Address:{" "}
                  <Text style={styles.boldText}>
                    {application_information?.is_applicant_owner}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Home Size (approx. sq. ft.):{" "}
                  <Text style={styles.boldText}>
                    {application_information?.home_size}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Home Age (approx. year bult):{" "}
                  <Text style={styles.boldText}>
                    {application_information?.home_age}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  New Construction:{" "}
                  <Text style={styles.boldText}>
                    {application_information?.is_new_contruction}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Home Type:{" "}
                  <Text style={styles.boldText}>
                    {application_information?.home_type}
                  </Text>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>New Equipment Information</Text>
                <Text style={styles.text}>
                  System Type:{" "}
                  <Text style={styles.boldText}>
                    {new_equipment_information[0]?.system_type}
                  </Text>
                </Text>

                <Text style={styles.text}>
                  Vendor:{" "}
                  <Text style={styles.boldText}>
                    {new_equipment_information[0]?.vendor}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Quantity:{" "}
                  <Text style={styles.boldText}>
                    {new_equipment_information[0]?.quantity}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  BTU:{" "}
                  <Text style={styles.boldText}>
                    {new_equipment_information[0]?.btu}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Manufacturer:{" "}
                  <Text style={styles.boldText}>
                    {new_equipment_information[0]?.manufacturer}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Model:{" "}
                  <Text style={styles.boldText}>
                    {new_equipment_information[0]?.model_no}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Invoice#:{" "}
                  <Text style={styles.boldText}>
                    {new_equipment_information[0]?.manufacturer}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Purchase Date:{" "}
                  <Text style={styles.boldText}>
                    {new_equipment_information[0]?.purchase_date}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Type:{" "}
                  <Text style={styles.boldText}>
                    {new_equipment_information[0]?.type}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Tons:{" "}
                  <Text style={styles.boldText}>
                    {new_equipment_information[0]?.tons}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Install Date:{" "}
                  <Text style={styles.boldText}>
                    {
                      new_equipment_information[0]?.installer_information
                        ?.date_final_installation
                    }
                  </Text>
                </Text>
              </View>
            </Page>
            <Page size="LEGAL">
              <View style={styles.section}>
                <Text style={styles.title}>Installer Information</Text>
                <Text style={styles.text}>
                  Technician Name:{" "}
                  <Text style={styles.boldText}>
                    {
                      new_equipment_information[0]?.installer_information
                        ?.technician_name
                    }
                  </Text>
                </Text>

                <Text style={styles.text}>
                  Work Telephone:{" "}
                  <Text style={styles.boldText}>
                    {
                      new_equipment_information[0]?.installer_information
                        ?.work_tel
                    }
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Company:{" "}
                  <Text style={styles.boldText}>
                    {
                      new_equipment_information[0]?.installer_information
                        ?.company_name
                    }
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Technician AC:{" "}
                  <Text style={styles.boldText}>
                    {
                      new_equipment_information[0]?.installer_information
                        ?.technician_name
                    }
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Certification No:{" "}
                  <Text style={styles.boldText}>
                    {
                      new_equipment_information[0]?.installer_information
                        ?.technician_cert_no
                    }
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Email:{" "}
                  <Text style={styles.boldText}>
                    {new_equipment_information[0]?.installer_information?.email}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Date of Final:{" "}
                  <Text style={styles.boldText}>
                    {
                      new_equipment_information[0]?.installer_information
                        ?.date_final_installation
                    }
                  </Text>
                </Text>
              </View>
              <View
                style={[
                  {
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <View
                  style={{
                    marginBottom: "auto",
                  }}
                >
                  <View
                    style={{
                      height: 50,
                      width: 400,
                      backgroundColor: "#233E86",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={[
                        styles.tableRow,
                        {
                          flex: 2,
                        },
                      ]}
                    >
                      <Text style={styles.tableText}>Equipment No.</Text>
                    </View>
                    <View
                      style={[
                        styles.tableRow,
                        {
                          flex: 1,
                        },
                      ]}
                    >
                      <Text style={styles.tableText}>QTY</Text>
                    </View>
                    <View
                      style={[
                        styles.tableRow,
                        {
                          flex: 1,
                        },
                      ]}
                    >
                      <Text style={styles.tableText}>Rebate</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 50,
                      width: 400,
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={[
                        styles.tableRow,
                        {
                          flex: 2,
                        },
                      ]}
                    >
                      <Text style={styles.tableValue}>1</Text>
                    </View>
                    <View
                      style={[
                        styles.tableRow,
                        {
                          flex: 1,
                        },
                      ]}
                    >
                      <Text style={styles.tableValue}>
                        {new_equipment_information[0]?.quantity}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.tableRow,
                        {
                          flex: 1,
                        },
                      ]}
                    >
                      <Text style={styles.tableValue}></Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 50,
                      width: 400,
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={[
                        styles.tableRow,
                        {
                          flex: 2,
                        },
                      ]}
                    >
                      <Text style={[styles.tableValue, { marginLeft: "auto" }]}>
                        TOTAL
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.tableRow,
                        {
                          flex: 0.62,
                        },
                      ]}
                    >
                      <Text style={styles.tableValue}>$0.00</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>
                  Old/Existing Equipment Information
                </Text>
                <Text style={styles.text}>
                  System Type:{" "}
                  <Text style={styles.boldText}>
                    {existing_old_equipment_information[0]?.system_type}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  BTU:{" "}
                  <Text style={styles.boldText}>
                    {existing_old_equipment_information[0]?.btu}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Years:{" "}
                  <Text style={styles.boldText}>
                    {existing_old_equipment_information[0]?.years}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Quantity:{" "}
                  <Text style={styles.boldText}>
                    {existing_old_equipment_information[0]?.quantity}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Tons:{" "}
                  <Text style={styles.boldText}>
                    {existing_old_equipment_information[0]?.tons}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Equipment condition prior to removal:{" "}
                  <Text style={styles.boldText}>
                    {
                      existing_old_equipment_information[0]
                        ?.is_equipment_condition
                    }
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Seer:{" "}
                  <Text style={styles.boldText}>
                    {existing_old_equipment_information[0]?.seer}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Disposal Party:{" "}
                  <Text style={styles.boldText}>
                    {existing_old_equipment_information[0]?.disposal_party}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Date:{" "}
                  <Text style={styles.boldText}>
                    {existing_old_equipment_information[0]?.date}
                  </Text>
                </Text>
              </View>
              <View style={[styles.section, { marginTop: 0 }]}>
                <Text style={styles.title}>Submission of Documentation</Text>
                <Text style={styles.text}>
                  Invioce:{" "}
                  <Text style={styles.boldText}>
                    {submitted_documents?.invoice}
                  </Text>
                </Text>

                <Text style={styles.text}>
                  IRS-W9:{" "}
                  <Text style={styles.boldText}>
                    {submitted_documents?.irs_form}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Letter of Authorization:{" "}
                  <Text style={styles.boldText}>
                    {submitted_documents?.letter_authorization}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Disposal Slip:{" "}
                  <Text style={styles.boldText}>
                    {submitted_documents?.disposal_slip}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Other support documents 1:{" "}
                  <Text style={styles.boldText}>
                    {submitted_documents?.other_doc1}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Other support documents 2:{" "}
                  <Text style={styles.boldText}>
                    {submitted_documents?.other_doc2}
                  </Text>
                </Text>
                <Text style={styles.text}>
                  Other support documents 3:{" "}
                  <Text style={styles.boldText}>
                    {submitted_documents?.other_doc3}
                  </Text>
                </Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
        <Container className="text-center mb-3">
          <Link to={`/`} className="btn btn-success btn-lg px-5">
            <h4>BACK TO GPA HOMEPAGE </h4>
          </Link>
        </Container>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
}

export default PrintApplication;
