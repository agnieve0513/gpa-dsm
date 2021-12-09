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
import black from "../components/fonts/Montserrat-Black.ttf";
import bold from "../components/fonts/Montserrat-Bold.ttf";
import regular from "../components/fonts/Montserrat-Regular.ttf";
import CustomerHeader from "../components/CustomerHeader";

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

// const EquipmentTable = (data) => {
//   console.log("data", data);
//   return (
//     <View style={[styles.tableContainer]}>
//       <View style={styles.tableHeader}>
//         <View style={[styles.tableRow]}>
//           <Text style={styles.tableText}>Type</Text>
//         </View>
//         <View style={[styles.tableRow, { flex: 2 }]}>
//           <Text style={styles.tableText}>Vendor</Text>
//         </View>
//         {/* <View style={[styles.tableRow]}>
//           <Text style={styles.tableText}>BTU</Text>
//         </View> */}
//         <View style={[styles.tableRow, { flex: 2 }]}>
//           <Text style={styles.tableText}>Manufacturer</Text>
//         </View>
//         <View style={[styles.tableRow]}>
//           <Text style={styles.tableText}>Invoice#</Text>
//         </View>
//         <View style={[styles.tableRow]}>
//           <Text style={styles.tableText}>Purchase Date</Text>
//         </View>
//       </View>
//       {data.data.map((value, index) => {
//         return (
//           <View key={index} style={styles.tableContent}>
//             <View style={[styles.tableRow]}>
//               <Text style={styles.tableValue}>
//                 {value.newEquip_System_type}
//               </Text>
//             </View>
//             <View style={[styles.tableRow, { flex: 2 }]}>
//               <Text style={styles.tableValue}>{value.newEquip_Vendor}</Text>
//             </View>
//             {/* <View style={[styles.tableRow]}>
//               <Text style={styles.tableValue}>{value.newEquip_Btu}</Text>
//             </View> */}
//             <View style={[styles.tableRow, { flex: 2 }]}>
//               <Text style={styles.tableValue}>
//                 {value.newEquip_Manufacturer}
//               </Text>
//             </View>
//             <View style={[styles.tableRow]}>
//               <Text style={styles.tableValue}>{value.newEquip_Invoice_no}</Text>
//             </View>
//             <View style={[styles.tableRow]}>
//               <Text style={styles.tableValue}>
//                 {value.newEquip_Purchase_date}
//               </Text>
//             </View>
//           </View>
//         );
//       })}
//       <View style={styles.tableContent}></View>
//     </View>
//   );
// };

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

const EquipmentTotalTable = (data) => {
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
      {data.data.map((value, index) => {
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
          <Text style={styles.tableValue}>$0.00</Text>
        </View>
      </View>
    </View>
  );
};

function PrintApplicationSummary() {
  const data = {
    Application_Id: 104,
    Control_Number: "2112-D-ED486",
    Status: "Processing",
    Stage: "Customer Service",
    Reason: "None",
    Type: "COMM",
    Application_Date: "2021-12-09 12:54:52",
    Last_Modified_On: "2021-12-09 12:54:52",
    Info_Account_no: "0570293350",
    Info_Bill_id: "51991",
    Info_Customer_name: "test faustino test",
    Info_Service_location: "test",
    Info_City_village: "15",
    Info_Zipcode: "96910",
    Info_Email: "agnieve70@gmail.com",
    Info_Tel_no: "1234123412",
    Info_Is_owner: "true",
    Info_Mailing_address: "test",
    Info_Mailing_city: "1231",
    Info_Mailing_zip: "234",
    Info_Home_size: "1234",
    Info_Home_age: "1234",
    Info_Home_type: "Other",
    Info_New_construction: "true",
    Old_equipment: [],
    Installer_New_name: "test",
    Installer_New_worktel: "1234214123",
    Installer_New_companyname: "123421",
    Installer_New_certno: null,
    Installer_New_finaldate: "2021-12-22",
    Installer_New_email: null,
    New_equipment: [
      {
        newEquip_System_type: "Central AC",
        newEquip_Vendor: "Agbayani",
        newEquip_Quantity: 1,
        newEquip_Btu: "36000",
        newEquip_Size: null,
        newEquip_Manufacturer: "Daikin AC",
        newEquip_Model_no: "1",
        newEquip_Invoice_no: "12234",
        newEquip_Purchase_date: "2021-12-09",
        newEquip_Type: null,
        newEquip_rebate: null,
        newEquip_Tons: null,
      },
      {
        newEquip_System_type: "Central AC",
        newEquip_Vendor: "Agbayani",
        newEquip_Quantity: 1,
        newEquip_Btu: "36000",
        newEquip_Size: null,
        newEquip_Manufacturer: "Daikin AC",
        newEquip_Model_no: "1",
        newEquip_Invoice_no: "12234",
        newEquip_Purchase_date: "2021-12-09",
        newEquip_Type: null,
        newEquip_rebate: null,
        newEquip_Tons: null,
      },
      {
        newEquip_System_type: "Central AC",
        newEquip_Vendor: "Agbayani",
        newEquip_Quantity: 1,
        newEquip_Btu: "36000",
        newEquip_Size: null,
        newEquip_Manufacturer: "Daikin AC",
        newEquip_Model_no: "1",
        newEquip_Invoice_no: "12234",
        newEquip_Purchase_date: "2021-12-09",
        newEquip_Type: null,
        newEquip_rebate: null,
        newEquip_Tons: null,
      },
    ],
    Submitted_docs: [
      {
        invoice:
          "eyJpdiI6IkVaQ1o1SGJMNitvb0l3aHJUNXVIa1E9PSIsInZhbHVlIjoiaGJ1N2FNM093Vys2NE9meWV2WnFNN2JcL0E0a2R6UFo3RXVkcUo5TDJRQ2M9IiwibWFjIjoiNWZhMzI0ZDljYjJiNmIxYjJjOGQyOGJmZWM4MmNkZmQwZTJiNjIyMWIwOWNjOTIxZTY5YTM2ODNhNGJiNTE4NiJ9",
        irs_form:
          "eyJpdiI6IkVaQ1o1SGJMNitvb0l3aHJUNXVIa1E9PSIsInZhbHVlIjoiaGJ1N2FNM093Vys2NE9meWV2WnFNN2JcL0E0a2R6UFo3RXVkcUo5TDJRQ2M9IiwibWFjIjoiNWZhMzI0ZDljYjJiNmIxYjJjOGQyOGJmZWM4MmNkZmQwZTJiNjIyMWIwOWNjOTIxZTY5YTM2ODNhNGJiNTE4NiJ9",
        disposal_slip: null,
        letter_authorization: null,
        installer_cert: null,
        other_doc2: null,
        other_doc3: null,
      },
    ],
  };

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
                  <EquipmentTotalTable data={data?.New_equipment} />
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
