import React, { Component } from 'react'
import ApplicationRequirements from './application_forms/ApplicationRequirements'
import ApplicationForm from './application_forms/ApplicationForm'
import NewEquipmentInfo from './application_forms/NewEquipmentInfo'
import OldEquipmentInfo from './application_forms/OldEquipmentInfo'
import EquipmentReview from './application_forms/EquipmentReview'
import SubmissionOfDocumentation from './application_forms/SubmissionOfDocumentation'
import FinalReview from './application_forms/FinalReview'
import TermsAndCondition from './application_forms/TermsAndCondition'
import Confirm from './application_forms/Confirm'

import Stepper from 'react-stepper-horizontal'

import Footer from './Footer'

export default class Form extends Component {

    state = {
        step: 0,
        gpa_electric_account_number:'',
        bill_id:'',
        firstname: '',
        lastname:'',
        middle_initial:'',
        service_location:'',
        city_village:'9',
        zip_code:'',
        email:'',
        telephone_number:'',
        gpa_account_holder: "",
        mailing_address:'',
        mailing_city_village:'',
        mailing_zip_code:'',
        mailing_home_zie:'',
        home_age:'',
        new_construction:'',
        home_type:'',

        system_type:'',
        manufacturer:'',
        model_number:'',
        quantity:'',
        btu:'',
        vendor:'',
        type:'',
        invoice:'',
        purchase_date:'',
        tons:'',
        rebate:'',
        install_date:'',

        technician_name:'',
        work_telephone:'',
        company_name:'',
        technician_certificate_number:'',
        date_final_installation:'',
        installer_email:'',

        old_system_type:'',
        old_btu:'',
        old_years:'',
        old_quantity:'',
        old_tons:'',
        old_equipment_condition:'',
        old_seer:'',
        old_disposal_party:'',
        old_agree_terms:'',
        old_date:'',

        agree_terms:''
        
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({step: step + 1});
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({step: step - 1});
    };

    inputChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    }

    render() {
        const { step } = this.state;
        const { 
                gpa_electric_account_number,
                bill_id,
                firstname,
                lastname,
                middle_initial,
                service_location,
                city_village,
                zip_code,
                email,
                telephone_number,
                gpa_account_holder,
                mailing_address,
                mailing_city_village,
                mailing_zip_code,
                mailing_home_zie,
                home_age,
                new_construction,
                home_type,
               
                system_type,
                manufacturer,
                model_number,
                quantity,
                btu,
                vendor,
                type,
                invoice,
                purchase_date,
                tons,
                rebate,
                install_date,
                
                technician_name,
                work_telephone,
                company_name,
                technician_certificate_number,
                date_final_installation,
                installer_email,
                
                old_system_type,
                old_btu,
                old_years,
                old_quantity,
                old_tons,
                old_equipment_condition,
                old_seer,
                old_disposal_party,
                old_agree_terms,
                old_date,

                agree_terms
                
            } = this.state;
        const values = { 
            gpa_electric_account_number,
            bill_id,
            firstname,
            lastname,
            middle_initial,
            service_location,
            city_village,
            zip_code,
            email,
            telephone_number,
            gpa_account_holder,
            mailing_address,
            mailing_city_village,
            mailing_zip_code,
            mailing_home_zie,
            home_age,
            new_construction,
            home_type,
            
            system_type,
            manufacturer,
            model_number,
            quantity,
            btu,
            vendor,
            type,
            invoice,
            purchase_date,
            tons,
            rebate,
            install_date,
            
            technician_name,
            work_telephone,
            company_name,
            technician_certificate_number,
            date_final_installation,
            installer_email,

            old_system_type,
            old_btu,
            old_years,
            old_quantity,
            old_tons,
            old_equipment_condition,
            old_seer,
            old_disposal_party,
            old_agree_terms,
            old_date,

            agree_terms
            
            };
        
        switch(step)
        {
            case 0:
                return (
                        <div className="container">
                            <Stepper steps={[
                                    {title: 'Application Requirement', icon: './file.svg'},
                                    {title: 'Applicant Information', icon: './user.svg'},
                                    {title: 'New Equipment Information', icon: './item.svg'},
                                    {title: 'Existing/Old Equipment Information', icon: './equipment.svg'},
                                    {title: 'Equipment Review', icon: './review.svg'},
                                    {title: 'Submission of Documentation', icon: './upload.svg'},
                                    {title: 'Final Review', icon: './final_review.svg'},
                                    {title: 'Terms & Conditions', icon: './term_condition.svg'},
                                ]} 
                                activeStep={ step } 
                                titleFontSize={12} activeColor={'#8BC53F'} size={65} circleFontSize={10}
                            />
                            <ApplicationRequirements 
                                nextStep={this.nextStep}
                                inputChange={this.inputChange}
                                values={values}
                            />
                            <Footer />
                        </div>
                );
            case 1:
                return (
                    <div className="container">
                        <Stepper steps={[
                                    {title: 'Application Requirement', icon: './file.svg'},
                                    {title: 'Applicant Information', icon: './user.svg'},
                                    {title: 'New Equipment Information', icon: './item.svg'},
                                    {title: 'Existing/Old Equipment Information', icon: './equipment.svg'},
                                    {title: 'Equipment Review', icon: './review.svg'},
                                    {title: 'Submission of Documentation', icon: './upload.svg'},
                                    {title: 'Final Review', icon: './final_review.svg'},
                                    {title: 'Terms & Conditions', icon: './term_condition.svg'},
                                ]} 
                                activeStep={ step } 
                                titleFontSize={12} activeColor={'#8BC53F'} completeColor={'#8BC53F'} size={65} circleFontSize={10}
                            />
                            <ApplicationForm 
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                inputChange={this.inputChange}
                                values={values}
                            />
                            <Footer />

                    </div >
                );
            case 2:
                return (
                    <div className="container">
                        <Stepper steps={[
                                    {title: 'Application Requirement', icon: './file.svg'},
                                    {title: 'Applicant Information', icon: './user.svg'},
                                    {title: 'New Equipment Information', icon: './item.svg'},
                                    {title: 'Existing/Old Equipment Information', icon: './equipment.svg'},
                                    {title: 'Equipment Review', icon: './review.svg'},
                                    {title: 'Submission of Documentation', icon: './upload.svg'},
                                    {title: 'Final Review', icon: './final_review.svg'},
                                    {title: 'Terms & Conditions', icon: './term_condition.svg'},
                                ]} 
                                activeStep={ step } 
                                titleFontSize={12} activeColor={'#8BC53F'} completeColor={'#8BC53F'} size={65} circleFontSize={10}
                            />
                            <NewEquipmentInfo 
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                inputChange={this.inputChange}
                                values={values}
                            />
                            <Footer />

                    </div >
                );
            case 3:
                 return (
                    <div className="container">
                        <Stepper steps={[
                                    {title: 'Application Requirement', icon: './file.svg'},
                                    {title: 'Applicant Information', icon: './user.svg'},
                                    {title: 'New Equipment Information', icon: './item.svg'},
                                    {title: 'Existing/Old Equipment Information', icon: './equipment.svg'},
                                    {title: 'Equipment Review', icon: './review.svg'},
                                    {title: 'Submission of Documentation', icon: './upload.svg'},
                                    {title: 'Final Review', icon: './final_review.svg'},
                                    {title: 'Terms & Conditions', icon: './term_condition.svg'},
                                ]} 
                                activeStep={ step } 
                                titleFontSize={12} activeColor={'#8BC53F'} completeColor={'#8BC53F'} size={65} circleFontSize={10}
                            />
                            <OldEquipmentInfo 
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                inputChange={this.inputChange}
                                values={values}
                            />
                            <Footer />

                    </div >
                );
            case 4:
                 return (
                    <div className="container">
                        <Stepper steps={[
                                    {title: 'Application Requirement', icon: './file.svg'},
                                    {title: 'Applicant Information', icon: './user.svg'},
                                    {title: 'New Equipment Information', icon: './item.svg'},
                                    {title: 'Existing/Old Equipment Information', icon: './equipment.svg'},
                                    {title: 'Equipment Review', icon: './review.svg'},
                                    {title: 'Submission of Documentation', icon: './upload.svg'},
                                    {title: 'Final Review', icon: './final_review.svg'},
                                    {title: 'Terms & Conditions', icon: './term_condition.svg'},
                                ]} 
                                activeStep={ step } 
                                titleFontSize={12} activeColor={'#8BC53F'} completeColor={'#8BC53F'} size={65} circleFontSize={10}
                            />
                            <EquipmentReview 
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                inputChange={this.inputChange}
                                values={values}
                            />
                            <Footer />
                    </div >
                );
            case 5:
                return (
                <div className="container">
                    <Stepper steps={[
                                {title: 'Application Requirement', icon: './file.svg'},
                                {title: 'Applicant Information', icon: './user.svg'},
                                {title: 'New Equipment Information', icon: './item.svg'},
                                {title: 'Existing/Old Equipment Information', icon: './equipment.svg'},
                                {title: 'Equipment Review', icon: './review.svg'},
                                {title: 'Submission of Documentation', icon: './upload.svg'},
                                {title: 'Final Review', icon: './final_review.svg'},
                                {title: 'Terms & Conditions', icon: './term_condition.svg'},
                            ]} 
                            activeStep={ step } 
                            titleFontSize={12} activeColor={'#8BC53F'} completeColor={'#8BC53F'} size={65} circleFontSize={10}
                        />
                        <SubmissionOfDocumentation 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            inputChange={this.inputChange}
                            values={values}
                        />
                            <Footer />

                </div >
            );
            case 6:
                return (
                <div className="container">
                    <Stepper steps={[
                                {title: 'Application Requirement', icon: './file.svg'},
                                {title: 'Applicant Information', icon: './user.svg'},
                                {title: 'New Equipment Information', icon: './item.svg'},
                                {title: 'Existing/Old Equipment Information', icon: './equipment.svg'},
                                {title: 'Equipment Review', icon: './review.svg'},
                                {title: 'Submission of Documentation', icon: './upload.svg'},
                                {title: 'Final Review', icon: './final_review.svg'},
                                {title: 'Terms & Conditions', icon: './term_condition.svg'},
                            ]} 
                            activeStep={ step } 
                            titleFontSize={12} activeColor={'#8BC53F'} completeColor={'#8BC53F'} size={65} circleFontSize={10}
                        />
                        <FinalReview 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            inputChange={this.inputChange}
                            values={values}
                        />
                            <Footer />

                </div >
            );
            case 7:
                return (
                    <div className="container">
                        <Stepper steps={[
                                    {title: 'Application Requirement', icon: './file.svg'},
                                    {title: 'Applicant Information', icon: './user.svg'},
                                    {title: 'New Equipment Information', icon: './item.svg'},
                                    {title: 'Existing/Old Equipment Information', icon: './equipment.svg'},
                                    {title: 'Equipment Review', icon: './review.svg'},
                                    {title: 'Submission of Documentation', icon: './upload.svg'},
                                    {title: 'Final Review', icon: './final_review.svg'},
                                    {title: 'Terms & Conditions', icon: './term_condition.svg'},
                                ]} 
                                activeStep={ step } 
                                titleFontSize={12} activeColor={'#8BC53F'} completeColor={'#8BC53F'} size={65} circleFontSize={10}
                            />
                        <TermsAndCondition 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            values={values}
                        />
                            <Footer />

                    </div>
                )
            case 8:
                return (
                    <div className="container">
                        <Confirm 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            values={values}
                        />
                            <Footer />

                    </div>
                )
            default:
                return(
                    "default"
                );
        }
    }
}
