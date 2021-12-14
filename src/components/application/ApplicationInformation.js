import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Container,
  Button,
  InputGroup,
  Badge,
  Spinner,
  FormGroup,
} from "react-bootstrap";

import ModalImage from "../ModalImage";
import {
  verifyCustomer,
  loadCustomerDetail,
} from "../../actions/customerAction";

import city_zipcode from "./source_files/city_zipcode";

import "./ApplicationInformation.css";

import { useDispatch, useSelector } from "react-redux";
import { uploadFileAction } from "../../actions/fileActions";

import { useWindowDimensions } from "../../hooks";
import {
  colors,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  withStyles,
} from "@material-ui/core";

function ApplicationInformation(props) {
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({
    description: "",
    image_sample: "",
  });

  const [verifyClicked, setVerifyClicked] = useState(false);

  const dispatch = useDispatch();
  let pp = {};
  let p = {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const customerVerify = useSelector((state) => state.customerVerify);
  const {
    loading: verifyLoading,
    error: verifyError,
    success: verifySuccess,
    customer_verification,
  } = customerVerify;

  const customerDetail = useSelector((state) => state.customerDetail);
  const {
    loading: customerLoading,
    error: customerError,
    customer_detail,
  } = customerDetail;

  const uploadFile = useSelector((state) => state.uploadFile);
  const { loading: uploadLoading, error: uploadError, fileCode } = uploadFile;

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const changeZipCode = (e) => {
    props.setCityVillage(e.target.value);
    const result = city_zipcode.find((p) => p._id === e.target.value);

    if (result) {
      props.setZipCode(result.zip_code);
    }
  };

  const verifyCustomerHandler = () => {
    if (props.bill_id !== "" && props.account_no !== "") {
      dispatch(loadCustomerDetail(props.bill_id, props.account_no));
      setVerifyClicked(true);
    } else {
      alert("Account Number & Bill ID is required to verify customer");
    }
  };

  const handleFocus = () => {
    console.log("focused!");
  };

  const handleNumericFields = (input, propVar) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (input.value === "" || re.test(input.value)) {
      props[propVar](input.value);
    }
  };

  const today = new Date();
  let years = [];
  for (var i = today.getFullYear(); i >= 1950; i--) {
    years.push(i);
  }

  const handleSubmitLOA = () => {};

  const handleChangeLOA = (e) => {
    props.setLetterAuthorization(e.target.files[0]);
    dispatch(
      uploadFileAction(
        e.target.files[0],
        "letter_of_authorization",
        props.control_no
      )
    );
  };

  const { height, width } = useWindowDimensions();
  const screenWidthM = width > 425;
  const screenWidthT = width >= 768;

  const ownerComponentDesktop = () => (
    <Row className="flex-row">
      <Form.Check
        inline
        label="Yes"
        name="is_applicant_owner"
        type={"radio"}
        id={`inline-${"radio"}-1`}
        value="true"
        checked={"true" === props.is_applicant_owner}
        onChange={(e) => props.setIsApplicantOwner(e.target.value)}
        className="w-auto"
        disabled={props.verify ? false : true}
      />
      <Form.Check
        inline
        label="No"
        name="is_applicant_owner"
        type={"radio"}
        value="false"
        checked={"false" === props.is_applicant_owner}
        onChange={(e) => props.setIsApplicantOwner(e.target.value)}
        className="w-auto"
        disabled={props.verify ? false : true}
      />
    </Row>
  );

  function handleToggleSwitchOwner() {
    if (props.is_applicant_owner) {
      props.setIsApplicantOwner(false);
    } else {
      props.setIsApplicantOwner(true);
    }
  }

  const ownerComponentMobile = () => (
    <Row className="d-flex flex-row">
      <p className="px-0 w-auto my-0 text-end align-self-center">No</p>
      <Switch
        checked={props.is_applicant_owner}
        onClick={handleToggleSwitchOwner}
        disabled={props.verify ? false : true}
      />
      <p className="px-0 w-auto my-0 text-start align-self-center">Yes</p>
    </Row>
  );

  const homeComponentMobile = () => (
    <Col md={12}>
      <br />
      <FormControl fullWidth>
        <Form.Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.home_type}
          label="Age"
          onChange={(e) => props.setHomeType(e.target.value)}
          disabled={props.verify ? false : true}
        >
          <option defaultValue hidden>
            SELECT SYSTEM TYPE
          </option>
          {
            <>
              <option value={"Single Family"}>Single Family</option>
              <option value={"Apartment"}>Apartment</option>
              <option value={"Condo"}>Condo</option>
              <option value={"Mobile Home"}>Mobile Home</option>
              <option value={"Other"}>Other</option>
            </>
          }
        </Form.Select>
      </FormControl>
    </Col>
  );

  const homeComponentDesktop = () => (
    <Col md={12}>
      <br />
      <Form.Check
        inline
        label="Single Family"
        name="home_type"
        type={"radio"}
        value="Single Family"
        checked={"Single Family" === props.home_type}
        onChange={(e) => props.setHomeType(e.target.value)}
        disabled={props.verify ? false : true}
      />
      <Form.Check
        inline
        label="Apartment"
        name="home_type"
        type={"radio"}
        value="Apartment"
        checked={"Apartment" === props.home_type}
        onChange={(e) => props.setHomeType(e.target.value)}
        disabled={props.verify ? false : true}
      />
      <Form.Check
        inline
        label="Condo"
        name="home_type"
        type={"radio"}
        value="Condo"
        checked={"Condo" === props.home_type}
        onChange={(e) => props.setHomeType(e.target.value)}
        disabled={props.verify ? false : true}
      />
      <Form.Check
        inline
        label="Mobile Home"
        name="home_type"
        type={"radio"}
        value="Mobile Home"
        checked={"Mobile Home" === props.home_type}
        onChange={(e) => props.setHomeType(e.target.value)}
        disabled={props.verify ? false : true}
      />
      <Form.Check
        inline
        label="Other"
        name="home_type"
        type={"radio"}
        value="Other"
        checked={"Other" === props.home_type}
        onChange={(e) => props.setHomeType(e.target.value)}
        disabled={props.verify ? false : true}
      />
    </Col>
  );

  const handleToggleSwitchNew = () => {
    if (props.is_new_construction) {
      props.setIsNewConstruction(false);
    } else {
      props.setIsNewConstruction(true);
    }
  };

  const newComponentMobile = () => (
    <Row className="d-flex flex-row">
      <p className="px-0 w-auto my-0 text-end align-self-center">No</p>
      <Switch
        checked={props.is_new_construction}
        onClick={handleToggleSwitchNew}
        disabled={props.verify ? false : true}
      />
      <p className="px-0 w-auto my-0 text-start align-self-center">Yes</p>
    </Row>
  );

  const newComponentDesktop = () => (
    <Row>
      <Form.Check
        inline
        label="Yes"
        name="is_new_construction"
        type={"radio"}
        value="true"
        checked={"true" === props.is_new_construction}
        onChange={(e) => props.setIsNewConstruction(e.target.value)}
        disabled={props.verify ? false : true}
      />
      <Form.Check
        inline
        label="No"
        name="is_new_construction"
        type={"radio"}
        value="false"
        checked={"false" === props.is_new_construction}
        onChange={(e) => props.setIsNewConstruction(e.target.value)}
        disabled={props.verify ? false : true}
      />
    </Row>
  );

  return (
    <Container>
      <ModalImage
        data={modalData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {screenWidthM ? (
        <h4 className="text-center text-info mb-4 h6 " id="blueHeader">
          APPLICANT'S INFORMATION
        </h4>
      ) : (
        <></>
      )}
      <Row>
        <Col className="mx-auto" md={10}>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="account_no">
                  <Form.Label className="d-flex justify-content-between applicationTitle">
                    GPA ELECTRIC ACCOUNT NUMBER
                    <span
                      className="text-secondary"
                      onClick={() => {
                        setModalData(
                          (p = {
                            description: "GPA ACCOUNT NUMBER",
                            image_sample: "./GPADSM1.png",
                          })
                        );
                        setModalShow(true);
                      }}
                    >
                      <i className="fa fa-question-circle"></i>{" "}
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) =>
                      handleNumericFields(e.target, "setAccountNo")
                    }
                    maxLength="10"
                    value={props.account_no}
                    required
                  ></Form.Control>
                </Form.Group>
                {props.account_no === "" ? (
                  <p className="validate text-danger requiredField requiredField">
                    *This Field is Required
                  </p>
                ) : verifyClicked ? (
                  customerLoading ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : customerError ? (
                    <>
                      {props.setVerify(false)}
                      <span className="text-danger">Customer Not Verified</span>
                    </>
                  ) : (
                    <>
                      {props.setVerify(true)}

                      {customer_detail.type ? (
                        <>
                          {props.setCustomerType(
                            customer_detail.type.original.message
                          )}
                          <span className="text-success">
                            Customer is Verified
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  )
                ) : (
                  <></>
                )}
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="bill_id">
                  <Form.Label className="d-flex justify-content-between applicationTitle">
                    BILL ID (Last 5 Digits)
                    <span
                      className="text-secondary"
                      onClick={() => {
                        setModalData(
                          (pp = {
                            description: "Bill ID",
                            image_sample: "./GPADSM3.png",
                          })
                        );
                        setModalShow(true);
                      }}
                    >
                      <i className="fa fa-question-circle"></i>
                    </span>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder=""
                      onChange={(e) =>
                        handleNumericFields(e.target, "setBillId")
                      }
                      value={props.bill_id}
                      required
                      maxLength="5"
                    />
                    <Button
                      onClick={() => verifyCustomerHandler()}
                      variant="danger"
                      id="button-addon2"
                    >
                      Verify
                    </Button>
                  </InputGroup>
                </Form.Group>
                {props.bill_id === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <span>
                  <b>
                    <p id="accountName">GPA Account's Name :</p>{" "}
                    {customer_detail
                      ? customer_detail.info
                        ? customer_detail.info["@attributes"].Name
                        : ""
                      : ""}{" "}
                  </b>
                </span>
                <hr />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="first Name">
                  <Form.Label className=" applicationTitle">
                    FIRST NAME
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) => props.setFirstname(e.target.value)}
                    value={props.firstname}
                    required
                    disabled={props.verify ? false : true}
                  ></Form.Control>
                </Form.Group>
                {props.firstname === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group controlId="lastname">
                  <Form.Label className=" applicationTitle">
                    LAST NAME
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) => props.setLastname(e.target.value)}
                    value={props.lastname}
                    required
                    disabled={props.verify ? false : true}
                  ></Form.Control>
                </Form.Group>
                {props.lastname === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
              <Col md={2} className="mb-3">
                <Form.Group controlId="middlename">
                  <Form.Label className=" applicationTitle">
                    M. I.
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) => props.setMiddlename(e.target.value)}
                    value={props.middlename}
                    required
                    disabled={props.verify ? false : true}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group controlId="service_location">
                  <Form.Label className=" applicationTitle">
                      SERVICE LOCATION (Address where equipment was installed)*
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) => props.setServiceLocation(e.target.value)}
                    value={props.service_location}
                    required
                    disabled={props.verify ? false : true}
                  ></Form.Control>
                </Form.Group>
                {props.service_location === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="city_village">
                  <Form.Label className=" applicationTitle">
                    CITY/VILLAGE
                  </Form.Label>
                  <Form.Select
                    onChange={(e) => changeZipCode(e)}
                    value={props.city_village}
                    disabled={props.verify ? false : true}
                  >
                    <option />
                    {city_zipcode.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.village}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                {props.city_village === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="zip_code">
                  <Form.Label className=" applicationTitle">
                    ZIP CODE
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) =>
                      handleNumericFields(e.target, "setZipCode")
                    }
                    value={props.zipcode}
                    required
                    disabled={props.verify ? false : true}
                  ></Form.Control>
                </Form.Group>
                {props.zipcode === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="email">
                  <Form.Label className=" applicationTitle">
                    EMAIL{" "}
                    <small className="text-muted">
                      (We will be sending updates to this E-mail)
                    </small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) => props.setEmail(e.target.value)}
                    value={props.email}
                    disabled={props.verify ? false : true}
                  ></Form.Control>
                </Form.Group>
                {props.email === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group controlId="telephone_no">
                  <Form.Label className=" applicationTitle">
                    CONTACT NUMBER
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) => handleNumericFields(e.target, "setTelNo")}
                    maxLength="10"
                    value={props.tel_no}
                    disabled={props.verify ? false : true}
                  ></Form.Control>
                </Form.Group>
                {props.tel_no === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : props.tel_no.length < 10 ? (
                  <>
                    <p className="validate text-danger requiredField">
                      *This Field requires 10 digits
                    </p>
                  </>
                ) : props.tel_no.length > 10 ? (
                  <>
                    <p className="validate text-danger requiredField">
                      *This Field required 10 digits
                    </p>
                  </>
                ) : (
                  ""
                )}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <p>
                  Applicant must be either the GPA account holder or the
                  property owner to claim a rebate. Is applicant the owner of
                  the residential property?
                </p>
              </Col>
              <Col md={6} className="mb-3">
                {screenWidthT
                  ? ownerComponentDesktop()
                  : ownerComponentMobile()}
                <br />
                {props.is_applicant_owner === "true" || !props.is_applicant_owner ? (
                  <Form.Group controlId="telephone_no">
                    <Form.Label className=" applicationTitle">
                      Upload LOA
                      <span
                        className="text-secondary"
                        onClick={() => {
                          setModalData(
                            (p = {
                              description: "LOA",
                              image_sample: "./GPADSM7.png",
                            })
                          );
                          setModalShow(true);
                        }}
                      >
                        <i className="fa fa-question-circle"></i>{" "}
                      </span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        name="file"
                        placeholder="Upload Lettter of Authorization"
                        type="file"
                        onChange={(e) => handleChangeLOA(e)}
                      />
                    </InputGroup>
                    {props.letter_authorization === null ? (
                      <p className="validate text-danger requiredField">
                        *This Field is Required
                      </p>
                    ) : (
                      <></>
                    )}
                    {props.letter_authorization ? (
                      <>
                        {fileCode ? (
                          <>
                            {fileCode.length !== 0 ? (
                              <>
                                {props.setLetterAuthorizationD(fileCode)}
                                {console.log("File Code: ", fileCode)}
                                {console.log(props.letter_authorizationD)}
                                <Badge bg={"success"}>File Uploaded</Badge>{" "}
                                <br />
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                        Filename: {props.letter_authorization.name} <br />
                        File Type: {props.letter_authorization.type} <br />
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                  </Form.Group>
                ) : (
                  <></>
                )}
                {/* {props.is_applicant_owner == undefined ? (
                    <p className="validate text-danger requiredField">*This Field is Required</p>
                  ) : (
                    <></>
                )} */}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                An Exception may be made if the tenant or property owner
                representative provides an authorization letter with a copy of
                photo I.D. Residential customers with Commercial Accounts must
                provide proof of residency in order to participate in this
                rebate program. Condominium or property managers may apply for
                tennants.
              </Col>
            </Row>

            <Row>
              <Col md={12} className="mb-3">
                <Form.Group controlId="mailing_address">
                  <Form.Label className=" applicationTitle">
                      MAILING ADDRESS (Current address where we will send your
                      rebate check)*
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) => props.setMailingAddress(e.target.value)}
                    value={props.mailing_address}
                    required
                    disabled={props.verify ? false : true}
                  ></Form.Control>
                </Form.Group>
                {props.mailing_address === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={4} className="mb-3">
                <Form.Group controlId="mailing_country">
                  <Form.Label className=" applicationTitle">
                    COUNTRY
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) => props.setMailingCountry(e.target.value)}
                    value={props.mailing_country}
                    required
                    disabled={props.verify ? false : true}
                  ></Form.Control>
                </Form.Group>
                {props.mailing_country === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group controlId="mailing_city_village">
                  <Form.Label className=" applicationTitle">
                    CITY/VILLAGE
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) =>
                      props.setMailingCityVillage(e.target.value)
                    }
                    value={props.mailing_city_village}
                    required
                    disabled={props.verify ? false : true}
                  ></Form.Control>
                </Form.Group>
                {props.mailing_city_village === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group controlId="mailing_zipcode">
                  <Form.Label className=" applicationTitle">
                    ZIP CODE
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    onChange={(e) =>
                      handleNumericFields(e.target, "setMailingZipCode")
                    }
                    value={props.mailing_zipcode}
                    required
                    disabled={props.verify ? false : true}
                  ></Form.Control>
                </Form.Group>
                {props.mailing_zipcode === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group controlId="home_size">
                  <Form.Label className=" applicationTitle">
                    HOME SIZE (approx.sq ft.)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={props.home_size}
                    required
                    disabled={props.verify ? false : true}
                    onChange={(e) =>
                      handleNumericFields(e.target, "setHomeSize")
                    }
                    maxLength="6"
                  ></Form.Control>
                </Form.Group>
                {props.home_size === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group controlId="home_age">
                  <Form.Label className=" applicationTitle">
                    YEAR BUILT
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={props.home_age}
                    required
                    disabled={props.verify ? false : true}
                    onChange={(e) =>
                      handleNumericFields(e.target, "setHomeAge")
                    }
                    maxLength="4"
                  ></Form.Control>
                </Form.Group>
                {props.home_age === "" ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label className=" applicationTitle">
                  NEW CONSTRUCTION
                </Form.Label>{" "}
                <br />
                {screenWidthM ? newComponentDesktop() : newComponentMobile()}
                {!props.is_new_construction && !props.verify ? (
                  <p className="validate text-danger requiredField">
                    *This Field is Required
                  </p>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
            <Row>
              <Form.Label className="applicationTitle">
                HOME TYPE (check one)
              </Form.Label>{" "}
              {screenWidthM ? homeComponentDesktop() : homeComponentMobile()}
              {props.home_type === "" ? (
                <p className="validate text-danger requiredField">*This Field is Required</p>
              ) : (
                <></>
              )}
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ApplicationInformation;
