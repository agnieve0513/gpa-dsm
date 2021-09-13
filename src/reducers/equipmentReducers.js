
import {

    EQUIPMENT_LIST_REQUEST,
    EQUIPMENT_LIST_SUCCESS,
    EQUIPMENT_LIST_FAIL,
    EQUIPMENT_LIST_RESET,


} from '../constants/equipmentConstants'


export const equipmentListReducer = (state ={equipments:[]}, action) => {
    switch(action.type){
        case EQUIPMENT_LIST_REQUEST:
            return {loading: true}

        case EQUIPMENT_LIST_SUCCESS:
            return {loading:false, equipments: action.payload}

        case EQUIPMENT_LIST_FAIL:
            return {loading:false, error: action.payload}

        case EQUIPMENT_LIST_RESET:
            return {equipments:[]}
        default:
            return state
    }
}