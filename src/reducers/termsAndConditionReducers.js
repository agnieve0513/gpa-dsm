import {
  TC_UPLOAD_REQUEST,
  TC_UPLOAD_SUCCESS,
  TC_UPLOAD_FAIL,
  PDF_RETRIEVE_FAIL,
  PDF_RETRIEVE_REQUEST,
  PDF_RETRIEVE_SUCCESS,
} from "../constants/termsAndConditionConstants";

export const uploadTermsAndConditionReducer = (state = {}, action) => {
  switch (action.type) {
    case TC_UPLOAD_REQUEST:
      return { loading: true };

    case TC_UPLOAD_SUCCESS:
      return { loading: false, success: true };

    case TC_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const retriveTermsAndConditionReducer = (state = {}, action) => {
  switch (action.type) {
    case PDF_RETRIEVE_REQUEST:
      return { loading: true };

    case PDF_RETRIEVE_SUCCESS:
      return { loading: false, success: true, data: action.payload };

    case PDF_RETRIEVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
