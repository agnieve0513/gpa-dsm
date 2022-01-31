import axios from "axios";
import {
  BATCH_ADD_REQUEST,
  BATCH_ADD_SUCCESS,
  BATCH_ADD_FAIL,
  BATCH_LIST_REQUEST,
  BATCH_LIST_SUCCESS,
  BATCH_LIST_FAIL,
  BATCH_LIST_RESET,
  BATCH_APPLICATION_REQUEST,
  BATCH_APPLICATION_SUCCESS,
  BATCH_APPLICATION_FAIL,
  BATCH_APPLICATION_RESET,
  BATCH_CURRENT_REQUEST,
  BATCH_CURRENT_SUCCESS,
  BATCH_CURRENT_FAIL,
} from "../constants/batchConstants";

import { USER_LOGOUT } from "../constants/userConstants";

const URL = "https://gpadev-api-rebate.xtendly.com/api/v1";

export const addNewBatch = () => async (dispatch, getState) => {
  try {
    let obj = JSON.parse(localStorage.getItem("userInfo"));

    dispatch({
      type: BATCH_ADD_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${obj.message.original.access_token}`,
      },
    };

    const { data } = await axios.post(
      URL + "/batch-add",
      { roleId: obj.message.original.roleId },
      config
    );

    dispatch({
      type: BATCH_ADD_SUCCESS,
      payload: data.table,
    });
  } catch (error) {
    dispatch({
      type: BATCH_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
};

export const listBatch = () => async (dispatch, getState) => {
  try {
    let obj = JSON.parse(localStorage.getItem("userInfo"));

    dispatch({
      type: BATCH_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${obj.message.original.access_token}`,
      },
    };

    const { data } = await axios.post(
      URL + "/batch-list",
      {
        roleId:
          obj.message.original.roleId === 3 ? 1 : obj.message.original.roleId,
      },
      config
    );

    dispatch({
      type: BATCH_LIST_SUCCESS,
      payload: data.table,
    });
  } catch (error) {
    dispatch({
      type: BATCH_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
};

export const listBatchApplication =
  (batch_id) => async (dispatch, getState) => {
    try {
      let obj = JSON.parse(localStorage.getItem("userInfo"));

      dispatch({
        type: BATCH_APPLICATION_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${obj.message.original.access_token}`,
        },
      };

      const { data } = await axios.post(
        URL + "/batch-list-app",
        { batchId: batch_id },
        config
      );

      dispatch({
        type: BATCH_APPLICATION_SUCCESS,
        payload: data.table,
      });
    } catch (error) {
      dispatch({
        type: BATCH_APPLICATION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.reponse.data.detail
            : error.message,
      });
    }
  };

//

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: BATCH_LIST_RESET });
  dispatch({ type: BATCH_APPLICATION_RESET });
};
