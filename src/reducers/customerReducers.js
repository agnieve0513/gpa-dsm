import {
  CUSTOMER_REGISTER_REQUEST,
  CUSTOMER_REGISTER_SUCCESS,
  CUSTOMER_REGISTER_FAIL,
  CUSTOMER_GENERATE_CONTROLNO_REQUEST,
  CUSTOMER_GENERATE_CONTROLNO_SUCCESS,
  CUSTOMER_GENERATE_CONTROLNO_FAIL,
  CUSTOMER_DETAIL_REQUEST,
  CUSTOMER_DETAIL_SUCCESS,
  CUSTOMER_DETAIL_FAIL,
  CUSTOMER_DETAIL_RESET,
  CUSTOMER_EQUIP_MANUFACTURER_REQUEST,
  CUSTOMER_EQUIP_MANUFACTURER_SUCCESS,
  CUSTOMER_EQUIP_MANUFACTURER_FAIL,
  CUSTOMER_EQUIP_MANUFACTURER_RESET,
  CUSTOMER_EQUIP_MODEL_REQUEST,
  CUSTOMER_EQUIP_MODEL_SUCCESS,
  CUSTOMER_EQUIP_MODEL_FAIL,
  CUSTOMER_EQUIP_MODEL_RESET,
  CUSTOMER_EQUIPMENT_DETAIL_REQUEST,
  CUSTOMER_EQUIPMENT_DETAIL_SUCCESS,
  CUSTOMER_EQUIPMENT_DETAIL_FAIL,
  CUSTOMER_EQUIPMENT_DETAIL_RESET,
  CUSTOMER_VERIFY_REQUEST,
  CUSTOMER_VERIFY_SUCCESS,
  CUSTOMER_VERIFY_FAIL,
  CUSTOMER_SYSTEM_TYPE_REQUEST,
  CUSTOMER_SYSTEM_TYPE_SUCCESS,
  CUSTOMER_SYSTEM_TYPE_FAIL,
} from "../constants/customerConstants";

export const customerSystemTypesReducer = (
  state = { system_types: [] },
  action
) => {
  switch (action.type) {
    case CUSTOMER_SYSTEM_TYPE_REQUEST:
      return { loading: true };

    case CUSTOMER_SYSTEM_TYPE_SUCCESS:
      return { loading: false, system_types: action.payload };

    case CUSTOMER_SYSTEM_TYPE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerEquipManufacturersReducer = (
  state = { manufacturers: [] },
  action
) => {
  switch (action.type) {
    case CUSTOMER_EQUIP_MANUFACTURER_REQUEST:
      return { loading: true };

    case CUSTOMER_EQUIP_MANUFACTURER_SUCCESS:
      return { loading: false, manufacturers: action.payload };

    case CUSTOMER_EQUIP_MANUFACTURER_FAIL:
      return { loading: false, error: action.payload };

    case CUSTOMER_EQUIP_MANUFACTURER_RESET:
      return { manufacturers: [] };
    default:
      return state;
  }
};

export const customerVerifyReducer = (
  state = { customer_verification: [] },
  action
) => {
  switch (action.type) {
    case CUSTOMER_VERIFY_REQUEST:
      return { loading: true };

    case CUSTOMER_VERIFY_SUCCESS:
      return { loading: false, customer_verification: action.payload };

    case CUSTOMER_VERIFY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const customerEquipModelReducer = (state = { models: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_EQUIP_MODEL_REQUEST:
      return { loading: true };

    case CUSTOMER_EQUIP_MODEL_SUCCESS:
      return { loading: false, models: action.payload };

    case CUSTOMER_EQUIP_MODEL_FAIL:
      return { loading: false, error: action.payload };

    case CUSTOMER_EQUIP_MODEL_RESET:
      return { models: [] };
    default:
      return state;
  }
};

export const customerEquipmentDetailReducer = (
  state = { equipment_detail: [] },
  action
) => {
  switch (action.type) {
    case CUSTOMER_EQUIPMENT_DETAIL_REQUEST:
      return { loading: true };

    case CUSTOMER_EQUIPMENT_DETAIL_SUCCESS:
      return { loading: false, equipment_detail: action.payload };

    case CUSTOMER_EQUIPMENT_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    case CUSTOMER_EQUIPMENT_DETAIL_RESET:
      return { equipment_detail: [] };
    default:
      return state;
  }
};

export const customerDetailReducer = (
  state = { customer_detail: [] },
  action
) => {
  switch (action.type) {
    case CUSTOMER_DETAIL_REQUEST:
      return { loading: true };

    case CUSTOMER_DETAIL_SUCCESS:
      return { loading: false, customer_detail: action.payload };

    case CUSTOMER_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    case CUSTOMER_DETAIL_RESET:
      return { customer_detail: [] };
    default:
      return state;
  }
};

export const customerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_REGISTER_REQUEST:
      return { loading: true };

    case CUSTOMER_REGISTER_SUCCESS:
      return { loading: false, success: true };

    case CUSTOMER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerGenerateControlNoReducer = (
  state = { customerNo: "" },
  action
) => {
  switch (action.type) {
    case CUSTOMER_GENERATE_CONTROLNO_REQUEST:
      return { loading: true };

    case CUSTOMER_GENERATE_CONTROLNO_SUCCESS:
      return { loading: false, customerNo: action.payload };

    case CUSTOMER_GENERATE_CONTROLNO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
