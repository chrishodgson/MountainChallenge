import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import campaignsReducer from "./campaignsReducer";

export default combineReducers({
  auth: authReducer,
  campaigns: campaignsReducer,
  form: reduxForm
});
