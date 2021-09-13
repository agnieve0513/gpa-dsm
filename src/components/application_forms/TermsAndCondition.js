import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
export default class TermsAndCondition extends Component {

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
                <h2 className="text-center text-info mb-5 text-info">TERMS & CONDITIONS</h2>
               
                    <h4 className="text-info">Applicant Eligibility</h4>
                    <p align='justify'>
                        1. Applicant must be the GPA Residential customer of record OR own
                        the residential property where the installation occurred for an active GPA Residential account.
                    </p>
                    <p align='justify'>
                         2. Applicant must have purchased the equipment. Only one rebate may be given per item.
                    </p>
                    <p align='justify'>
                         3. Rebates are valid for purchased equipment. Leased equipment will not qualify.
                    </p>
                    <p align='justify'>
                        4. All air conditioning (AC) new equipment meeting the eligibility
                        requirements of this application must be installed within 120 days after purchase. All equipment must be new and must be installed prior to the submission of the rebate application. Only Air-Conditioning, Heating, and Refrigeration Institute (AHRI)-certified or Energy Star-certified equipment meeting the program’s efficiency and tonnage requirements can qualify. Equipment must be installed by a licensed contractor with EPA Section 608 technician certification who regularly performs this type of work. Copy of the certification must be provided upon GPA request.
                    </p>
                    <p align='justify'>
                        5. Applicant is responsible for ensuring that equipment installed
                        for this program meets all applicable codes, standards and requirements.
                    </p>
                    <p align='justify'>
                         6. Applicant must submit a completed Rebate Application to GPA along
                         with a copy of proof of purchase (itemized sales receipt with date of purchase) and form W-9 within 120 days after installation.
                    </p>
                    <p align='justify'>
                        7. If Applicant has an existing/old AC in place at the installation
                        address provided, then the new equipment must replace the existing/old AC
                        and the existing/old equipment must be properly and legally disposed.
                        The existing/old AC equipment must not be reinstalled in GPA’s service
                        territory (which includes the entire island of Guam) or transferred to
                        any other party for installation in GPA’s service territory.
                    </p>
                    <p align='justify'>
                        8. If Applicant is disposing of existing/old equipment, Applicant
                        must submit with the completed Rebate Application a disposal receipt
                        from Guam Solid Waste Authority (GSWA) or from a professional recycling
                        company that is listed on the Guam Environmental Protection Agency (GEPA)
                        website. Curbside pickup must be pre-scheduled with GSWA in order for GSWA
                        to provide a work order as a disposal receipt. The disposal receipt must be
                        completed fully and show clearly the address of the recycling company where
                        the equipment was dropped off or customer pickup location, date of disposal,
                        description of equipment disposed, printed name of Applicant/ disposing party,
                        and, if recycled, the printed name and signature of an employee of the recycling
                        company (no employee signature required for GSWA receipts). It is the Applicant's
                        responsibility to ensure Applicant has received the necessary disposal receipt with
                        all required information
                    </p>

                     <h4 className="text-info">
                        Other Conditions:
                    </h4>
                    <p align='justify'>
                        1. GPA’s Rebate Program has been approved by the Guam Public Utilities Commission
                        and may be subject to change or modification, without prior notice at any time.
                    </p>
                    <p align='justify'>
                        2. Rebate payments will be in the form of checks and made out to the Applicant
                        named on the Rebate Application; sent to the Mailing Address provided.
                    </p>
                    <p align='justify'>
                        3. Should equipment for which a rebate was paid be removed (uninstalled) from
                        the address listed within 8 years after the rebate is paid, the Applicant will
                        notify GPA. The Applicant must also reimburse GPA for the rebate paid plus
                        associated legal and/or collection related costs and expenses, provided the
                        Applicant does not meet either of the following two exceptions. Exception
                        # 1: the Applicant is moving and transferring the equipment to another residence
                        within GPA's service territory (Applicant must provide GPA new customer account number
                        and new address within 60 days of removal). Exception #2: The AC equipment has failed 
                        and is inoperable (a GEPA listed recycler disposal receipt must be provided
                        to GPA within 60 days of removal).
                    </p>
                    <p align='justify'>
                        4. GPA reserves and the Applicant grants GPA the right to inspect the installation. Should the residential property not have the qualifying equipment installed, contrary to the information contained in the Application, the rebate must be repaid to GPA.
                    </p>
                    <p align='justify'>
                        5. GPA reserves the right to amend or discontinue this program without notice.
                    </p>
                    <p align='justify'>
                        6. Mail your completed Rebate Application, proof of purchase, and if Applicant
                        is disposing of existing/old equipment, your GEPA listed recycler disposal receipt to:
                        GPA Energy Sense Rebates P.O. Box 21868 Barrigada, Guam 96921 You may also drop off
                        your completed Rebate Application and supporting documentation at the GPA Main Office
                        (688 Route 15 Fadian, Mangilao) or our satellite offices at the Julale Shopping Center
                        (Suite 103, 424 West O’Brien Drive, Hagåtña) or Upper Tumon (578 North Marine Corp.
                        Drive, Tamuning). 7. Rebates will be processed within 60 days after receipt of a
                        completed Rebate Claim Application and supporting documentation. Incomplete applications
                        are subject to delay or denial.
                    </p>
                    <p align='justify'>
                        7. GPA does not warrant the performance of the equipment or that the equipment will
                        result in reduced usage or lower energy costs. The relative gains in efficiency
                        and reduction in energy usage depend on your existing equipment's efficiency,
                        specifics of your home, and the way you use the equipment. 9. GPA does not endorse
                        any particular business, manufacturer, product, or labor provider by offering this rebate.
                    </p>
                    <p align='justify'>
                        8. If you have questions, call (671) 647-5787, Email: energysense@gpagwa.com or visit: guampowerauthority.com.
                    </p>

                    <h4 className="text-info">Acceptance of Terms and Conditions:</h4>

                    <p align='justify'>
                        I hereby certify that I am the GPA electric account owner and/or the owner of
                        the residential property at which the service/installation occurred, that
                        I have purchased the equipment described on this Rebate Application, and
                        that it has been installed at the indicated installation address.
                        I have read the Terms and Conditions on the reverse side of this form
                        and acknowledge that GPA may verify the information provided.
                        I acknowledge a copy of the itemized sales receipt with the date
                        of purchase must accompany this form. If an Installer is not disposing
                        of the equipment, a disposal receipt must accompany this form.
                    </p>
                    
                    <Row>
                            <Col md={6}>
                                <div className="form-check form-group">
                                    <input type="checkbox" className="form-check-input"
                                    name="old_agree_terms"  />
                                    <label className="form-check-label">
                                        By checking this box, you agree to the terms and conditions for proper disposal.
                                    </label>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="form-group">
                                    <label className="control-label">DATE </label>
                                    <input type="date" className="form-control"name="date_final_installation" />
                                </div>
                            </Col>
                        </Row>

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
