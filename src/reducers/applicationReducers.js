
import {

    APPLICATION_LIST_REQUEST,
    APPLICATION_LIST_SUCCESS,
    APPLICATION_LIST_FAIL,
    APPLICATION_LIST_RESET,

    APPLICATION_DETAIL_REQUEST,
    APPLICATION_DETAIL_SUCCESS,
    APPLICATION_DETAIL_FAIL,
    APPLICATION_DETAIL_RESET,

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
    APPLICATION_UPDATE_FAIL


} from '../constants/applicationConstants'


export const applicationListReducer = (state ={applications:[]}, action) => {
    switch(action.type){
        case APPLICATION_LIST_REQUEST:
            return {loading: true}

        case APPLICATION_LIST_SUCCESS:
            return {loading:false, applications: action.payload}

        case APPLICATION_LIST_FAIL:
            return {loading:false, error: action.payload}

        case APPLICATION_LIST_RESET:
            return {applications:[]}
        default:
            return state
    }
}

export const applicationLogsReducer = (state ={logs:[]}, action) => {
    switch(action.type){
        case APPLICATION_LOGS_REQUEST:
            return {loading: true}

        case APPLICATION_LOGS_SUCCESS:
            return {loading:false, logs: action.payload}

        case APPLICATION_LOGS_FAIL:
            return {loading:false, error: action.payload}

        case APPLICATION_LOGS_RESET:
            return {logs:[]}
        default:
            return state
    }
}

export const applicationCommentsReducer = (state ={comments:[]}, action) => {
    switch(action.type){
        case APPLICATION_COMMENTS_REQUEST:
            return {loading: true}

        case APPLICATION_COMMENTS_SUCCESS:
            return {loading:false, comments: action.payload}

        case APPLICATION_COMMENTS_FAIL:
            return {loading:false, error: action.payload}

        case APPLICATION_COMMENTS_RESET:
            return {comments:[]}
        default:
            return state
    }
}

export const applicationDetailReducer = (state ={application:[]}, action) => {
    switch(action.type){
        case APPLICATION_DETAIL_REQUEST:
            return {loading: true}

        case APPLICATION_DETAIL_SUCCESS:
            return {loading:false, application: action.payload}

        case APPLICATION_DETAIL_FAIL:
            return {loading:false, error: action.payload}

        case APPLICATION_DETAIL_RESET:
            return {application:[]}
        default:
            return state
    }
}

export const applicationUpdateReducer = (state = {}, action) => {
    switch(action.type)
    {
        case APPLICATION_UPDATE_REQUEST:
            return {loading: true}

        case APPLICATION_UPDATE_SUCCESS:
            return {loading: false, success:true}

        case APPLICATION_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}