import React from 'react';
import MaterialTable from "material-table";
import { Button, Container, Row, Col } from 'react-bootstrap';

function BatchPaymentForm() {

    const viewHandler = () => 
    {

    }

    const updateHandler = () => 
    {

    }

    return (
        <div>
           <Container>
            <MaterialTable 
                    columns={[
                        
                        { title: "Batch Number", field: "Batch_code"},
                        { title: "Batch Date", field: "Batch_code"},
                        { title: "System Type", field: "Batch_code"},
                        { title: "FERC/GL Account", field: "Batch_code"},
                        { title: "Approved by SPORD", field: "Batch_code"},
                        { title: "Approved by SUPERVISOR", field: "Batch_code"},
                        { title: "Total", field: "Batch_code"},
                        { title: "Stage", field: "Batch_code"},
                        { title: "Status", field: "Batch_code"},
                        
                        {
                            title: "Action",
                            field:"actions",
                            width:"10%",
                            editComponent: (props) =>{
                                return (
                                    <Button>Payts</Button>
                                )
                            },
                            render: (rowdata) => (
                                <>
                                <Button className="btn btn-sm btn-light" onClick={() => viewHandler(rowdata)}>View</Button>
                                <Button className="btn btn-sm btn-light" onClick={() => updateHandler(rowdata)}>Update Status</Button>
                                </>
                            )
                        },

                    ]}
                    data={[]}
                    title="Budget Profile"
                />
           </Container>
           <Container className="mt-4">
           <MaterialTable
                    columns={[
                        
                        { title: "Application No.", field: "Batch_code"},
                        { title: "Date Applied", field: "Batch_code"},
                        { title: "Stage", field: "Batch_code"},
                        { title: "Status", field: "Batch_code"},
                        { title: "System Type", field: "Batch_code"},
                        
                        {
                            title: "Action",
                            field:"actions",
                            width:"10%",
                            editComponent: (props) =>{
                                return (
                                    <Button>Payts</Button>
                                )
                            },
                            render: (rowdata) => (
                                <>
                                <Button className="btn btn-sm btn-light" onClick={() => viewHandler(rowdata)}>View</Button>
                                <Button className="btn btn-sm btn-light" onClick={() => updateHandler(rowdata)}>Update Status</Button>
                                </>
                            )
                        },

                    ]}
                    data={[]}
                    title="Batch View"
                />
           </Container>
        </div>
    )
}

export default BatchPaymentForm
