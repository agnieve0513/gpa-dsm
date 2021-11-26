import React,  {useState, useEffect} from 'react'
import { Container, Row, Col,Button, FormControl, InputGroup, Form, Badge } from 'react-bootstrap'
import { PDFViewer, Document, Text, Page, View, StyleSheet } from '@react-pdf/renderer';

import { useDispatch, useSelector } from 'react-redux'
import { uploadFileAction, retrieveFileAction } from '../../actions/fileActions'


function TcTemplateForm() {
    
    const [selectedFile, setSelectedFile] = useState();
    const [customer_type, setCustomerType] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const dispatch = useDispatch()
    
    const uploadFile = useSelector((state) => state.uploadFile);
    const {
        loading: uploadLoading,
        error: uploadError,
        fileCode,
    } = uploadFile;

    const handleUploadFile = () => {

        dispatch(uploadFileAction(selectedFile, customer_type, "tnc_template"));
    }

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const styles = StyleSheet.create({
        section: {  textAlign: 'justify', margin: 30, fontSize:12,lineHeight:2 }
      });
      
      const handleRetrieveFile = (code) => {
    console.log(code);
    dispatch(retrieveFileAction(code));
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
                            onChange={(e)=>changeHandler(e)}
                            />
                            <Form.Select
                                value={customer_type}
                                onChange={(e)=> setCustomerType(e.target.value)}
                            >
                            <option defaultChecked hidden>Select Template Type</option>
                            <option value="residential_file">Residential</option>
                            <option value="commercial_file">Commercial</option>
                            </Form.Select>
                            <Button variant="info" id="button-addon2" onClick={() => handleUploadFile()}>
                            Upload
                            </Button>
                            
                        </InputGroup>
                        {
                            selectedFile?
                            <>
                            {
                                fileCode ?
                                <>
                                    {
                                        fileCode.length !== 0 ?
                                        <>
                                            {console.log(selectedFile)}
                                            <Badge bg={"success"}>File Uploaded</Badge> <br /> 
                                            Filename: {selectedFile.name} <br />
                                            File Type: {selectedFile.type} <br /><br /> 
                                        </>
                                        :<></>
                                    }
                                </>
                                :<></>
                            }
                            
                            </>:<></>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <p className="mb-4">Download Residential Template</p>
                        <p>Download Commercial Template</p>
                    </Col>

                    <Col md={4}>
                        <p><Button size={"sm"} variant={"success"} onClick={() =>
                                  handleRetrieveFile(
                                      fileCode
                                  )
                                }>Download</Button></p>
                        <p><Button size={"sm"} variant={"success"}>Download</Button></p>
                    </Col>
                    
                </Row>
            </Container>
    )
}

export default TcTemplateForm
