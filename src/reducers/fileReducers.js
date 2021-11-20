
import {
    FILE_UPLOAD_REQUEST,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_FAIL,
    
    FILE_RETRIEVE_REQUEST,
    FILE_RETRIEVE_SUCCESS,
    FILE_RETRIEVE_FAIL,


} from '../constants/fileConstants'


export const uploadFileReducer = (state = {fileCode:[]}, action) => {
    switch(action.type)
    {
        case FILE_UPLOAD_REQUEST:
            return {loading: true}

        case FILE_UPLOAD_SUCCESS:
            return {loading: false, fileCode: action.payload}

        case FILE_UPLOAD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const retrieveFileReducer = (state = {fileOutput:[]}, action) => {
    switch(action.type)
    {
        case FILE_RETRIEVE_REQUEST:
            return {loading: true}

        case FILE_RETRIEVE_SUCCESS:
            return {loading: false, fileOutput: action.payload}

        case FILE_RETRIEVE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}