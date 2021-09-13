
import {

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


} from '../constants/batchConstants'


export const batchListReducer = (state ={batches:[]}, action) => {
    switch(action.type){
        case BATCH_LIST_REQUEST:
            return {loading: true}

        case BATCH_LIST_SUCCESS:
            return {loading:false, batches: action.payload}

        case BATCH_LIST_FAIL:
            return {loading:false, error: action.payload}

        case BATCH_LIST_RESET:
            return {batches:[]}
        default:
            return state
    }
}

export const batchCurrentReducer = (state ={batchCurrent:[]}, action) => {
    switch(action.type){
        case BATCH_CURRENT_REQUEST:
            return {loading: true}

        case BATCH_CURRENT_SUCCESS:
            return {loading:false, batchCurrent: action.payload}

        case BATCH_CURRENT_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }
}

export const batchApplicationReducer = (state ={batch_applications:[]}, action) => {
    switch(action.type){
        case BATCH_APPLICATION_REQUEST:
            return {loading: true}

        case BATCH_APPLICATION_SUCCESS:
            return {loading:false, batch_applications: action.payload}

        case BATCH_APPLICATION_FAIL:
            return {loading:false, error: action.payload}

        case BATCH_APPLICATION_RESET:
            return {batch_applications:[]}
        default:
            return state
    }
}
