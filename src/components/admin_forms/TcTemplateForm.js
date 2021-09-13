import React, {useState} from 'react'
import { Container, Row, Col,Button, FormControl, InputGroup } from 'react-bootstrap'
import { PDFViewer, Document, Text, Page } from '@react-pdf/renderer';

function TcTemplateForm() {

    return (
            <Container>
                <Row>
                    <Col md={4}>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Terms and Condition"
                            type="file"
                            />
                            <Button variant="info" id="button-addon2">
                            Upload
                            </Button>
                        </InputGroup>
                </Col>
                    <Col md={8}></Col>
                </Row>
                <PDFViewer width={"100%"} height={"900"}>
                    <Document>
                        <Page size="A4">
                            <Text fixed>
                                ~ Created with react-pdf ~
                            </Text>
                            <Text >Don Quijote de la Mancha</Text>
                            <Text >Miguel de Cervantes</Text>
                            <Text >
                                En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
                                mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga
                                antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que
                                carnero, salpicón las más noches, duelos y quebrantos los sábados,
                                lentejas los viernes, algún palomino de añadidura los domingos,
                                consumían las tres partes de su hacienda. El resto della concluían sayo
                                de velarte, calzas de velludo para las fiestas con sus pantuflos de lo
                                mismo, los días de entre semana se honraba con su vellori de lo más
                                fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina
                                que no llegaba a los veinte, y un mozo de campo y plaza, que así
                                ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro
                                hidalgo con los cincuenta años, era de complexión recia, seco de carnes,
                                enjuto de rostro; gran madrugador y amigo de la caza. Quieren decir que
                                tenía el sobrenombre de Quijada o Quesada (que en esto hay alguna
                                diferencia en los autores que deste caso escriben), aunque por
                                conjeturas verosímiles se deja entender que se llama Quijana; pero esto
                                importa poco a nuestro cuento; basta que en la narración dél no se salga
                                un punto de la verdad
                            </Text>
                        </Page>
                    </Document>
                </PDFViewer>
            </Container>
    )
}

export default TcTemplateForm
