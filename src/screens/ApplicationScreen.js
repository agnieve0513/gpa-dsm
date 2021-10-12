import React, {useState, useEffect} from 'react'

import { Button } from 'react-bootstrap';


import { generateControlNo, register} from '../actions/customerAction'

import { useDispatch, useSelector } from 'react-redux'

import Steps from '../components/application/Steps'
import ApplicationRequirements from '../components/application/ApplicationRequirements'
import ApplicationInformation from '../components/application/ApplicationInformation'
import NewEuipmentInformation from '../components/application/NewEuipmentInformation'
import ExistingEquipmentInformation from '../components/application/ExistingEquipmentInformation'
import EquipmentReview from '../components/application/EquipmentReview'
import SubmissionOfDocumentation from '../components/application/SubmissionOfDocumentation'
import FinalReview from '../components/application/FinalReview'
import TermsAndCondition from '../components/application/TermsAndCondition'
import Confirm from '../components/application/Confirm'


import CustomerHeader from '../components/CustomerHeader'
import Footer from '../components/Footer'

function ApplicationScreen() {

    const dispatch = useDispatch()

    const customerGenerateControlNo = useSelector(state => state.customerGenerateControlNo)
    const {customerNo} = customerGenerateControlNo

    // const customerRegister = useSelector(state => state.customerRegister)
    // const {loading:registerLoading,error:registerError, success:registerSuccess} = customerRegister

    // Application Information
    const [saved, setSaved] = useState(false)
    const [step, setStep] = useState(1)
    const [is_set_control_no, setIsSetControlNo] = useState(false)

    // For verification
    const [verify, setVerify] = useState(true)
    const [control_no, setControlNo] = useState('')

    const [account_no, setAccountNo] = useState("")
    const [bill_id, setBillId] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [middlename, setMiddlename] = useState("")
    const [service_location, setServiceLocation] = useState("")
    const [city_village, setCityVillage] = useState("")
    const [zipcode, setZipCode] = useState("")
    const [tel_no, setTelNo] = useState("")
    const [email, setEmail] = useState("")
    const [is_applicant_owner, setIsApplicantOwner] = useState(true)
    const [mailing_address, setMailingAddress] = useState("")
    const [mailing_city_village, setMailingCityVillage] = useState("")
    const [mailing_zipcode, setMailingZipCode] = useState("")
    const [home_size, setHomeSize] = useState("")
    const [home_age, setHomeAge] = useState("")
    const [home_type, setHomeType] = useState("")
    const [is_new_construction, setIsNewConstruction] = useState("")

    // New Equipment
        const [new_equipments, setNewEquipments] = useState([])

        // Installer Information
        const [technician_name, setTechnicianName] = useState("")
        const [work_tel, setWorkTel] = useState("")
        const [company_name, setCompanyName] = useState("")
        const [technician_cert_no, setTechnicianCertNo] = useState("")
        const [date_final_installation, setDateFinalInstallation] = useState("")
        const [tech_email, setTechEmail] = useState("")
        // Equipment
        const [manufacturers, setManufacturerList] = useState([])
        const [models, setModelList] = useState([])

        const [system_type, setSystemType] = useState("")
        const [vendor, setVendor] = useState("")
        const [quantity, setQuantity] = useState("")
        const [btu, setBtu] = useState("")
        const [size, setSize] = useState("")
        const [manufacturer, setManufacturer] = useState("")
        const [model_no, setModelNo] = useState("")
        const [invoice_no, setInvoiceNo] = useState("")
        const [purchase_date, setPurchaseDate] = useState("")
        const [type, setType] = useState("")
        const [tons, setTons] = useState("")
        const [rebate, setRebate] = useState("")

    // Old Equipment
    const [old_equipments, setOldEquipments] = useState([])
    const [no_existing, setNoExisting] = useState(false)

    const [old_system_type, setOldSystemType] = useState("")
    const [old_quantity, setOldQuantity] = useState("")
    const [old_btu, setOldBtu] = useState("")
    // const [old_size, setOldSize] = useState("")
    const [old_years, setOldYears] = useState("")
    const [old_tons, setOldTons] = useState("")
    const [is_equipment_condition, setIsEquipmentCondition] = useState("")
    const [seer, setSeer] = useState("")
    const [disposal_party, setDisposalParty] = useState("")
    const [date, setDate] = useState("")
    const [is_no_existing_to_replace, seIsNoExistingToReplace] = useState(false)
    const [agree_terms, setAgreeTerms] = useState("")

    // Submitted Documents
    const [invoice, setInvoice] = useState("")
    const [irs_form, setIrsForm] = useState("")
    const [disposal_slip, setDisposalSlip] = useState("")
    const [letter_authorization, setLetterAuthorization] = useState("")
    const [other_doc1, setOtherDoc1] = useState("")
    const [other_doc2, setOtherDoc2] = useState("")
    const [other_doc3, setOtherDoc3] = useState("")

    const [terms_and_agreement, setTermsAndAgreement] = useState(false)

    useEffect(() => {
        dispatch(generateControlNo())
    }, [dispatch])

    const handleSave = () => {
        if(!terms_and_agreement)
        {
            alert("Please Check the terms and agreement to proceed")
            setStep(step-1)
        }
        else
        {
            if(window.confirm('Are you sure you want to submit application?'))
            {
                const obj = {
                    "application_information": {
                        "control_no":control_no,
                        "account_no" : account_no,
                        "bill_id" : bill_id,
                        "customer_name" : firstname+" "+middlename+" "+lastname,
                        "service_location" : service_location,
                        "city_village" : city_village ,
                        "zipcode" : zipcode,
                        "email" : email,
                        "tel_no" : tel_no,
                        "is_applicant_owner" : is_applicant_owner,
                        "mailing_address" : mailing_address,
                        "mailing_city_village" : mailing_city_village,
                        "mailing_zipcode" : mailing_zipcode, 
                        "home_size" : home_size,
                        "home_age" : home_age,
                        "home_type" : home_type,
                        "is_new_construction" : is_new_construction
                        },
                        "new_equipment_information" : 
                        new_equipments,
                        "existing_old_equipment_information" : 
                        old_equipments,
                        "submitted_documents" : {
                            "control_no" : customerNo,
                            "invoice" : invoice,
                            "irs_form": irs_form,
                            "disposal_slip" : disposal_slip,
                            "letter_authorization" : letter_authorization,
                            "other_doc1" : other_doc1,
                            "other_doc2" : other_doc2,
                            "other_doc3" : other_doc3
                        }
                }
                if(control_no !== "")
                {
                    dispatch(register(obj))
                    setSaved(true)
                    alert("Saved!")
                }

            }else
            {
                setStep(step-1)
            }
        }
    }
    const handleNextClick = (currentStep) => {
        if(step <= 8 || step > 0)
        {
            setStep(currentStep+1)
            if(is_set_control_no === false)
            {
                dispatch(generateControlNo())
                setControlNo(customerNo)
                setIsSetControlNo(true)
            }
        }
    }

    const handleBackClick = (currentStep) =>{
        if(step > 1)
        {
            setStep(currentStep-1)
        }       

    }

    return (
        <div>
            <CustomerHeader />
            {
                saved ?
                    <Confirm 
                        control_no={control_no} setControlNo={setControlNo}
                    />
                :
                <>
                    <Steps currentStep={step} />
                    {
                        step === 1?
                            <ApplicationRequirements 
                                
                            />
                            : step === 2? <ApplicationInformation 
                                verify={verify} setVerify={setVerify} 
                                account_no={account_no} setAccountNo={setAccountNo} 
                                bill_id={bill_id} setBillId={setBillId} 
                                firstname={firstname} setFirstname={setFirstname}
                                lastname={lastname} setLastname={setLastname}
                                middlename={middlename} setMiddlename={setMiddlename}
                                service_location={service_location} setServiceLocation={setServiceLocation}
                                city_village={city_village} setCityVillage={setCityVillage}
                                zipcode={zipcode} setZipCode={setZipCode}
                                tel_no={tel_no} setTelNo={setTelNo}
                                email={email} setEmail={setEmail}
                                is_applicant_owner={is_applicant_owner} setIsApplicantOwner={setIsApplicantOwner}
                                mailing_address={mailing_address} setMailingAddress={setMailingAddress}
                                mailing_city_village={mailing_city_village} setMailingCityVillage={setMailingCityVillage}
                                mailing_zipcode={mailing_zipcode} setMailingZipCode={setMailingZipCode}
                                home_size={home_size} setHomeSize={setHomeSize}
                                home_age={home_age} setHomeAge={setHomeAge}
                                home_type={home_type} setHomeType={setHomeType}
                                is_new_construction={is_new_construction} setIsNewConstruction={setIsNewConstruction}
                            />
                            : step === 3? <NewEuipmentInformation 

                                control_no={control_no} setControlNo={setControlNo}
                                new_equipments={new_equipments} setNewEquipments={setNewEquipments}
                                system_type={system_type} setSystemType={setSystemType}
                                vendor={vendor} setVendor={setVendor}
                                quantity={quantity} setQuantity={setQuantity}
                                btu={btu} setBtu={setBtu}
                                size={size} setSize={setSize}
                                manufacturer={manufacturer} setManufacturer={setManufacturer}
                                model_no={model_no} setModelNo={setModelNo}
                                invoice_no={invoice_no} setInvoiceNo={setInvoiceNo}
                                purchase_date={purchase_date} setPurchaseDate={setPurchaseDate}
                                type={type} setType={setType}
                                tons={tons} setTons={setTons}
                                rebate={rebate} setRebate={setRebate}
                                manufacturers={manufacturers} setManufacturerList={setManufacturerList}
                                models={models} setModelList={setModelList}
                                seer={seer} setSeer={setSeer}

                                technician_name={technician_name} setTechnicianName={setTechnicianName}
                                work_tel={work_tel} setWorkTel={setWorkTel}
                                company_name={company_name} setCompanyName={setCompanyName}
                                technician_cert_no={technician_cert_no} setTechnicianCertNo={setTechnicianCertNo}
                                date_final_installation={date_final_installation} setDateFinalInstallation={setDateFinalInstallation}
                                tech_email={tech_email} setTechEmail={setTechEmail}
                            />
                            : step === 4? <ExistingEquipmentInformation 
                                control_no={control_no} setControlNo={setControlNo}
                                no_existing={no_existing} setNoExisting={setNoExisting}
                                old_equipments={old_equipments} setOldEquipments={setOldEquipments}
                                is_no_existing_to_replace={is_no_existing_to_replace} seIsNoExistingToReplace={seIsNoExistingToReplace}
                                old_system_type={old_system_type} setOldSystemType={setOldSystemType}
                                system_type={system_type} setSystemType={setSystemType}
                                old_years={old_years} setOldYears={setOldYears}
                                old_tons={old_tons} setOldTons={setOldTons}
                                is_equipment_condition={is_equipment_condition} setIsEquipmentCondition={setIsEquipmentCondition}
                                seer={seer} setSeer={setSeer}
                                disposal_party={disposal_party} setDisposalParty={setDisposalParty}
                                date={date} setDate={setDate}
                                old_btu={old_btu} setOldBtu={setOldBtu}
                                old_quantity={old_quantity} setOldQuantity={setOldQuantity}
                                agree_terms={agree_terms} setAgreeTerms={setAgreeTerms}
                            />
                            : step === 5? <EquipmentReview 

                                step={step} setStep={setStep}
                                old_equipments={old_equipments} setOldEquipments={setOldEquipments}
                                new_equipments={new_equipments} setNewEquipments={setNewEquipments}
                                account_no={account_no} setAccountNo={setAccountNo} 
                                bill_id={bill_id} setBillId={setBillId} 
                                firstname={firstname} setFirstname={setFirstname}
                                lastname={lastname} setLastname={setLastname}
                                middlename={middlename} setMiddlename={setMiddlename}
                                service_location={service_location} setServiceLocation={setServiceLocation}
                                city_village={city_village} setCityVillage={setCityVillage}
                                zipcode={zipcode} setZipCode={setZipCode}
                                tel_no={tel_no} setTelNo={setTelNo}
                                email={email} setEmail={setEmail}
                                is_applicant_owner={is_applicant_owner} setIsApplicantOwner={setIsApplicantOwner}
                                mailing_address={mailing_address} setMailingAddress={setMailingAddress}
                                mailing_city_village={mailing_city_village} setMailingCityVillage={setMailingCityVillage}
                                mailing_zipcode={mailing_zipcode} setMailingZipCode={setMailingZipCode}
                                home_size={home_size} setHomeSize={setHomeSize}
                                home_age={home_age} setHomeAge={setHomeAge}
                                home_type={home_type} setHomeType={setHomeType}
                                is_new_construction={is_new_construction} setIsNewConstruction={setIsNewConstruction}
                                
                            />
                            : step === 6? <SubmissionOfDocumentation
                                invoice={invoice} setInvoice={setInvoice}
                                irs_form={irs_form} setIrsForm={setIrsForm}
                                disposal_slip={disposal_slip} setDisposalSlip={setDisposalSlip}
                                letter_authorization={letter_authorization} setLetterAuthorization={setLetterAuthorization}
                                other_doc1={other_doc1} setOtherDoc1={setOtherDoc1}
                                other_doc2={other_doc2} setOtherDoc2={setOtherDoc2}
                                other_doc3={other_doc3} setOtherDoc3={setOtherDoc3}
                            />
                            : step === 7? <FinalReview 
                                invoice={invoice} setInvoice={setInvoice}
                                irs_form={irs_form} setIrsForm={setIrsForm}
                                disposal_slip={disposal_slip} setDisposalSlip={setDisposalSlip}
                                letter_authorization={letter_authorization} setLetterAuthorization={setLetterAuthorization}
                                other_doc1={other_doc1} setOtherDoc1={setOtherDoc1}
                                other_doc2={other_doc2} setOtherDoc2={setOtherDoc2}
                                other_doc3={other_doc3} setOtherDoc3={setOtherDoc3}

                                step={step} setStep={setStep}
                                old_equipments={old_equipments} setOldEquipments={setOldEquipments}
                                new_equipments={new_equipments} setNewEquipments={setNewEquipments}
                                account_no={account_no} setAccountNo={setAccountNo} 
                                bill_id={bill_id} setBillId={setBillId} 
                                firstname={firstname} setFirstname={setFirstname}
                                lastname={lastname} setLastname={setLastname}
                                middlename={middlename} setMiddlename={setMiddlename}
                                service_location={service_location} setServiceLocation={setServiceLocation}
                                city_village={city_village} setCityVillage={setCityVillage}
                                zipcode={zipcode} setZipCode={setZipCode}
                                tel_no={tel_no} setTelNo={setTelNo}
                                email={email} setEmail={setEmail}
                                is_applicant_owner={is_applicant_owner} setIsApplicantOwner={setIsApplicantOwner}
                                mailing_address={mailing_address} setMailingAddress={setMailingAddress}
                                mailing_city_village={mailing_city_village} setMailingCityVillage={setMailingCityVillage}
                                mailing_zipcode={mailing_zipcode} setMailingZipCode={setMailingZipCode}
                                home_size={home_size} setHomeSize={setHomeSize}
                                home_age={home_age} setHomeAge={setHomeAge}
                                home_type={home_type} setHomeType={setHomeType}
                                is_new_construction={is_new_construction} setIsNewConstruction={setIsNewConstruction}
                            />
                            : step === 8? <TermsAndCondition 
                                terms_and_agreement={terms_and_agreement} setTermsAndAgreement={setTermsAndAgreement}
                            />
                            : step === 9? <>{handleSave()}</>
                            :<></>
                    }
                    <div className="d-flex justify-content-center mt-5">
                        <Button onClick={()=> handleBackClick(step)} variant={"secondary"} className="px-5 me-2" size={"lg"}>BACK</Button>
                        <Button onClick={()=> handleNextClick(step)} disabled={step > 1? verify? false: true: ""} variant={"success"} size={"lg"} className="px-5">CONTINUE</Button>
                    </div>
                </>
            }
            
            <Footer />
        </div>
    )
}

export default ApplicationScreen
