import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Form,
  ListGroup,
  Modal,
  Tab,
  Badge,
  InputGroup,
  FormControl,
  Container,
  Button,
  Nav,
} from "react-bootstrap";
import StringCrypto from "string-crypto";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { useWindowDimensions } from "../../hooks";
import { formatAMPM } from "../../helpers";
import city_zipcode from "./city_zipcode";

import {
  detailApplication,
  commentsApplication,
  addCommentAction,
  logsApplication,
  updateApplication,
} from "../../actions/applicationActions";
import { retrieveFileAction } from "../../actions/fileActions";
import { uploadFileAction, updateFileAction } from "../../actions/fileActions";
import {
  editApplication,
  editEquipment,
} from "../../actions/applicationActions";
import {
  loadCustomerSystemType,
  loadCustomerEquipManufacturer,
  loadCustomerEquipModel,
  loadCustomerEquipmentDetail,
} from "../../actions/customerAction";
import ModalImage from "../ModalImage";

import "./ViewApp.css";

const MySwal = withReactContent(Swal);
const date = new Date(Date.now());
date.setDate(date.getDate());
const currentDate = moment(date).format("YYYY-MM-DD");

function ViewApp(props) {
  const Toast = MySwal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  let total_rebate = 0;
  let inv,
    irs,
    loa,
    disp,
    oth1,
    oth2 = "";
  const { encryptString } = new StringCrypto();
  const { height, width } = useWindowDimensions();
  let obj = JSON.parse(localStorage.getItem("userInfo"));
  let roleId = obj.message.original.roleId;

  const [reload, setReload] = useState(0);
  const [paintOne, setPaintOne] = useState(false);
  const [paintTwo, setPaintTwo] = useState(false);
  const [paintThree, setPaintThree] = useState(false);
  const [paintFour, setPaintFour] = useState(false);

  const [tabThree, setTabThree] = useState(true);
  const [tabFour, setTabFour] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [editOldModal, setShowEditOldModal] = useState(false);

  const [status, setStatus] = useState("");
  const [stage, setStage] = useState("");
  const [reason, setReason] = useState("");
  const [batch, setBatch] = useState("");
  const [comment, setComment] = useState("");
  const [swalInfo, setSwalInfo] = useState("");
  const [updateState, setUpdateState] = useState(0);
  const [submited, setSubmited] = useState(false);
  const [detailsToggle, setDetailsToggle] = useState(false);

  const [enable_edit, setEnableEdit] = useState(false);
  const [enable_equipment_edit, setEnableEquipmentEdit] = useState(false);
  const [customer_name, setCustomerName] = useState("");
  const [service_location, setServiceLocation] = useState("");
  const [city_village, setCityVillage] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [tel_no, setTelNo] = useState("");
  const [email, setEmail] = useState("");
  const [is_applicant_owner, setIsApplicantOwner] = useState(false);
  const [mailing_address, setMailingAddress] = useState("");
  const [mailing_city_village, setMailingCityVillage] = useState("");
  const [mailing_zipcode, setMailingZipCode] = useState("");
  const [home_size, setHomeSize] = useState("");
  const [home_age, setHomeAge] = useState("");
  const [home_type, setHomeType] = useState("");
  const [is_new_construction, setIsNewConstruction] = useState();

  const [enable_installer_edit, setEnableInstallerEdit] = useState(false);
  const [system_type, setSystemType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [btu, setBtu] = useState("");
  const [seer, setSeer] = useState("");
  const [vendor, setVendor] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model_no, setModelNo] = useState("");
  const [invoice_no, setInvoiceNo] = useState("");
  const [purchase_date, setPurchaseDate] = useState("");

  const [old_system_type, setOldSystemType] = useState("");
  const [old_years, setOldYears] = useState("");
  const [old_quantity, setOldQuantity] = useState("");
  const [old_tons, setOldTons] = useState("");
  const [old_btu, setOldBtu] = useState("");
  const [old_equipment_condition, setOldEquipmentCondition] = useState("");
  const [old_seer, setOldSeer] = useState("");
  const [old_disposal_party, setOldDisposalParty] = useState("");
  const [old_disposal_date, setOldDisposalDate] = useState("");

  const [installer_name, setInstallerName] = useState("");
  const [work_tel, setWorkTel] = useState("");
  const [company, setCompany] = useState("");
  const [cert_no, setCertNo] = useState("");
  const [installer_email, setInstallerEmail] = useState("");
  const [installer_final_date, setInstallerFinalDate] = useState("");
  const [delay_reason, setDelayReason] = useState("");
  const [delay_reason2, setDelayReason2] = useState("");

  const [invoice, setInvoice] = useState(null);
  const [irs_form, setIrsForm] = useState(null);
  const [disposal_slip, setDisposalSlip] = useState(null);
  const [letter_authorization, setLetterAuthorization] = useState(null);
  const [installer_cert, setInstallerCertification] = useState(null);
  const [other_doc1, setOtherDoc1] = useState(null);
  const [other_doc2, setOtherDoc2] = useState(null);
  const [modelId, setModelID] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [modelName, setModelName] = useState("");
  const [uploadCount, setUploadCount] = useState(0);

  const [modalData, setModalData] = useState({
    description: "",
    image_sample: "",
  });

  const [updateInfoReload, setUpdateInfoReload] = useState(0);
  const [selectedEquipmentIndex, setSelectedEquipmentIndex] = useState(0);
  const [selectedOldEquipmentIndex, setSelectedOldEquipmentIndex] = useState(0);

  const handleOnChange = (e, doc_type, control_no) => {
    Toast.fire({
      icon: "info",
      title: "Uploaded Successfully",
      text: "Please wait while the uploaded file is being fetched.",
    });
    console.log("FILE DETAILS: ", e.target.files[0].type);

    dispatch(
      uploadFileAction(e.target.files[0], doc_type, control_no, 0, true)
    ).then(() => {
      if (doc_type === "irs_form") {
        setIrsForm(e.target.files[0]);
      } else if (doc_type === "other_doc1") {
        setOtherDoc1(e.target.files[0]);
      } else if (doc_type === "other_doc2") {
        setOtherDoc2(e.target.files[0]);
      } else if (doc_type === "letter_authorization") {
        setLetterAuthorization(e.target.files[0]);
      } else if (doc_type === "invoice") {
        setInvoice(e.target.files[0]);
      } else if (doc_type === "installer_cert") {
        setInstallerCertification(e.target.files[0]);
      } else if (doc_type === "disposal_slip") {
        setDisposalSlip(e.target.files[0]);
      }

      setUploadCount(uploadCount + 1);
    });

    return;
  };
  const handleModalClose = () => {
    setShowModal(false);
    setShowEditModal(false);
    setShowEditOldModal(false);
  };

  const dispatch = useDispatch();

  const updateFile = useSelector((state) => state.updateFile);

  const applicationUpdate = useSelector((state) => state.applicationUpdate);
  const {
    error: updateError,
    loading: updateLoading,
    success: successUpdate,
  } = applicationUpdate;

  const addComment = useSelector((state) => state.addComment);
  const {
    error: commentError,
    loading: commentLoading,
    success: commentSucess,
  } = addComment;

  const retrieveFile = useSelector((state) => state.retrieveFile);
  const {
    error: retrieveError,
    loading: retrieveLoading,
    success: retrieveSuccess,
  } = retrieveFile;

  const batchAdd = useSelector((state) => state.batchAdd);
  const { success: addBatchSuccess } = batchAdd;

  const uploadFile = useSelector((state) => state.uploadFile);
  const { loading: uploadLoading, error: uploadError, fileCode } = uploadFile;

  const applicationEdit = useSelector((state) => state.applicationEdit);
  const { loading: editLoading, error: editError, edit_info } = applicationEdit;

  const equipmentEdit = useSelector((state) => state.equipmentEdit);
  const {
    loading: editEquipmentLoading,
    error: editEquipmentError,
    edit_equip,
  } = equipmentEdit;

  const applicationDetail = useSelector((state) => state.applicationDetail);
  const { loading, error, application } = applicationDetail;

  // const applicationDetail = useSelector((state) => state.applicationDetail);
  const applicationComments = useSelector((state) => state.applicationComments);
  const {
    loading: loadingComments,
    error: errorComments,
    comments,
  } = applicationComments;
  // const [application, setApplication] = useState();
  const applicationLogs = useSelector((state) => state.applicationLogs);
  const { loading: loadingLogs, error: errorLogs, logs } = applicationLogs;

  const customerSystemType = useSelector((state) => state.customerSystemType);
  const {
    loading: systemTypeLoading,
    error: systemTypeError,
    success: systemTypeSuccess,
    system_types,
  } = customerSystemType;

  const customerEquipManufacturer = useSelector(
    (state) => state.customerEquipManufacturer
  );
  const {
    loading: manufacturerLoading,
    error: manufacturerError,
    success: manufacturerSuccess,
    manufacturers,
  } = customerEquipManufacturer;

  const customerEquipModel = useSelector((state) => state.customerEquipModel);
  const {
    loading: modelLoading,
    error: modelError,
    success: modelSuccess,
    models,
  } = customerEquipModel;

  const customerEquipmentDetail = useSelector(
    (state) => state.customerEquipmentDetail
  );
  const {
    loading: equipDetailLoading,
    error: equipDetailError,
    success: equipDetailSuccess,
    equipment_detail,
  } = customerEquipmentDetail;

  useEffect(() => {
    dispatch(detailApplication(props.applicationId));
    dispatch(commentsApplication(props.applicationId));
    dispatch(logsApplication(props.applicationId));
  }, [reload, updateInfoReload, edit_equip, uploadCount]);

  const resetHandler = () => {
    props.setShow(false);
  };

  const reloadHandler = () => {
    Toast.fire({
      icon: "info",
      title: "Loading Data",
      text: "Please wait while the table is loading the data.",
    });
    setReload(reload + 1);
  };

  const handleDetailsToggle = () => {
    if (detailsToggle === false) {
      setDetailsToggle(true);
    } else {
      setDetailsToggle(false);
    }
  };

  const addCommentHandler = () => {
    dispatch(addCommentAction(props.applicationId, comment));

    const Toast = MySwal.mixin({
      toast: true,
      position: "bottom-right",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 3500,
      timerProgressBars: true,
    });

    Toast.fire({
      icon: "success",
      title: "Comment Sent",
      text: "",
    });

    setComment("");
    setReload(reload + 1);
  };

  const changeCommentHandler = (text) => {
    setComment(text);
  };

  const handleRetrieveFile = (code, filename) => {
    dispatch(retrieveFileAction(code, filename));
  };

  const handleNumericFields = (input, propVar) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (input.value === "" || re.test(input.value)) {
      props[propVar](input.value);
    }
  };

  const handleEditInfo = () => {
    const obj = {
      applicationId: props.applicationId,
      customerName: customer_name
        ? customer_name
        : application.Info_Customer_name,
      serviceLocation: service_location
        ? service_location
        : application.Info_Service_location,
      cityVillage: city_village ? city_village : application.Info_City_village,
      zipcode: zipcode ? zipcode : application.Info_Zipcode,
      email: email ? email : application.Info_Email,
      telNo: tel_no ? tel_no : application.Info_Tel_no,
      isApplicantOwner: is_applicant_owner
        ? is_applicant_owner
        : application.Info_Is_owner,
      mailingAddress: mailing_address
        ? mailing_address
        : application.Info_Mailing_address,
      mailingCity: mailing_city_village
        ? mailing_city_village
        : application.Info_Mailing_city,
      mailingZipcode: mailing_zipcode
        ? mailing_zipcode
        : application.Info_Mailing_zip,
      homeAge: home_age ? home_age : application.Info_Home_age,
      homeType: home_type ? home_type : application.Info_Home_type,
      isNewConstruction: is_new_construction
        ? is_new_construction
        : application.Info_New_construction,
      Delay_Reason: delay_reason ? delay_reason : application.Delay_Reason,
      Delay_Reason2: delay_reason2 ? delay_reason2 : application.Delay_Reason2,
    };

    dispatch(editApplication(obj));
    Swal.fire("Success", "Application has been updated!", "success");
    setUpdateInfoReload(updateInfoReload + 1);
  };

  const changeZipCode = (e) => {
    setCityVillage(e.target.value);
    const result = city_zipcode.find((p) => p._id === e.target.value);

    if (result) {
      setZipCode(result.zip_code);
    }
  };

  const changeSystemTypeHandler = (e) => {
    showRebateHandler();
    setVendor("");
    setSystemType(e);
    systemTypeVal = e;
    dispatch(loadCustomerEquipManufacturer(e));
  };

  const showRebateHandler = () => {
    if (system_type !== "Dryer" || system_type !== "Washer") {
      return <></>;
    } else {
      return <></>;
    }
  };

  const changeManufacturerHandler = (system_type, e) => {
    setManufacturer(e);
    dispatch(loadCustomerEquipModel(system_type, e));
  };
  const handleModelNo = (id) => {
    console.log("handleModelNo: ", id);
    if (id) {
      switch (id.model) {
        case "Indoor / Outdoor": {
          return id.indoor_model + " / " + id.outdoor_model;
        }
        case "Package": {
          return id.package_model;
        }
        case "Both": {
          return id.indoor_model + " / " + id.outdoor_model + " / " + id.model;
        }
        default: {
          return id.model;
        }
      }
    }
  };
  const changeModelHandler = (e, customer_type) => {
    setModelID(e);
    let selectedModel = models.find((model) => model.id === parseInt(e));
    console.log("First Load of Model: ", selectedModel);
    let selectedModelName = handleModelNo(selectedModel);
    console.log("Model Name", selectedModelName);
    setModelNumber(e);
    setModelName(selectedModelName);
    dispatch(loadCustomerEquipmentDetail(e, customer_type));
  };

  const handleEquipmentEdit = (
    index,
    equipment_id,
    system_type,
    manifacturer,
    model_no,
    type
  ) => {
    console.log("equipment index: ", index);

    dispatch(loadCustomerSystemType(type));

    setSelectedEquipmentIndex(index);
    console.log(application?.New_equipment[selectedEquipmentIndex]);
    setShowEditModal(true);

    changeSystemTypeHandler(system_type);
    changeManufacturerHandler(system_type, manifacturer);
    changeModelHandler(model_no, type);
    setEnableEquipmentEdit(true);
  };

  const handleEditOldEquipment = (equipment_id, indx) => {
    const obj = {
      existing_old_equipment_information: [
        {
          id: equipment_id,
          system_type: old_system_type
            ? old_system_type
            : application.Old_equipment[indx].oldEquip_System_type,
          btu: old_btu ? old_btu : application.Old_equipment[indx].oldEquip_Btu,
          size: 0,
          years: old_years
            ? old_years
            : application.Old_equipment[indx].oldEquip_Years,
          quantity: old_quantity
            ? old_quantity
            : application.Old_equipment[indx].oldEquip_Quantity,
          tons: old_tons
            ? old_tons
            : application.Old_equipment[indx].oldEquip_Tons,
          is_equipment_condition: old_equipment_condition
            ? old_equipment_condition
            : application.Old_equipment[indx].oldEquip_Conditon,
          seer: old_seer
            ? old_seer
            : application.Old_equipment[indx].oldEquip_Seer,
          disposal_party: old_disposal_party
            ? old_disposal_party
            : application.Old_equipment[indx].oldEquip_Disposal_party,
          date: old_disposal_date
            ? old_disposal_date
            : application.Old_equipment[indx].oldEquip_Disposal_date,
        },
      ],
    };
    dispatch(editEquipment(obj));
    Swal.fire("Success", "Installer's Info has been updated!", "success");
    setShowEditOldModal(false);
    setReload(reload + 1);
  };

  const editInstallerHandler = () => {
    const obj = {
      installer_information: {
        id: application.Installer_New_id,
        technician_name: installer_name
          ? installer_name
          : application.Installer_New_name,
        work_tel: work_tel ? work_tel : application.Installer_New_worktel,
        company_name: company ? company : application.Installer_New_companyname,
        technician_cert_no: cert_no
          ? cert_no
          : application.Installer_New_certno,
        date_final_installation: installer_final_date
          ? installer_final_date
          : application.Installer_New_finaldate,
        email: installer_email
          ? installer_email
          : application.Installer_New_email,
      },
    };
    dispatch(editEquipment(obj));
    if(delay_reason || delay_reason2)
    {
      handleEditInfo();
    }
    Swal.fire("Success", "Installer's Info has been updated!", "success");
    setEnableInstallerEdit(false);
    setReload(reload + 1);
  };
  const handleEditNewEquipment = (control_no, equipment_id, indx) => {
    var me = equipment_detail ? equipment_detail[0] : [];

    var modelName="";

    if (me.package_model) {
      modelName = me.package_model;
    }

    if (me.indoor_model !== " ") {
      modelName = me.indoor_model;
    }

    if (me.outdoor_model) {
      modelName = me.outdoor_model;
    }

    if (me.indoor_model && me.outdoor_model) {
      modelName = me.indoor_model + " / " + me.outdoor_model;
    }

    const obj = {
      new_equipment_information: [
        {
          
          id: equipment_id,
          system_type: system_type
            ? system_type
            : application.New_equipment[indx].newEquip_System_type,
          vendor: vendor
            ? vendor
            : application.New_equipment[indx].newEquip_Vendor,
          // quantity:quantity ? quantity : application.New_equipment[indx],
          btu: btu ? btu : application.New_equipment[indx].newEquip_Btu,
          // size:size ? size : application.New_equipment[indx] ,
          manufacturer: manufacturer
            ? manufacturer
            : application.New_equipment[indx].newEquip_Manufacturer,
          model_no: modelName
            ? modelName
            : application.New_equipment[indx].newEquip_Model_no,
          invoice_no: invoice_no
            ? invoice_no
            : application.New_equipment[indx].newEquip_Invoice_no,
          purchase_date: purchase_date
            ? purchase_date
            : application.New_equipment[indx].newEquip_Purchase_date,
          quantity: quantity
            ? quantity
            : application.New_equipment[indx].newEquip_Quantity,
          size: 0,
          type: "",
          tons: "",
          seer: equipment_detail ? equipment_detail[0]?.value1 : 0,
          rebate: equipment_detail ? equipment_detail[0]?.rebate : 0,
        },
      ],
       application_information: [
        {
            control_no: control_no,
          }
      ],
      // installer_information: {
      //   id: application.Installer_New_id,
      //   technician_name: installer_name
      //     ? installer_name
      //     : application.Installer_New_name,
      //   work_tel: work_tel ? work_tel : application.Installer_New_worktel,
      //   company_name: company ? company : application.Installer_New_companyname,
      //   technician_cert_no: cert_no
      //     ? cert_no
      //     : application.Installer_New_certno,
      //   date_final_installation: installer_final_date
      //     ? installer_final_date
      //     : application.Installer_New_finaldate,
      //   email: installer_email
      //     ? installer_email
      //     : application.Installer_New_email,
      // },
    };
    console.log("equipment_id: ", equipment_id);
    console.log("system_type: ", system_type);
    console.log("vendor: ", vendor);
    console.log("manufacturer: ", manufacturer);
    console.log("model_no: ", model_no);
    console.log("invoice_no: ", invoice_no);
    console.log("purchase_date: ", purchase_date);
    console.log("quantity: ", quantity);
    if (
      equipment_id === "" ||
      system_type === "" ||
      vendor === "" ||
      manufacturer === "" ||
      modelName === "" ||
      invoice_no === "" ||
      purchase_date === "" ||
      quantity === ""
    ) {
      Swal.fire("Edit Failed", "Please Fill out the required Forms", "error");
    } else {
      dispatch(editEquipment(obj));
      Swal.fire("Success", "Equipment has been updated!", "success");
      setShowEditModal(false);
      setReload(reload + 1);
    }
  };

  const changeStatusHandler = (status) => {
    setSubmited(false);
    setStatus(status);
    setShowModal(true);
  };

  const editOldEquipmentHandler = (indx, id, type) => {
    setSelectedOldEquipmentIndex(indx);
    setShowEditOldModal(true);
    dispatch(loadCustomerSystemType(type));
  };

  const updateStatus = (status, stage, desc) => {
    console.log("Status: ", desc);
    setStage(stage);
    setSubmited(true);
    if (status !== 3 || status !== "" || stage !== "") {
      setStatus(status);
      setStage(stage);

      Swal.fire({
        title: `Are you sure you want to ${desc}?`,
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        // denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            updateApplication(props.applicationId, status, stage, reason, batch)
          );
          props.setShow(false);
          setSubmited(false);
          Swal.fire("Success", "Application has been processed!", "success");
          setShowModal(false);
          props.setApplicationId(0);
          props.setReload(props.reload + 1);
        }
      });
    } else if (status === 3) {
      Swal.fire({
        title: "Are you sure you want to reject application?",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        // denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            updateApplication(props.applicationId, status, stage, reason)
          );
          props.setShow(false);
          setSubmited(false);
          Swal.fire("Success", "Application has been rejected!", "success");
          setShowModal(false);
        }
      });
    }
  };

  let seerVal = 0;
  let systemTypeVal = "";

  const errorFileInvalidMessage = () => {
    const Toast = MySwal.mixin({
      toast: true,
      position: "top-right",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 3500,
      timerProgressBars: true,
    });

    Toast.fire({
      icon: "info",
      title: "Invalid File Uploaded",
      text: "Please note that only Images (JPG, JPEG, PNG) and PDF files are accepted by the system.",
    });
  };

  return (
    <Container>
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="application_information"
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button className="mb-3 btn btn-light" onClick={() => resetHandler()}>
            <i className="fa fa-arrow-left"></i> Back to Application
          </Button>
          <Button
            className="mb-3 btn btn-success"
            onClick={() => reloadHandler()}
          >
            <i className="fa fa-refresh"></i> Reload Application
          </Button>
          <h4 style={{ marginLeft: "auto" }}>{application?.Control_Number}</h4>
        </div>

        <Row style={{ paddingLeft: 12 }}>
          <Col
            className="p-0"
            style={{ backgroundColor: "rgb(227, 227, 229)" }}
          >
            <div id="applicationFormNa">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link
                    eventKey="application_information"
                    className={paintOne ? "bg-info text-white" : ""}
                    onClick={() => {
                      setPaintOne(true);
                    }}
                  >
                    Applicant Information
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    className={paintTwo ? "bg-info text-white" : ""}
                    eventKey="new_quipment_info"
                    onClick={() => {
                      setTabThree(false);
                      setPaintTwo(true);
                      setPaintOne(true);
                    }}
                  >
                    New Equipment Information
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    eventKey="old_quipment_info"
                    disabled={tabThree}
                    className={paintThree ? "bg-info text-white" : ""}
                    onClick={() => {
                      setTabFour(false);
                      setPaintThree(true);
                    }}
                  >
                    Old/Existing Equipment Information
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="submission_of_documentation"
                    disabled={tabFour}
                    className={paintFour ? "bg-info text-white" : ""}
                    onClick={() => {
                      setPaintFour(true);
                    }}
                  >
                    Submitted Documents
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  style={{ marginLeft: "auto", width: 50, paddingTop: 10 }}
                  className="d-flex aligns-items-center justify-content-center editbtn"
                  onClick={() => handleDetailsToggle()}
                >
                  <i className="fa fa-edit"></i>
                </Nav.Item>
                <Nav.Item
                  style={{ width: 50, paddingTop: 10 }}
                  className="d-flex aligns-items-center justify-content-center editbtn"
                >
                  <Link
                    className="text-black"
                    to={`/printapplication?auth=${encryptString(
                      application ? application.Control_Number : "",
                      "superSecureToken"
                    )}`}
                    target="_blank"
                  >
                    <i className="fa fa-print"></i>
                  </Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={detailsToggle ? 9 : 12}>
            <Tab.Content>
              {/* NOTE: APPLICATION TAB */}
              <Tab.Pane eventKey="application_information">
                <h3 className="mt-3 mb-5 text-info">Applicant Info</h3>
                {application ? (
                  <ListGroup style={{ display: "flex", flexDirection: "row" }}>
                    {width > 770 ? (
                      <>
                        <div style={{ marginRight: 50 }}>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>Control Number</b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>
                              GPA Electric Account Number
                            </b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>Bill ID</b>
                          </p>
                          <p>
                            <b style={{ color: "#B6B6B6" }}>
                              GPA Account Holder's Name
                            </b>
                          </p>
                          {roleId === 10 ? null : (
                            <p style={{ marginBottom: "1.9rem" }}>
                              <b>Edit Information</b>
                            </p>
                          )}

                          <p
                            style={{
                              marginBottom: enable_edit ? "1.9rem" : "1rem",
                            }}
                          >
                            <b style={{ color: "#B6B6B6" }}>Applicant's Name</b>
                          </p>

                          <p
                            style={{
                              marginBottom: enable_edit ? "1.9rem" : "1rem",
                            }}
                          >
                            <b style={{ color: "#B6B6B6" }}>
                              Installation Address
                            </b>
                          </p>
                          <p
                            style={{
                              marginBottom: enable_edit ? "1.9rem" : "1rem",
                            }}
                          >
                            <b style={{ color: "#B6B6B6" }}>City</b>
                          </p>
                          <p
                            style={{
                              marginBottom: enable_edit ? "1.9rem" : "1rem",
                            }}
                          >
                            <b style={{ color: "#B6B6B6" }}>Zip</b>
                          </p>
                          <p
                            style={{
                              marginBottom: enable_edit ? "1.9rem" : "1rem",
                            }}
                          >
                            <b style={{ color: "#B6B6B6" }}>Email</b>
                          </p>
                          <p
                            style={{
                              marginBottom: enable_edit ? "2.9rem" : "1rem",
                            }}
                          >
                            <b style={{ color: "#B6B6B6" }}>Telephone Number</b>
                          </p>
                          <p
                            style={{
                              marginBottom: enable_edit ? "3.5rem" : "3.5rem",
                            }}
                          >
                            <b style={{ color: "#B6B6B6" }}>
                              Is Applicant the owner of the <br />
                              property?
                            </b>
                          </p>
                          <p
                            style={{
                              marginBottom: enable_edit ? "1.9rem" : "1rem",
                            }}
                          >
                            <b style={{ color: "#B6B6B6" }}>MAILING ADDRESS</b>
                          </p>
                          <p
                            style={{
                              marginBottom: enable_edit ? "1.9rem" : "1rem",
                            }}
                          >
                            <b style={{ color: "#B6B6B6" }}>CITY</b>
                          </p>
                          <p
                            style={{
                              marginBottom: enable_edit ? "1.9rem" : "1rem",
                            }}
                          >
                            <b style={{ color: "#B6B6B6" }}>ZIP</b>
                          </p>
                          <p
                            style={{
                              marginBottom: enable_edit ? "1.9rem" : "1rem",
                            }}
                          >
                            <b style={{ color: "#B6B6B6" }}>
                              {application
                                ? application.Type === "RESID"
                                  ? "HOME"
                                  : "BUILDING"
                                : ""}{" "}
                              AGE
                            </b>
                          </p>
                          <p
                            style={{
                              marginBottom: enable_edit ? "1.9rem" : "1rem",
                            }}
                          >
                            <b style={{ color: "#B6B6B6" }}>NEW CONSTRUCTION</b>
                          </p>
                          <p
                            style={{
                              marginBottom: enable_edit ? "1.9rem" : "1rem",
                            }}
                          >
                            <b style={{ color: "#B6B6B6" }}>
                              {application
                                ? application.Type === "RESID"
                                  ? "HOME"
                                  : "BUILDING"
                                : ""}{" "}
                              TYPE
                            </b>
                          </p>
                        </div>
                        <div>
                          <p>
                            <b>{application.Control_Number || "N/A"} </b>
                          </p>
                          <p>
                            <b>{application.Info_Account_no || "N/A"}</b>
                          </p>
                          <p>
                            <b>{application.Info_Bill_id || "N/A"}</b>
                          </p>
                          <p>
                            <b>{application.Account_Name || "N/A"}</b>
                          </p>
                          <p>
                            {roleId === 10 ? null : (
                              <>
                                {!enable_edit ? (
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => {
                                      setEnableEdit(true);
                                    }}
                                  >
                                    <i className="fa fa-edit"></i>
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => {
                                      setEnableEdit(false);
                                    }}
                                  >
                                    <i className="fa fa-times"></i>
                                  </Button>
                                )}
                              </>
                            )}
                          </p>
                          <Form>
                            <p>
                              {/* Customer Name */}
                              <InputGroup className="mb-3">
                                {enable_edit ? (
                                  <FormControl
                                    placeholder={application.Info_Customer_name}
                                    value={customer_name}
                                    onChange={(e) =>
                                      setCustomerName(e.target.value)
                                    }
                                  />
                                ) : (
                                  <b className="ms-2">
                                    {application.Info_Customer_name || "N/A"}
                                  </b>
                                )}
                              </InputGroup>
                            </p>
                            <p>
                              {/* Installation Address */}
                              <InputGroup className="mb-3">
                                {enable_edit ? (
                                  <FormControl
                                    placeholder={
                                      application.Info_Service_location
                                    }
                                    value={service_location}
                                    onChange={(e) =>
                                      setServiceLocation(e.target.value)
                                    }
                                  />
                                ) : (
                                  <b className="ms-2">
                                    {application.Info_Service_location || "N/A"}
                                  </b>
                                )}
                              </InputGroup>
                            </p>
                            <p>
                              <InputGroup className="mb-3">
                                {enable_edit ? (
                                  <Form.Select
                                    onChange={(e) => changeZipCode(e)}
                                    value={city_village}
                                  >
                                    <option selected hidden>
                                      {application.Info_City_village
                                        ? city_zipcode.find(
                                            (p) =>
                                              p._id ===
                                              application.Info_City_village
                                          )
                                          ? city_zipcode.find(
                                              (p) =>
                                                p._id ===
                                                application.Info_City_village
                                            ).village
                                          : "N/A"
                                        : "N/A" || "N/A"}
                                    </option>
                                    {city_zipcode.map((p) => (
                                      <option key={p._id} value={p._id}>
                                        {p.village}
                                      </option>
                                    ))}
                                  </Form.Select>
                                ) : (
                                  <b className="ms-2">
                                    {application.Info_City_village
                                      ? city_zipcode.find(
                                          (p) =>
                                            p._id ===
                                            application.Info_City_village
                                        )
                                        ? city_zipcode.find(
                                            (p) =>
                                              p._id ===
                                              application.Info_City_village
                                          ).village
                                        : "N/A"
                                      : "N/A" || "N/A"}
                                  </b>
                                )}
                              </InputGroup>
                            </p>
                            <p>
                              <InputGroup className="mb-3">
                                {enable_edit ? (
                                  <FormControl
                                    placeholder={application.Info_Zipcode}
                                    value={zipcode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                  />
                                ) : (
                                  <b className="ms-2">
                                    {application.Info_Zipcode || "N/A"}
                                  </b>
                                )}
                              </InputGroup>
                            </p>
                            <p>
                              <InputGroup className="mb-3">
                                {enable_edit ? (
                                  <Form.Control
                                    placeholder={application.Info_Email}
                                    value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                ) : (
                                  <b className="ms-2">
                                    {application.Info_Email || "N/A"}
                                  </b>
                                )}
                              </InputGroup>
                            </p>
                            <p>
                              <InputGroup className="mb-3">
                                {enable_edit ? (
                                  <Form.Control
                                    placeholder={application.Info_Tel_no}
                                    value={tel_no}
                                    maxLength="10"
                                    type="number"
                                    onChange={(e) => setTelNo(e.target.value)}
                                  />
                                ) : (
                                  <b className="ms-2">
                                    {application.Info_Tel_no || "N/A"}
                                  </b>
                                )}
                              </InputGroup>
                            </p>
                            <p className="mt-5 mb-5">
                              <InputGroup className="">
                                {enable_edit ? (
                                  <Form.Select
                                    value={is_applicant_owner}
                                    onChange={(e) =>
                                      setIsApplicantOwner(e.target.value)
                                    }
                                  >
                                    <option selected hidden>
                                      {application.Info_Is_owner == 1
                                        ? "YES"
                                        : "NO" || "N/A"}
                                    </option>
                                    <option value="0">NO</option>
                                    <option value="1">YES</option>
                                  </Form.Select>
                                ) : (
                                  <b className="ms-2">
                                    {application.Info_Is_owner == 1
                                      ? "YES"
                                      : "NO" || "N/A"}
                                  </b>
                                )}
                              </InputGroup>
                            </p>
                            <p>
                              <InputGroup className="mb-3">
                                {enable_edit ? (
                                  <FormControl
                                    placeholder={
                                      application.Info_Mailing_address
                                    }
                                    value={mailing_address}
                                    onChange={(e) =>
                                      setMailingAddress(e.target.value)
                                    }
                                  />
                                ) : (
                                  <b className="ms-2">
                                    {application.Info_Mailing_address || "N/A"}
                                  </b>
                                )}
                              </InputGroup>
                            </p>
                            <p>
                              <InputGroup className="mb-3">
                                {enable_edit ? (
                                  <FormControl
                                    placeholder={application.Info_Mailing_city}
                                    value={mailing_city_village}
                                    onChange={(e) =>
                                      setMailingCityVillage(e.target.value)
                                    }
                                  />
                                ) : (
                                  <b className="ms-2">
                                    {application.Info_Mailing_city || "N/A"}
                                  </b>
                                )}
                              </InputGroup>
                            </p>
                            <p>
                              <InputGroup className="mb-3">
                                {enable_edit ? (
                                  <FormControl
                                    placeholder={application.Info_Mailing_zip}
                                    value={mailing_zipcode}
                                    onChange={(e) =>
                                      setMailingZipCode(e.target.value)
                                    }
                                  />
                                ) : (
                                  <b className="ms-2">
                                    {application.Info_Mailing_zip || "N/A"}
                                  </b>
                                )}
                              </InputGroup>
                            </p>
                            <p>
                              <InputGroup className="mb-3">
                                {enable_edit ? (
                                  <FormControl
                                    placeholder={application.Info_Home_age}
                                    value={home_age}
                                    type="number"
                                    onChange={(e) => setHomeAge(e.target.value)}
                                  />
                                ) : (
                                  <b className="ms-2">
                                    {application.Info_Home_age || "N/A"}
                                  </b>
                                )}
                              </InputGroup>
                            </p>
                            <p>
                              <InputGroup className="mb-3">
                                {enable_edit ? (
                                  <Form.Select
                                    value={is_new_construction}
                                    onChange={(e) =>
                                      setIsNewConstruction(e.target.value)
                                    }
                                  >
                                    <option selected disabled hidden>
                                      {application.Info_New_construction ==
                                      "true"
                                        ? "YES"
                                        : "NO" || "N/A"}
                                    </option>
                                    <option value="true">YES</option>
                                    <option value="false">NO</option>
                                  </Form.Select>
                                ) : (
                                  <b className="ms-2">
                                    {application.Info_New_construction == "true"
                                      ? "YES"
                                      : "NO" || "N/A"}
                                  </b>
                                )}
                              </InputGroup>
                            </p>
                            <p>
                              <InputGroup className="mb-3">
                                {enable_edit ? (
                                  <Form.Select
                                    value={home_type}
                                    onChange={(e) =>
                                      setHomeType(e.target.value)
                                    }
                                  >
                                    <option selected disabled hidden>
                                      {application.Info_Home_type}
                                    </option>
                                    {application ? (
                                      application.Type === "RESID" ? (
                                        <>
                                          <option>Single Family</option>
                                          <option>Apartment</option>
                                          <option>Condo</option>
                                          <option>Mobile Home</option>
                                          <option>Other</option>
                                        </>
                                      ) : (
                                        <>
                                          <option value={"RETAIL"}>
                                            RETAIL
                                          </option>
                                          <option value={"OFFICE"}>
                                            OFFICE
                                          </option>
                                          <option value={"RELIGIOUS BUILDING"}>
                                            RELIGIOUS BUILDING
                                          </option>
                                          <option
                                            value={"FINANCIAL INSTITUTION"}
                                          >
                                            FINANCIAL INSTITUTION
                                          </option>
                                          <option value={"Other"}>Other</option>
                                        </>
                                      )
                                    ) : null}
                                  </Form.Select>
                                ) : (
                                  <b className="ms-2">
                                    {application.Info_Home_type || "N/A"}
                                  </b>
                                )}
                              </InputGroup>
                            </p>
                            {enable_edit ? (
                              <>
                                <Button
                                  variant="success"
                                  onClick={() => handleEditInfo()}
                                  className="me-2"
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    setEnableEdit(false);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : null}
                          </Form>
                        </div>
                      </>
                    ) : (
                      <div style={{ marginRight: 50 }}>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>
                            GPA Electric Account Number
                          </b>
                          <br />
                          <b>{application.Info_Account_no || "N/A"}</b>
                        </p>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>Bill ID</b>
                          <br />
                          <b>{application.Info_Bill_id || "N/A"}</b>
                        </p>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>Applicant's Name</b>
                          <br />
                          <b>{application.Info_Customer_name || "N/A"}</b>
                        </p>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>
                            Installation Address
                          </b>
                          <br />
                          <b>{application.Info_Mailing_address || "N/A"}</b>
                        </p>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>City</b>
                          <br />
                          <b>{application.Info_Mailing_city || "N/A"}</b>
                        </p>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>Zip</b>
                          <br />
                          <b>{application.Info_Mailing_zip || "N/A"}</b>
                        </p>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>Email</b>
                          <br />
                          <b>{application.Info_Email || "N/A"}</b>
                        </p>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>Telephone Number</b>
                          <br />
                          <b>{application.Info_Tel_no || "N/A"}</b>
                        </p>
                        <p className="mt-5 mb-5">
                          <b style={{ color: "#B6B6B6" }}>
                            Is Applicant the owner of the <br />
                            property?
                          </b>
                          <br />
                          <b>{application.Info_Is_owner || "N/A"}</b>
                        </p>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>MAILING ADDRESS</b>
                          <br />
                          <b>{application.Info_Mailing_address || "N/A"}</b>
                        </p>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>CITY</b>
                          <br />
                          <b>{application.Info_Mailing_city || "N/A"}</b>
                        </p>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>ZIP</b>
                          <br />
                          <b>{application.Info_Mailing_zip || "N/A"}</b>
                        </p>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>HOME AGE</b>
                          <br />
                          <b>{application.Info_Home_age || "N/A"}</b>
                        </p>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>NEW CONSTRUCTION</b>
                          <br />
                          <b>{application.Info_New_construction || "N/A"}</b>
                        </p>
                        <p>
                          <b style={{ color: "#B6B6B6" }}>HOME TYPE</b>
                          <br />
                          <b>{application.Info_Home_type || "N/A"}</b>
                        </p>
                      </div>
                    )}
                  </ListGroup>
                ) : (
                  <></>
                )}
              </Tab.Pane>

              {/* NOTE: NEW EQUIPMENT TAB */}
              <Tab.Pane eventKey="new_quipment_info">
                <h3 className="mt-3 mb-3 text-info">New Equipment Info</h3>
                {/* Modal for edit equipment . ..  */}
                <Modal show={showEditModal} onHide={handleModalClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit New Equipment</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="">
                    <Form.Group controlId="system_type" className="mb-1">
                      <Form.Label>
                        System Type:
                        <b>
                          {
                            application?.New_equipment[selectedEquipmentIndex]
                              .newEquip_System_type
                          }
                        </b>
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          changeSystemTypeHandler(e.target.value);
                        }}
                        value={system_type}
                      >
                        <option defaultValue hidden>
                          {systemTypeLoading
                            ? "LOADING SYSTEM TYPES..."
                            : "SELECT SYSTEM TYPE"}
                        </option>
                        {systemTypeLoading ? (
                          <p>Loading . . .</p>
                        ) : system_types ? (
                          system_types.map((sys_type) => (
                            <option value={sys_type.type}>
                              {sys_type.type}
                            </option>
                          ))
                        ) : null}
                        {/* {
                        application?.Type === "RESID" ? (
                          <>
                            <option value="Central AC">Central AC</option>
                            <option value="Split AC">Split AC</option>
                            <option value="Window AC">Window AC</option>
                            <option value="Washer">Washer</option>
                            <option value="Dryer">Dryer</option>
                          </>
                        ) : (
                          <>
                            <option value="Central AC">
                              Central AC - Commercial
                            </option>
                            <option value="Split AC">
                              Split AC - Commercial
                            </option>
                          </>
                        )
                        } */}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="manufacturer" className="mb-1">
                      <Form.Label>
                        Manufacturer:{" "}
                        <b>
                          {
                            application?.New_equipment[selectedEquipmentIndex]
                              .newEquip_Manufacturer
                          }
                        </b>
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          console.log("PAYTS: ", e.target.value);
                          changeManufacturerHandler(
                            system_type,
                            e.target.value
                          );
                        }}
                        value={manufacturer}
                      >
                        <option defaultValue hidden>
                          Select Manufacturer
                        </option>
                        {manufacturers ? (
                          manufacturers.map((ce) => (
                            <option
                              key={ce.Manufacturer}
                              value={ce.Manufacturer}
                            >
                              {ce.Manufacturer}
                            </option>
                          ))
                        ) : (
                          <option>Loading . . .</option>
                        )}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="model_no" className="mb-1">
                      <Form.Label>
                        Model No.:{" "}
                        <b>
                          {
                            application?.New_equipment[selectedEquipmentIndex]
                              .newEquip_Model_no
                          }
                        </b>
                      </Form.Label>
                      <Form.Select
                        value={modelNumber}
                        onChange={(e) =>
                          changeModelHandler(e.target.value, application.Type)
                        }
                      >
                        <option defaultValue hidden>
                          Select Model
                        </option>

                        {models ? (
                          models.map((me, indx) => {
                            if (me.package_model === null) {
                              return (
                                <option key={me.id + indx} value={me.id}>
                                  {" "}
                                  {me.indoor_model ? me.indoor_model : ""}
                                  {me.outdoor_model && me.indoor_model
                                    ? " / "
                                    : " "}
                                  {me.outdoor_model ? me.outdoor_model : ""}{" "}
                                </option>
                              );
                            } else {
                              return (
                                <option key={me.id + indx} value={me.id}>
                                  {me.package_model}
                                </option>
                              );
                            }
                          })
                        ) : (
                          <>
                            <option>Loading . . . </option>
                          </>
                        )}
                        {/* {models ? (
                          models.map((mod) => {
                            if (
                              system_type === "Dryer" ||
                              system_type === "Washer"
                            ) {
                              return (
                                <option key={mod.id} value={mod.id}>
                                  {mod.model}{" "}
                                </option>
                              );
                            } else if (mod.model === "Indoor / Outdoor") {
                              return (
                                <option key={mod.id} value={mod.id}>
                                  {mod.indoor_model} / {mod.outdoor_model}
                                </option>
                              );
                            } else if (mod.model === "Both") {
                              return (
                                <option key={mod.id} value={mod.id}>
                                  {mod.indoor_model} / {mod.outdoor_model}/{" "}
                                  {mod.package_model}
                                </option>
                              );
                            } else {
                              return (
                                <option key={mod.id} value={mod.id}>
                                  {mod.package_model}
                                </option>
                              );
                            }
                          })
                        ) : (
                          <></>
                        )} */}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="vendor" className="mb-1">
                      <Form.Label>
                        Vendor:{" "}
                        <b>
                          {
                            application?.New_equipment[selectedEquipmentIndex]
                              .newEquip_Vendor
                          }
                        </b>
                      </Form.Label>
                      <br />
                      <Form.Select
                        value={vendor}
                        onChange={(e) => setVendor(e.target.value)}
                      >
                        <option>Select Vendor</option>
                        {equipment_detail ? (
                          equipment_detail[0]?.vendor.map((val) => (
                            <option value={val}>{val}</option>
                          ))
                        ) : (
                          <option value={""}>Loading Vendor . . . </option>
                        )}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="invoice_no" className="mb-1">
                      <Form.Label>
                        Invoice No.:{" "}
                        <b>
                          {
                            application?.New_equipment[selectedEquipmentIndex]
                              .newEquip_Invoice_no
                          }
                        </b>
                      </Form.Label>
                      <FormControl
                        value={invoice_no}
                        onChange={(e) => setInvoiceNo(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="purchase_date" className="mb-2">
                      <Form.Label>
                        Purchase Date:{" "}
                        <b>
                          {
                            application?.New_equipment[selectedEquipmentIndex]
                              .newEquip_Purchase_date
                          }
                        </b>
                      </Form.Label>
                      <FormControl
                        value={purchase_date}
                        type="date"
                        max={currentDate}
                        onKeyDown={(e) => e.preventDefault()}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="purchase_date" className="mb-2">
                      <Form.Label>
                        Quantity:{" "}
                        <b>
                          {
                            application?.New_equipment[selectedEquipmentIndex]
                              .newEquip_Quantity
                          }
                        </b>
                      </Form.Label>
                      <FormControl
                        value={quantity}
                        type="number"
                        min="0"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="purchase_date" className="mb-2">
                      <Form.Label>
                        SEER:{" "}
                        <b>
                          {
                            application?.New_equipment[selectedEquipmentIndex]
                              .newEquip_Seer
                          }
                        </b>
                      </Form.Label>
                      <FormControl
                        value={
                          equipment_detail ? equipment_detail[0]?.value1 : 0
                        }
                        type="number"
                        min="0"
                        onChange={(e) => setSeer(e.target.value)}
                        disabled={true}
                      />
                    </Form.Group>
                    <Button
                      className="mt-2"
                      variant="success"
                      onClick={() =>
                        handleEditNewEquipment(
                          application.Control_Number,
                          application?.New_equipment[selectedEquipmentIndex]
                            .newEquip_id,
                          selectedEquipmentIndex
                        )
                      }
                    >
                      Update Information
                    </Button>
                  </Modal.Body>
                </Modal>
                <Row className="px-0">
                  <Col className="mb-2" md={12}>
                    <Table striped hover>
                      <thead className="bg-info text-white">
                        <tr>
                          <th>#</th>
                          <th>System Type</th>

                          <th>Vendor</th>
                          <th>Manu facturer</th>
                          <th>Model Number</th>
                          {application ? (
                            application.New_equipment[0]
                              .newEquip_System_type === "Dryer" ||
                            application.New_equipment[0]
                              .newEquip_System_type === "Washer" ? (
                              <th>CUBIC FEET</th>
                            ) : (
                              <>
                                <th>BTU</th>
                                <th>TONS</th>
                                <th>SEER</th>
                              </>
                            )
                          ) : null}
                          <th>Invoice</th>
                          <th>Purchase Date</th>
                          {roleId === 10 ? null : <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {application
                          ? application?.New_equipment?.length === 0
                            ? []
                            : application.New_equipment.map((equip, indx) => (
                                <tr>
                                  <td>{indx + 1}</td>
                                  <td>{equip.newEquip_System_type}</td>

                                  <td>{equip.newEquip_Vendor} </td>
                                  <td>{equip.newEquip_Manufacturer}</td>
                                  <td>{equip.newEquip_Model_no}</td>
                                  {equip.newEquip_System_type == "Washer" ||
                                  equip.newEquip_System_type == "Dryer" ? (
                                    <td>{equip.newEquip_Seer}</td>
                                  ) : (
                                    <>
                                      <td>
                                        {parseInt(
                                          parseFloat(equip.newEquip_Btu) * 12000
                                        )}
                                      </td>
                                      <td>{equip.newEquip_Btu}</td>
                                      <td>{equip.newEquip_Seer}</td>
                                    </>
                                  )}
                                  <td>{equip.newEquip_Invoice_no}</td>
                                  {/* <td>{equip.newEquip_Tons}</td> */}
                                  <td>{equip.newEquip_Purchase_date}</td>
                                  {roleId === 10 ? null : (
                                    <td>
                                      <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() =>
                                          handleEquipmentEdit(
                                            indx,
                                            equip.newEquip_id,
                                            equip.newEquip_System_type,
                                            equip.newEquip_Manufacturer,
                                            equip.newEquip_Model_no,
                                            application.Type
                                          )
                                        }
                                      >
                                        <i className="fa fa-edit"></i>
                                      </Button>
                                    </td>
                                  )}
                                </tr>
                              ))
                          : []}
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6}>
                    {application ? (
                      application?.New_equipment?.length >= 1 ? (
                        <>
                          <h3 className="mt-3 mb-3 text-info">
                            Installer Information{" "}
                            {roleId === 10 ? null : (
                              <Button
                                onClick={() => setEnableInstallerEdit(true)}
                                variant="success"
                                size="sm"
                              >
                                <i className="fa fa-edit"></i>
                              </Button>
                            )}
                          </h3>
                          <ListGroup
                            className="mb-3"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <div style={{ marginRight: 50 }}>
                              <p>
                                <b style={{ color: "#B6B6B6" }}>
                                  Technician Name
                                </b>
                              </p>
                              {enable_installer_edit ? <br /> : null}
                              <p>
                                <b style={{ color: "#B6B6B6" }}>
                                  Work Telephone
                                </b>
                              </p>
                              <p>
                                <b style={{ color: "#B6B6B6" }}>Company</b>
                              </p>
                              {enable_installer_edit ? <br /> : null}

                              {application.New_equipment[0]
                                .newEquip_System_type === "Washer" ||
                              application.New_equipment[0]
                                .newEquip_System_type === "Dryer" ||
                              application.New_equipment[0]
                                .newEquip_System_type ===
                                "Airconditioner-Window" ? null : (
                                <>
                                  <p>
                                    <b style={{ color: "#B6B6B6" }}>
                                      Certification No.
                                    </b>
                                  </p>
                                  {enable_installer_edit ? <br /> : null}
                                </>
                              )}

                              <p>
                                <b style={{ color: "#B6B6B6" }}>Email</b>
                              </p>
                              <p>
                                <b style={{ color: "#B6B6B6" }}>
                                  Date of Final Installation
                                </b>
                              </p>
                              {enable_installer_edit ? (
                                <>
                                  <br /> <br />{" "}
                                </>
                              ) : null}

                              {application.Delay_Reason ||
                              Math.abs(
                                new Date(application.Installer_New_finaldate) -
                                  new Date()
                              ) /
                                (1000 * 3600 * 24) >
                                120 ||
                              Math.abs(
                                new Date(installer_final_date) - new Date()
                              ) /
                                (1000 * 3600 * 24) >
                                120 ? (
                                <p>
                                  <b style={{ color: "#B6B6B6" }}>
                                    Delay For Date of Purchase
                                  </b>
                                </p>
                              ) : null}

                              {application.Delay_Reason2 ||
                              Math.abs(
                                new Date(application.Installer_New_finaldate) -
                                  new Date()
                              ) /
                                (1000 * 3600 * 24) >
                                120 ||
                              Math.abs(
                                new Date(installer_final_date) - new Date()
                              ) /
                                (1000 * 3600 * 24) >
                                120 ? (
                                <p>
                                  <b style={{ color: "#B6B6B6" }}>
                                    Delay For Final Installation
                                  </b>
                                </p>
                              ) : null}
                            </div>
                            <div>
                              <p>
                                {enable_installer_edit ? (
                                  <FormControl
                                    placeholder={application.Installer_New_name}
                                    value={installer_name}
                                    onChange={(e) =>
                                      setInstallerName(e.target.value)
                                    }
                                  />
                                ) : (
                                  <b>
                                    {application.Installer_New_name || "N/A"}
                                  </b>
                                )}
                              </p>
                              <p>
                                {enable_installer_edit ? (
                                  <FormControl
                                    placeholder={
                                      application.Installer_New_worktel
                                    }
                                    value={work_tel}
                                    onChange={(e) =>
                                      handleNumericFields(
                                        e.target,
                                        "setWorkTel"
                                      )
                                    }
                                    maxLength="10"
                                  />
                                ) : (
                                  <b>
                                    {application.Installer_New_worktel || "N/A"}
                                  </b>
                                )}
                              </p>
                              <p>
                                {enable_installer_edit ? (
                                  <FormControl
                                    placeholder={
                                      application.Installer_New_companyname ||
                                      "N/A"
                                    }
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                  />
                                ) : (
                                  <b>
                                    {application.Installer_New_companyname ||
                                      "N/A"}
                                  </b>
                                )}
                              </p>
                              <p>
                                {application.New_equipment[0]
                                  .newEquip_System_type === "Washer" ||
                                application.New_equipment[0]
                                  .newEquip_System_type === "Dryer" ||
                                application.New_equipment[0]
                                  .newEquip_System_type ===
                                  "Airconditioner-Window" ? null : (
                                  <>
                                    {enable_installer_edit ? (
                                      <FormControl
                                        placeholder={
                                          application.Installer_New_certno ||
                                          "N/A"
                                        }
                                        value={cert_no}
                                        onChange={(e) =>
                                          setCertNo(e.target.value)
                                        }
                                      />
                                    ) : (
                                      <b>
                                        {application.Installer_New_certno ||
                                          "N/A"}
                                      </b>
                                    )}
                                  </>
                                )}
                              </p>
                              <p>
                                {enable_installer_edit ? (
                                  <FormControl
                                    placeholder={
                                      application.Installer_New_email || "N/A"
                                    }
                                    value={installer_email}
                                    onChange={(e) =>
                                      setInstallerEmail(e.target.value)
                                    }
                                  />
                                ) : (
                                  <b>
                                    {application.Installer_New_email || "N/A"}
                                  </b>
                                )}
                              </p>
                              <p>
                                {enable_installer_edit ? (
                                  <>
                                    <FormControl
                                      value={installer_final_date}
                                      onChange={(e) =>
                                        setInstallerFinalDate(e.target.value)
                                      }
                                      max={currentDate}
                                      onKeyDown={(e) => e.preventDefault()}
                                      type="date"
                                    />
                                    <small className="text-muted">
                                      {application.Installer_New_finaldate}
                                    </small>
                                  </>
                                ) : (
                                  <b>
                                    {application.Installer_New_finaldate ||
                                      "N/A"}
                                  </b>
                                )}
                              </p>
                              <>
                                {/* installer_final_date */}
                                {console.log(
                                  "DATE REASON: ",
                                  Math.abs(
                                    new Date(installer_final_date) - new Date()
                                  )
                                )}
                                <p>
                                  {enable_installer_edit &&
                                  (application.Delay_Reason ||
                                    Math.abs(
                                      new Date(
                                        application.Installer_New_finaldate
                                      ) - new Date()
                                    ) /
                                      (1000 * 3600 * 24) >
                                      120 ||
                                    Math.abs(
                                      new Date(installer_final_date) -
                                        new Date()
                                    ) /
                                      (1000 * 3600 * 24) >
                                      120) ? (
                                    <>
                                      <FormControl
                                        value={delay_reason}
                                        onChange={(e) =>
                                          setDelayReason(e.target.value)
                                        }
                                        type="text"
                                        placeholder={application.Delay_Reason}
                                      />
                                    </>
                                  ) : (
                                    <b>{application?.Delay_Reason || null}</b>
                                  )}
                                </p>

                                <p>
                                  {enable_installer_edit &&
                                  (application.Delay_Reason2 ||
                                    Math.abs(
                                      new Date(
                                        application.Installer_New_finaldate
                                      ) - new Date()
                                    ) /
                                      (1000 * 3600 * 24) >
                                      120 ||
                                    Math.abs(
                                      new Date(installer_final_date) -
                                        new Date()
                                    ) /
                                      (1000 * 3600 * 24) >
                                      120) ? (
                                    <>
                                      <FormControl
                                        value={delay_reason2}
                                        onChange={(e) =>
                                          setDelayReason2(e.target.value)
                                        }
                                        type="text"
                                        placeholder={application.Delay_Reason2}
                                      />
                                    </>
                                  ) : (
                                    <b>{application?.Delay_Reason2 || null}</b>
                                  )}
                                </p>
                              </>

                              {enable_installer_edit ? (
                                <>
                                  <Button
                                    variant="success"
                                    className="me-2"
                                    onClick={() => editInstallerHandler()}
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    onClick={() => {
                                      setInstallerFinalDate(new Date());
                                      setEnableInstallerEdit(false);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </>
                              ) : null}
                            </div>
                          </ListGroup>
                        </>
                      ) : (
                        <>No Equipment</>
                      )
                    ) : (
                      <></>
                    )}
                  </Col>
                  <Col md={6} className="mt-3 d-flex justify-content-center">
                    <div
                      style={{
                        height: width <= 767 ? "100%" : "200px",
                        width: "100%",
                      }}
                    >
                      <Table
                        size="lg"
                        striped
                        bordered
                        hover
                        className="this-table"
                      >
                        <thead className="bg-info text-white">
                          <tr className="py-5">
                            <th className="p-3 text-center">QTY</th>
                            <th className="p-3 text-center">Rebate</th>
                            <th className="p-3 text-center">Partial Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {application?.New_equipment?.map((eq, id) => (
                            <tr key={eq.id + 1}>
                              <td className="p-3" align="right">
                                {eq.newEquip_Quantity}
                              </td>
                              <td className="p-3" align="right">
                                $ {!eq.newEquip_rebate ? 0 : eq.newEquip_rebate}
                              </td>
                              <td className="p-3" align="right">
                                ${" "}
                                {!eq.newEquip_rebate
                                  ? 0
                                  : parseInt(eq.newEquip_Quantity) *
                                    parseInt(eq.newEquip_rebate)}
                              </td>
                              <td hidden>
                                {
                                  (total_rebate +=
                                    parseInt(eq.newEquip_Quantity) *
                                    parseInt(eq.newEquip_rebate))
                                }
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td className="p-3 text-center" colSpan="2">
                              TOTAL
                            </td>
                            <td className="p-3" align="right">
                              ${!total_rebate ? "0.00" : total_rebate}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>

              {/* NOTE: OLD EQUIPMENT TAB */}
              <Tab.Pane eventKey="old_quipment_info">
                <Modal show={editOldModal} onHide={handleModalClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Old Equipment</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="">
                    <Form.Group controlId="system_type" className="mb-1">
                      <Form.Label>
                        System Type:
                        <b>
                          {application?.Old_equipment.length >= 1
                            ? application.Old_equipment[
                                selectedOldEquipmentIndex
                              ]?.oldEquip_System_type
                            : null}
                        </b>
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => setOldSystemType(e.target.value)}
                        value={old_system_type}
                      >
                        <option defaultValue hidden>
                          {systemTypeLoading
                            ? "LOADING SYSTEM TYPES..."
                            : "SELECT SYSTEM TYPE"}
                        </option>
                        {systemTypeLoading ? (
                          <p>Loading . . .</p>
                        ) : system_types ? (
                          system_types.map((sys_type) => (
                            <option value={sys_type.type}>
                              {sys_type.type}
                            </option>
                          ))
                        ) : null}

                        {/* {application?.Type === "RESID" ? (
                          <>
                            <option value="Central AC">Central AC</option>
                            <option value="Split AC">Split AC</option>
                            <option value="Window AC">Window AC</option>
                            <option value="Washer">Washer</option>
                            <option value="Dryer">Dryer</option>
                          </>
                        ) : (
                          <>
                            <option value="Central AC">
                              Central AC - Commercial
                            </option>
                            <option value="Split AC">
                              Split AC - Commercial
                            </option>
                          </>
                        )} */}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group
                      controlId="equipment_condition"
                      className="mb-1"
                    >
                      <Form.Label>
                        Equipment Condition:{" "}
                        <b>
                          {application?.Old_equipment.length >= 1
                            ? application?.Old_equipment[
                                selectedOldEquipmentIndex
                              ].oldEquip_Conditon
                            : null}
                        </b>
                      </Form.Label>
                      <Form.Select
                        onChange={(e) =>
                          setOldEquipmentCondition(e.target.value)
                        }
                        value={old_equipment_condition}
                      >
                        <option value="Operational">Operational</option>
                        <option value="Failed">Failed</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="old_disposal_party" className="mb-1">
                      <Form.Label>
                        Disposal Party{" "}
                        <b>
                          {application?.Old_equipment.length >= 1
                            ? application?.Old_equipment[
                                selectedOldEquipmentIndex
                              ].oldEquip_Disposal_party
                            : null}
                        </b>
                      </Form.Label>
                      <Form.Select
                        onChange={(e) => setOldDisposalParty(e.target.value)}
                        value={old_disposal_party}
                      >
                        <option value="Customer">Customer</option>
                        <option value="Installer">Installer</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="old_years" className="mb-1">
                      <Form.Label>
                        Number of Year:{" "}
                        <b>
                          {application?.Old_equipment.length >= 1
                            ? application?.Old_equipment[
                                selectedOldEquipmentIndex
                              ].oldEquip_Years
                            : null}
                        </b>
                      </Form.Label>
                      <FormControl
                        value={old_years}
                        type="number"
                        min="1"
                        onChange={(e) => setOldYears(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="old_quantity" className="mb-1">
                      <Form.Label>
                        Quantity:{" "}
                        <b>
                          {application?.Old_equipment.length >= 1
                            ? application?.Old_equipment[
                                selectedOldEquipmentIndex
                              ].oldEquip_Quantity
                            : null}
                        </b>
                      </Form.Label>
                      <FormControl
                        value={old_quantity}
                        type="number"
                        min="1"
                        onChange={(e) => setOldQuantity(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="old_tons" className="mb-1">
                      <Form.Label>
                        {application?.Old_equipment.length >= 1
                          ? application?.Old_equipment[
                              selectedOldEquipmentIndex
                            ].oldEquip_System_type === "Dryer"
                            ? application?.Old_equipment[
                                selectedOldEquipmentIndex
                              ].oldEquip_System_type === "Washer"
                              ? "Cubic"
                              : "Tons"
                            : "Tons"
                          : null}
                        :{" "}
                        <b>
                          {application?.Old_equipment.length >= 1
                            ? application?.Old_equipment[
                                selectedOldEquipmentIndex
                              ].oldEquip_Tons
                            : null}
                        </b>
                      </Form.Label>
                      <FormControl
                        value={old_tons}
                        type="number"
                        min="1"
                        onChange={(e) => setOldTons(e.target.value)}
                      />
                    </Form.Group>

                    {application?.Old_equipment.length >= 1 ? (
                      application?.Old_equipment[selectedOldEquipmentIndex]
                        .oldEquip_System_type === "Dryer" || "Washer" ? null : (
                        <Form.Group controlId="old_btu" className="mb-1">
                          <Form.Label>
                            BTU :{" "}
                            <b>
                              {
                                application?.Old_equipment[
                                  selectedOldEquipmentIndex
                                ].oldEquip_Btu
                              }
                            </b>
                          </Form.Label>
                          <FormControl
                            type="number"
                            value={old_btu}
                            onChange={(e) => setOldBtu(e.target.value)}
                          />
                        </Form.Group>
                      )
                    ) : null}

                    <Form.Group controlId="old_seer" className="mb-1">
                      <Form.Label>
                        SEER:{" "}
                        <b>
                          {application?.Old_equipment.length >= 1
                            ? application?.Old_equipment[
                                selectedOldEquipmentIndex
                              ].oldEquip_Seer
                            : null}
                        </b>
                      </Form.Label>
                      <FormControl
                        value={old_seer}
                        type="number"
                        min="1"
                        onChange={(e) => setOldSeer(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="old_disposal_date" className="mb-1">
                      <Form.Label>
                        Disposal Date:{" "}
                        <b>
                          {application?.Old_equipment.length >= 1
                            ? application?.Old_equipment[
                                selectedOldEquipmentIndex
                              ].oldEquip_Disposal_date
                            : null}
                        </b>
                      </Form.Label>
                      <FormControl
                        type="date"
                        value={old_disposal_date}
                        max={currentDate}
                        onKeyDown={(e) => e.preventDefault()}
                        onChange={(e) => setOldDisposalDate(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      className="mt-2"
                      variant="success"
                      onClick={() =>
                        handleEditOldEquipment(
                          application?.Old_equipment[selectedOldEquipmentIndex]
                            .oldEquip_id,
                          selectedOldEquipmentIndex
                        )
                      }
                    >
                      Update Information
                    </Button>
                  </Modal.Body>
                </Modal>
                <h3 className="mt-3 mb-3 text-info">
                  Existing/Old Equipment Info{" "}
                </h3>

                <Table striped hover responsive>
                  <thead className="bg-info text-white">
                    <tr>
                      <th>#</th>
                      <th>System Type</th>
                      <th>Years</th>
                      <th>Quantity</th>
                      {application ? (
                        application.New_equipment[0].newEquip_System_type !==
                        "Washer" ? (
                          application.New_equipment[0].newEquip_System_type !==
                          "Dryer" ? (
                            <th>TONS</th>
                          ) : (
                            <th>CUBIC FEET</th>
                          )
                        ) : (
                          <th>CUBIC FEET</th>
                        )
                      ) : null}
                      <th>Eqpmt. Condition</th>
                      {application ? (
                        application.New_equipment[0].newEquip_System_type !==
                        "Washer" ? (
                          application.New_equipment[0].newEquip_System_type !==
                          "Dryer" ? (
                            <th>SEER</th>
                          ) : null
                        ) : null
                      ) : null}
                      <th>Disposal Party</th>
                      <th>Disposal Date</th>
                      {roleId === 10 ? null : <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {application
                      ? application?.Old_equipment?.length === 0
                        ? []
                        : application.Old_equipment.map((old_eqiup, indx) => (
                            <tr>
                              <td>{indx + 1}</td>
                              <td>{old_eqiup.oldEquip_System_type}</td>
                              <td>{old_eqiup.oldEquip_Years}</td>
                              <td>{old_eqiup.oldEquip_Quantity}</td>
                              <td>{old_eqiup.oldEquip_Tons}</td>
                              <td>{old_eqiup.oldEquip_Conditon}</td>
                              {application ? (
                                application.New_equipment[0]
                                  .newEquip_System_type !== "Washer" ? (
                                  application.New_equipment[0]
                                    .newEquip_System_type !== "Dryer" ? (
                                    <td>{old_eqiup.oldEquip_Seer}</td>
                                  ) : null
                                ) : null
                              ) : null}

                              <td>{old_eqiup.oldEquip_Disposal_party}</td>
                              <td>{old_eqiup.oldEquip_Disposal_date}</td>
                              {roleId === 10 ? null : (
                                <td>
                                  <Button
                                    size="sm"
                                    variant="success"
                                    onClick={() =>
                                      editOldEquipmentHandler(
                                        indx,
                                        old_eqiup.oldEquip_id,
                                        application.Type
                                      )
                                    }
                                  >
                                    <i className="fa fa-edit"> </i>
                                  </Button>
                                </td>
                              )}
                            </tr>
                          ))
                      : []}
                  </tbody>
                </Table>
              </Tab.Pane>
              {/* NOTE: SUBMITTED DOCUMENTS */}
              <Tab.Pane eventKey="submission_of_documentation">
                <ModalImage
                  data={modalData}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                <Container className="ml-2 mr-2">
                  <h3 className="mt-3 mb-3 text-info">Submitted Documents</h3>

                  <ListGroup className="mb-3">
                    {application ? (
                      <>
                        <Row>
                          <Col md={4}>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <span stlye={{ width: "100%" }}>
                                Invoice <br />
                              </span>
                              {application.Submitted_docs ? (
                                application.Submitted_docs[0].invoice !==
                                null ? (
                                  <Button
                                    className="mb-2"
                                    variant={"success"}
                                    onClick={() =>
                                      handleRetrieveFile(
                                        inv
                                          ? inv
                                          : application.Submitted_docs[0]
                                              .invoice,
                                        application.Control_Number +
                                          "-" +
                                          "Invoice"
                                      )
                                    }
                                    size={"sm"}
                                    style={{ marginLeft: "auto" }}
                                  >
                                    Download
                                  </Button>
                                ) : (
                                  <></>
                                )
                              ) : (
                                ""
                              )}
                            </div>
                            <Form.Group controlId="invoice" className="mb-3">
                              {roleId !== 10 ? (
                                <InputGroup>
                                  <Form.Control
                                    name="invoice"
                                    type="file"
                                    onChange={(e) => {
                                      if (
                                        e.target.files[0].type ===
                                          "application/pdf" ||
                                        e.target.files[0].type ===
                                          "image/png" ||
                                        e.target.files[0].type === "image/jpeg"
                                      ) {
                                        handleOnChange(
                                          e,
                                          "invoice",
                                          application.Control_Number
                                        );
                                      } else {
                                        errorFileInvalidMessage();
                                        e.target.value = null;
                                      }
                                    }}
                                  />
                                </InputGroup>
                              ) : (
                                <></>
                              )}

                              {invoice ? (
                                <>
                                  <Badge bg={"success"}>File Uploaded</Badge>{" "}
                                  <br />
                                  Filename: {invoice.name} <br />
                                  File Type: {invoice.type} <br />
                                  <br />
                                </>
                              ) : (
                                <></>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <span>IRS-W9 </span>
                              {application.Submitted_docs ? (
                                application.Submitted_docs[0].irs_form !==
                                null ? (
                                  <Button
                                    className="mb-2"
                                    variant={"success"}
                                    onClick={() =>
                                      handleRetrieveFile(
                                        irs
                                          ? irs
                                          : application.Submitted_docs[0]
                                              .irs_form,
                                        application.Control_Number +
                                          "-" +
                                          "IRS-W9"
                                      )
                                    }
                                    size={"sm"}
                                    style={{ marginLeft: "auto" }}
                                  >
                                    Download
                                  </Button>
                                ) : (
                                  <small className="text-danger">
                                    (*No file uploaded)
                                  </small>
                                )
                              ) : null}
                            </div>

                            <Form.Group controlId="irs_form" className="mb-3">
                              {roleId !== 10 ? (
                                <InputGroup>
                                  <Form.Control
                                    name="irs_form"
                                    type="file"
                                    onChange={(e) => {
                                      if (
                                        e.target.files[0].type ===
                                          "application/pdf" ||
                                        e.target.files[0].type ===
                                          "image/png" ||
                                        e.target.files[0].type === "image/jpeg"
                                      ) {
                                        handleOnChange(
                                          e,
                                          "irs_form",
                                          application.Control_Number
                                        );
                                      } else {
                                        errorFileInvalidMessage();
                                        e.target.value = null;
                                      }
                                    }}
                                  />
                                </InputGroup>
                              ) : (
                                <></>
                              )}

                              {irs_form ? (
                                <>
                                  <Badge bg={"success"}>File Uploaded</Badge>{" "}
                                  <br />
                                  Filename: {irs_form.name} <br />
                                  File Type: {irs_form.type} <br />
                                  <br />
                                </>
                              ) : (
                                <></>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <span>Letter of Authorization </span>
                              {application.Submitted_docs ? (
                                application.Submitted_docs[0]
                                  .letter_authorization !== null ? (
                                  <Button
                                    className="mb-2"
                                    variant={"success"}
                                    onClick={() =>
                                      handleRetrieveFile(
                                        loa
                                          ? loa
                                          : application.Submitted_docs[0]
                                              .letter_authorization,
                                        application.Control_Number +
                                          "-" +
                                          "Letter Authorization"
                                      )
                                    }
                                    size={"sm"}
                                    style={{ marginLeft: "auto" }}
                                  >
                                    Download{" "}
                                  </Button>
                                ) : (
                                  <small className="text-danger">
                                    {" "}
                                    (*No file uploaded)
                                  </small>
                                )
                              ) : null}
                            </div>
                            <Form.Group
                              controlId="letter_authorization"
                              className="mb-3"
                            >
                              {roleId !== 10 ? (
                                <InputGroup>
                                  <Form.Control
                                    name="letter_authorization"
                                    type="file"
                                    onChange={(e) => {
                                      if (
                                        e.target.files[0].type ===
                                          "application/pdf" ||
                                        e.target.files[0].type ===
                                          "image/png" ||
                                        e.target.files[0].type === "image/jpeg"
                                      ) {
                                        handleOnChange(
                                          e,
                                          "letter_authorization",
                                          application.Control_Number
                                        );
                                      } else {
                                        errorFileInvalidMessage();
                                        e.target.value = null;
                                      }
                                    }}
                                  />
                                </InputGroup>
                              ) : (
                                <></>
                              )}

                              {letter_authorization ? (
                                <>
                                  <Badge bg={"success"}>File Uploaded</Badge>{" "}
                                  <br />
                                  Filename: {letter_authorization.name} <br />
                                  File Type: {letter_authorization.type} <br />
                                  <br />
                                </>
                              ) : (
                                <></>
                              )}
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <span>Disposal Slip </span>
                              {application.Submitted_docs ? (
                                application.Submitted_docs[0].disposal_slip !==
                                null ? (
                                  <Button
                                    className="mb-2"
                                    variant={"success"}
                                    onClick={() =>
                                      handleRetrieveFile(
                                        disp
                                          ? disp
                                          : application.Submitted_docs[0]
                                              .disposal_slip,
                                        application.Control_Number +
                                          "-" +
                                          "Disposal Slip"
                                      )
                                    }
                                    size={"sm"}
                                    style={{ marginLeft: "auto" }}
                                  >
                                    Download
                                  </Button>
                                ) : (
                                  <small className="text-danger">
                                    (*No file uploaded )
                                  </small>
                                )
                              ) : null}
                            </div>
                            <Form.Group
                              controlId="disposal_slilp"
                              className="mb-3"
                            >
                              {roleId !== 10 ? (
                                <InputGroup>
                                  <Form.Control
                                    name="disposal_slilp"
                                    type="file"
                                    onChange={(e) => {
                                      if (
                                        e.target.files[0].type ===
                                          "application/pdf" ||
                                        e.target.files[0].type ===
                                          "image/png" ||
                                        e.target.files[0].type === "image/jpeg"
                                      ) {
                                        handleOnChange(
                                          e,
                                          "disposal_slip",
                                          application.Control_Number
                                        );
                                      } else {
                                        errorFileInvalidMessage();
                                        e.target.value = null;
                                      }
                                    }}
                                  />
                                </InputGroup>
                              ) : (
                                <></>
                              )}

                              {disposal_slip ? (
                                <>
                                  <Badge bg={"success"}>File Uploaded</Badge>{" "}
                                  <br />
                                  Filename: {disposal_slip.name} <br />
                                  File Type: {disposal_slip.type} <br />
                                  <br />
                                </>
                              ) : (
                                <></>
                              )}
                            </Form.Group>
                          </Col>

                          <Col md={4}>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <span>Other Document 1 </span>
                              {application.Submitted_docs ? (
                                application.Submitted_docs[0].installer_cert !==
                                null ? (
                                  <Button
                                    className="mb-2"
                                    variant={"success"}
                                    onClick={() =>
                                      handleRetrieveFile(
                                        oth1
                                          ? oth1
                                          : application.Submitted_docs[0]
                                              .installer_cert,
                                        application.Control_Number +
                                          "-" +
                                          "Other Document1"
                                      )
                                    }
                                    size={"sm"}
                                    style={{ marginLeft: "auto" }}
                                  >
                                    Download
                                  </Button>
                                ) : (
                                  <small className="text-danger">
                                    (*No file uploaded)
                                  </small>
                                )
                              ) : null}
                            </div>

                            <Form.Group
                              controlId="installer_cert"
                              className="mb-3"
                            >
                              {roleId !== 10 ? (
                                <InputGroup>
                                  <Form.Control
                                    name="installer_cert"
                                    type="file"
                                    onChange={(e) => {
                                      if (
                                        e.target.files[0].type ===
                                          "application/pdf" ||
                                        e.target.files[0].type ===
                                          "image/png" ||
                                        e.target.files[0].type === "image/jpeg"
                                      ) {
                                        handleOnChange(
                                          e,
                                          "other_doc1",
                                          application.Control_Number
                                        );
                                      } else {
                                        errorFileInvalidMessage();
                                        e.target.value = null;
                                      }
                                    }}
                                  />
                                </InputGroup>
                              ) : (
                                <></>
                              )}

                              {other_doc1 ? (
                                <>
                                  <Badge bg={"success"}>File Uploaded</Badge>{" "}
                                  <br />
                                  Filename: {other_doc1.name} <br />
                                  File Type: {other_doc1.type} <br />
                                  <br />
                                </>
                              ) : (
                                <></>
                              )}
                            </Form.Group>
                          </Col>

                          <Col md={4}>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <span>Other Document 2 </span>
                              {application.Submitted_docs ? (
                                application.Submitted_docs[0].other_doc2 !==
                                null ? (
                                  <Button
                                    className="mb-2"
                                    variant={"success"}
                                    onClick={() =>
                                      handleRetrieveFile(
                                        oth2
                                          ? oth2
                                          : application.Submitted_docs[0]
                                              .other_doc2,
                                        application.Control_Number +
                                          "-" +
                                          "Other Document"
                                      )
                                    }
                                    size={"sm"}
                                    style={{ marginLeft: "auto" }}
                                  >
                                    Download
                                  </Button>
                                ) : (
                                  <small className="text-danger">
                                    (*No file uploaded)
                                  </small>
                                )
                              ) : null}
                            </div>

                            <Form.Group
                              controlId="letter_authorization"
                              className="mb-3"
                            >
                              {roleId !== 10 ? (
                                <InputGroup>
                                  <Form.Control
                                    name="letter_authorization"
                                    type="file"
                                    onChange={(e) => {
                                      if (
                                        e.target.files[0].type ===
                                          "application/pdf" ||
                                        e.target.files[0].type ===
                                          "image/png" ||
                                        e.target.files[0].type === "image/jpeg"
                                      ) {
                                        handleOnChange(
                                          e,
                                          "other_doc2",
                                          application.Control_Number
                                        );
                                      } else {
                                        errorFileInvalidMessage();
                                        e.target.value = null;
                                      }
                                    }}
                                  />
                                </InputGroup>
                              ) : (
                                <></>
                              )}

                              {other_doc2 ? (
                                <>
                                  <Badge bg={"success"}>File Uploaded</Badge>{" "}
                                  <br />
                                  Filename: {other_doc2.name} <br />
                                  File Type: {other_doc2.type} <br />
                                  <br />
                                </>
                              ) : (
                                <></>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      ""
                    )}
                  </ListGroup>
                </Container>
                <Container className="ml-2 mr-2">
                  <Row>
                    <Col md={12}>
                      <h3 className="mt-3 mb-3">Update Status</h3>
                      <Modal
                        show={showModal}
                        onHide={handleModalClose}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            {status === 3 ? (
                              <>Reject Application</>
                            ) : (
                              <>Process Application</>
                            )}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center">
                          {status === 3 ? (
                            <Container className="col-8 text-center btn-group-vertical">
                              <Form.Group controlId="role_id" className="mb-1">
                                <Form.Select
                                  onChange={(e) => setReason(e.target.value)}
                                  value={reason}
                                  required
                                >
                                  <option value="">
                                    Open this select menu
                                  </option>
                                  {/* <option value="0">None</option> */}
                                  <option value="1">
                                    Applicant is not a GPA Account holder or
                                    property owner.
                                  </option>
                                  <option value="2">
                                    Application information provided was
                                    incorrect.
                                  </option>
                                  <option value="3">
                                    Equipment was not installed within 120 days
                                    from invoice date.
                                  </option>
                                  <option value="4">
                                    Application was not submitted within 120
                                    days from install date.
                                  </option>
                                  <option value="5">
                                    Missing or incorrect Invoice.
                                  </option>
                                  <option value="6">
                                    Missing or incorrect W-9.
                                  </option>
                                  <option value="7">
                                    Missing or Incorrect Installer Information.
                                  </option>
                                  <option value="8">
                                    Other: Please contact GPA for more
                                    information.
                                  </option>
                                </Form.Select>
                              </Form.Group>
                              <Button
                                variant={"danger"}
                                onClick={() => {
                                  if (reason === "") {
                                    Swal.fire(
                                      "No Reason Selected",
                                      "Please Select Reason to Reject",
                                      "error"
                                    );
                                  } else {
                                    updateStatus(3, 0, "Reject Application");
                                  }
                                }}
                              >
                                Reject Application
                              </Button>
                            </Container>
                          ) : roleId === 2 ? (
                            <Container>
                              <Button
                                onClick={() => {
                                  updateStatus(1, 1, "Send to SPORD");
                                }}
                              >
                                Send to SPORD
                              </Button>
                            </Container>
                          ) : roleId === 3 ? (
                            <Container className="col-8 text-center btn-group-vertical">
                              <Button
                                onClick={() => {
                                  updateStatus(1, 3, "Send to Supervisor");
                                }}
                                className="mb-3"
                              >
                                Send to Supervisor
                              </Button>{" "}
                              <Button
                                onClick={() => {
                                  updateStatus(
                                    1,
                                    4,
                                    "Send Back to Customer Service"
                                  );
                                }}
                              >
                                Send Back to Customer Service
                              </Button>
                            </Container>
                          ) : roleId === 6 ? (
                            <Container className="col-8 text-center btn-group-vertical">
                              <Button
                                onClick={() => {
                                  updateStatus(1, 5, "Send to Budget");
                                }}
                                className="mb-3"
                              >
                                Send to Budget
                              </Button>
                              <Button
                                onClick={() => {
                                  updateStatus(1, 1, "Send Back to SPORD");
                                }}
                                className="mb-3"
                              >
                                Send Back to SPORD
                              </Button>
                            </Container>
                          ) : roleId === 4 ? (
                            <Container className="col-8 text-center btn-group-vertical">
                              <Button
                                onClick={() => {
                                  updateStatus(1, 2, "Send to Accounting");
                                }}
                                className="mb-3"
                              >
                                Send to Accounting
                              </Button>
                              <Button
                                onClick={() => {
                                  updateStatus(1, 3, "Send Back to Supervisor");
                                }}
                                className="mb-3"
                              >
                                Send Back to Supervisor
                              </Button>
                            </Container>
                          ) : roleId === 5 ? (
                            <Container className="col-8 text-center btn-group-vertical">
                              <Button
                                variant={"success"}
                                className="mb-3"
                                onClick={() => {
                                  updateStatus(2, 0, "Approve Application");
                                }}
                                disabled={
                                  application?.Status === "Denied"
                                    ? true
                                    : false
                                }
                              >
                                Approve Application
                              </Button>

                              <Button
                                variant={"danger"}
                                className="mb-3"
                                onClick={() => {
                                  updateStatus(1, 1, "(Decline) Send to Spord");
                                }}
                              >
                                (Decline) Send to Spord
                              </Button>

                              <Button
                                variant={"danger"}
                                className="mb-3"
                                onClick={() => {
                                  updateStatus(1, 4, "(Decline) Send to CS");
                                }}
                              >
                                (Decline) Send to CS
                              </Button>
                            </Container>
                          ) : roleId === 1 ? (
                            <Container className="col-8 text-center btn-group-vertical">
                              <Button
                                variant={"success"}
                                onClick={() => {
                                  updateStatus(2, 0, "Approve Application");
                                }}
                                className="mb-3"
                                disabled={
                                  application?.Status === "Denied"
                                    ? true
                                    : false
                                }
                              >
                                Approve Application
                              </Button>
                              <Button
                                onClick={() => {
                                  updateStatus(1, 4, "Send to CS");
                                }}
                                className="mb-3"
                              >
                                Send to CS
                              </Button>{" "}
                              <Button
                                onClick={() => {
                                  updateStatus(1, 1, "Send to SPORD");
                                }}
                                className="mb-3"
                              >
                                Send to SPORD
                              </Button>{" "}
                              <Button
                                onClick={() => {
                                  updateStatus(1, 3, "Send to Supervisor");
                                }}
                                className="mb-3"
                              >
                                Send to Supervisor
                              </Button>{" "}
                              <Button
                                onClick={() => {
                                  updateStatus(1, 5, "Send to Budget");
                                }}
                                className="mb-3"
                              >
                                Send to Budget
                              </Button>{" "}
                              <Button
                                onClick={() => {
                                  updateStatus(1, 2, "Send to Accounting");
                                }}
                                className="mb-3"
                              >
                                Send to Accounting
                              </Button>{" "}
                            </Container>
                          ) : (
                            <></>
                          )}
                        </Modal.Body>
                      </Modal>
                      {roleId !== 7 ? (
                        <>
                          <Button
                            className="me-2"
                            variant={"info processbtn"}
                            onClick={() => changeStatusHandler(1)}
                          >
                            Process Sending
                          </Button>

                          <Button
                            className="me-2 rejectbtn"
                            variant={"danger"}
                            onClick={() => changeStatusHandler(3)}
                            disabled={
                              application?.Status === "Denied" ? true : false
                            }
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col md={9}>
                      <Form>
                        <Form.Group className="mb-3" controlId="comment">
                          <Form.Label>
                            <b>Comments</b>
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            onChange={(e) =>
                              changeCommentHandler(e.target.value)
                            }
                            value={comment}
                          />
                        </Form.Group>
                        <Button
                          onClick={() => addCommentHandler()}
                          variant="success"
                        >
                          Submit
                        </Button>
                        <br />
                        <br />
                      </Form>
                      <hr />

                      {comments ? (
                        comments.map((comment) => {
                          const madeOn = new Date(
                            comment.Made_On.replace(/-/g, "/")
                          );
                          const stringDate = madeOn.toString().substring(0, 15);
                          return (
                            <div className="p-3 mb-1">
                              <h6>
                                {comment.Made_By} | {stringDate}
                                <br />
                                <small className="text-muted">
                                  {comment.role}
                                </small>
                              </h6>
                              <h6 className="text-muted">{comment.Comment}</h6>
                            </div>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                </Container>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          {detailsToggle ? (
            <>
              {application ? (
                <>
                  <Col
                    className="customRow"
                    md={3}
                    style={{
                      backgroundColor: "rgb(243, 244, 249)",
                      borderLeft: "2px solid #d0d5db",
                    }}
                  >
                    <h4 className="mt-3 mb-2">Details</h4>
                    <h6 className="text-muted">Date Applied</h6>
                    <h6>{application.Application_Date}</h6>
                    <br />
                    <h6 className="text-muted">Current Stage</h6>
                    <h6>{application.Status}</h6>
                    <br />
                    <h6 className="text-muted">Current Department</h6>
                    <h6 className="mb-4">{application.Stage}</h6>

                    <h4>Event Logs</h4>
                    {logs ? (
                      <div style={{ height: "700px", overflowY: "auto" }}>
                        {logs.length > 0 ? (
                          logs.map((log, index) => (
                            <div key={index}>
                              <h6>{log.Action}</h6>
                              <small className="text-muted">
                                Made By: {log.Made_By}
                              </small>
                              <br />
                              <small className="text-muted">
                                Made On: {log.Made_On}
                              </small>
                              <hr />
                            </div>
                          ))
                        ) : (
                          <>No Logs</>
                        )}
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </Col>
                </>
              ) : (
                "loading . . "
              )}
            </>
          ) : (
            <></>
          )}
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default ViewApp;
