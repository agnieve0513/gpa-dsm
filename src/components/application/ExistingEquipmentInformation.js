import React, { useState, useEffect } from "react";
import { Table, Row, Col, Form, Button, Badge, InputGroup } from "react-bootstrap";
import {
  loadCustomerEquipManufacturer,
  loadCustomerEquipModel,
  loadCustomerEquipmentDetail,
} from "../../actions/customerAction";
import { uploadFileAction } from '../../actions/fileActions'
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import ModalImage from "../ModalImage";
function ExistingEquipmentInformation(props) {
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    description: "",
    image_sample: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let p = {};


  const uploadFile = useSelector((state) => state.uploadFile);
  const {
    loading: uploadLoading,
    error: uploadError,
    fileCode,
  } = uploadFile;

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

  const addEquipmentHandler = () => {
    const obj = {
      control_no: props.control_no,
      id: props.old_equipments.length + 1,
      system_type: props.system_type,
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
    props.setOldEquipments(props.old_equipments.concat(obj));
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
    props.setDisposalSlip(e.target.files[0])
    dispatch(uploadFileAction(e.target.files[0], "disposal_slip", props.control_no));

  }

  return (
    <Row className="w-100 mx-0">
      <Col md={3}></Col>
      <Col md={6}>
        <h4 className="text-center text-info">
          Existing Equipment Information
        </h4>
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
            <Form.Group controlId="system_type" className="mb-3">
              <Form.Label><b>SYSTEM TYPE</b></Form.Label>
              <Form.Select
                onChange={(e) => changeSystemTypeHandler(e)}
                value={props.system_type}
                disabled={true}
              >
                <option value="Central AC">Central AC</option>
                <option value="Split AC">Split AC</option>
                <option value="Window AC">Window AC</option>
                <option value="Dryer">Dryer</option>
                <option value="Washer">Washer</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {props.system_type === "Dryer" || props.system_type === "Washer" ? (
          <Row className="px-0">
            <Col md={6} className="mb-3">
              <Form.Group controlId="old_btu">
                <Form.Label>BTU</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={props.old_btu}
                  onChange={(e) => props.setOldBtu(e.target.value)}
                  required
                  disabled={props.no_existing ? true : false}
                ></Form.Control>
              </Form.Group>
              {props.no_existing ? (
                <> </>
              ) : props.old_btu === "" ? (
                <p className="validate text-danger">*This Field is Required</p>
              ) : (
                <></>
              )}
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="old_tons">
                <Form.Label>TONS</Form.Label>
                <Form.Control
                  type="number"
                  placeholder=""
                  value={props.old_tons}
                  onChange={(e) => props.setOldTons(e.target.value)}
                  required
                  disabled={props.no_existing ? true : false}
                ></Form.Control>
              </Form.Group>
              {props.no_existing ? (
                <> </>
              ) : props.old_tons === "" ? (
                <p className="validate text-danger">*This Field is Required</p>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        ) : (
          <></>
        )}
        <Row className="px-0">
          <Col md={6} className="mb-3">
            <Form.Group controlId="old_quantity">
              <Form.Label><b>QUANTITY</b></Form.Label>
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
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="old_years">
              <Form.Label><b>YEARS</b></Form.Label>
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
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <Row className="px-0">
          <Col md={12}>
            <Form.Label><b>EQUIPMENT CONDITION PRIOR TO REMOVAL</b></Form.Label> <br />
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
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row className="px-0">
          <Col md={12} className="mb-3">
            <Form.Group controlId="seer">
              <Form.Label><b>SEER</b></Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                required
                disabled={props.no_existing ? true : false}
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
        <Row className="px-0">
          <Col md={12}>
            <Form.Label><b>DISPOSAL PARTY</b></Form.Label> <br />
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
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
            <br />
            {props.disposal_party === "Customer" ? (
              <Form.Group controlId="disposal_slip">
                <ModalImage
                data={{
                  description: "Disposal Receipt",
                  image_sample: "./sample_invoice.png",
                }}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <span>
                <b>DISPOSAL RECEIPT</b>
                <span
                  className="text-secondary mb-1"
                  onClick={() => {
                    setModalData(
                      (p = {
                        description: "DISPOSAL SLIP",
                        image_sample: "./GPADSM5.png",
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
                  onChange={(e) => handleChangeDisposalSlip(e)}
                />
               
              </InputGroup>
              {
                  props.disposal_slip?
                  <>
                    {
                      fileCode ?
                      <>
                      {props.setDisposalSlipD(fileCode)}
                      {console.log(props.disposal_slipD)}
                      <Badge bg={"success"}>File Uploaded</Badge> <br /> 
                      </>
                      :<>no upload</>
                    }
                    Filename: {props.disposal_slip.name} <br />
                    File Type: {props.disposal_slip.type} <br /><br />
                  </>:<></>
              }
            </Form.Group>
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
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row className="px-0">
          <Col md={12}>
            <Form.Group controlId="date" className="mb-3">
              <Form.Label><b>DATE</b></Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                value={props.date}
                onChange={(e) => props.setDate(e.target.value)}
                required
                disabled={props.no_existing ? true : false}
              ></Form.Control>
            </Form.Group>
            {props.no_existing ? (
              <> </>
            ) : props.date === "" ? (
              <p className="validate text-danger">*This Field is Required</p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row className="px-0 pb-3 d-flex justify-content-center">
          <Button
            className="mx-auto"
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
      <Col md={3}></Col>
    </Row>
  );
}

export default ExistingEquipmentInformation;
