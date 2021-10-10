import React from 'react'
import { Row, Col, Form, Container } from 'react-bootstrap'
import { PDFViewer,View, Document, Text, Page,StyleSheet  } from '@react-pdf/renderer';
import { Link } from 'react-router-dom'

function PrintApplication(props) {

    const styles = StyleSheet.create({
        section: {  textAlign: 'justify', margin: 30, fontSize:12,lineHeight:2 }
      });
      
    const handleAgreeBox = (e) => {
        if(e.target.checked)
        {
            props.setTermsAndAgreement(true)
        }
        else
        {
            props.setTermsAndAgreement(false)
        }
    }
   return (
            <Row>
                <Col md={2}></Col>
                <Col md={8}>
                    <h4 className="text-center text-info mb-3 mt-3">Print Application</h4>
                    <PDFViewer width={"100%"} height={"600"} showToolbar={true}>
                        <Document>
                            <Page size="LEGAL" style={styles.page}>
                            <View style={styles.section}>
                            <Text className="mb-2">
                                UI For Printing Application
                            </Text>
                           
                            </View>
                                
                            </Page>
                        </Document>
                    </PDFViewer>
                    <Container className="text-center mb-3">
                        <Link to={`/`} className ="btn btn-success btn-lg px-5"><h4>BACK TO GPA HOMEPAGE </h4></Link>
                    </Container>
                </Col>
                <Col md={2}></Col>
            </Row>
    )
}

export default PrintApplication
