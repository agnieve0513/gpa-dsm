import React,  {useState, useEffect} from 'react'
import { Container, Row, Col,Button, FormControl, InputGroup, Form } from 'react-bootstrap'
import { PDFViewer, Document, Text, Page, View, StyleSheet } from '@react-pdf/renderer';

import { useDispatch, useSelector } from 'react-redux'
import { uploadFile } from '../../actions/termsAndConditionActions'


function TcTemplateForm() {
    
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const dispatch = useDispatch()
    
    const uploadTermsAndCondition = useSelector(state => state.uploadTermsAndCondition)
    const {loading:fileLoading,error:fileError, success:fileSuccess} = uploadTermsAndCondition

    const handleUploadFile = () => {

        dispatch(uploadFile(selectedFile, "invoice", "1234343"))
    }

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const styles = StyleSheet.create({
        section: {  textAlign: 'justify', margin: 30, fontSize:12,lineHeight:2 }
      });
      

    return (
            <Container>
                <Row className="mb-3">
                    <Col md={4}>
                    <Form.Label>Terms & Condition For Residential</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Terms and Condition"
                            type="file"
                            onChange={(e)=>changeHandler(e)}
                            />
                            <Button variant="info" id="button-addon2" onClick={() => handleUploadFile()}>
                            View
                            </Button>
                        </InputGroup>
                </Col>
                    <Col md={4}>
                    <Form.Label>Terms & Condition For Commercial</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Terms and Condition"
                            type="file"
                            onChange={(e)=>changeHandler(e)}
                            />
                            <Button variant="info" id="button-addon2" onClick={() => handleUploadFile()}>
                            View
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Button>Upload File/s <i className="fa fa-upload"></i></Button>
                <PDFViewer width={"100%"} height={"900"} showToolbar={false}>
                    <Document>
                        <Page size="A4">
                            <View style={styles.section}> 
                                <Text fixed>
                                This will be the UI For Uploaded Pdf File
                                </Text>
                            </View>
                            
                        </Page>
                    </Document>
                </PDFViewer>
            </Container>
    )
}

export default TcTemplateForm
