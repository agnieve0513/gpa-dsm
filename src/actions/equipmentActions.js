import axios from "axios";
import {
  EQUIPMENT_LIST_REQUEST,
  EQUIPMENT_LIST_SUCCESS,
  EQUIPMENT_LIST_FAIL,
  EQUIPMENT_LIST_RESET,
} from "../constants/equipmentConstants";

import { USER_LOGOUT } from "../constants/userConstants";

const URL = process.env.REACT_APP_API_BASE_URL;

export const listEquipments = (application) => async (dispatch, getState) => {
  try {
    let obj = JSON.parse(localStorage.getItem("userInfo"));

    dispatch({
      type: EQUIPMENT_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${obj.message.original.access_token}`,
      },
    };

    const { data } = await axios.get(URL + "/equipments-list", config);

    dispatch({
      type: EQUIPMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EQUIPMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: EQUIPMENT_LIST_RESET });
};
