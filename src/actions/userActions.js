import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  EMAIL_CHANGE_PASSWORD_REQUEST,
  EMAIL_CHANGE_PASSWORD_SUCCESS,
  EMAIL_CHANGE_PASSWORD_FAIL,
} from "../constants/userConstants";

const URL = process.env.REACT_APP_API_BASE_URL;

console.log(URL)

export const emailChangePasswordAction =
  (creds, password) => async (dispatch) => {
    try {
      dispatch({
        type: EMAIL_CHANGE_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      };

      const { data } = await axios.post(
        URL + `/email-reset-password`,
        { creds: creds, password: password },
        config
      );

      dispatch({
        type: EMAIL_CHANGE_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EMAIL_CHANGE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const changePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      let obj = JSON.parse(localStorage.getItem("userInfo"));

      dispatch({
        type: USER_CHANGE_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${obj.message.original.access_token}`,
        },
      };

      const { data } = await axios.post(
        URL +
          `/update-password?userPass=${obj.message.original.userPass}&userId=${obj.message.original.details.id}`,
        { newPass: newPassword, oldPass: oldPassword },
        config
      );

      dispatch({
        type: USER_CHANGE_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_CHANGE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FORGOT_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      URL + "/forgot-password",
      { email: email, link: "https://gparebates.com" },
      // { email: email, link: "https://gparebate3.xtendly.com" },
      config
    );

    dispatch({
      type: USER_FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      URL + "/login",
      { email: email, password: password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    if (data.status !== false) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
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
  dispatch({ type: USER_LIST_RESET });
};

export const register =
  (role_id, name, email, password, role_name) => async (dispatch) => {
    try {
      let obj = JSON.parse(localStorage.getItem("userInfo"));
      if (role_id === 1) {
        role_name = "Admin";
      } else if (role_id === 2) {
        role_name = "Customer Service";
      } else if (role_id === 3) {
        role_name = "Spord";
      } else if (role_id === 4) {
        role_name = "Budget";
      } else if (role_id === 5) {
        role_name = "Accounting";
      } else if (role_id === 6) {
        role_name = "Supervisor";
      } else if (role_id === 7) {
        role_name = "Guest";
      } else {
        role_name = "Unknown Role";
      }

      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${obj.message.original.access_token}`,
        },
      };

      const { data } = await axios.post(
        URL + "/register",
        {
          name: name,
          email: email,
          password: password,
          role_id: role_id,
          role_name: role_name,
        },
        config
      );

      // dispatch({
      //     type: USER_REGISTER_SUCCESS,
      //     payload:data
      // })

      if (data.success) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: data,
        });
      }

      // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const update =
  (id, role_id, name, email, role_name) => async (dispatch) => {
    try {
      let obj = JSON.parse(localStorage.getItem("userInfo"));
      if (role_id === 1) {
        role_name = "Admin";
      } else if (role_id === 2) {
        role_name = "Customer Service";
      } else if (role_id === 3) {
        role_name = "Spord";
      } else if (role_id === 4) {
        role_name = "Budget";
      } else if (role_id === 4) {
        role_name = "Accounting";
      } else if (role_id === 4) {
        role_name = "Supervisor";
      } else if (role_id === 4) {
        role_name = "Guest";
      } else {
        role_name = "Unknown Role";
      }

      dispatch({
        type: USER_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${obj.message.original.access_token}`,
        },
      };

      const { data } = await axios.post(
        URL + "/update-credentials",
        { userid: id, name: name, email: email, role: role_id },
        config
      );

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });

      // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listUsers = (user) => async (dispatch, getState) => {
  try {
    let obj = JSON.parse(localStorage.getItem("userInfo"));

    dispatch({
      type: USER_LIST_REQUEST,
    });

    // const {
    //     userLogin: {userInfo},
    // } = getState()

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${obj.message.original.access_token}`,
      },
    };

    const { data } = await axios.get(URL + "/users", config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data.lists,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    let obj = JSON.parse(localStorage.getItem("userInfo"));

    dispatch({
      type: USER_DELETE_REQUEST,
    });

    // const {
    //     userLogin: {userInfo},
    // } = getState()

    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${obj.message.original.access_token}`,
      },
    };

    const { data } = await axios.post(URL + `/delete-user`, { id: id }, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data.lists,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
};
