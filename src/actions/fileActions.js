
import axios from 'axios'
import {
    FILE_UPLOAD_REQUEST,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_FAIL,
    FILE_RETRIEVE_REQUEST,
    FILE_RETRIEVE_SUCCESS,
    FILE_RETRIEVE_FAIL 
} from '../constants/fileConstants'

const URL = 'https://gpadev-api-rebate.xtendly.com/api/v1'

export const uploadFileAction = (filepath, doctype, controlNo) => async (dispatch) => {
    try{

        dispatch({
            type: FILE_UPLOAD_REQUEST
        })

        let bodyFormData = new FormData();
        bodyFormData.append('doctype', doctype);
        bodyFormData.append('controlNo', controlNo);
        bodyFormData.append('filepath', filepath);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }

        
        const {data} = await axios.post(URL+'/upload-file',
        bodyFormData,
        config
        )

        dispatch({
            type: FILE_UPLOAD_SUCCESS,
            payload:data.message
        })

    }catch(error)
    {
        dispatch({
            type: FILE_UPLOAD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const retrieveFileAction = (message) => async (dispatch) => {
    try{

        let obj = JSON.parse(localStorage.getItem('userInfo'));

        dispatch({
            type: FILE_RETRIEVE_REQUEST
        })
        
        const config = {
            headers: {
                'Content-type':'application/json',
                "Accept": "application/json",
                'Authorization' : `Bearer ${obj.message.original.access_token}`,
                "mode": 'no-cors'
            }
        }

        // const {data} = await axios.post(
        //     URL+'/retrieve-file',
        //     {'filepath': message},
        //     config
        // )

        const {data} = await axios.post(
            URL+'/retrieve-file', 
            {'filepath':message},
            {responseType: 'blob'},
            config
          ).then((response) => {
            window.open(URL.createObjectURL(response.data));
          })

        dispatch({
            type: FILE_RETRIEVE_SUCCESS,
            payload:data
        })

    }catch(error)
    {
        dispatch({
            type: FILE_RETRIEVE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}
