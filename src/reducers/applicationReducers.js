import {
  BATCH_APPLICATION_UPDATE_REQUEST,
  BATCH_APPLICATION_UPDATE_SUCCESS,
  BATCH_APPLICATION_UPDATE_FAIL,
  APPLICATION_LIST_REQUEST,
  APPLICATION_LIST_SUCCESS,
  APPLICATION_LIST_FAIL,
  APPLICATION_LIST_RESET,
  APPLICATION_LIST_RECORD_REQUEST,
  APPLICATION_LIST_RECORD_SUCCESS,
  APPLICATION_LIST_RECORD_FAIL,
  APPLICATION_LIST_RECORD_RESET,
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
  APPLICATION_UPDATE_FAIL,
  APPLICATION_EDIT_REQUEST,
  APPLICATION_EDIT_SUCCESS,
  APPLICATION_EDIT_FAIL,
  APPLICATION_EQUIP_EDIT_REQUEST,
  APPLICATION_EQUIP_EDIT_SUCCESS,
  APPLICATION_EQUIP_EDIT_FAIL,
  APPLICATION_TRACK_REQUEST,
  APPLICATION_TRACK_SUCCESS,
  APPLICATION_TRACK_FAIL,
  COMMENT_ADD_REQUEST,
  COMMENT_ADD_SUCCESS,
  COMMENT_ADD_FAIL,
  APPLICATION_DETAIL_PRINT_REQUEST,
  APPLICATION_DETAIL_PRINT_SUCCESS,
  APPLICATION_DETAIL_PRINT_FAIL,
  APPLICATION_DETAIL_PRINT_RESET,
} from "../constants/applicationConstants";

export const applicationTrackReducer = (
  state = { track_application: [] },
  action
) => {
  switch (action.type) {
    case APPLICATION_TRACK_REQUEST:
      return { loading: true };
    case APPLICATION_TRACK_SUCCESS:
      return { loading: false, track_application: action.payload };
    case APPLICATION_TRACK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const applicationListReducer = (
  state = { applications: [] },
  action
) => {
  switch (action.type) {
    case APPLICATION_LIST_REQUEST:
      return { loading: true };

    case APPLICATION_LIST_SUCCESS:
      return { loading: false, applications: action.payload };

    case APPLICATION_LIST_FAIL:
      return { loading: false, error: action.payload };

    case APPLICATION_LIST_RESET:
      return { applications: [] };
    default:
      return state;
  }
};

export const applicationListRecordsReducer = (
  state = { applications: [] },
  action
) => {
  switch (action.type) {
    case APPLICATION_LIST_RECORD_REQUEST:
      return { loading: true };

    case APPLICATION_LIST_RECORD_SUCCESS:
      return { loading: false, applications: action.payload };

    case APPLICATION_LIST_RECORD_FAIL:
      return { loading: false, error: action.payload };

    case APPLICATION_LIST_RECORD_RESET:
      return { applications: [] };
    default:
      return state;
  }
};

export const applicationLogsReducer = (state = { logs: [] }, action) => {
  switch (action.type) {
    case APPLICATION_LOGS_REQUEST:
      return { loading: true };

    case APPLICATION_LOGS_SUCCESS:
      return { loading: false, logs: action.payload };

    case APPLICATION_LOGS_FAIL:
      return { loading: false, error: action.payload };

    case APPLICATION_LOGS_RESET:
      return { logs: [] };
    default:
      return state;
  }
};

export const applicationCommentsReducer = (
  state = { comments: [] },
  action
) => {
  switch (action.type) {
    case APPLICATION_COMMENTS_REQUEST:
      return { loading: true };

    case APPLICATION_COMMENTS_SUCCESS:
      return { loading: false, comments: action.payload };

    case APPLICATION_COMMENTS_FAIL:
      return { loading: false, error: action.payload };

    case APPLICATION_COMMENTS_RESET:
      return { comments: [] };
    default:
      return state;
  }
};

export const applicationDetailReducer = (
  state = { application: [] },
  action
) => {
  switch (action.type) {
    case APPLICATION_DETAIL_REQUEST:
      return { loading: true };

    case APPLICATION_DETAIL_SUCCESS:
      return { loading: false, application: action.payload };

    case APPLICATION_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    case APPLICATION_DETAIL_RESET:
      return { application: [] };
    default:
      return state;
  }
};

export const applicationPrintDetailReducer = (
  state = { application: [] },
  action
) => {
  switch (action.type) {
    case APPLICATION_DETAIL_PRINT_REQUEST:
      return { loading: true, application: [] };

    case APPLICATION_DETAIL_PRINT_SUCCESS:
      return { loading: false, application: action.payload };

    case APPLICATION_DETAIL_PRINT_FAIL:
      return { loading: false, application: [], error: action.payload };

    case APPLICATION_DETAIL_PRINT_RESET:
      return { application: [] };
    default:
      return state;
  }
};

export const applicationUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLICATION_UPDATE_REQUEST:
      return { loading: true };

    case APPLICATION_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case APPLICATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const applicationEditReducer = (state = {edit_info: []}, action) => {
  switch (action.type) {
    case APPLICATION_EDIT_REQUEST:
      return { loading: true };

    case APPLICATION_EDIT_SUCCESS:
      return { loading: false, edit_info: true };

    case APPLICATION_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const equipmentEditReducer = (state = {edit_equip: []}, action) => {
  switch (action.type) {
    case APPLICATION_EQUIP_EDIT_REQUEST:
      return { loading: true };

    case APPLICATION_EQUIP_EDIT_SUCCESS:
      return { loading: false, edit_info: true };

    case APPLICATION_EQUIP_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const batchApplicationUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BATCH_APPLICATION_UPDATE_REQUEST:
      return { loading: true };

    case BATCH_APPLICATION_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case BATCH_APPLICATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_ADD_REQUEST:
      return { loading: true };

    case COMMENT_ADD_SUCCESS:
      return { loading: false, success: true };

    case COMMENT_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
