
import axios from 'axios'
import {
    FILE_UPLOAD_REQUEST,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_FAIL 
} from '../constants/fileConstants'

const URL = 'https://gpadev-api-rebate.xtendly.com/api/v1'

export const uploadFileAction = (filepath, doctype, controlNo) => async (dispatch) => {
    try{

        let obj = JSON.parse(localStorage.getItem('userInfo'));

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
                "Accept": "application/json",
                'Authorization' : `Bearer ${obj.message.original.access_token}`
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
