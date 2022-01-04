import axios from "axios";
import {
  APPLICATION_LIST_REQUEST,
  APPLICATION_LIST_SUCCESS,
  APPLICATION_LIST_FAIL,
  APPLICATION_LIST_RESET,
  APPLICATION_LIST_RECORD_REQUEST,
  APPLICATION_LIST_RECORD_SUCCESS,
  APPLICATION_LIST_RECORD_FAIL,
  APPLICATION_LIST_RECORD_RESET,
  APPLICATION_DETAIL_REQUEST,
  APPLICATION_DETAIL_SUCCESS,
  APPLICATION_DETAIL_FAIL,
  APPLICATION_COMMENTS_REQUEST,
  APPLICATION_COMMENTS_SUCCESS,
  APPLICATION_COMMENTS_FAIL,
  APPLICATION_COMMENTS_RESET,
  APPLICATION_LOGS_REQUEST,
  APPLICATION_LOGS_SUCCESS,
  APPLICATION_LOGS_FAIL,
  APPLICATION_LOGS_RESET,
  APPLICATION_UPDATE_REQUEST,
  APPLICATION_UPDATE_SUCCESS,
  APPLICATION_UPDATE_FAIL,
  APPLICATION_TRACK_REQUEST,
  APPLICATION_TRACK_SUCCESS,
  APPLICATION_TRACK_FAIL,
  COMMENT_ADD_REQUEST,
  COMMENT_ADD_SUCCESS,
  COMMENT_ADD_FAIL,
  APPLICATION_DETAIL_PRINT_REQUEST,
  APPLICATION_DETAIL_PRINT_SUCCESS,
  APPLICATION_DETAIL_PRINT_FAIL,
  APPLICATION_DETAIL_PRINT_RESET,
} from "../constants/applicationConstants";

import { USER_LOGOUT } from "../constants/userConstants";

const URL = "https://gpadev-api-rebate.xtendly.com/api/v1";

export const trackApplications = (control_no) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPLICATION_TRACK_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      URL + "/view-application",
      { controlNo: control_no },
      config
    );

    dispatch({
      type: APPLICATION_TRACK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPLICATION_TRACK_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
};

export const listApplications = () => async (dispatch, getState) => {
  try {
    let obj = JSON.parse(localStorage.getItem("userInfo"));

    dispatch({
      type: APPLICATION_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${obj.message.original.access_token}`,
      },
    };

    const { data } = await axios.post(
      URL + "/application-list",
      { roleId: obj.message.original.roleId },
      config
    );

    dispatch({
      type: APPLICATION_LIST_SUCCESS,
      payload: data.table,
    });
  } catch (error) {
    dispatch({
      type: APPLICATION_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
};

export const listApplicationsRecords = () => async (dispatch, getState) => {
  try {
    let obj = JSON.parse(localStorage.getItem("userInfo"));

    dispatch({
      type: APPLICATION_LIST_RECORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${obj.message.original.access_token}`,
      },
    };

    const { data } = await axios.post(URL + "/records", { roleId: 1 }, config);

    dispatch({
      type: APPLICATION_LIST_RECORD_SUCCESS,
      payload: data.table,
    });
  } catch (error) {
    dispatch({
      type: APPLICATION_LIST_RECORD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
};

export const logsApplication =
  (application_id) => async (dispatch, getState) => {
    try {
      let obj = JSON.parse(localStorage.getItem("userInfo"));

      dispatch({
        type: APPLICATION_LOGS_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${obj.message.original.access_token}`,
        },
      };

      const { data } = await axios.post(
        URL + "/log-list",
        { applicationId: application_id },
        config
      );

      dispatch({
        type: APPLICATION_LOGS_SUCCESS,
        payload: data.table,
      });
    } catch (error) {
      dispatch({
        type: APPLICATION_LOGS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.reponse.data.detail
            : error.message,
      });
    }
  };

export const commentsApplication =
  (application_id) => async (dispatch, getState) => {
    try {
      let obj = JSON.parse(localStorage.getItem("userInfo"));

      dispatch({
        type: APPLICATION_COMMENTS_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${obj.message.original.access_token}`,
        },
      };

      const { data } = await axios.post(
        URL + "/comment-list",
        { applicationId: application_id },
        config
      );

      dispatch({
        type: APPLICATION_COMMENTS_SUCCESS,
        payload: data.table,
      });
    } catch (error) {
      dispatch({
        type: APPLICATION_COMMENTS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.reponse.data.detail
            : error.message,
      });
    }
  };

export const detailApplication = (application_id) => async (dispatch) => {
  try {
    let obj = JSON.parse(localStorage.getItem("userInfo"));

    dispatch({
      type: APPLICATION_DETAIL_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${obj.message.original.access_token}`,
      },
    };

    const { data } = await axios.post(
      URL + "/view-information",
      { applicationId: application_id },
      config
    );

    dispatch({
      type: APPLICATION_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPLICATION_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
};

export const printDetailApplication = (controlNo) => async (dispatch) => {
  try {
    dispatch({
      type: APPLICATION_DETAIL_PRINT_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      URL + "/print",
      { controlNo: controlNo },
      config
    );

    dispatch({
      type: APPLICATION_DETAIL_PRINT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPLICATION_DETAIL_PRINT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
};

export const addCommentAction =
  (applicationId, comment) => async (dispatch) => {
    try {
      let obj = JSON.parse(localStorage.getItem("userInfo"));

      dispatch({
        type: COMMENT_ADD_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${obj.message.original.access_token}`,
        },
      };

      const { data } = await axios.post(
        URL + "/add-comment",
        {
          applicationId: applicationId,
          UserId: obj.message.original.details.id,
          comment: comment,
        },
        config
      );

      dispatch({
        type: COMMENT_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMMENT_ADD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const updateBatchApplication =
  (applicationId, status, stage, reason, batchId) => async (dispatch) => {
    try {
      let obj = JSON.parse(localStorage.getItem("userInfo"));

      dispatch({
        type: APPLICATION_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${obj.message.original.access_token}`,
        },
      };

      const { data } = await axios.post(
        URL + "/batch-update",
        {
          applicationId: applicationId,
          UserId: obj.message.original.details.id,
          status: status,
          stage: stage,
          reasonId: parseInt(reason),
          batchId: batchId,
        },
        config
      );

      dispatch({
        type: APPLICATION_UPDATE_SUCCESS,
        payload: data,
      });

      // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: APPLICATION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const updateApplication =
  (applicationId, status, stage, reason, batchId) => async (dispatch) => {
    try {
      let obj = JSON.parse(localStorage.getItem("userInfo"));

      dispatch({
        type: APPLICATION_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${obj.message.original.access_token}`,
        },
      };

      const { data } = await axios.post(
        URL + "/update-status",
        {
          applicationId: applicationId,
          UserId: obj.message.original.details.id,
          status: status,
          stage: stage,
          reasonId: parseInt(reason),
          batchId: batchId,
        },
        config
      );

      dispatch({
        type: APPLICATION_UPDATE_SUCCESS,
        payload: data,
      });

      // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: APPLICATION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: APPLICATION_LIST_RESET });
  dispatch({ type: APPLICATION_COMMENTS_RESET });
  dispatch({ type: APPLICATION_LOGS_RESET });
  dispatch({ type: APPLICATION_LIST_RECORD_RESET });
  dispatch({ type: APPLICATION_DETAIL_PRINT_RESET });
};
