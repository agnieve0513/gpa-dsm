
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

} from '../constants/userConstants'

export const emailChangePasswordReducer = (state ={email_change_pass:[]}, action) => {
    switch(action.type)
    {
        case EMAIL_CHANGE_PASSWORD_REQUEST:
            return {loading: true}

        case EMAIL_CHANGE_PASSWORD_SUCCESS:
            return {loading: false, email_change_pass: action.payload}

        case EMAIL_CHANGE_PASSWORD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const userChangePasswordReducer = (state ={change_pass:[]}, action) => {
    switch(action.type)
    {
        case USER_CHANGE_PASSWORD_REQUEST:
            return {loading: true}

        case USER_CHANGE_PASSWORD_SUCCESS:
            return {loading: false, change_pass: action.payload}

        case USER_CHANGE_PASSWORD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const userForgotPasswordReducer = (state = {}, action) => {
    switch(action.type)
    {
        case USER_FORGOT_PASSWORD_REQUEST:
            return {loading: true}

        case USER_FORGOT_PASSWORD_SUCCESS:
            return {loading: false, userInfo: action.payload}

        case USER_FORGOT_PASSWORD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const userLoginReducer = (state = {}, action) => {
    switch(action.type)
    {
        case USER_LIST_REQUEST:
            return {loading: true}

        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}

        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type)
    {
        case USER_REGISTER_REQUEST:
            return {loading: true}

        case USER_REGISTER_SUCCESS:
            return {loading: false, success:true}

        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch(action.type)
    {
        case USER_UPDATE_REQUEST:
            return {loading: true}

        case USER_UPDATE_SUCCESS:
            return {loading: false, success:true}

        case USER_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const userListReducer = (state ={users:[]}, action) => {
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading: true}

        case USER_LIST_SUCCESS:
            return {loading:false, users: action.payload}

        case USER_LIST_FAIL:
            return {loading:false, error: action.payload}

        case USER_LIST_RESET:
            return {users:[]}
        default:
            return state
    }
}

export const userDeleteReducer = (state ={}, action) => {
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {loading: true}

        case USER_DELETE_SUCCESS:
            return {loading:false, success: true}

        case USER_DELETE_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }
}