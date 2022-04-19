import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Form,
  Button,
  Badge,
  InputGroup,
} from "react-bootstrap";
import {
  loadCustomerSystemType,
  loadCustomerEquipManufacturer,
  loadCustomerEquipModel,
  loadCustomerEquipmentDetail,
} from "../../actions/customerAction";
import { uploadFileAction } from "../../actions/fileActions";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import ModalImage from "../ModalImage";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import Moment from "react-moment";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";
const MySwal = withReactContent(Swal);

function ExistingEquipmentInformation(props) {
  const date = new Date(Date.now());
  date.setDate(date.getDate());
  const currentDate = moment(date).format("YYYY-MM-DD");

  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    description: "",
    image_sample: "",
  });

  useEffect(() => {
    dispatch(loadCustomerSystemType(props.customer_type));
    window.scrollTo(0, 0);
    if(props.system_type === "Dryer" || props.system_type === "Washer")
    {
      props.setOldSystemType(props.system_type);
    }
  }, []);

  let p = {};

  const uploadFile = useSelector((state) => state.uploadFile);
  const { loading: uploadLoading, error: uploadError, fileCode } = uploadFile;

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

  const changeSystemTypeHandler = (e) => {
    props.setOldSystemType(e.target.value);
    props.setOldEquipments([]);
  };

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      props.seIsNoExistingToReplace(true);
      props.setNoExisting(true);
    } else {
      props.seIsNoExistingToReplace(false);
      props.setNoExisting(false);
    }
  };

  const handleAgreeBox = (e) => {
    if (e.target.checked) {
      props.setAgreeTerms("true");
    } else {
      props.setAgreeTerms("false");
    }
  };
  const errorMessage = () => {
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
      title: "All Fields are required",
      text: "Fields should not be empty in order to proceed to next step",
    });
  };
  const addEquipmentHandler = () => {
    if (
      props.old_system_type === "" ||
      props.old_quantity === "" ||
      props.old_years === "" ||
      props.is_equipment_condition === "" ||
      props.disposal_party === "" ||
      (props.disposal_party === "Customer" && props.disposal_slip === null) ||
      props.agree_terms === "" ||
      props.date === ""
    ) {
      errorMessage();
    } else {
      const obj = {
        control_no: props.control_no,
        id: props.old_equipments.length + 1,
        system_type: props.old_system_type,
        btu: props.old_btu,
        years: props.old_years,
        tons: props.old_tons,
        is_equipment_condition: props.is_equipment_condition,
        seer: props.seer,
        disposal_party: props.disposal_party,
        date: props.date,
        quantity: props.old_quantity,
        agree_terms: props.agree_terms,
      };
      console.log(obj);
      props.setOldEquipments(props.old_equipments.concat(obj));
    }
  };

  const deleteEquipmentHandler = (rowdata) => {
    const index = props.old_equipments.indexOf(rowdata);
    const eqs = props.old_equipments;

    if (index > -1) {
      eqs.splice(index, 1);
      props.setOldEquipments(eqs);
    }
    dispatch(loadCustomerEquipManufacturer("Central AC"));
  };

  useEffect(() => {
    // if(props.system_type === "Dryer")
    // {
    //   props.setOldSystemType("Dryer")
    // }else if(props.system_type === "Washer")
    // {
    //   props.setOldSystemType("Washer")
    // }else{
    //   props.setOldSystemType(props.system_type)
    // }

    showTable();
  }, [dispatch, props.old_equipments]);

  const showTable = () => {
    return (
      <MaterialTable
        columns={[
          { title: "#", field: "id" },
          { title: "System Type", field: "system_type" },
          { title: "Quantity", field: "quantity" },
          {
            title: "Action",
            field: "actions",
            width: "10%",
            editComponent: (props) => {
              return <Button></Button>;
            },
            render: (rowdata) => (
              <>
                {/* <Button variant="light" size="sm" ><i className="fa fa-edit"></i></Button> */}
                <Button
                  variant="danger"
                  onClick={() => deleteEquipmentHandler(rowdata)}
                  size="sm"
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </>
            ),
          },
        ]}
        data={props.old_equipments.length === 0 ? [] : props.old_equipments}
        title="Equipments"
      />
    );
  };

  const handleChangeDisposalSlip = (e) => {
    props.setDisposalSlip(e.target.files[0]);
    dispatch(
      uploadFileAction(e.target.files[0], "disposal_slip", props.control_no, false)
    );
  };

  const handleDisposalSlip = () => (
    <Form.Group controlId="disposal_slip">
      <ModalImage
        data={{
          description: "Disposal Receipt",
          image_sample: "./image_sample/5.jpg",
        }}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <span className="d-flex flex-row justify-content-between disposalReceipt mt-2">
        <b>DISPOSAL RECEIPT</b>
        <span
          className="text-secondary mb-1"
          onClick={() => {
            setModalData(
              (p = {
                description: "DISPOSAL SLIP",
                image_sample: "./image_sample/5.jpg",
              })
            );
            setModalShow(true);
          }}
        >
          <i className="fa fa-question-circle"></i>{" "}
        </span>
      </span>
      <InputGroup>
        <Form.Control
          name="file"
          placeholder="Upload Disposal Receipt"
          type="file"
          onChange={(e) => {
            if (
              e.target.files[0].type === "application/pdf" ||
              e.target.files[0].type === "image/png" ||
              e.target.files[0].type === "image/jpeg"
            ) {
              handleChangeDisposalSlip(e);
            } else {
              errorFileInvalidMessage();
              e.target.value = null;
            }
          }}
        />
      </InputGroup>
      {props.no_existing ? (
        <> </>
      ) : props.disposal_slip === null ? (
        <p className="validate text-danger requiredField">
          *This Field is Required
        </p>
      ) : (
        <></>
      )}
      {props.disposal_slip ? (
        <>
          {fileCode ? (
            <>
              {props.setDisposalSlipD(fileCode)}
              {console.log("DISPOSAL SLIPD CODE VALUE: ", props.disposal_slipD)}
              <Badge bg={"success"}>File Uploaded</Badge> <br />
            </>
          ) : (
            <>no upload</>
          )}
          Filename: {props.disposal_slip.name} <br />
          File Type: {props.disposal_slip.type} <br />
          <br />
        </>
      ) : (
        <></>
      )}
    </Form.Group>
  );
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
    <Row className="w-100 mx-0 d-flex justify-content-center">
      <Col md={10} xl={6}>
        {width >= 425 ? (
          <h4 className="text-center text-info">
            EXISTING EQUIPMENT INFORMATION
          </h4>
        ) : (
          <></>
        )}

        <Row className="px-0 d-flex flex-row">
          <Col md={12}>
            <Form.Check
              className="mb-3"
              inline
              label="Check if there is no existing/old equipment being replaced"
              name="props.is_no_existing_to_replace"
              type={"checkbox"}
              id={`inline-${"check"}-1`}
              checked={props.is_no_existing_to_replace === true}
              onChange={(e) => handleCheckBox(e)}
            />
          </Col>
        </Row>
        <Row className="px-0">
          <Col md={12}>
            {console.log(props.old_system_type)}

            <Form.Group controlId="system_type" className="mb-3">
              <Form.Label className="applicationTitle">SYSTEM TYPE</Form.Label>
              <Form.Select
                onChange={(e) => changeSystemTypeHandler(e)}
                value={props.old_system_type}
                disabled={props.no_existing ? true : false}
                // disabled={
                //   props.system_type === "Central AC" ||
                //   props.system_type === "Split AC" ||
                //   props.system_type === "Window AC"
                //     ? false
                //     : true
                // }
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
                    <option value={sys_type.type}>{sys_type.type}</option>
                  ))
                ) : null}
                {/* <option value=""></option>
                <option value="Central AC">Central AC</option>
                <option value="Split AC">Split AC</option>
                <option value="Window AC">Window AC</option>
                {props.system_type === "Central AC" ||
                props.system_type === "Split AC" ||
                props.system_type === "Window AC" ? (
                  <></>
                ) : (
                  <>
                    <option value="Dryer">Dryer</option>
                    <option value="Washer">Washer</option>
                  </>
                )} */}
              </Form.Select>
            </Form.Group>
            {props.old_system_type === "" ? (
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row className="px-0">
          <Col md={6} className="mb-3">
            <Form.Group controlId="old_tons">
              <Form.Label className="applicationTitle">
                {props.system_type !== "Dryer"
                  ? props.system_type !== "Washer"
                    ? "TONS"
                    : "CUBIC FEET"
                  : "CUBIC FEET"}
              </Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                value={props.old_tons}
                onChange={(e) => {
                  props.setOldBtu(e.target.value * 12000);
                  props.setOldTons(e.target.value);
                }}
                required
                min="0"
                disabled={props.no_existing ? true : false}
              ></Form.Control>
            </Form.Group>
            {props.no_existing ? (
              <> </>
            ) : props.old_tons === "" ? (
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
          {props.system_type !== "Dryer" ? (
            props.system_type !== "Washer" ? (
              <Col md={6} className="mb-3">
                <Form.Group controlId="old_btu">
                  <Form.Label className="applicationTitle">
                    {props.system_type !== "Dryer"
                      ? props.system_type !== "Washer"
                        ? "BTU"
                        : "N/A"
                      : "N/A"}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder=""
                    value={props.old_btu}
                    onChange={(e) => {
                      props.setOldTons((e.target.value / 12000).toFixed(2));
                      props.setOldBtu(e.target.value);
                    }}
                    required
                    disabled={props.no_existing ? true : false}
                    min="0"
                  ></Form.Control>
                </Form.Group>
                {props.no_existing ? (
                  <> </>
                ) : props.old_btu === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
            ) : null
          ) : null}
        </Row>
        <Row className="px-0">
          <Col md={6} className="mb-3">
            <Form.Group controlId="old_quantity">
              <Form.Label className="applicationTitle">QUANTITY</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                value={props.old_quantity}
                onChange={(e) => props.setOldQuantity(e.target.value)}
                required
                min="1"
                disabled={props.no_existing ? true : false}
              ></Form.Control>
            </Form.Group>
            {props.no_existing ? (
              <> </>
            ) : props.old_quantity === "" ? (
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="old_years">
              <Form.Label className="applicationTitle">
                NUMBER OF YEARS
              </Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                min="1"
                value={props.old_years}
                onChange={(e) => props.setOldYears(e.target.value)}
                required
                disabled={props.no_existing ? true : false}
              ></Form.Control>
            </Form.Group>
            {props.no_existing ? (
              <> </>
            ) : props.old_years === "" ? (
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <Row className="px-0">
          <Col md={12}>
            <Form.Label className="applicationTitle">
              EQUIPMENT CONDITION PRIOR TO REMOVAL
            </Form.Label>{" "}
            <br />
            <Form.Check
              inline
              label="Operational"
              name="is_equipment_condition"
              type={"radio"}
              id={`inline-${"radio"}-1`}
              value="Operational"
              checked={"Operational" === props.is_equipment_condition}
              onChange={(e) => props.setIsEquipmentCondition(e.target.value)}
              disabled={props.no_existing ? true : false}
            />
            <Form.Check
              inline
              label="Failed"
              name="is_equipment_condition"
              type={"radio"}
              value="Failed"
              checked={"Failed" === props.is_equipment_condition}
              onChange={(e) => props.setIsEquipmentCondition(e.target.value)}
              disabled={props.no_existing ? true : false}
            />
            {props.no_existing ? (
              <> </>
            ) : props.is_equipment_condition === "" ? (
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        {props.system_type !== "Dryer" ? (
          props.system_type !== "Washer" ? (
            <Row className="px-0">
              <Col md={12} className="mb-3">
                <Form.Group controlId="seer">
                  <Form.Label className="applicationTitle">SEER</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder=""
                    required
                    value={props.seer}
                    onChange={(e) => props.setSeer(e.target.value)}
                    disabled={props.no_existing ? true : false}
                    min="0"
                  ></Form.Control>
                </Form.Group>
                {/* {props.no_existing ? (
                        <> </>
                      ) : props.seer === "" ? (
                        <p className="validate text-danger">*This Field is Required</p>
                      ) : (
                        <></>
                      )} */}
              </Col>
            </Row>
          ) : null
        ) : null}

        <Row className="px-0">
          <Col md={12}>
            <Form.Label className="applicationTitle">DISPOSAL PARTY</Form.Label>{" "}
            <br />
            <Form.Check
              inline
              label="Customer"
              name="disposal_party"
              type={"radio"}
              id={`inline-${"radio"}-1`}
              value="Customer"
              checked={"Customer" === props.disposal_party}
              onChange={(e) => props.setDisposalParty(e.target.value)}
              disabled={props.no_existing ? true : false}
            />
            <Form.Check
              inline
              label="Installer"
              name="disposal_party"
              type={"radio"}
              value="Installer"
              checked={"Installer" === props.disposal_party}
              onChange={(e) => props.setDisposalParty(e.target.value)}
              disabled={props.no_existing ? true : false}
            />
            {props.no_existing ? (
              <> </>
            ) : props.disposal_party === "" ? (
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
            <br />
            {props.system_type === "Dryer" ||
            props.system_type === "Washer" ||
            props.system_type === "Window AC" ? (
              handleDisposalSlip()
            ) : props.disposal_party === "Customer" ? (
              handleDisposalSlip()
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row className="mt-3 px-0">
          <Col md={12}>
            <Form.Check
              inline
              label="By checking this box, you agree to the terms and conditions for proper disposal."
              name="agree_terms"
              type={"checkbox"}
              id={`inline-${"check"}-1`}
              checked={props.agree_terms === "true"}
              onChange={(e) => handleAgreeBox(e)}
              disabled={props.no_existing ? true : false}
            />
            {props.no_existing ? (
              <> </>
            ) : props.agree_terms === "" ? (
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row className="px-0">
          <Col md={12}>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label className="applicationTitle">DATE</Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                value={props.date}
                onChange={(e) => props.setDate(e.target.value)}
                max={currentDate}
                required
                disabled={props.no_existing ? true : false}
              ></Form.Control>
            </Form.Group>
            {props.no_existing ? (
              <> </>
            ) : props.date === "" ? (
              <p className="validate text-danger requiredField">
                *This Field is Required
              </p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row className="pb-3 d-flex justify-content-center">
          <Button
            className="mx-auto addEquipmentButton"
            variant="success"
            size="lg"
            onClick={() => addEquipmentHandler()}
            disabled={props.no_existing ? true : false}
          >
            Add Equipment
          </Button>
        </Row>
        <Row className="px-0">
          <Col md={12}>{showTable()}</Col>
        </Row>
      </Col>
    </Row>
  );
}

export default ExistingEquipmentInformation;
