import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import system_type from './source_files/system_type'
import NewEquipmentInfoForm from './NewEquipmentInfoForm'

export default class NewEquipmentInfo extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };


    render() {
        const { values, inputChange } = this.props;
        return (
            <div className="container mt-4">
                <NewEquipmentInfoForm inputChange={inputChange}
                    values={values} />

                <hr className="mb-5" />

                <div className="row d-flex justify-content-center">
                    <div className="col-6 d-flex justify-content-end">
                        <button className ="btn btn-secondary btn-lg px-5" onClick={this.back}><h4>Back</h4></button>
                    </div>
                    <div className="col-6 d-flex justify-content-start">
                        <button className ="btn btn-success btn-lg px-5" onClick={this.continue}><h4>Continue</h4></button>
                    </div>
                </div>
            </div>
        )
    }
}
