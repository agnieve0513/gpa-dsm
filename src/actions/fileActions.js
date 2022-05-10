import axios from "axios";
import {
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAIL,
  FILE_RETRIEVE_REQUEST,
  FILE_RETRIEVE_SUCCESS,
  FILE_RETRIEVE_FAIL,
  PDF_RETRIEVE_REQUEST,
  PDF_RETRIEVE_SUCCESS,
  PDF_RETRIEVE_FAIL,
  LOG_FILE_REQUEST,
  LOG_FILE_SUCCESS,
  LOG_FILE_FAIL,
  UPDATE_FILE_REQUEST,
  UPDATE_FILE_SUCCESS,
  UPDATE_FILE_FAIL,
} from "../constants/fileConstants";

const URL = process.env.REACT_APP_API_BASE_URL;


export const uploadFileAction =
  (filepath, doctype, controlNo, UserId, on_edit) => async (dispatch) => {
      console.log(on_edit)
    try {
      dispatch({
        type: FILE_UPLOAD_REQUEST,
      });

      let bodyFormData = new FormData();
      bodyFormData.append("doctype", doctype);
      bodyFormData.append("controlNo", controlNo);
      bodyFormData.append("filepath", filepath);
      bodyFormData.append("UserId", UserId);

      


      if(on_edit == true){
        let obj = JSON.parse(localStorage.getItem("userInfo"));
        
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const { data } = await axios.post(
          URL + "/upload-file",
          bodyFormData,
          config
        );
      console.log("Response from upload: ", data);

        const config2 = {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${obj.message.original.access_token}`,
          },
        };

        const { data2 } = await axios.post(
          URL + "/edit-file",
          {
            controlNo: controlNo,
            filepath: data.message,
            type: doctype,
          },
          config2
        );

        console.log("Response from data2: ", data2);

        
         dispatch({
           type: FILE_UPLOAD_SUCCESS,
           payload: data2,
         });
      }
      else{
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const { data } = await axios.post(
          URL + "/upload-file",
          bodyFormData,
          config
        );
        dispatch({
          type: FILE_UPLOAD_SUCCESS,
          payload: data.message,
        });
      }

     
    } catch (error) {
      console.log(error.message);

      dispatch({
        type: FILE_UPLOAD_FAIL,
        payload: error.message
      });
    }
  };

export const retrieveFileAction = (message, filename) => async (dispatch) => {
  try {
    let obj = JSON.parse(localStorage.getItem("userInfo"));

    dispatch({
      type: FILE_RETRIEVE_REQUEST,
    });

    const res = await fetch(`${URL}/retrieve-file`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${obj.message.original.access_token}`,
      },
      body: JSON.stringify({
        filepath: message,
      }),
    });
    const data = await res.blob();
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${filename}.${data.type.substr(data.type.indexOf("/") + 1)}`
    );
    document.body.appendChild(link);
    link.click();

    dispatch({
      type: FILE_RETRIEVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FILE_RETRIEVE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const retrievePdfAction = (message) => async (dispatch) => {
  try {
    dispatch({
      type: PDF_RETRIEVE_REQUEST,
    });

    const res = await fetch(`${URL}/retrieve-pdf-file`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        type: message + ".pdf",
      }),
    });
    const data = await res.blob();
    // const url = window.URL.createObjectURL(data);
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute(
    //   "download",
    //   `file.${data.type.substr(data.type.indexOf("/") + 1)}`
    // );
    // document.body.appendChild(link);
    // link.click();

    dispatch({
      type: PDF_RETRIEVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PDF_RETRIEVE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logsFileAction = () => async (dispatch, getState) => {
  try {
    let obj = JSON.parse(localStorage.getItem("userInfo"));

    dispatch({
      type: LOG_FILE_REQUEST,
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
      { applicationId: "TNC" },
      config
    );

    dispatch({
      type: LOG_FILE_SUCCESS,
      payload: data.table,
    });
  } catch (error) {
    dispatch({
      type: LOG_FILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
};


export const updateFileAction =
  (control_number, file_path, type) => async (dispatch, getState) => {
    try {
      let obj = JSON.parse(localStorage.getItem("userInfo"));

      dispatch({
        type: UPDATE_FILE_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${obj.message.original.access_token}`,
        },
      };

      const { data } = await axios.post(
        URL + "/edit-file",
        { controlNo: control_number, filepath: file_path, type: type },
        config
      );

      dispatch({
        type: UPDATE_FILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_FILE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.reponse.data.detail
            : error.message,
      });
    }
  };