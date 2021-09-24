
import {
    TC_UPLOAD_REQUEST,
    TC_UPLOAD_SUCCESS,
    TC_UPLOAD_FAIL 

} from '../constants/termsAndConditionConstants'


export const uploadTermsAndConditionReducer = (state = {}, action) => {
    switch(action.type)
    {
        case TC_UPLOAD_REQUEST:
            return {loading: true}

        case TC_UPLOAD_SUCCESS:
            return {loading: false, success:true}

        case TC_UPLOAD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
