import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userForgotPasswordReducer,
  userChangePasswordReducer,
  emailChangePasswordReducer,
} from "./reducers/userReducers";
import {
  applicationListReducer,
  applicationDetailReducer,
  applicationCommentsReducer,
  applicationLogsReducer,
  applicationUpdateReducer,
  applicationEditReducer,
  equipmentEditReducer,
  batchApplicationUpdateReducer,
  applicationTrackReducer,
  addCommentReducer,
  applicationListRecordsReducer,
  applicationPrintDetailReducer,
} from "./reducers/applicationReducers";
import { equipmentListReducer } from "./reducers/equipmentReducers";
import {
  batchListReducer,
  batchApplicationReducer,
  batchCurrentReducer,
  batchAddReducer,
} from "./reducers/batchReducers";
import {
  customerVerifyReducer,
  customerRegisterReducer,
  customerGenerateControlNoReducer,
  customerSystemTypesReducer,
  customerEquipManufacturersReducer,
  customerEquipModelReducer,
  customerEquipmentDetailReducer,
  customerDetailReducer,
} from "./reducers/customerReducers";
import {
  uploadTermsAndConditionReducer,
  retriveTermsAndConditionReducer,
} from "./reducers/termsAndConditionReducers";
import {
  uploadFileReducer,
  retrieveFileReducer,
  retrievePdfReducer,
  logsFileReducer,
  updateFileReducer,
} from "./reducers/fileReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userForgotPassword: userForgotPasswordReducer,
  userChangePassword: userChangePasswordReducer,
  emailChangePassword: emailChangePasswordReducer,

  uploadFile: uploadFileReducer,
  retrieveFile: retrieveFileReducer,
  retrievePdf: retrievePdfReducer,
  logsFile: logsFileReducer,
  updateFile:updateFileReducer,

  applicationList: applicationListReducer,
  applicationListRecord: applicationListRecordsReducer,
  applicationDetail: applicationDetailReducer,
  applicationPrintDetail: applicationPrintDetailReducer,
  applicationComments: applicationCommentsReducer,
  applicationLogs: applicationLogsReducer,
  applicationUpdate: applicationUpdateReducer,
  applicationEdit:applicationEditReducer,
  equipmentEdit:equipmentEditReducer,
  batchApplicationUpdate: batchApplicationUpdateReducer,
  applicationTrack: applicationTrackReducer,
  addComment: addCommentReducer,

  batchAdd: batchAddReducer,
  batchList: batchListReducer,
  batchApplication: batchApplicationReducer,
  batchCurrent: batchCurrentReducer,

  equipmentList: equipmentListReducer,

  customerRegister: customerRegisterReducer,
  customerGenerateControlNo: customerGenerateControlNoReducer,
  customerSystemType: customerSystemTypesReducer,
  customerEquipManufacturer: customerEquipManufacturersReducer,
  customerEquipmentDetail: customerEquipmentDetailReducer,
  customerEquipModel: customerEquipModelReducer,
  customerVerify: customerVerifyReducer,
  customerDetail: customerDetailReducer,

  uploadTermsAndCondition: uploadTermsAndConditionReducer,
  retriveTermsAndCondition: retriveTermsAndConditionReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
