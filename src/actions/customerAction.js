import axios from "axios";
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
  CUSTOMER_EQUIP_MANUFACTURER_REQUEST,
  CUSTOMER_EQUIP_MANUFACTURER_SUCCESS,
  CUSTOMER_EQUIP_MANUFACTURER_FAIL,
  CUSTOMER_EQUIP_MODEL_REQUEST,
  CUSTOMER_EQUIP_MODEL_SUCCESS,
  CUSTOMER_EQUIP_MODEL_FAIL,
  CUSTOMER_EQUIPMENT_DETAIL_REQUEST,
  CUSTOMER_EQUIPMENT_DETAIL_SUCCESS,
  CUSTOMER_EQUIPMENT_DETAIL_FAIL,
  CUSTOMER_VERIFY_REQUEST,
  CUSTOMER_VERIFY_SUCCESS,
  CUSTOMER_VERIFY_FAIL,
  CUSTOMER_SYSTEM_TYPE_REQUEST,
  CUSTOMER_SYSTEM_TYPE_SUCCESS,
  CUSTOMER_SYSTEM_TYPE_FAIL
} from "../constants/customerConstants";

const URL = process.env.REACT_APP_API_BASE_URL;


export const register = (obj) => async (dispatch) => {
  try {
    dispatch({
      type: CUSTOMER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(URL + "/create-application", obj, config);

    dispatch({
      type: CUSTOMER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const generateControlNo = () => async (dispatch) => {
  try {
    dispatch({
      type: CUSTOMER_GENERATE_CONTROLNO_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };

    const { data } = await axios.get(URL + "/generate-controlno", config);

    dispatch({
      type: CUSTOMER_GENERATE_CONTROLNO_SUCCESS,
      payload: data.control_no,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_GENERATE_CONTROLNO_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const loadCustomerSystemType = (customer_type) => async (dispatch, getState) => {

  // customer_type = "E-COM1";
  if(customer_type === "COMM")
  {
    customer_type = "E-COM1";
  }
  try {
    dispatch({
      type: CUSTOMER_SYSTEM_TYPE_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      URL + `/fetch-system-type-guam?resType=${customer_type}`,
      config
    );

    dispatch({
      type: CUSTOMER_SYSTEM_TYPE_SUCCESS,
      payload: data.system_type,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_SYSTEM_TYPE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
}

export const loadCustomerEquipManufacturer =
  (system_type) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOMER_EQUIP_MANUFACTURER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get(URL + `/fetch-equipment-guam?system_type=${system_type}`, config);

      dispatch({
        type: CUSTOMER_EQUIP_MANUFACTURER_SUCCESS,
        payload: data.equipments,
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_EQUIP_MANUFACTURER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.reponse.data.detail
            : error.message,
      });
    }
  };

export const loadCustomerEquipModel =
  (system_type, manufacturer) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOMER_EQUIP_MODEL_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get(
        URL + `/fetch-equipment-guam?system_type=${system_type}&vendor=${manufacturer}`,
        config
      );

      dispatch({
        type: CUSTOMER_EQUIP_MODEL_SUCCESS,
        payload: data.equipments,
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_EQUIP_MODEL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.reponse.data.detail
            : error.message,
      });
    }
  };

export const verifyCustomer = (accountId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CUSTOMER_VERIFY_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      URL + "/verify-account-id?accountId=" + accountId,
      config
    );

    dispatch({
      type: CUSTOMER_VERIFY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_VERIFY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
};

export const loadCustomerDetail =
  (bill_id, account_no) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOMER_DETAIL_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get(
        URL + `/verify-bill-id`,
        {
          params: {
            accountId: account_no,
            billId: bill_id,
          },
        },
        config
      );
        console.log("verification success",data.info)
      dispatch({
        type: CUSTOMER_DETAIL_SUCCESS,
        payload: data,
        // payload: data.info["@attributes"]
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_DETAIL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.reponse.data.detail
            : error.message,
      });
    }
  };

export const loadCustomerEquipmentDetail =
  (model_id,res_type) => async (dispatch, getState) => {
     if (res_type === "COMM") {
       res_type = "E-COM1";
     }

    try {
      dispatch({
        type: CUSTOMER_EQUIPMENT_DETAIL_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get(
        URL + `/fetch-equipment-details-guam?id=${model_id}&resType=${res_type}`,
        config
      );

      dispatch({
        type: CUSTOMER_EQUIPMENT_DETAIL_SUCCESS,
        payload: data.equipment_details,
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_EQUIPMENT_DETAIL_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.reponse.data.detail
            : error.message,
      });
    }
  };
